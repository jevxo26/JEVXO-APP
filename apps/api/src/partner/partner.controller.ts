import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PartnerService } from './partner.service';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  // --- PARTNER REGISTRATION ENDPOINT (TRANSACTIONAL POSTGRESQL) ---

  @Post('register')
  registerPartner(@Body() dto: any) {
    return this.partnerService.createPartnerRegistration(dto);
  }

  @Post('create-partner')
  createPartner(@Body() dto: any) {
    return this.partnerService.createPartnerRegistration(dto);
  }

  // --- ADMIN PARTNER MANAGEMENT ENDPOINTS ---

  @Get('all-partners')
  getAllPartners() {
    return this.partnerService.getAllPartners();
  }

  @Patch(':id/status')
  updatePartnerStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.partnerService.updatePartnerStatus(id, status);
  }

  @Patch('withdrawals/:id/status')
  updateWithdrawalStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.partnerService.updateWithdrawalStatus(id, status);
  }

  @Delete(':id')
  deletePartner(@Param('id') id: number) {
    return this.partnerService.deletePartner(id);
  }

  // --- PARTNER DASHBOARD ENDPOINTS ---

  @Get('dashboard')
  getDashboardSummary(@Request() req: any) {
    const userId = req.user?.id;
    return this.partnerService.getDashboardSummary(userId);
  }

  @Get('clients')
  getClients(@Request() req: any) {
    const userId = req.user?.id;
    return this.partnerService.getClients(userId);
  }

  @Post('clients')
  addClient(@Request() req: any, @Body() dto: any) {
    const userId = req.user?.id || 1;
    return this.partnerService.addClient(userId, dto);
  }

  @Get('commissions')
  getCommissions(@Request() req: any) {
    const userId = req.user?.id;
    return this.partnerService.getCommissions(userId);
  }

  @Post('withdraw')
  createWithdrawal(@Request() req: any, @Body() dto: any) {
    const userId = req.user?.id || 1;
    return this.partnerService.createWithdrawal(userId, dto);
  }

  @Get('withdrawals')
  getWithdrawals(@Request() req: any) {
    const userId = req.user?.id;
    return this.partnerService.getWithdrawals(userId);
  }

  @Get('marketing-assets')
  getMarketingAssets() {
    return this.partnerService.getMarketingAssets();
  }

  @Get('country-stats')
  getCountryStats(@Query('country') country: string) {
    return this.partnerService.getCountryStats(country);
  }

  @Get('leaderboard')
  getLeaderboard() {
    return this.partnerService.getLeaderboard();
  }
}
