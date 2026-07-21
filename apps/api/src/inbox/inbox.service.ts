import { Injectable } from '@nestjs/common';
import { DiscordService } from '../common/services/discord.service';

@Injectable()
export class InboxService {
  constructor(private readonly discordService: DiscordService) {}

  async getChannels() {
    return this.discordService.getChannels();
  }

  async getMessages(channelId: string) {
    return this.discordService.getMessages(channelId);
  }

  async sendMessage(channelId: string, content: string) {
    return this.discordService.sendMessage(channelId, content);
  }
}
