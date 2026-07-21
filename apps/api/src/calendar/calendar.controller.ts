import { Controller, Get, Query, Req, Res, UseGuards, Post, Body } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import type { Response } from 'express';
// Assuming you have JWT Auth Guard. If not, we might need to adjust.
// Checking imports for AuthGuard... usually it's exported from auth module
import { AuthGuard } from '@nestjs/passport'; 

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('auth')
  googleAuth(@Res() res: Response) {
    const url = this.calendarService.getAuthUrl();
    res.redirect(url);
  }

  @Get('callback')
  async googleAuthRedirect(@Query('code') code: string, @Res() res: Response) {
    // Note: In a real app, we need the authenticated user here to attach the token.
    // Since the callback comes from Google, it doesn't have our JWT header.
    // Standard solution: Store a temporary "state" token in cookie before redirect, verify it here.
    // OR: For this MVP, we might assume a single user scenario or pass user ID in state param?
    // 
    // BETTER APPROACH for MVP:
    // The Callback should exchange codel, get tokens, and then save them?
    // But we don't know WHICH user initiated this without session/state.
    //
    // Alternative: The Frontend handles the code exchange by calling POST /calendar/connect { code }
    // passing the JWT token.
    //
    // Let's REFACTOR to that approach which is much more secure for SPA/APIs.
    // 1. Frontend redirects to Google.
    // 2. Google redirects to Frontend /admin/schedule?code=...
    // 3. Frontend calls Backend POST /calendar/connect with code + JWT.
    
    // Changing this controller to just return the URL or handle the 'connect' post.
    
    return res.json({ message: 'Callback received. Please use POST /calendar/connect from frontend.' });
  }

  @Post('connect')
  @UseGuards(AuthGuard('jwt'))
  async connectCalendar(@Body('code') code: string, @Req() req) {
    const userId = req.user.id; // User from JWT
    return this.calendarService.handleCallback(code, userId);
  }

  @Post('events')
  @UseGuards(AuthGuard('jwt'))
  async createEvent(@Body() eventDetails: any, @Req() req) {
    const userId = req.user.id;
    return this.calendarService.createEvent(userId, eventDetails);
  }
}
