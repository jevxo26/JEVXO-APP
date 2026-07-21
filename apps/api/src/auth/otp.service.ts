import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';
import { EmailService } from '../common/services/email.service';
import * as crypto from 'crypto';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private readonly emailService: EmailService,
  ) {}

  async generateAndSendOtp(email: string): Promise<void> {
    // Invalidate previous OTPs for this email
    await this.otpRepository.update(
      { email, isUsed: false },
      { isUsed: true },
    );

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration

    const otpEntity = this.otpRepository.create({
      email,
      otp,
      expiresAt,
    });

    await this.otpRepository.save(otpEntity);

    // Send email
    await this.emailService.sendOtpEmail(email, otp);
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const otpEntity = await this.otpRepository.findOne({
      where: { email, otp, isUsed: false },
      order: { createdAt: 'DESC' },
    });

    if (!otpEntity) {
      throw new BadRequestException('Invalid OTP');
    }

    if (otpEntity.expiresAt < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    // Mark as used
    otpEntity.isUsed = true;
    await this.otpRepository.save(otpEntity);

    return true;
  }
}
