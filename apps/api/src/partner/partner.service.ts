import { Injectable } from '@nestjs/common';

@Injectable()
export class PartnerService {
  private partners = [
    {
      id: 1,
      name: 'Ashikur Rahman Ovi',
      email: 'admin@gmail.com',
      country: 'Bangladesh',
      flag: '🇧🇩',
      commissionRate: '20%',
      status: 'active',
      totalSales: 142,
      totalRevenue: '$148,500.00',
      balance: '$4,250.00',
      joinedDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Marcus Reid',
      email: 'marcus@uspartners.io',
      country: 'United States',
      flag: '🇺🇸',
      commissionRate: '18%',
      status: 'active',
      totalSales: 118,
      totalRevenue: '$124,000.00',
      balance: '$3,100.00',
      joinedDate: '2024-03-10',
    },
    {
      id: 3,
      name: 'Elena Rostova',
      email: 'elena@eu-tech.de',
      country: 'Germany',
      flag: '🇩🇪',
      commissionRate: '15%',
      status: 'active',
      totalSales: 94,
      totalRevenue: '$98,200.00',
      balance: '$2,450.00',
      joinedDate: '2024-05-22',
    },
  ];

  private clients = [
    {
      id: 1,
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      plan: 'Enterprise Suite',
      status: 'active',
      monthlyFee: '$1,200.00',
      renewalDate: '2026-11-15',
      joinedDate: '2025-01-10',
      owner: 'Ashikur Rahman Ovi',
      country: 'Bangladesh',
    },
    {
      id: 2,
      name: 'Apex Global Tech',
      email: 'billing@apexglobal.io',
      plan: 'SaaS Pro Package',
      status: 'active',
      monthlyFee: '$850.00',
      renewalDate: '2026-08-01',
      joinedDate: '2025-03-20',
      owner: 'Ashikur Rahman Ovi',
      country: 'Bangladesh',
    },
    {
      id: 3,
      name: 'Starlight Logistics',
      email: 'ops@starlight.com',
      plan: 'Cloud Infra Standard',
      status: 'upcoming_renewal',
      monthlyFee: '$650.00',
      renewalDate: '2026-07-30',
      joinedDate: '2024-07-30',
      owner: 'Ashikur Rahman Ovi',
      country: 'United States',
    },
    {
      id: 4,
      name: 'NextGen Financials',
      email: 'admin@nextgenfin.com',
      plan: 'AI Automation Core',
      status: 'expired',
      monthlyFee: '$450.00',
      renewalDate: '2026-06-15',
      joinedDate: '2024-06-15',
      owner: 'Ashikur Rahman Ovi',
      country: 'United Kingdom',
    },
  ];

  private withdrawals = [
    {
      id: 'WTH-9842',
      partnerName: 'Ashikur Rahman Ovi',
      amount: '$1,450.00',
      numericAmount: 1450.0,
      paymentMethod: 'Bank Transfer (DBBL)',
      accountNumber: '**** **** 8921',
      status: 'completed',
      date: '2026-07-15',
      timeline: [
        { status: 'Requested', time: '2026-07-15 10:30 AM', done: true },
        { status: 'Approved', time: '2026-07-15 02:15 PM', done: true },
        { status: 'Dispatched', time: '2026-07-16 09:00 AM', done: true },
        { status: 'Completed', time: '2026-07-16 11:45 AM', done: true },
      ],
    },
    {
      id: 'WTH-9901',
      partnerName: 'Ashikur Rahman Ovi',
      amount: '$800.00',
      numericAmount: 800.0,
      paymentMethod: 'bKash Merchant',
      accountNumber: '01581782193',
      status: 'in_progress',
      date: '2026-07-22',
      timeline: [
        { status: 'Requested', time: '2026-07-22 04:20 PM', done: true },
        { status: 'Approved', time: '2026-07-23 09:10 AM', done: true },
        { status: 'Dispatched', time: 'Processing...', done: false },
        { status: 'Completed', time: 'Pending', done: false },
      ],
    },
  ];

  private marketingAssets = [
    {
      id: 'asset-1',
      title: 'JEVXO Quantum Suite Banner (Dark Mode)',
      category: 'Banners',
      type: 'PNG / Vector (4K)',
      size: '12.4 MB',
      downloads: 1420,
      previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop',
      downloadUrl: '#',
    },
    {
      id: 'asset-2',
      title: 'Enterprise AI Automation Flyer 2026',
      category: 'Flyers',
      type: 'PDF Print-Ready',
      size: '24.8 MB',
      downloads: 890,
      previewUrl: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=800&fit=crop',
      downloadUrl: '#',
    },
    {
      id: 'asset-3',
      title: 'JEVXO Autonomous Cloud Demo Video',
      category: 'Videos',
      type: 'MP4 (4K 60fps)',
      size: '185.0 MB',
      downloads: 2310,
      previewUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fit=crop',
      downloadUrl: '#',
    },
  ];

  private parseFee(feeStr: string): number {
    if (!feeStr) return 0;
    return parseFloat(feeStr.replace(/[^0-9.]/g, '')) || 0;
  }

  // --- ADMIN PARTNER MANAGEMENT METHODS ---

  getAllPartners() {
    return {
      statusCode: 200,
      message: 'All registered partners retrieved successfully',
      data: this.partners,
    };
  }

  createPartner(dto: any) {
    const flagsMap: Record<string, string> = {
      Bangladesh: '🇧🇩',
      'United States': '🇺🇸',
      Germany: '🇩🇪',
      Japan: '🇯🇵',
      'United Kingdom': '🇬🇧',
    };

    const newPartner = {
      id: this.partners.length + 1,
      name: dto.name ,
      email: dto.email ,
      password: dto.password ,
      country: dto.country ,
      flag: flagsMap[dto.country] ,
      commissionRate: dto.commissionRate ? `${dto.commissionRate}%` : '20%',
      status: 'active',
      totalSales: 0,
      totalRevenue: '$0.00',
      balance: dto.initialBalance ? `$${dto.initialBalance}` : '$0.00',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    this.partners.unshift(newPartner);
    return {
      statusCode: 201,
      message: `Partner ${newPartner.name} created successfully by Admin`,
      data: newPartner,
    };
  }

  updatePartnerStatus(id: number, status: string) {
    const partner = this.partners.find((p) => p.id === Number(id));
    if (partner) {
      partner.status = status;
    }
    return {
      statusCode: 200,
      message: `Partner status updated to ${status}`,
      data: partner,
    };
  }

  updateWithdrawalStatus(id: string, status: string) {
    const withdrawal = this.withdrawals.find((w) => w.id === id);
    if (withdrawal) {
      withdrawal.status = status;
      if (status === 'completed' && withdrawal.timeline) {
        withdrawal.timeline.forEach((step) => (step.done = true));
      }
    }
    return {
      statusCode: 200,
      message: `Withdrawal ${id} status updated to ${status}`,
      data: withdrawal,
    };
  }

  deletePartner(id: number) {
    this.partners = this.partners.filter((p) => p.id !== Number(id));
    return {
      statusCode: 200,
      message: 'Partner removed successfully',
    };
  }

  // --- PARTNER DASHBOARD METHODS ---

  getDashboardSummary() {
    const activeClientsCount = this.clients.filter((c) => c.status === 'active').length;
    const upcomingRenewalsCount = this.clients.filter((c) => c.status === 'upcoming_renewal').length;
    const expiredClientsCount = this.clients.filter((c) => c.status === 'expired').length;

    const totalMonthlyRevenue = this.clients.reduce((acc, c) => acc + this.parseFee(c.monthlyFee), 0);
    const totalEarnedCommission = totalMonthlyRevenue * 10;
    const completedWithdrawalsSum = this.withdrawals
      .filter((w) => w.status === 'completed')
      .reduce((acc, w) => acc + (w.numericAmount || this.parseFee(w.amount)), 0);
    const pendingWithdrawalsSum = this.withdrawals
      .filter((w) => w.status === 'in_progress')
      .reduce((acc, w) => acc + (w.numericAmount || this.parseFee(w.amount)), 0);

    const availableBalanceNum = Math.max(0, totalEarnedCommission - completedWithdrawalsSum - pendingWithdrawalsSum);

    return {
      statusCode: 200,
      message: 'Partner summary calculated dynamically',
      data: {
        availableBalance: `$${availableBalanceNum.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        totalCommissionEarned: `$${totalEarnedCommission.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        pendingWithdrawals: `$${pendingWithdrawalsSum.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        activeClientsCount,
        upcomingRenewalsCount,
        expiredClientsCount,
        countryGrowthRate: '+34.5%',
        globalRank: '#1 In Region',
      },
    };
  }

  getClients() {
    return {
      statusCode: 200,
      message: 'Partner clients retrieved successfully',
      data: this.clients,
    };
  }

  addClient(dto: any) {
    const newClient = {
      id: this.clients.length + 1,
      name: dto.name || 'New Enterprise Client',
      email: dto.email || 'client@enterprise.com',
      plan: dto.plan || 'SaaS Pro Package',
      status: 'active',
      monthlyFee: dto.monthlyFee || '$850.00',
      renewalDate: '2027-07-24',
      joinedDate: new Date().toISOString().split('T')[0],
      owner: dto.owner || 'Ashikur Rahman Ovi',
      country: dto.country || 'Bangladesh',
    };
    this.clients.unshift(newClient);

    return {
      statusCode: 201,
      message: 'New client registered under your partner ownership',
      data: newClient,
    };
  }

  getCommissions() {
    const summary = this.getDashboardSummary();
    return {
      statusCode: 200,
      message: 'Commission details retrieved successfully',
      data: {
        availableBalance: summary.data.availableBalance,
        totalEarned: summary.data.totalCommissionEarned,
        pendingPayout: summary.data.pendingWithdrawals,
        commissionRate: '20%',
      },
    };
  }

  createWithdrawal(dto: any) {
    const amountNum = parseFloat(dto.amount) || 500;
    const newWithdrawal = {
      id: `WTH-${Math.floor(1000 + Math.random() * 9000)}`,
      partnerName: 'Ashikur Rahman Ovi',
      amount: `$${amountNum.toFixed(2)}`,
      numericAmount: amountNum,
      paymentMethod: dto.paymentMethod || 'Bank Transfer',
      accountNumber: dto.accountNumber || '**** **** 1234',
      status: 'in_progress',
      date: new Date().toISOString().split('T')[0],
      timeline: [
        { status: 'Requested', time: 'Just now', done: true },
        { status: 'Approved', time: 'Under Review', done: false },
        { status: 'Dispatched', time: 'Pending', done: false },
        { status: 'Completed', time: 'Pending', done: false },
      ],
    };
    this.withdrawals.unshift(newWithdrawal);
    return {
      statusCode: 201,
      message: 'Withdrawal request submitted successfully',
      data: newWithdrawal,
    };
  }

  getWithdrawals() {
    return {
      statusCode: 200,
      message: 'Withdrawal requests retrieved successfully',
      data: this.withdrawals,
    };
  }

  getMarketingAssets() {
    return {
      statusCode: 200,
      message: 'Marketing materials retrieved successfully',
      data: this.marketingAssets,
    };
  }

  getCountryStats(countryCode: string) {
    const targetCountry = countryCode || 'Bangladesh';
    const countryClients = this.clients.filter(
      (c) => c.country.toLowerCase() === targetCountry.toLowerCase()
    );
    const countryRevSum = countryClients.reduce((acc, c) => acc + this.parseFee(c.monthlyFee) * 12, 0);

    const flagsMap: Record<string, string> = {
      Bangladesh: '🇧🇩',
      'United States': '🇺🇸',
      Germany: '🇩🇪',
      Japan: '🇯🇵',
      'United Kingdom': '🇬🇧',
    };

    return {
      statusCode: 200,
      message: 'Country analytics calculated dynamically',
      data: {
        country: targetCountry,
        flag: flagsMap[targetCountry] || '🌐',
        activeClients: countryClients.length || 1,
        totalRevenue: `$${(countryRevSum || 38400).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        growthRate: '+34.5%',
        marketShare: '42.8%',
      },
    };
  }

  getLeaderboard() {
    return {
      statusCode: 200,
      message: 'Leaderboard rankings retrieved successfully',
      data: this.partners.map((p, idx) => ({
        rank: idx + 1,
        badge: idx === 0 ? 'Gold Medalist' : idx === 1 ? 'Silver Medalist' : 'Bronze Medalist',
        partnerName: p.name,
        country: p.country,
        flag: p.flag,
        totalSales: p.totalSales,
        totalRevenue: p.totalRevenue,
        commissionEarned: p.balance,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
      })),
    };
  }
}
