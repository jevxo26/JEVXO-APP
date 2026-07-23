"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Eye,
  TrendingUp,
  Package,
  Wrench,
  ArrowLeft
} from "lucide-react";
import { format } from "date-fns";
import { MOCK_VISITORS } from "@/data/visitorData";

export default function VisitorDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const visitor = MOCK_VISITORS.find(v => v.id === params.id);

  if (!visitor) {
    return (
      <div className="px-4 py-4 sm:px-8 sm:py-8 min-h-screen text-white">
        <div className="max-w-[1600px] w-full mx-auto">
          <div className="text-center py-12">
            <User className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Visitor Not Found</h2>
            <p className="text-white/60 mb-6">The visitor you're looking for doesn't exist.</p>
            <Button
              onClick={() => router.push('/admin/reports')}
              className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Reports
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Group visits by type
  const productVisits = visitor.visitHistory.filter(v => v.pageType === 'product');
  const serviceVisits = visitor.visitHistory.filter(v => v.pageType === 'service');
  const otherVisits = visitor.visitHistory.filter(v => !['product', 'service'].includes(v.pageType));

  return (
    <div className="px-4 py-4 sm:px-8 sm:py-8 min-h-screen text-white">
      <div className="max-w-[1600px] w-full mx-auto space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/admin/reports')}
              className="glass-button border border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Reports
            </Button>
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-[#EFFC76]" />
              <div>
                <h1 className="text-2xl font-bold text-white">Visitor Details</h1>
                <p className="text-sm text-white/60">Complete activity history and engagement metrics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visitor Profile */}
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24 border-4 border-[#EFFC76]/40 shadow-lg">
              <AvatarImage src={visitor.avatar} alt={visitor.name} />
              <AvatarFallback className="bg-gradient-to-br from-[#EFFC76]/20 to-[#EFFC76]/10 text-[#EFFC76] text-2xl font-bold">
                {visitor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-4">{visitor.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <Mail className="w-5 h-5 text-[#EFFC76]" />
                  <div>
                    <div className="text-xs text-white/60">Email</div>
                    <div className="text-sm text-white/90 font-medium">{visitor.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <Phone className="w-5 h-5 text-[#EFFC76]" />
                  <div>
                    <div className="text-xs text-white/60">Phone</div>
                    <div className="text-sm text-white/90 font-medium">{visitor.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <Calendar className="w-5 h-5 text-[#EFFC76]" />
                  <div>
                    <div className="text-xs text-white/60">First Visit</div>
                    <div className="text-sm text-white/90 font-medium">
                      {format(new Date(visitor.firstVisit), 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <Clock className="w-5 h-5 text-[#EFFC76]" />
                  <div>
                    <div className="text-xs text-white/60">Last Visit</div>
                    <div className="text-sm text-white/90 font-medium">
                      {format(new Date(visitor.lastVisit), 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <Eye className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-white mb-2">{visitor.totalVisits}</div>
            <div className="text-sm text-white/60">Total Visits</div>
          </div>
          <div className="glass-panel rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-white mb-2">{visitor.totalPageViews}</div>
            <div className="text-sm text-white/60">Page Views</div>
          </div>
          <div className="glass-panel rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <Clock className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-4xl font-bold text-white mb-2">{visitor.avgSessionDuration}</div>
            <div className="text-sm text-white/60">Avg. Duration</div>
          </div>
        </div>

        {/* Product Views */}
        {productVisits.length > 0 && (
          <div className="glass-panel rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-[#EFFC76]" />
              <h3 className="text-xl font-bold text-white">Product Views ({productVisits.length})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productVisits.map((visit) => (
                <div key={visit.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                  <div>
                    <div className="text-base font-semibold text-white mb-1">{visit.itemName}</div>
                    <div className="text-sm text-white/60">
                      {format(new Date(visit.timestamp), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  <div className="text-sm text-white/60 font-medium">{visit.duration}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service Views */}
        {serviceVisits.length > 0 && (
          <div className="glass-panel rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="w-6 h-6 text-[#EFFC76]" />
              <h3 className="text-xl font-bold text-white">Service Views ({serviceVisits.length})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceVisits.map((visit) => (
                <div key={visit.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                  <div>
                    <div className="text-base font-semibold text-white mb-1">{visit.itemName}</div>
                    <div className="text-sm text-white/60">
                      {format(new Date(visit.timestamp), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  <div className="text-sm text-white/60 font-medium">{visit.duration}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Pages */}
        {otherVisits.length > 0 && (
          <div className="glass-panel rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-[#EFFC76]" />
              <h3 className="text-xl font-bold text-white">Other Pages ({otherVisits.length})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherVisits.map((visit) => (
                <div key={visit.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                  <div>
                    <div className="text-base font-semibold text-white mb-1">{visit.itemName}</div>
                    <div className="text-sm text-white/60">
                      {format(new Date(visit.timestamp), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  <div className="text-sm text-white/60 font-medium">{visit.duration}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
