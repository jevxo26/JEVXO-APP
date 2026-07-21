import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, LessThan, Not, IsNull } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { EmailService } from '../common/services/email.service';
import { GoogleCalendarService } from '../common/services/google-calendar.service';
import { DiscordService } from '../common/services/discord.service';

@Injectable()
export class MeetingService {
  private readonly logger = new Logger(MeetingService.name);

  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    @InjectRepository(OurTeam)
    private readonly ourTeamRepository: Repository<OurTeam>,
    private readonly emailService: EmailService,
    private readonly googleCalendarService: GoogleCalendarService,
    private readonly discordService: DiscordService,
  ) {}

  private formatDateIdPart(d: Date) {
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  private async generateUniqueMeetingId(dateTime: Date): Promise<string> {
    const datePart = this.formatDateIdPart(dateTime);
    for (let i = 0; i < 10; i++) {
      const suffix = String(Math.floor(1 + Math.random() * 999)).padStart(3, '0');
      const meetingId = `m-${datePart}-${suffix}`;
      const exists = await this.meetingRepository.exist({ where: { meetingId } });
      if (!exists) return meetingId;
    }
    // fallback: timestamp-based
    return `m-${datePart}-${Date.now().toString().slice(-6)}`;
  }

  async create(createMeetingDto: CreateMeetingDto) {
    const dt = new Date(createMeetingDto.dateTime);
    if (Number.isNaN(dt.getTime())) {
      throw new BadRequestException('Invalid dateTime');
    }

    const meetingId = await this.generateUniqueMeetingId(dt);

    // Resolve attendee emails up-front (used for calendar invite + email).
    const attendees = await this.ourTeamRepository.find({
      where: { id: In(createMeetingDto.attendeeIds) },
      select: ['id', 'firstName', 'lastName', 'email'],
    });

    const emailAttendees = attendees
      .filter((a) => !!a.email)
      .map((a) => ({
        email: a.email,
        name: `${a.firstName} ${a.lastName}`.trim(),
      }));

    // Create meeting link based on platform
    let meetingLink: string = createMeetingDto.meetingLink || '';
    const platform = createMeetingDto.platform || 'google_meet';

    if (platform === 'google_meet') {
      try {
        const end = new Date(dt.getTime() + createMeetingDto.durationMinutes * 60000);
        const meet = await this.googleCalendarService.createMeetEvent({
          summary: createMeetingDto.topic,
          description: createMeetingDto.description,
          start: dt.toISOString(),
          end: end.toISOString(),
          attendees: emailAttendees.map((a) => ({ email: a.email })),
        });
  
        if (meet.meetLink) {
          meetingLink = meet.meetLink;
        } else {
           throw new Error('Google Calendar did not return a Meet link');
        }
      } catch (err) {
        this.logger.warn(`Google Meet event creation failed for ${meetingId}: ${err.message}`);
      }
    } else if (platform === 'discord') {
      try {
        const end = new Date(dt.getTime() + createMeetingDto.durationMinutes * 60000);
        const discordEvent = await this.discordService.createScheduledEvent({
          topic: createMeetingDto.topic,
          description: createMeetingDto.description,
          startTime: dt,
          endTime: end,
          location: 'Voice Channel', // Or maybe pass a specific channel
        });

        if (discordEvent.url) {
            meetingLink = discordEvent.url;
        }
      } catch (err) {
        this.logger.warn(`Discord event creation failed for ${meetingId}: ${err.message}`);
        // Fallback or just log
      }
    }
    
    // Ensure we don't save empty string if fallback isn't possible, maybe throw?
    // For now keeping behavior loose.

    const meeting = this.meetingRepository.create({
      meetingId,
      meetingLink,
      topic: createMeetingDto.topic,
      description: createMeetingDto.description ?? null,
      dateTime: dt,
      durationMinutes: createMeetingDto.durationMinutes,
      attendeeIds: createMeetingDto.attendeeIds,
      organizerName: createMeetingDto.organizerName ?? null,
      status: 'upcoming',
      platform,
    });

    const saved = await this.meetingRepository.save(meeting);

    // Email selected attendees
    // Email selected attendees (Background Task)
    if (emailAttendees.length) {
      this.emailService.sendMeetingInvitations({
        to: emailAttendees.map((a) => a.email),
        attendees: emailAttendees,
        topic: saved.topic,
        description: saved.description ?? null,
        dateTimeIso: saved.dateTime.toISOString(),
        durationMinutes: saved.durationMinutes,
        meetingLink: saved.meetingLink,
        organizerName: saved.organizerName ?? null,
      }).catch(err => {
        this.logger.error(`Failed to send meeting invitations for meeting ${saved.id}`, err as any);
      });
    } else {
      this.logger.warn(`No attendee emails found for meeting ${saved.id}`);
    }

    return saved;
  }

  async findAll() {
    return this.meetingRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const meeting = await this.meetingRepository.findOne({ where: { id } });
    if (!meeting) throw new NotFoundException(`Meeting with ID ${id} not found`);
    return meeting;
  }

  async update(id: number, updateMeetingDto: UpdateMeetingDto) {
    const meeting = await this.findOne(id);
    Object.assign(meeting, updateMeetingDto as any);
    return this.meetingRepository.save(meeting);
  }

  async remove(id: number) {
    const meeting = await this.findOne(id);
    return this.meetingRepository.softRemove(meeting);
  }

  async findAllTrashed() {
    return this.meetingRepository.find({
      where: { deletedAt: Not(IsNull()) },
      withDeleted: true,
      order: { deletedAt: 'DESC' },
    });
  }

  async restore(id: number) {
    return this.meetingRepository.restore(id);
  }

  async permanentRemove(id: number) {
    // Only allow removing if it's already soft-deleted? Or just force delete.
    // Usually permanent delete is from trash, so it's already soft deleted.
    // We need withDeleted: true to find it.
    const meeting = await this.meetingRepository.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!meeting) throw new NotFoundException(`Meeting with ID ${id} not found`);
    return this.meetingRepository.remove(meeting);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanUpTrash() {
    this.logger.log('Running Trash Cleanup...');
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const oldTrash = await this.meetingRepository.find({
      withDeleted: true,
      where: {
        deletedAt: LessThan(sevenDaysAgo),
      },
    });

    if (oldTrash.length > 0) {
      this.logger.log(`Found ${oldTrash.length} old meetings to permanently delete.`);
      await this.meetingRepository.remove(oldTrash);
    }
  }
}
