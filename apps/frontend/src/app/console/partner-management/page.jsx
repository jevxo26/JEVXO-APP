"use client";

import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import PrivateRoute from "@/components/auth/PrivateRoute";
import {
  Users,
  Plus,
  Search,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Globe,
  Loader2,
  X,
  Filter,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  useGetAllPartnersQuery,
  useCreatePartnerMutation,
  useUpdatePartnerStatusMutation,
  useUpdateWithdrawalStatusMutation,
  useDeletePartnerMutation,
  useGetPartnerWithdrawalsQuery,
} from "@/api/partner/partnerApi";

export default function PartnerManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPartnerModalOpen, setIsAddPartnerModalOpen] = useState(false);

  // New Partner Form State
  const [newPartner, setNewPartner] = useState({
    name: "",
    email: "",
    country: "Bangladesh",
    commissionRate: "20",
    initialBalance: "0",
  });

  // Queries & Mutations
  const { data: partnersResp, isLoading: isPartnersLoading } = useGetAllPartnersQuery();
  const { data: withdrawalsResp } = useGetPartnerWithdrawalsQuery();

  const [createPartner, { isLoading: isCreating }] = useCreatePartnerMutation();
  const [updatePartnerStatus] = useUpdatePartnerStatusMutation();
  const [updateWithdrawalStatus] = useUpdateWithdrawalStatusMutation();
  const [deletePartner] = useDeletePartnerMutation();

  const partnersList = partnersResp?.data || [];
  const withdrawalsList = withdrawalsResp?.data || [];

  // Filter partners
  const filteredPartners = partnersList.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Add Partner Submit
  const handleAddPartnerSubmit = async (e) => {
    e.preventDefault();
    if (!newPartner.name || !newPartner.email) {
      toast.error("Please provide partner name and email address");
      return;
    }

    try {
      await createPartner(newPartner).unwrap();
      toast.success(`Partner ${newPartner.name} created successfully!`);
      setIsAddPartnerModalOpen(false);
      setNewPartner({
        name: "",
        email: "",
        country: "Bangladesh",
        commissionRate: "20",
        initialBalance: "0",
      });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create partner");
    }
  };

  // Toggle Partner Status
  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "active" ? "suspended" : "active";
    try {
      await updatePartnerStatus({ id, status: nextStatus }).unwrap();
      toast.success(`Partner status updated to ${nextStatus.toUpperCase()}`);
    } catch (error) {
      toast.error("Failed to update partner status");
    }
  };

  // Approve / Reject Withdrawal
  const handleWithdrawalAction = async (id, status) => {
    try {
      await updateWithdrawalStatus({ id, status }).unwrap();
      toast.success(`Withdrawal ${id} marked as ${status.toUpperCase()}!`);
    } catch (error) {
      toast.error("Failed to update withdrawal status");
    }
  };

  // Delete Partner
  const handleDeletePartner = async (id, name) => {
    if (confirm(`Are you sure you want to remove partner ${name}?`)) {
      try {
        await deletePartner(id).unwrap();
        toast.success(`Partner ${name} removed`);
      } catch (error) {
        toast.error("Failed to delete partner");
      }
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
                <ShieldCheck size={13} />
                <span>Admin Governance Panel</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                Partner Network Management
              </h1>
              <p className="text-xs md:text-sm text-gray-400 font-mono mt-1">
                Manually add partners, adjust commission rates, approve payout withdrawals & monitor global performance.
              </p>
            </div>

            <button
              onClick={() => setIsAddPartnerModalOpen(true)}
              className="bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-mono font-black text-xs px-5 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(239,252,118,0.4)] cursor-pointer self-start md:self-auto"
            >
              <Plus size={18} className="stroke-[3]" />
              <span>+ Manually Add Partner</span>
            </button>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-[#051405] border border-[#EFFC76]/40 p-6 rounded-3xl backdrop-blur-xl">
              <span className="text-xs font-mono text-gray-400">Total Registered Partners</span>
              <div className="text-3xl font-mono font-black text-white mt-1">{partnersList.length} Partners</div>
            </div>

            <div className="bg-[#051405] border border-white/15 p-6 rounded-3xl backdrop-blur-xl">
              <span className="text-xs font-mono text-gray-400">Pending Withdrawal Approvals</span>
              <div className="text-3xl font-mono font-black text-amber-300 mt-1">
                {withdrawalsList.filter((w) => w.status === "in_progress").length} Payouts
              </div>
            </div>

            <div className="bg-[#051405] border border-white/15 p-6 rounded-3xl backdrop-blur-xl">
              <span className="text-xs font-mono text-gray-400">Global Partner Network</span>
              <div className="text-3xl font-mono font-black text-emerald-400 mt-1">5 Regions</div>
            </div>
          </div>

          {/* SECTION 1: PARTNERS DIRECTORY & MANAGEMENT TABLE */}
          <div className="bg-[#051405] border border-white/15 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Users className="text-[#EFFC76]" size={20} />
                <span>Partner Directory</span>
              </h3>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search partner by name or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Partner Name</th>
                    <th className="py-3 px-4">Country</th>
                    <th className="py-3 px-4">Commission %</th>
                    <th className="py-3 px-4">Total Sales</th>
                    <th className="py-3 px-4">Balance</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  {filteredPartners.map((partner) => (
                    <tr key={partner.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#EFFC76]/15 border border-[#EFFC76]/30 text-[#EFFC76] flex items-center justify-center font-bold">
                          {partner.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-white">{partner.name}</div>
                          <div className="text-[10px] text-gray-400">{partner.email}</div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-gray-300">
                        <span className="mr-1.5">{partner.flag || "🇧🇩"}</span>
                        <span>{partner.country}</span>
                      </td>

                      <td className="py-4 px-4 text-[#EFFC76] font-bold">
                        {partner.commissionRate}
                      </td>

                      <td className="py-4 px-4 text-white">
                        <div>{partner.totalSales} Deals</div>
                        <div className="text-[10px] text-gray-400">{partner.totalRevenue}</div>
                      </td>

                      <td className="py-4 px-4 text-emerald-400 font-bold">
                        {partner.balance}
                      </td>

                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          partner.status === "active"
                            ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                            : "bg-red-500/15 border border-red-500/30 text-red-400"
                        }`}>
                          {partner.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleToggleStatus(partner.id, partner.status)}
                          className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 transition-all"
                        >
                          {partner.status === "active" ? "Suspend" : "Activate"}
                        </button>

                        <button
                          onClick={() => handleDeletePartner(partner.id, partner.name)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all inline-flex items-center"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 2: PENDING WITHDRAWAL APPROVALS */}
          <div className="bg-[#051405] border border-amber-400/40 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Clock className="text-amber-300" size={20} />
              <span>Partner Payout Withdrawal Requests (Admin Approval)</span>
            </h3>

            <div className="space-y-4">
              {withdrawalsList.map((item) => (
                <div key={item.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#EFFC76]">{item.id}</span>
                      <span className="text-xs text-gray-400">• Partner: <strong className="text-white">{item.partnerName || "Ashikur Rahman Ovi"}</strong></span>
                    </div>
                    <div className="text-xl font-mono font-black text-white mt-1">{item.amount}</div>
                    <div className="text-xs text-gray-400 font-mono">{item.paymentMethod} • {item.accountNumber}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.status === "completed" ? (
                      <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold">
                        ✓ Approved & Dispatched
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleWithdrawalAction(item.id, "completed")}
                          className="bg-emerald-400 hover:bg-emerald-300 text-black font-mono font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md"
                        >
                          Approve Payout
                        </button>
                        <button
                          onClick={() => handleWithdrawalAction(item.id, "rejected")}
                          className="bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/40 font-mono font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ADD PARTNER MODAL */}
          <AnimatePresence>
            {isAddPartnerModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full max-w-md bg-[#051405] border border-[#EFFC76]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative"
                >
                  <button
                    onClick={() => setIsAddPartnerModalOpen(false)}
                    className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
                  >
                    <X size={18} />
                  </button>

                  <div>
                    <h3 className="text-xl font-black text-white">Create New Partner</h3>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      Manually add a partner to the global network.
                    </p>
                  </div>

                  <form onSubmit={handleAddPartnerSubmit} className="space-y-4 font-mono text-xs">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1.5">Partner Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Tanvir Ahmed"
                        value={newPartner.name}
                        onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-1.5">Email Address</label>
                      <input
                        type="email"
                        placeholder="partner@company.com"
                        value={newPartner.email}
                        onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-1.5">Country</label>
                      <select
                        value={newPartner.country}
                        onChange={(e) => setNewPartner({ ...newPartner, country: e.target.value })}
                        className="w-full px-4 py-3 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Bangladesh" className="bg-[#051405]">🇧🇩 Bangladesh</option>
                        <option value="United States" className="bg-[#051405]">🇺🇸 United States</option>
                        <option value="Germany" className="bg-[#051405]">🇩🇪 Germany</option>
                        <option value="Japan" className="bg-[#051405]">🇯🇵 Japan</option>
                        <option value="United Kingdom" className="bg-[#051405]">🇬🇧 United Kingdom</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-1.5">Commission Rate (%)</label>
                      <input
                        type="number"
                        placeholder="20"
                        value={newPartner.commissionRate}
                        onChange={(e) => setNewPartner({ ...newPartner, commissionRate: e.target.value })}
                        className="w-full px-4 py-3 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isCreating}
                      className="w-full bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-black py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(239,252,118,0.5)] cursor-pointer"
                    >
                      {isCreating ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <span>Create & Authorize Partner</span>
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
