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
  Star,
  Sparkles,
  Package,
  Tag,
  Zap,
  Layers
} from "lucide-react";
import { useGetOurServiceByIdQuery } from "@/api/landing/our-service/ourServiceApi";
import { useGetCategoriesQuery } from "@/api/landing/category/categoryApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function OurServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id;

  const { data: serviceData, isLoading, error } = useGetOurServiceByIdQuery(serviceId);
  const { data: categoriesData } = useGetCategoriesQuery();

  const service = serviceData?.data || serviceData;
  const categories = categoriesData?.data || categoriesData || [];

  if (isLoading) {
    return (
      <PrivateRoute>
        <AppLayout>
          <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EFFC76] mx-auto mb-4" />
                <p className="text-white/70">Loading service details...</p>
              </div>
            </div>
          </div>
        </AppLayout>
      </PrivateRoute>
    );
  }

  if (error || !service) {
    return (
      <PrivateRoute>
        <AppLayout>
          <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <p className="text-red-500 mb-4 text-lg">Failed to load service</p>
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-[#EFFC76] hover:border-[#EFFC76]/30 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </AppLayout>
      </PrivateRoute>
    );
  }

  // Get category name
  const getCategoryName = () => {
    if (!service.categoryId) return null;
    const category = categories.find((c) => (c.id || c._id) === service.categoryId);
    return category?.name || `Category ${service.categoryId}`;
  };

  const categoryName = getCategoryName();

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="max-w-[1600px] w-full mx-auto px-4 py-8">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-2 text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Button>
            
            <div className="flex items-center gap-3">
               <Badge className="bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/20 px-3 py-1 text-sm font-medium hover:bg-[#EFFC76]/20 transition-colors">
                  Service ID: {service.id || service._id}
               </Badge>
            </div>
          </div>

          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-xl mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
            
            {service.image ? (
              <div className="h-[400px] w-full relative">
                 <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="h-[250px] w-full bg-gradient-to-br from-[#1a1a1a] to-black relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EFFC76]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
                <div className="space-y-4 max-w-3xl">
                  <div className="flex items-center gap-3 flex-wrap">
                    {categoryName && (
                      <Badge className="bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20">
                        <Layers className="w-3 h-3 mr-1.5 text-[#EFFC76]" />
                        {categoryName}
                      </Badge>
                    )}
                    {service.logo && (
                      <div className="h-8 w-8 rounded bg-white/10 backdrop-blur-md p-1 border border-white/20">
                        <img 
                          src={service.logo} 
                          alt="Logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
                      {service.title}
                    </h1>
                    {service.subtitle && (
                      <p className="text-xl text-white/80 font-light">
                        {service.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {service.description && (
                <div className="p-8 rounded-2xl border border-white/10 bg-[#0A0A0A]/40 backdrop-blur-md">
                   <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                     <Zap className="w-5 h-5 text-[#EFFC76]" />
                     About this Service
                   </h3>
                   <p className="text-white/70 leading-relaxed text-lg">
                     {service.description}
                   </p>
                </div>
              )}

              {/* Key Features */}
              {service.keyFeature && service.keyFeature.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2 px-2">
                    <Star className="w-5 h-5 text-[#EFFC76]" />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.keyFeature.map((feature, index) => (
                      <div 
                        key={index} 
                        className="p-4 rounded-xl border border-white/10 bg-[#0A0A0A]/40 hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1 p-1 rounded-full bg-[#EFFC76]/10 text-[#EFFC76] group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-white/80">{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {service.benefit && service.benefit.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2 px-2">
                    <Sparkles className="w-5 h-5 text-[#EFFC76]" />
                    Benefits
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.benefit.map((benefit, index) => (
                      <div 
                        key={index} 
                        className="p-4 rounded-xl border border-white/10 bg-[#0A0A0A]/40 hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1 p-1 rounded-full bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-white/80">{benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Services */}
              {service.otherservice && service.otherservice.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2 px-2">
                    <Package className="w-5 h-5 text-[#EFFC76]" />
                    Related Services
                  </h3>
                  <div className="space-y-4">
                    {service.otherservice.map((otherService, index) => (
                      <div 
                        key={index}
                        className="p-6 rounded-2xl border border-white/10 bg-[#0A0A0A]/40 hover:border-[#EFFC76]/30 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h4 className="text-lg font-medium text-white group-hover:text-[#EFFC76] transition-colors">
                            {otherService.name}
                          </h4>
                          {otherService.isfeature && (
                            <Badge className="bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/20">
                              Featured
                            </Badge>
                          )}
                        </div>
                        {otherService.description && (
                          <p className="text-white/60 leading-relaxed">
                            {otherService.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="sticky top-24 space-y-6">
                <Card className="glass-card border-white/10 bg-[#0A0A0A]/60 backdrop-blur-xl shadow-xl">
                  <CardHeader className="border-b border-white/5 pb-4">
                    <CardTitle className="flex items-center gap-2 text-white text-lg">
                      <Tag className="w-5 h-5 text-[#EFFC76]" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    {categoryName && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/50 text-sm">Category</span>
                        <span className="text-white font-medium text-right">{categoryName}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">Key Features</span>
                      <span className="text-white font-medium">
                        {service.keyFeature?.length || 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">Benefits</span>
                      <span className="text-white font-medium">
                        {service.benefit?.length || 0}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">Related Services</span>
                      <span className="text-white font-medium">
                        {service.otherservice?.length || 0}
                      </span>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="pt-2">
                       <p className="text-xs text-white/30 text-center uppercase tracking-widest">
                         SquadLog Console
                       </p>
                    </div>
                  </CardContent>
                </Card>

                {service.logo && (
                  <div className="p-8 rounded-2xl border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-xl flex flex-col items-center justify-center gap-4">
                    <p className="text-sm text-white/50 uppercase tracking-wider font-medium">Official Logo</p>
                    <div className="w-32 h-32 flex items-center justify-center">
                       <img
                        src={service.logo}
                        alt="Service Logo"
                        className="max-w-full max-h-full object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
