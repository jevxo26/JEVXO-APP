import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';

@Injectable()
export class CalendarService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(OurTeam)
    private ourTeamRepository: Repository<OurTeam>,
  ) {}

  private createOAuthClient() {
    return new google.auth.OAuth2(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get('GOOGLE_CLIENT_SECRET'),
      this.configService.get('GOOGLE_REDIRECT_URI'),
    );
  }

  getAuthUrl() {
    const oauth2Client = this.createOAuthClient();
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
      ],
      prompt: 'consent',
    });
  }

  async handleCallback(code: string, userId: number) {
    const oauth2Client = this.createOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);
    
    if (tokens.refresh_token) {
      await this.ourTeamRepository.update(userId, {
        googleCalendarRefreshToken: tokens.refresh_token,
      });
    }

    return tokens;
  }

  async createEvent(userId: number, eventDetails: any) {
    console.log(`Creating event for userId: ${userId}`);
    const user = await this.ourTeamRepository.findOne({ where: { id: userId } });
    
    if (!user || !user.googleCalendarRefreshToken) {
      console.error('User or refresh token missing');
      throw new UnauthorizedException('User has not connected Google Calendar');
    }

    console.log(`Found refresh token (masked): ${user.googleCalendarRefreshToken.substring(0, 10)}...`);

    const oauth2Client = this.createOAuthClient();
    oauth2Client.setCredentials({
      refresh_token: user.googleCalendarRefreshToken,
    });

    // Verify access token can be fetched
    try {
      const { token } = await oauth2Client.getAccessToken();
      console.log('Access token retrieved successfully');
    } catch (e) {
      console.error('Failed to retrieve access token:', e);
    }

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    try {
      const response = await calendar.events.insert({
        calendarId: 'primary',
        conferenceDataVersion: 1, // Required to create Meet link
        requestBody: eventDetails,
      });
      console.log('Event created successfully');
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      // Log environment to check for ADC interference
      console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
      throw error;
    }
  }
}
