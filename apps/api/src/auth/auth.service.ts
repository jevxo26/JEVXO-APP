import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(OurTeam)
    private readonly ourTeamRepository: Repository<OurTeam>,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    console.log(`[AuthDebug] Validating user: ${email}`);
    const user = await this.ourTeamRepository.findOne({
      where: { email },
      relations: ['department'],
    });

    if (!user) {
      console.log(`[AuthDebug] User not found: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log(`[AuthDebug] User found: ${user.id}, Status: ${user.status}`);

    if (user.status !== 'active') {
      console.log(`[AuthDebug] User inactive: ${email}`);
      throw new UnauthorizedException('Account is not active');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`[AuthDebug] Password invalid for: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log(`[AuthDebug] Login successful for: ${email}`);

    // Return user without password
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        position: user.position,
        department: user.department,
        profileImage: user.profileImage,
      },
    };
  }

  async findById(id: number): Promise<any> {
    const user = await this.ourTeamRepository.findOne({
      where: { id },
      relations: ['department'],
    });

    if (!user) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  async validateJwtPayload(payload: any): Promise<any> {
    const user = await this.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.status !== 'active') {
      throw new UnauthorizedException('Account is not active');
    }
    return user;
    return user;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.ourTeamRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User with this email does not exist');
    }
    await this.otpService.generateAndSendOtp(email);
  }

  async resetPassword(resetPasswordDto: any): Promise<void> {
    const { email, otp, newPassword } = resetPasswordDto;
    
    // Verify OTP
    await this.otpService.verifyOtp(email, otp);

    const user = await this.ourTeamRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await this.ourTeamRepository.save(user);
  }
}
