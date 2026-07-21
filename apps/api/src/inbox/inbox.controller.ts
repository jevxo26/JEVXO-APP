import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { CreateInboxDto } from './dto/create-inbox.dto';
import { UpdateInboxDto } from './dto/update-inbox.dto';

@Controller('inbox')
export class InboxController {
  constructor(private readonly inboxService: InboxService) {}

  @Get('channels')
  getChannels() {
    return this.inboxService.getChannels();
  }

  @Get('channels/:id/messages')
  getMessages(@Param('id') id: string) {
    return this.inboxService.getMessages(id);
  }

  @Post('channels/:id/messages')
  sendMessage(@Param('id') id: string, @Body('content') content: string) {
    return this.inboxService.sendMessage(id, content);
  }
}
