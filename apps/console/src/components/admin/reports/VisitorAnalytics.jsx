"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Eye,
  Clock,
  Package,
  Wrench,
  Search,
  TrendingUp,
  Calendar
} from "lucide-react";
import { MOCK_VISITORS, getVisitorStats } from "@/data/visitorData";
import { format } from "date-fns";

export default function VisitorAnalytics() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const stats = getVisitorStats();

  // Filter visitors based on search
  const filteredVisitors = MOCK_VISITORS.filter(visitor =>
    visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (visitor) => {
    router.push(`/admin/reports/visitors/${visitor.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#EFFC76]/20 to-transparent blur-xl" />
            <TrendingUp className="w-7 h-7 text-[#EFFC76] relative z-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Visitor Analytics</h2>
            <p className="text-sm text-white/60">Track visitor activity and engagement</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="glass-panel rounded-xl p-5 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-white/60">Total</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{stats.totalVisitors}</div>
          <div className="text-xs text-white/70">Unique Visitors</div>
        </div>

        <div className="glass-panel rounded-xl p-5 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-5 h-5 text-green-400" />
            <span className="text-xs text-white/60">Views</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{stats.totalPageViews}</div>
          <div className="text-xs text-white/70">Total Page Views</div>
        </div>

        <div className="glass-panel rounded-xl p-5 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-white/60">Duration</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{stats.avgDuration}</div>
          <div className="text-xs text-white/70">Avg. Session</div>
        </div>

        <div className="glass-panel rounded-xl p-5 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-5 h-5 text-amber-400" />
            <span className="text-xs text-white/60">Products</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{stats.productViews}</div>
          <div className="text-xs text-white/70">Product Views</div>
        </div>

        <div className="glass-panel rounded-xl p-5 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <Wrench className="w-5 h-5 text-indigo-400" />
            <span className="text-xs text-white/60">Services</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{stats.serviceViews}</div>
          <div className="text-xs text-white/70">Service Views</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-panel rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-10 bg-black/40 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
            />
          </div>
          <Button
            variant="outline"
            className="glass-button border border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Visitor Table */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gradient-to-r from-black/60 via-black/40 to-black/60 backdrop-blur-xl border-b border-white/10">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-white/90 font-bold">Visitor</TableHead>
                <TableHead className="text-white/90 font-bold">Contact</TableHead>
                <TableHead className="text-white/90 font-bold text-center">Visits</TableHead>
                <TableHead className="text-white/90 font-bold text-center">Page Views</TableHead>
                <TableHead className="text-white/90 font-bold">Last Visit</TableHead>
                <TableHead className="text-white/90 font-bold text-center">Avg. Duration</TableHead>
                <TableHead className="text-white/90 font-bold text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVisitors.map((visitor) => (
                <TableRow
                  key={visitor.id}
                  className="hover:bg-white/5 transition-all duration-300 border-b border-white/5 group"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-white/20 group-hover:border-[#EFFC76]/40 transition-all">
                        <AvatarImage src={visitor.avatar} alt={visitor.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#EFFC76]/20 to-[#EFFC76]/10 text-[#EFFC76] font-bold">
                          {visitor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-white group-hover:text-[#EFFC76] transition-colors">
                          {visitor.name}
                        </div>
                        <div className="text-xs text-white/60">ID: {visitor.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-white/80">{visitor.email}</div>
                    <div className="text-xs text-white/60">{visitor.phone}</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold">
                      {visitor.totalVisits}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-semibold">
                      {visitor.totalPageViews}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-white/80">
                      {format(new Date(visitor.lastVisit), 'MMM d, yyyy')}
                    </div>
                    <div className="text-xs text-white/60">
                      {format(new Date(visitor.lastVisit), 'h:mm a')}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm text-white/80 font-medium">{visitor.avgSessionDuration}</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      onClick={() => handleViewDetails(visitor)}
                      className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredVisitors.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/60">No visitors found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
