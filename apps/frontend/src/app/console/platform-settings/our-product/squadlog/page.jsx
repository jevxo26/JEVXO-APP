"use client";

import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Save, 
  Eye, 
  Package, 
  Upload, 
  Plus, 
  Trash2, 
  Layers, 
  Monitor, 
  Smartphone, 
  Globe,
  CheckCircle2,
  Sparkles,
  LayoutTemplate,
  Palette,
  Type,
  Image as ImageIcon,
  Video
} from "lucide-react";

export default function SquadLogProductPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [features, setFeatures] = useState([
    { id: 1, title: "Real-time Attendance", description: "Track employee check-ins and check-outs with geolocation." },
    { id: 2, title: "Automated Payroll", description: "Calculate salaries, taxes, and deductions automatically." },
    { id: 3, title: "Smart Scheduling", description: "AI-powered shift planning and conflict resolution." }
  ]);

  const addFeature = () => {
    const newId = features.length + 1;
    setFeatures([...features, { id: newId, title: "New Feature", description: "Feature description goes here." }]);
  };

  const removeFeature = (id) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="min-h-screen bg-[#0A0A0A] text-white p-4 md:p-8">
          <div className="max-w-[1600px] mx-auto space-y-8">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                   <div className="p-3 rounded-xl bg-[#EFFC76]/10 border border-[#EFFC76]/20 shadow-[0_0_20px_rgba(239,252,118,0.1)]">
                      <Package className="w-8 h-8 text-[#EFFC76]" />
                   </div>
                   <div>
                     <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                       SquadLog Landing Page
                     </h1>
                     <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="bg-[#EFFC76]/10 text-[#EFFC76] border-[#EFFC76]/20">
                          Live
                        </Badge>
                        <span className="text-white/40 text-sm">Last updated: 2 hours ago</span>
                     </div>
                   </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                 <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-white gap-2">
                    <Eye className="w-4 h-4" />
                    Preview
                 </Button>
                 <Button className="bg-[#EFFC76] hover:bg-[#dbe86c] text-black font-semibold shadow-[0_0_20px_rgba(239,252,118,0.2)]">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                 </Button>
              </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
               <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl w-full md:w-auto flex flex-wrap h-auto gap-2 mb-8">
                  <TabsTrigger value="general" className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black text-white/70 px-6 py-2.5 rounded-lg transition-all">
                     <LayoutTemplate className="w-4 h-4 mr-2" />
                     General Info
                  </TabsTrigger>
                  <TabsTrigger value="hero" className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black text-white/70 px-6 py-2.5 rounded-lg transition-all">
                     <Sparkles className="w-4 h-4 mr-2" />
                     Hero Section
                  </TabsTrigger>
                  <TabsTrigger value="features" className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black text-white/70 px-6 py-2.5 rounded-lg transition-all">
                     <Layers className="w-4 h-4 mr-2" />
                     Features
                  </TabsTrigger>
                  <TabsTrigger value="media" className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black text-white/70 px-6 py-2.5 rounded-lg transition-all">
                     <Palette className="w-4 h-4 mr-2" />
                     Branding & Media
                  </TabsTrigger>
               </TabsList>

               <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Left Column - Form Content */}
                  <div className="xl:col-span-2 space-y-6">
                     
                     <TabsContent value="general" className="mt-0 space-y-6">
                        <Card className="bg-[#1A1A1A] border border-white/10 text-white">
                           <CardHeader>
                              <CardTitle>Basic Information</CardTitle>
                              <CardDescription className="text-white/50">Core details about the SquadLog product.</CardDescription>
                           </CardHeader>
                           <CardContent className="space-y-6">
                              <div className="space-y-2">
                                 <label className="text-sm font-medium text-white/80">Product Name</label>
                                 <Input defaultValue="SquadLog Console" className="bg-black/40 border-white/10 text-white focus-visible:ring-[#EFFC76]" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-sm font-medium text-white/80">Tagline</label>
                                 <Input defaultValue="The Ultimate Workforce Management Platform" className="bg-black/40 border-white/10 text-white focus-visible:ring-[#EFFC76]" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-sm font-medium text-white/80">Description</label>
                                 <Textarea 
                                    className="bg-black/40 border-white/10 text-white min-h-[120px] focus-visible:ring-[#EFFC76]"
                                    defaultValue="Streamline your operations with SquadLog. From attendance tracking to payroll management, we provide a unified console for modern enterprises."
                                 />
                              </div>
                           </CardContent>
                        </Card>

                        <Card className="bg-[#1A1A1A] border border-white/10 text-white">
                           <CardHeader>
                              <CardTitle>SEO Settings</CardTitle>
                              <CardDescription className="text-white/50">Optimize for search engines.</CardDescription>
                           </CardHeader>
                           <CardContent className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Meta Title</label>
                                    <Input defaultValue="SquadLog - HR & Admin Console" className="bg-black/40 border-white/10 text-white focus-visible:ring-[#EFFC76]" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/80">Keywords</label>
                                    <Input defaultValue="HRMS, Payroll, Attendance, Admin" className="bg-black/40 border-white/10 text-white focus-visible:ring-[#EFFC76]" />
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     </TabsContent>

                     <TabsContent value="hero" className="mt-0 space-y-6">
                        <Card className="bg-[#1A1A1A] border border-white/10 text-white">
                           <CardHeader>
                              <CardTitle>Hero Configuration</CardTitle>
                              <CardDescription className="text-white/50">Customize the main landing area.</CardDescription>
                           </CardHeader>
                           <CardContent className="space-y-6">
                              <div className="space-y-2">
                                 <label className="text-sm font-medium text-white/80">Hero Headline</label>
                                 <Input defaultValue="Empower Your Workforce" className="bg-black/40 border-white/10 text-white text-lg font-bold focus-visible:ring-[#EFFC76]" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-sm font-medium text-white/80">Sub-headline</label>
                                 <Textarea defaultValue="All-in-one platform for attendance, payroll, and team management." className="bg-black/40 border-white/10 text-white focus-visible:ring-[#EFFC76]" />
                              </div>
                              <div className="flex gap-4">
                                 <div className="w-full space-y-2">
                                    <label className="text-sm font-medium text-white/80">Primary CTA Text</label>
                                    <Input defaultValue="Get Started Free" className="bg-black/40 border-white/10 text-white focus-visible:ring-[#EFFC76]" />
                                 </div>
                                 <div className="w-full space-y-2">
                                    <label className="text-sm font-medium text-white/80">Primary CTA Link</label>
                                    <Input defaultValue="/signup" className="bg-black/40 border-white/10 text-white focus-visible:ring-[#EFFC76]" />
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     </TabsContent>

                     <TabsContent value="features" className="mt-0 space-y-6">
                        <Card className="bg-[#1A1A1A] border border-white/10 text-white">
                           <CardHeader className="flex flex-row items-center justify-between">
                              <div>
                                 <CardTitle>Features List</CardTitle>
                                 <CardDescription className="text-white/50">Manage the key features displayed on the landing page.</CardDescription>
                              </div>
                              <Button onClick={addFeature} className="bg-[#EFFC76] text-black hover:bg-[#dbe86c]">
                                 <Plus className="w-4 h-4 mr-2" />
                                 Add Feature
                              </Button>
                           </CardHeader>
                           <CardContent className="space-y-4">
                              {features.map((feature) => (
                                 <div key={feature.id} className="p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-[#EFFC76]/50 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                       <div className="space-y-3 w-full">
                                          <div className="flex items-center gap-3">
                                             <div className="p-2 rounded-lg bg-[#EFFC76]/10 text-[#EFFC76]">
                                                <CheckCircle2 className="w-4 h-4" />
                                             </div>
                                             <Input 
                                                defaultValue={feature.title} 
                                                className="bg-black/40 border-white/10 text-white font-medium focus-visible:ring-[#EFFC76]" 
                                             />
                                          </div>
                                          <Textarea 
                                             defaultValue={feature.description} 
                                             className="bg-black/40 border-white/10 text-white/70 text-sm focus-visible:ring-[#EFFC76]" 
                                          />
                                       </div>
                                       <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          onClick={() => removeFeature(feature.id)}
                                          className="text-white/40 hover:text-red-400 hover:bg-red-400/10"
                                       >
                                          <Trash2 className="w-4 h-4" />
                                       </Button>
                                    </div>
                                 </div>
                              ))}
                           </CardContent>
                        </Card>
                     </TabsContent>

                     <TabsContent value="media" className="mt-0 space-y-6">
                        <Card className="bg-[#1A1A1A] border border-white/10 text-white">
                           <CardHeader>
                              <CardTitle>Branding Assets</CardTitle>
                              <CardDescription className="text-white/50">Manage logos and brand colors.</CardDescription>
                           </CardHeader>
                           <CardContent className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div className="space-y-3">
                                    <label className="text-sm font-medium text-white/80">Brand Logo (Light)</label>
                                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-[#EFFC76]/50 transition-colors cursor-pointer bg-black/20">
                                       <div className="p-3 rounded-full bg-white/5">
                                          <ImageIcon className="w-6 h-6 text-white/60" />
                                       </div>
                                       <div className="text-center">
                                          <p className="text-sm font-medium text-white">Click to upload</p>
                                          <p className="text-xs text-white/40">SVG, PNG, JPG (max. 2MB)</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="space-y-3">
                                    <label className="text-sm font-medium text-white/80">Brand Logo (Dark)</label>
                                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-[#EFFC76]/50 transition-colors cursor-pointer bg-white/5">
                                       <div className="p-3 rounded-full bg-white/10">
                                          <ImageIcon className="w-6 h-6 text-white/60" />
                                       </div>
                                       <div className="text-center">
                                          <p className="text-sm font-medium text-white">Click to upload</p>
                                          <p className="text-xs text-white/40">SVG, PNG, JPG (max. 2MB)</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              
                              <div className="pt-6 border-t border-white/10 space-y-4">
                                 <h4 className="text-sm font-medium text-white">Brand Colors</h4>
                                 <div className="flex gap-4">
                                    <div className="space-y-2">
                                       <label className="text-xs text-white/60">Primary</label>
                                       <div className="flex items-center gap-2">
                                          <div className="w-10 h-10 rounded-lg bg-[#EFFC76] border border-white/10 shadow-sm" />
                                          <Input defaultValue="#EFFC76" className="w-24 bg-black/40 border-white/10 text-white font-mono" />
                                       </div>
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-xs text-white/60">Secondary</label>
                                       <div className="flex items-center gap-2">
                                          <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] border border-white/10 shadow-sm" />
                                          <Input defaultValue="#0A0A0A" className="w-24 bg-black/40 border-white/10 text-white font-mono" />
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>

                         <Card className="bg-[#1A1A1A] border border-white/10 text-white">
                           <CardHeader>
                              <CardTitle>Promotional Video</CardTitle>
                              <CardDescription className="text-white/50">Add a video to the hero section.</CardDescription>
                           </CardHeader>
                           <CardContent className="space-y-6">
                              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                 <div className="p-3 rounded-full bg-[#EFFC76]/10 text-[#EFFC76]">
                                    <Video className="w-6 h-6" />
                                 </div>
                                 <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium text-white">Video URL (YouTube/Vimeo)</p>
                                    <Input placeholder="https://..." className="bg-black/40 border-white/10 text-white focus-visible:ring-[#EFFC76]" />
                                 </div>
                              </div>
                              <div className="flex items-center justify-between">
                                 <div className="space-y-0.5">
                                    <label className="text-sm font-medium text-white">Autoplay</label>
                                    <p className="text-xs text-white/50">Automatically play video on load</p>
                                 </div>
                                 <Switch />
                              </div>
                           </CardContent>
                        </Card>
                     </TabsContent>
                     
                  </div>

                  {/* Right Column - Preview/Status */}
                  <div className="space-y-6">
                     <Card className="bg-[#1A1A1A] border border-white/10 text-white sticky top-6">
                        <CardHeader>
                           <CardTitle className="text-lg">Publishing Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                              <div className="flex items-center gap-2">
                                 <Globe className="w-4 h-4 text-green-400" />
                                 <span className="text-sm font-medium text-green-400">Published</span>
                              </div>
                              <span className="text-xs text-white/40">v2.4.0</span>
                           </div>

                           <div className="space-y-4">
                              <div className="flex items-center justify-between text-sm">
                                 <span className="text-white/60">Visibility</span>
                                 <span className="text-white font-medium">Public</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                 <span className="text-white/60">Last Edited By</span>
                                 <span className="text-white font-medium">Admin</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                 <span className="text-white/60">Page Views (30d)</span>
                                 <span className="text-[#EFFC76] font-medium">12.5k</span>
                              </div>
                           </div>

                           <div className="pt-4 border-t border-white/10">
                              <h4 className="text-sm font-medium mb-3 text-white/80">Device Preview</h4>
                              <div className="flex gap-2">
                                 <Button variant="ghost" className="flex-1 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white">
                                    <Monitor className="w-4 h-4" />
                                 </Button>
                                 <Button variant="ghost" className="flex-1 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white">
                                    <Smartphone className="w-4 h-4" />
                                 </Button>
                              </div>
                           </div>
                        </CardContent>
                     </Card>

                     <Card className="bg-[#1A1A1A] border border-white/10 text-white">
                        <CardHeader>
                           <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                           <Button variant="outline" className="w-full justify-start  border-white/10 hover:bg-white/5 text-white/80  bg-white/5 hover:text-[#EFFC76] hover:border-[#EFFC76]/30 transition-all">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Assets
                           </Button>
                           <Button variant="outline" className="w-full justify-start border-white/10 bg-white/5 hover:bg-white/5 text-white/80 hover:text-[#EFFC76] hover:border-[#EFFC76]/30 transition-all">
                              <Type className="w-4 h-4 mr-2" />
                              Edit Typography
                           </Button>
                           <Button variant="outline" className="w-full justify-start border-white/10 bg-white/5 hover:bg-white/5 text-white/80 hover:text-[#EFFC76] hover:border-[#EFFC76]/30 transition-all">
                              <LayoutTemplate className="w-4 h-4 mr-2" />
                              Change Layout
                           </Button>
                        </CardContent>
                     </Card>
                  </div>
               </div>
            </Tabs>
          </div>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
