"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
  DollarSign,
  Package,
  Calendar,
  FileCheck,
  RefreshCw,
  Tag,
} from "lucide-react";
import { useGetPricePackageByIdQuery } from "@/api/landing/price-package/pricePackageApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
export default function PricePackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pricePackageId = params.id;

  const {
    data: pricePackageData,
    isLoading,
    error,
  } = useGetPricePackageByIdQuery(pricePackageId);

  const pricePackage = pricePackageData?.data || pricePackageData;

  if (isLoading) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EFFC76] mx-auto mb-4" />
            <p className="text-white/70">Loading price package details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !pricePackage) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load price package</p>
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="gap-2 glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-[#EFFC76]/70"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getTypeLabel = (type) => {
    const typeMap = {
      monthly: "Monthly",
      yearly: "Yearly",
      "one-time": "One Time",
    };
    return typeMap[type] || type;
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 gap-2 text-white/80 hover:text-[#EFFC76] hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Price Packages
          </Button>

          {/* Header Section */}
          <div className="mb-8 rounded-2xl border border-white/10 bg-[#0A0A0A] p-8 relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.2)]">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#EFFC76]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex-1 space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  {pricePackage.badge && (
                    <Badge className="bg-[#EFFC76] text-black hover:bg-[#dbe86c] border-none px-4 py-1.5 text-sm font-semibold rounded-full shadow-[0_0_15px_rgba(239,252,118,0.3)]">
                      {pricePackage.badge}
                    </Badge>
                  )}
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white border border-white/10 backdrop-blur-md px-4 py-1.5 text-sm rounded-full hover:bg-white/20 transition-colors"
                  >
                    {getTypeLabel(pricePackage.type)}
                  </Badge>
                </div>

                {/* Title & Description */}
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
                    {pricePackage.title}
                  </h1>
                  {pricePackage.description && (
                    <p className="text-lg text-white/60 max-w-2xl font-light">
                      {pricePackage.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Price & Icon */}
              <div className="flex items-center gap-6">
                {pricePackage.iconUrl && (
                  <div className="hidden md:flex p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <img
                      src={pricePackage.iconUrl}
                      alt={pricePackage.title}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                )}
                <div className="flex items-center gap-3 bg-[#111111] px-6 py-4 rounded-2xl border border-white/10 shadow-lg group hover:border-[#EFFC76]/30 transition-all duration-300">
                  <div className="p-2 rounded-full bg-[#EFFC76]/10 group-hover:bg-[#EFFC76]/20 transition-colors">
                    <DollarSign className="w-6 h-6 text-[#EFFC76]" />
                  </div>
                  <span className="text-4xl font-bold text-white tracking-tight">
                    {pricePackage.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Package Details Section */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Package className="w-5 h-5 text-[#EFFC76]" />
                    Package Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pricePackage.projectLimit && (
                      <div className="flex items-start gap-3 p-4 border border-white/10 rounded-lg bg-black/40">
                        <FileCheck className="w-5 h-5 text-[#EFFC76] mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-white/60 mb-1">
                            Project Limit
                          </p>
                          <p className="text-2xl font-bold text-white">
                            {pricePackage.projectLimit}
                          </p>
                          <p className="text-xs text-white/40 mt-1">
                            Projects included
                          </p>
                        </div>
                      </div>
                    )}
                    {pricePackage.revisionLimit && (
                      <div className="flex items-start gap-3 p-4 border border-white/10 rounded-lg bg-black/40">
                        <RefreshCw className="w-5 h-5 text-[#EFFC76] mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-white/60 mb-1">
                            Revision Limit
                          </p>
                          <p className="text-2xl font-bold text-white">
                            {pricePackage.revisionLimit}
                          </p>
                          <p className="text-xs text-white/40 mt-1">
                            Revisions per project
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {pricePackage.type && (
                    <div className="flex items-start gap-3 p-4 border border-white/10 rounded-lg bg-black/40">
                      <Calendar className="w-5 h-5 text-[#EFFC76] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-white/60 mb-1">
                          Billing Type
                        </p>
                        <p className="font-medium text-lg text-white">
                          {getTypeLabel(pricePackage.type)}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Features Section */}
              {pricePackage.features && pricePackage.features.length > 0 && (
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <CheckCircle2 className="w-5 h-5 text-[#EFFC76]" />
                      Package Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pricePackage.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/10 bg-black/40 border border-white/10 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#EFFC76] mt-0.5 flex-shrink-0" />
                          <span className="text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Summary Card */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Tag className="w-5 h-5 text-[#EFFC76]" />
                    Package Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-white/60 mb-2">Price</p>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-[#EFFC76]" />
                      <span className="text-2xl font-bold text-white">
                        {pricePackage.price}
                      </span>
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div>
                    <p className="text-sm text-white/60 mb-2">Billing Type</p>
                    <Badge
                      variant="secondary"
                      className="text-sm bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/40"
                    >
                      {getTypeLabel(pricePackage.type)}
                    </Badge>
                  </div>

                  {pricePackage.badge && (
                    <>
                      <Separator className="bg-white/10" />
                      <div>
                        <p className="text-sm text-white/60 mb-2">Badge</p>
                        <Badge className="bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/40">
                          {pricePackage.badge}
                        </Badge>
                      </div>
                    </>
                  )}

                  {pricePackage.projectLimit && (
                    <>
                      <Separator className="bg-white/10" />
                      <div>
                        <p className="text-sm text-white/60 mb-1">
                          Project Limit
                        </p>
                        <p className="text-lg font-semibold text-white">
                          {pricePackage.projectLimit} Projects
                        </p>
                      </div>
                    </>
                  )}

                  {pricePackage.revisionLimit && (
                    <>
                      <Separator className="bg-white/10" />
                      <div>
                        <p className="text-sm text-white/60 mb-1">
                          Revision Limit
                        </p>
                        <p className="text-lg font-semibold text-white">
                          {pricePackage.revisionLimit} Revisions
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Icon Preview */}
              {pricePackage.iconUrl && (
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <ImageIcon className="w-5 h-5" />
                      Package Icon
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center p-4 border border-white/10 rounded-lg bg-black/40">
                      <img
                        src={pricePackage.iconUrl}
                        alt={pricePackage.title}
                        className="w-32 h-32 object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          const parent = e.target.parentElement;
                          if (parent) {
                            parent.innerHTML =
                              '<span class="text-white/40 text-sm">Failed to load icon</span>';
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
