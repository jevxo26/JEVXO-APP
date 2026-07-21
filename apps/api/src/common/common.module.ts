import { Module, Global } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { GoogleCalendarService } from './services/google-calendar.service';
import { DiscordService } from './services/discord.service';

@Global()
@Module({
  providers: [EmailService, GoogleCalendarService, DiscordService],
  exports: [EmailService, GoogleCalendarService, DiscordService],
})
export class CommonModule {}
