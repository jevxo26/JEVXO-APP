import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { PartnerService } from './partner.service';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  // --- ADMIN PARTNER MANAGEMENT ENDPOINTS ---

  @Get('all-partners')
  getAllPartners() {
    return this.partnerService.getAllPartners();
  }

  @Post('create-partner')
  createPartner(@Body() dto: any) {
    return this.partnerService.createPartner(dto);
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
  getDashboardSummary() {
    return this.partnerService.getDashboardSummary();
  }

  @Get('clients')
  getClients() {
    return this.partnerService.getClients();
  }

  @Post('clients')
  addClient(@Body() dto: any) {
    return this.partnerService.addClient(dto);
  }

  @Get('commissions')
  getCommissions() {
    return this.partnerService.getCommissions();
  }

  @Post('withdraw')
  createWithdrawal(@Body() dto: any) {
    return this.partnerService.createWithdrawal(dto);
  }

  @Get('withdrawals')
  getWithdrawals() {
    return this.partnerService.getWithdrawals();
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
