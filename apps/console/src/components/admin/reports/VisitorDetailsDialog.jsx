"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Eye,
  TrendingUp,
  Package,
  Wrench
} from "lucide-react";
import { format } from "date-fns";

export default function VisitorDetailsDialog({ open, onOpenChange, visitor }) {
  if (!visitor) return null;

  // Group visits by type
  const productVisits = visitor.visitHistory.filter(v => v.pageType === 'product');
  const serviceVisits = visitor.visitHistory.filter(v => v.pageType === 'service');
  const otherVisits = visitor.visitHistory.filter(v => !['product', 'service'].includes(v.pageType));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl glass-card border-white/20 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-white">
            <User className="w-5 h-5 text-[#EFFC76]" />
            Visitor Details
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Complete activity history and engagement metrics
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Visitor Profile */}
          <div className="glass-panel rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20 border-2 border-[#EFFC76]/40">
                <AvatarImage src={visitor.avatar} alt={visitor.name} />
                <AvatarFallback className="bg-gradient-to-br from-[#EFFC76]/20 to-[#EFFC76]/10 text-[#EFFC76] text-xl font-bold">
                  {visitor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">{visitor.name}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-[#EFFC76]" />
                    <span className="text-white/80">{visitor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-[#EFFC76]" />
                    <span className="text-white/80">{visitor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-[#EFFC76]" />
                    <span className="text-white/60">First Visit:</span>
                    <span className="text-white/80">
                      {format(new Date(visitor.firstVisit), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[#EFFC76]" />
                    <span className="text-white/60">Last Visit:</span>
                    <span className="text-white/80">
                      {format(new Date(visitor.lastVisit), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-panel rounded-lg p-4 text-center">
              <Eye className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{visitor.totalVisits}</div>
              <div className="text-xs text-white/60">Total Visits</div>
            </div>
            <div className="glass-panel rounded-lg p-4 text-center">
              <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{visitor.totalPageViews}</div>
              <div className="text-xs text-white/60">Page Views</div>
            </div>
            <div className="glass-panel rounded-lg p-4 text-center">
              <Clock className="w-5 h-5 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{visitor.avgSessionDuration}</div>
              <div className="text-xs text-white/60">Avg. Duration</div>
            </div>
          </div>

          {/* Product Views */}
          {productVisits.length > 0 && (
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-[#EFFC76]" />
                <h4 className="font-semibold text-white">Product Views ({productVisits.length})</h4>
              </div>
              <div className="space-y-2">
                {productVisits.map((visit) => (
                  <div key={visit.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div>
                      <div className="text-sm font-medium text-white">{visit.itemName}</div>
                      <div className="text-xs text-white/60">
                        {format(new Date(visit.timestamp), 'MMM d, yyyy h:mm a')}
                      </div>
                    </div>
                    <div className="text-xs text-white/60">{visit.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service Views */}
          {serviceVisits.length > 0 && (
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-4 h-4 text-[#EFFC76]" />
                <h4 className="font-semibold text-white">Service Views ({serviceVisits.length})</h4>
              </div>
              <div className="space-y-2">
                {serviceVisits.map((visit) => (
                  <div key={visit.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div>
                      <div className="text-sm font-medium text-white">{visit.itemName}</div>
                      <div className="text-xs text-white/60">
                        {format(new Date(visit.timestamp), 'MMM d, yyyy h:mm a')}
                      </div>
                    </div>
                    <div className="text-xs text-white/60">{visit.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Pages */}
          {otherVisits.length > 0 && (
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-[#EFFC76]" />
                <h4 className="font-semibold text-white">Other Pages ({otherVisits.length})</h4>
              </div>
              <div className="space-y-2">
                {otherVisits.map((visit) => (
                  <div key={visit.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div>
                      <div className="text-sm font-medium text-white">{visit.itemName}</div>
                      <div className="text-xs text-white/60">
                        {format(new Date(visit.timestamp), 'MMM d, yyyy h:mm a')}
                      </div>
                    </div>
                    <div className="text-xs text-white/60">{visit.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
