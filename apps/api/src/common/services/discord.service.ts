import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits, GuildScheduledEventEntityType, GuildScheduledEventPrivacyLevel } from 'discord.js';

@Injectable()
export class DiscordService implements OnModuleInit {
  private readonly logger = new Logger(DiscordService.name);
  private client: Client;
  private isReady = false;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildScheduledEvents, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
      ],
    });
  }

  async onModuleInit() {
    const token = this.configService.get<string>('DISCORD_BOT_TOKEN');
    if (!token) {
      this.logger.warn('DISCORD_BOT_TOKEN not set. Discord integration disabled.');
      return;
    }

    try {
      await this.client.login(token);
      this.client.once('ready', () => {
        this.isReady = true;
        this.logger.log(`Discord Bot Logged in as ${this.client.user?.tag}`);
      });
    } catch (error) {
      this.logger.error('Failed to log in to Discord', error);
    }
  }

  async getChannels() {
    if (!this.isReady) throw new Error('Discord Bot not ready');
    const guildId = this.configService.get<string>('DISCORD_SERVER_ID');
    if (!guildId) return [];
    
    try {
      const guild = await this.client.guilds.fetch(guildId);
      if (!guild) return [];

      // Fetch Channels
      const channels = await guild.channels.fetch();
      const mappedChannels = channels
        .filter((c) => c !== null && c.isTextBased())
        .map((c) => ({
          id: c!.id,
          name: c!.name,
          type: 'channel',
          parentId: c!.parentId
        }));

      // Fetch Members for DMs
      const members = await guild.members.fetch();
      const mappedMembers = members
        .filter(m => !m.user.bot) // Filter out bots for now, or keep them if you want
        .map(m => ({
          id: m.user.id,
          name: m.user.username,
          type: 'dm',
          avatar: m.user.displayAvatarURL(),
          status: m.presence?.status || 'offline'
        }));

      return [...mappedChannels, ...mappedMembers];
    } catch (e) {
      console.error('Error fetching channels/members', e);
      return [];
    }
  }

  async getMessages(id: string, limit = 50) {
    if (!this.isReady) throw new Error('Discord Bot not ready');
    
    let channel;
    try {
       channel = await this.client.channels.fetch(id);
    } catch {
       // If fetching channel failed, it might be a user ID we need to open a DM with
       try {
         const user = await this.client.users.fetch(id);
         channel = await user.createDM();
       } catch (e) {
         throw new Error('Could not find channel or open DM with user');
       }
    }

    if (!channel || !channel.isTextBased()) {
      throw new Error('Channel not found or not text-based');
    }
    
    const messages = await channel.messages.fetch({ limit });
    return messages.map(m => ({
      id: m.id,
      content: m.content,
      author: {
        id: m.author.id,
        username: m.author.username,
        avatar: m.author.displayAvatarURL(),
        bot: m.author.bot
      },
      timestamp: m.createdTimestamp,
      attachments: m.attachments.map(a => a.url)
    }));
  }

  async sendMessage(id: string, content: string) {
    if (!this.isReady) throw new Error('Discord Bot not ready');
    
    let channel;
    try {
       channel = await this.client.channels.fetch(id);
    } catch {
       try {
         const user = await this.client.users.fetch(id);
         channel = await user.createDM();
       } catch (e) {
         throw new Error('Could not find channel or open DM with user');
       }
    }

    if (!channel || !channel.isTextBased()) {
      throw new Error('Channel not found or not text-based');
    }
    
    if (channel.isTextBased() && 'send' in channel) {
        // @ts-ignore
         const message = await (channel as any).send(content);
         return {
            id: message.id,
            content: message.content,
            timestamp: message.createdTimestamp
          };
    }
    throw new Error('Channel does not support sending messages');
  }

  async createScheduledEvent(data: {
    topic: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    location?: string;
  }): Promise<{ url: string; id: string }> {
    if (!this.isReady) {
      throw new Error('Discord Bot is not connected.');
    }

    const guildId = this.configService.get<string>('DISCORD_SERVER_ID');
    if (!guildId) {
      throw new Error('DISCORD_SERVER_ID is not configured.');
    }

    const guild = await this.client.guilds.fetch(guildId);
    if (!guild) {
      throw new Error(`Discord Server (Guild) with ID ${guildId} not found.`);
    }

    try {
      const event = await guild.scheduledEvents.create({
        name: data.topic,
        scheduledStartTime: data.startTime,
        scheduledEndTime: data.endTime,
        privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
        entityType: GuildScheduledEventEntityType.External,
        entityMetadata: {
            location: data.location || 'Discord Voice Channel',
        },
        description: data.description,
      });

      return {
        url: event.url,
        id: event.id,
      };
    } catch (error) {
      this.logger.error('Failed to create Discord Scheduled Event', error);
      throw error;
    }
  }
}
