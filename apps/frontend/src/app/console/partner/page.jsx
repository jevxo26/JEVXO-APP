"use client";

import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import PrivateRoute from "@/components/auth/PrivateRoute";
import {
  DollarSign,
  Users,
  TrendingUp,
  Award,
  Plus,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Globe,
  ArrowUpRight,
  Sparkles,
  CreditCard,
  Building2,
  FileText,
  Video,
  Image as ImageIcon,
  Trophy,
  Medal,
  ChevronRight,
  Loader2,
  X,
  Search,
  Filter,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  useGetPartnerSummaryQuery,
  useGetPartnerClientsQuery,
  useAddPartnerClientMutation,
  useGetPartnerCommissionsQuery,
  useCreateWithdrawalRequestMutation,
  useGetPartnerWithdrawalsQuery,
  useGetMarketingAssetsQuery,
  useGetCountryStatsQuery,
  useGetLeaderboardQuery,
} from "@/api/partner/partnerApi";

const DEFAULT_CLIENTS = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "contact@acme.com",
    plan: "Enterprise Suite",
    status: "active",
    monthlyFee: "$1,200.00",
    renewalDate: "2026-11-15",
    joinedDate: "2025-01-10",
    owner: "Ashikur Rahman Ovi",
    country: "Bangladesh",
  },
  {
    id: 2,
    name: "Apex Global Tech",
    email: "billing@apexglobal.io",
    plan: "SaaS Pro Package",
    status: "active",
    monthlyFee: "$850.00",
    renewalDate: "2026-08-01",
    joinedDate: "2025-03-20",
    owner: "Ashikur Rahman Ovi",
    country: "Bangladesh",
  },
  {
    id: 3,
    name: "Starlight Logistics",
    email: "ops@starlight.com",
    plan: "Cloud Infra Standard",
    status: "upcoming_renewal",
    monthlyFee: "$650.00",
    renewalDate: "2026-07-30",
    joinedDate: "2024-07-30",
    owner: "Ashikur Rahman Ovi",
    country: "United States",
  },
  {
    id: 4,
    name: "NextGen Financials",
    email: "admin@nextgenfin.com",
    plan: "AI Automation Core",
    status: "expired",
    monthlyFee: "$450.00",
    renewalDate: "2026-06-15",
    joinedDate: "2024-06-15",
    owner: "Ashikur Rahman Ovi",
    country: "United Kingdom",
  },
];

const DEFAULT_WITHDRAWALS = [
  {
    id: "WTH-9842",
    amount: "$1,450.00",
    paymentMethod: "Bank Transfer (DBBL)",
    accountNumber: "**** **** 8921",
    status: "completed",
    date: "2026-07-15",
    timeline: [
      { status: "Requested", time: "2026-07-15 10:30 AM", done: true },
      { status: "Approved", time: "2026-07-15 02:15 PM", done: true },
      { status: "Dispatched", time: "2026-07-16 09:00 AM", done: true },
      { status: "Completed", time: "2026-07-16 11:45 AM", done: true },
    ],
  },
  {
    id: "WTH-9901",
    amount: "$800.00",
    paymentMethod: "bKash Merchant",
    accountNumber: "01581782193",
    status: "in_progress",
    date: "2026-07-22",
    timeline: [
      { status: "Requested", time: "2026-07-22 04:20 PM", done: true },
      { status: "Approved", time: "2026-07-23 09:10 AM", done: true },
      { status: "Dispatched", time: "Processing...", done: false },
      { status: "Completed", time: "Pending", done: false },
    ],
  },
];

const DEFAULT_ASSETS = [
  {
    id: "asset-1",
    title: "JEVXO Quantum Suite Banner (Dark Mode)",
    category: "Banners",
    type: "PNG / Vector (4K)",
    size: "12.4 MB",
    downloads: 1420,
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop",
    downloadUrl: "#",
  },
  {
    id: "asset-2",
    title: "Enterprise AI Automation Flyer 2026",
    category: "Flyers",
    type: "PDF Print-Ready",
    size: "24.8 MB",
    downloads: 890,
    previewUrl: "https://images.unsplash.com/photo-1542744094-3a31b272c490?w=800&fit=crop",
    downloadUrl: "#",
  },
  {
    id: "asset-3",
    title: "JEVXO Autonomous Cloud Demo Video",
    category: "Videos",
    type: "MP4 (4K 60fps)",
    size: "185.0 MB",
    downloads: 2310,
    previewUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fit=crop",
    downloadUrl: "#",
  },
];

const DEFAULT_LEADERBOARD = [
  {
    rank: 1,
    badge: "Gold Medalist",
    partnerName: "Ashikur Rahman Ovi",
    country: "Bangladesh",
    flag: "🇧🇩",
    totalSales: 142,
    totalRevenue: "$148,500.00",
    commissionEarned: "$29,700.00",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  },
  {
    rank: 2,
    badge: "Silver Medalist",
    partnerName: "Marcus Reid",
    country: "United States",
    flag: "🇺🇸",
    totalSales: 118,
    totalRevenue: "$124,000.00",
    commissionEarned: "$24,800.00",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    rank: 3,
    badge: "Bronze Medalist",
    partnerName: "Elena Rostova",
    country: "Germany",
    flag: "🇩🇪",
    totalSales: 94,
    totalRevenue: "$98,200.00",
    commissionEarned: "$19,640.00",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    rank: 4,
    badge: "Top Performer",
    partnerName: "Kenji Takahashi",
    country: "Japan",
    flag: "🇯🇵",
    totalSales: 82,
    totalRevenue: "$85,400.00",
    commissionEarned: "$17,080.00",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
];

export default function PartnerPanelPage() {
  const [selectedCountry, setSelectedCountry] = useState("Bangladesh");
  const [activeTab, setActiveTab] = useState("clients"); // clients | commissions | marketing | country | leaderboard
  const [clientFilter, setClientFilter] = useState("all"); // all | active | upcoming_renewal | expired
  const [assetFilter, setAssetFilter] = useState("all"); // all | Banners | Flyers | Videos
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  // Form states
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    plan: "SaaS Pro Package",
    monthlyFee: "$850.00",
    country: "Bangladesh",
  });

  const [withdrawForm, setWithdrawForm] = useState({
    amount: "",
    paymentMethod: "Bank Transfer (DBBL)",
    accountNumber: "",
  });

  // Queries
  const { data: summaryResp, isLoading: isSummaryLoading } = useGetPartnerSummaryQuery();
  const { data: clientsResp, isLoading: isClientsLoading } = useGetPartnerClientsQuery();
  const { data: commissionsResp } = useGetPartnerCommissionsQuery();
  const { data: withdrawalsResp } = useGetPartnerWithdrawalsQuery();
  const { data: assetsResp } = useGetMarketingAssetsQuery();
  const { data: countryResp } = useGetCountryStatsQuery(selectedCountry);
  const { data: leaderboardResp } = useGetLeaderboardQuery();

  // Mutations
  const [addClientMutation, { isLoading: isAddClientLoading }] = useAddPartnerClientMutation();
  const [createWithdrawalMutation, { isLoading: isWithdrawLoading }] = useCreateWithdrawalRequestMutation();

  const clientsList = (clientsResp?.data && clientsResp.data.length > 0) ? clientsResp.data : DEFAULT_CLIENTS;
  const withdrawalsList = (withdrawalsResp?.data && withdrawalsResp.data.length > 0) ? withdrawalsResp.data : DEFAULT_WITHDRAWALS;
  const marketingAssets = (assetsResp?.data && assetsResp.data.length > 0) ? assetsResp.data : DEFAULT_ASSETS;
  const countryStats = countryResp?.data || { country: selectedCountry, flag: '🇧🇩', activeClients: 14, totalRevenue: '$38,400.00', growthRate: '+34.5%', marketShare: '42.8%' };
  const leaderboardList = (leaderboardResp?.data && leaderboardResp.data.length > 0) ? leaderboardResp.data : DEFAULT_LEADERBOARD;

  // Filter clients
  const filteredClients = clientsList.filter((client) => {
    if (clientFilter === "active") return client.status === "active";
    if (clientFilter === "upcoming_renewal") return client.status === "upcoming_renewal";
    if (clientFilter === "expired") return client.status === "expired";
    return true;
  });

  // Filter assets
  const filteredAssets = marketingAssets.filter((asset) => {
    if (assetFilter !== "all") return asset.category === assetFilter;
    return true;
  });

  // Add Client Submit
  const handleAddClientSubmit = async (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.email) {
      toast.error("Please fill in client name and email");
      return;
    }

    try {
      await addClientMutation(newClient).unwrap();
      toast.success(`Client ${newClient.name} successfully registered under your ownership!`);
      setIsAddClientModalOpen(false);
      setNewClient({
        name: "",
        email: "",
        plan: "SaaS Pro Package",
        monthlyFee: "$850.00",
        country: selectedCountry,
      });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to register client");
    }
  };

  // Withdraw Submit
  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    if (!withdrawForm.amount || !withdrawForm.accountNumber) {
      toast.error("Please fill in withdrawal amount and account details");
      return;
    }

    try {
      await createWithdrawalMutation(withdrawForm).unwrap();
      toast.success(`Withdrawal request of $${withdrawForm.amount} submitted successfully!`);
      setIsWithdrawModalOpen(false);
      setWithdrawForm({
        amount: "",
        paymentMethod: "Bank Transfer (DBBL)",
        accountNumber: "",
      });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit withdrawal request");
    }
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-6 md:px-8 md:py-8 text-white min-h-screen space-y-8 max-w-[1600px] mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFFC76]/10 border border-[#EFFC76]/30 text-[11px] font-mono font-bold text-[#EFFC76] mb-2 uppercase tracking-wider">
                <Sparkles size={13} />
                <span>Partner Ecosystem Suite</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                Partner Command Center
              </h1>
              <p className="text-xs md:text-sm text-gray-400 font-mono mt-1">
                Track active clients, commission payouts, marketing materials & global rankings.
              </p>
            </div>

            {/* Country Selector & Primary Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Country Selector Dropdown */}
              <div className="flex items-center gap-2 bg-[#0a180a] border border-[#EFFC76]/40 rounded-2xl px-3.5 py-2 text-xs font-mono">
                <Globe size={16} className="text-[#EFFC76]" />
                <span className="text-gray-400">Country:</span>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="bg-transparent text-[#EFFC76] font-bold outline-none cursor-pointer"
                >
                  <option value="Bangladesh" className="bg-[#051405] text-white">🇧🇩 Bangladesh</option>
                  <option value="United States" className="bg-[#051405] text-white">🇺🇸 United States</option>
                  <option value="Germany" className="bg-[#051405] text-white">🇩🇪 Germany</option>
                  <option value="Japan" className="bg-[#051405] text-white">🇯🇵 Japan</option>
                  <option value="United Kingdom" className="bg-[#051405] text-white">🇬🇧 United Kingdom</option>
                </select>
              </div>

              {/* Add Client Button */}
              <button
                onClick={() => setIsAddClientModalOpen(true)}
                className="bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-mono font-black text-xs px-5 py-2.5 rounded-2xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(239,252,118,0.4)] cursor-pointer"
              >
                <Plus size={16} className="stroke-[3]" />
                <span>Register Client</span>
              </button>
            </div>
          </div>

          {/* KPI CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Available Balance */}
            <div className="bg-[#051405]/90 border border-[#EFFC76]/40 hover:border-[#EFFC76] p-6 rounded-3xl backdrop-blur-xl shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-mono font-semibold text-gray-400">Available Balance</span>
                <div className="p-2 rounded-xl bg-[#EFFC76]/15 text-[#EFFC76] group-hover:scale-110 transition-transform">
                  <DollarSign size={20} />
                </div>
              </div>
              <div className="text-3xl font-mono font-black text-white mb-2">
                {summary.availableBalance || "$4,250.00"}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ArrowUpRight size={14} /> +$800 Pending
                </span>
                <button
                  onClick={() => {
                    setActiveTab("commissions");
                    setIsWithdrawModalOpen(true);
                  }}
                  className="text-[#EFFC76] hover:underline font-bold"
                >
                  Withdraw →
                </button>
              </div>
            </div>

            {/* Card 2: Active Clients */}
            <div className="bg-[#051405]/90 border border-white/15 hover:border-[#EFFC76]/60 p-6 rounded-3xl backdrop-blur-xl shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-mono font-semibold text-gray-400">Active Clients</span>
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 group-hover:scale-110 transition-transform">
                  <Users size={20} />
                </div>
              </div>
              <div className="text-3xl font-mono font-black text-white mb-2">
                {summary.activeClientsCount ?? 2} Clients
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-gray-400 pt-2 border-t border-white/10">
                <span className="text-emerald-400 font-bold">Owner Under:</span> Ashikur Rahman Ovi
              </div>
            </div>

            {/* Card 3: Country Growth Rate */}
            <div className="bg-[#051405]/90 border border-white/15 hover:border-[#EFFC76]/60 p-6 rounded-3xl backdrop-blur-xl shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-mono font-semibold text-gray-400">Country Growth Rate</span>
                <div className="p-2 rounded-xl bg-[#EFFC76]/15 text-[#EFFC76] group-hover:scale-110 transition-transform">
                  <TrendingUp size={20} />
                </div>
              </div>
              <div className="text-3xl font-mono font-black text-white mb-2">
                {summary.countryGrowthRate || "+34.5%"}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400 pt-2 border-t border-white/10">
                <span>Region: <strong className="text-white">{selectedCountry}</strong></span>
              </div>
            </div>

            {/* Card 4: Global Leaderboard Rank */}
            <div className="bg-[#051405]/90 border border-[#EFFC76]/40 hover:border-[#EFFC76] p-6 rounded-3xl backdrop-blur-xl shadow-xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#EFFC76]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-mono font-semibold text-gray-400">Leaderboard Rank</span>
                <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 group-hover:scale-110 transition-transform">
                  <Trophy size={20} />
                </div>
              </div>
              <div className="text-3xl font-mono font-black text-amber-300 mb-2 flex items-center gap-2">
                <span>#1 Gold</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-200">
                  Top Partner
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-2 border-t border-white/10">
                <span>Total Revenue: <strong className="text-white">$148.5K</strong></span>
              </div>
            </div>
          </div>

          {/* MAIN TABBED NAVIGATION BAR */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
            {[
              { id: "clients", label: "Client Tracking", icon: Users },
              { id: "commissions", label: "Commission & Withdrawals", icon: DollarSign },
              { id: "marketing", label: "Marketing Materials", icon: Download },
              { id: "country", label: "Country Dashboard", icon: Globe },
              { id: "leaderboard", label: "Leaderboard Ranks", icon: Trophy },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 rounded-2xl text-xs font-mono font-bold flex items-center gap-2.5 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#EFFC76] text-black shadow-[0_0_20px_rgba(239,252,118,0.5)] scale-105"
                      : "bg-[#051405] text-gray-300 border border-white/10 hover:border-[#EFFC76]/50 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: CLIENT TRACKING (Active, Renewals, Expired) */}
          {activeTab === "clients" && (
            <div className="space-y-6">
              {/* Filter Sub-Tabs */}
              <div className="flex items-center justify-between flex-wrap gap-4 bg-[#051405]/80 p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-[#EFFC76]" />
                  <span className="text-xs font-mono font-bold text-gray-400">Filter Status:</span>
                  {[
                    { id: "all", label: "All Clients" },
                    { id: "active", label: "Active List" },
                    { id: "upcoming_renewal", label: "Renewals Upcoming" },
                    { id: "expired", label: "Expired Clients" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setClientFilter(filter.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                        clientFilter === filter.id
                          ? "bg-[#EFFC76]/20 border border-[#EFFC76] text-[#EFFC76]"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <div className="text-xs font-mono text-gray-400">
                  Showing <strong className="text-white">{filteredClients.length}</strong> clients under your owner account
                </div>
              </div>

              {/* Client List Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredClients.map((client) => {
                  const isActive = client.status === "active";
                  const isUpcoming = client.status === "upcoming_renewal";
                  const isExpired = client.status === "expired";

                  return (
                    <div
                      key={client.id}
                      className="bg-[#051405] border border-white/15 hover:border-[#EFFC76]/60 p-6 rounded-3xl space-y-4 backdrop-blur-xl shadow-lg relative group transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-bold text-white group-hover:text-[#EFFC76] transition-colors">
                            {client.name}
                          </h3>
                          <p className="text-xs text-gray-400 font-mono">{client.email}</p>
                        </div>
                        {/* Status Badge */}
                        {isActive && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400">
                            <CheckCircle2 size={12} /> Active
                          </span>
                        )}
                        {isUpcoming && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-300">
                            <AlertTriangle size={12} /> Renewal Soon
                          </span>
                        )}
                        {isExpired && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-[10px] font-mono font-bold text-red-400">
                            <XCircle size={12} /> Expired
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono">
                        <div className="flex justify-between text-gray-400">
                          <span>Package Plan:</span>
                          <strong className="text-white">{client.plan}</strong>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Monthly Fee:</span>
                          <strong className="text-[#EFFC76] font-bold">{client.monthlyFee}</strong>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Renewal Date:</span>
                          <strong className="text-white">{client.renewalDate}</strong>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Owner Under:</span>
                          <strong className="text-emerald-400">{client.owner}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: COMMISSION & WITHDRAWALS */}
          {activeTab === "commissions" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Form: Create Withdrawal */}
              <div className="lg:col-span-5 bg-[#051405] border border-[#EFFC76]/40 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <CreditCard className="text-[#EFFC76]" size={20} />
                    <span>Request Payout</span>
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-1">
                    Withdraw available commission funds to your bank or mobile wallet.
                  </p>
                </div>

                <form onSubmit={handleWithdrawSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1.5">
                      Withdrawal Amount ($USD)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      value={withdrawForm.amount}
                      onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                      className="w-full px-4 py-3 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1.5">
                      Payment Gateway Method
                    </label>
                    <select
                      value={withdrawForm.paymentMethod}
                      onChange={(e) => setWithdrawForm({ ...withdrawForm, paymentMethod: e.target.value })}
                      className="w-full px-4 py-3 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none cursor-pointer"
                    >
                      <option value="Bank Transfer (DBBL)" className="bg-[#051405]">Bank Transfer (DBBL / City Bank)</option>
                      <option value="bKash Merchant" className="bg-[#051405]">bKash Merchant Direct</option>
                      <option value="Payoneer Global" className="bg-[#051405]">Payoneer Global Wallet</option>
                      <option value="Crypto USDT (TRC20)" className="bg-[#051405]">Crypto USDT (TRC20)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1.5">
                      Account / Wallet Number
                    </label>
                    <input
                      type="text"
                      placeholder="Account number or wallet address"
                      value={withdrawForm.accountNumber}
                      onChange={(e) => setWithdrawForm({ ...withdrawForm, accountNumber: e.target.value })}
                      className="w-full px-4 py-3 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isWithdrawLoading}
                    className="w-full bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-black py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(239,252,118,0.5)] cursor-pointer"
                  >
                    {isWithdrawLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span>Submit Withdrawal Request</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right History & Status Timeline */}
              <div className="lg:col-span-7 bg-[#051405] border border-white/15 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Clock className="text-[#EFFC76]" size={20} />
                  <span>Withdrawal History & Status Timeline</span>
                </h3>

                <div className="space-y-6">
                  {withdrawalsList.map((item) => (
                    <div key={item.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#EFFC76]">{item.id}</span>
                          <h4 className="text-lg font-mono font-black text-white">{item.amount}</h4>
                          <p className="text-xs text-gray-400 font-mono">{item.paymentMethod} • {item.accountNumber}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                          item.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      {/* Timeline Steps */}
                      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10">
                        {item.timeline?.map((step, idx) => (
                          <div key={idx} className="flex flex-col items-center text-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 ${
                              step.done
                                ? "bg-emerald-400 text-black shadow-[0_0_10px_#34d399]"
                                : "bg-white/10 text-gray-500"
                            }`}>
                              {step.done ? "✓" : idx + 1}
                            </div>
                            <span className="text-[10px] font-mono font-bold text-gray-300">{step.status}</span>
                            <span className="text-[8px] font-mono text-gray-500">{step.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MARKETING MATERIALS */}
          {activeTab === "marketing" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-4 bg-[#051405]/80 p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-[#EFFC76]" />
                  <span className="text-xs font-mono font-bold text-gray-400">Category Filter:</span>
                  {["all", "Banners", "Flyers", "Videos"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setAssetFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                        assetFilter === cat
                          ? "bg-[#EFFC76]/20 border border-[#EFFC76] text-[#EFFC76]"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asset Download Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="bg-[#051405] border border-white/15 hover:border-[#EFFC76]/60 rounded-3xl overflow-hidden shadow-xl group transition-all"
                  >
                    <div className="h-44 w-full relative overflow-hidden bg-black">
                      <img
                        src={asset.previewUrl}
                        alt={asset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      />
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#EFFC76]/40 text-[10px] font-mono font-bold text-[#EFFC76]">
                        {asset.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-4">
                      <h4 className="text-base font-bold text-white group-hover:text-[#EFFC76] transition-colors">
                        {asset.title}
                      </h4>
                      <div className="flex justify-between items-center text-xs font-mono text-gray-400 pt-2 border-t border-white/10">
                        <span>Type: <strong className="text-white">{asset.type}</strong></span>
                        <span>Size: <strong className="text-white">{asset.size}</strong></span>
                      </div>
                      <a
                        href={asset.downloadUrl}
                        onClick={(e) => {
                          e.preventDefault();
                          toast.success(`Downloading ${asset.title}...`);
                        }}
                        className="w-full bg-[#EFFC76]/15 hover:bg-[#EFFC76] border border-[#EFFC76]/50 hover:border-[#EFFC76] text-[#EFFC76] hover:text-black font-mono font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Download size={16} />
                        <span>Download Asset Package</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: COUNTRY DASHBOARD */}
          {activeTab === "country" && (
            <div className="space-y-6">
              <div className="bg-[#051405] border border-[#EFFC76]/40 p-8 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-6">
                  <div>
                    <h3 className="text-2xl font-black text-white flex items-center gap-2">
                      <span>{countryStats.flag}</span>
                      <span>{selectedCountry} Regional Metrics</span>
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      Detailed revenue, active clients, and market share for your selected country.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-xs font-mono text-gray-400">Total Country Revenue</span>
                    <h4 className="text-3xl font-mono font-black text-[#EFFC76]">{countryStats.totalRevenue}</h4>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-xs font-mono text-gray-400">Active Regional Clients</span>
                    <h4 className="text-3xl font-mono font-black text-emerald-400">{countryStats.activeClients} Clients</h4>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <span className="text-xs font-mono text-gray-400">Market Share Index</span>
                    <h4 className="text-3xl font-mono font-black text-amber-300">{countryStats.marketShare}</h4>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GAMIFIED LEADERBOARD */}
          {activeTab === "leaderboard" && (
            <div className="space-y-6">
              <div className="bg-[#051405] border border-[#EFFC76]/40 p-8 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-6">
                  <div>
                    <h3 className="text-2xl font-black text-white flex items-center gap-2">
                      <Trophy className="text-amber-300" size={24} />
                      <span>Top Partners Global Leaderboard</span>
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      Gamified rankings based on total sales, monthly revenue, and commission performance.
                    </p>
                  </div>
                </div>

                {/* Leaderboard List Cards */}
                <div className="space-y-4">
                  {leaderboardList.map((partner) => (
                    <div
                      key={partner.rank}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border transition-all gap-4 ${
                        partner.rank === 1
                          ? "bg-gradient-to-r from-amber-500/20 via-[#051405] to-[#051405] border-amber-400/60 shadow-[0_0_25px_rgba(251,191,36,0.2)]"
                          : "bg-white/5 border-white/10 hover:border-white/25"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Rank Badge */}
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-black text-lg ${
                          partner.rank === 1
                            ? "bg-amber-400 text-black shadow-lg"
                            : partner.rank === 2
                            ? "bg-slate-300 text-black"
                            : partner.rank === 3
                            ? "bg-amber-700 text-white"
                            : "bg-white/10 text-gray-300"
                        }`}>
                          #{partner.rank}
                        </div>

                        <img
                          src={partner.avatar}
                          alt={partner.partnerName}
                          className="w-12 h-12 rounded-full object-cover border border-[#EFFC76]/50"
                        />

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-white">{partner.partnerName}</h4>
                            <span className="text-xs">{partner.flag}</span>
                          </div>
                          <span className="text-xs font-mono text-amber-300 font-semibold">{partner.badge}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 font-mono text-xs">
                        <div>
                          <span className="block text-gray-400 text-[10px]">TOTAL SALES</span>
                          <strong className="text-white text-sm">{partner.totalSales} Deals</strong>
                        </div>
                        <div>
                          <span className="block text-gray-400 text-[10px]">TOTAL REVENUE</span>
                          <strong className="text-[#EFFC76] text-sm">{partner.totalRevenue}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ADD CLIENT MODAL */}
          <AnimatePresence>
            {isAddClientModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-md bg-[#051405] border border-[#EFFC76]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative"
                >
                  <button
                    onClick={() => setIsAddClientModalOpen(false)}
                    className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
                  >
                    <X size={18} />
                  </button>

                  <div>
                    <h3 className="text-xl font-black text-white">Register New Client</h3>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      Add a client under your partner ownership.
                    </p>
                  </div>

                  <form onSubmit={handleAddClientSubmit} className="space-y-4 font-mono text-xs">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1.5">Client Company Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Global Ltd"
                        value={newClient.name}
                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-1.5">Corporate Email</label>
                      <input
                        type="email"
                        placeholder="contact@company.com"
                        value={newClient.email}
                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-1.5">Package Plan</label>
                      <select
                        value={newClient.plan}
                        onChange={(e) => setNewClient({ ...newClient, plan: e.target.value })}
                        className="w-full px-4 py-3 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none cursor-pointer"
                      >
                        <option value="SaaS Pro Package" className="bg-[#051405]">SaaS Pro Package ($850/mo)</option>
                        <option value="Enterprise Suite" className="bg-[#051405]">Enterprise Suite ($1,200/mo)</option>
                        <option value="Cloud Infra Standard" className="bg-[#051405]">Cloud Infra Standard ($650/mo)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isAddClientLoading}
                      className="w-full bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-black py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(239,252,118,0.5)] cursor-pointer"
                    >
                      {isAddClientLoading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <span>Save & Register Client</span>
                      )}
                    </button>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
