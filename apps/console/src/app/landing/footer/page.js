"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Settings } from "lucide-react";
import FooterForm from "@/components/landing/landing-page-from/footer/FooterForm";
import { useGetFooterQuery } from "@/api/landing/footer/page";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
import { toast } from "sonner";

export default function FooterPage() {
  const [showDialog, setShowDialog] = useState(false);

  // API hooks
  const { data: footerData, isLoading, refetch } = useGetFooterQuery();

  const footer = footerData?.data || footerData;

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="max-w-[1600px] w-full mx-auto px-4 py-8 text-white">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="relative w-full md:w-auto">
              <div className="absolute -left-8 -top-8 w-32 h-32 bg-[#EFFC76]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-4 relative">
                <div className="p-3 rounded-xl bg-[#EFFC76]/10 border border-[#EFFC76]/20 shadow-[0_0_20px_rgba(239,252,118,0.1)]">
                  <Settings className="w-8 h-8 text-[#EFFC76]" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Footer Settings
                  </h1>
                  <p className="text-sm md:text-base text-white/40 mt-1">
                    Manage your website footer content and links
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowDialog(true)}
              className="w-full md:w-auto bg-[#EFFC76] hover:bg-[#dbe86c] text-black font-semibold h-12 px-6 rounded-xl shadow-[0_0_20px_rgba(239,252,118,0.2)] hover:shadow-[0_0_30px_rgba(239,252,118,0.3)] transition-all duration-300"
            >
              <Edit className="w-5 h-5 mr-2" />
              Update Footer
            </Button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.2)] overflow-hidden p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EFFC76]"></div>
              </div>
            ) : footer ? (
              <div className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-4 p-6 border border-white/10 rounded-xl bg-black/40 hover:border-[#EFFC76]/30 transition-colors duration-300">
                  <h3 className="text-xl font-semibold text-[#EFFC76] border-b border-white/10 pb-4 flex items-center gap-2">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-white/50 mb-1">
                        Company Name
                      </p>
                      <p className="text-lg text-white font-medium">
                        {footer.company_name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/50 mb-1">
                        Location
                      </p>
                      <p className="text-lg text-white font-medium">
                        {footer.location || "N/A"}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-white/50 mb-1">
                        Description
                      </p>
                      <p className="text-base text-white/80 leading-relaxed">
                        {footer.company_description || "N/A"}
                      </p>
                    </div>
                    {footer.logo_url && (
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-white/50 mb-3">
                          Logo
                        </p>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10 inline-block">
                          <img
                            src={footer.logo_url}
                            alt="Company Logo"
                            className="h-20 object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Media Links */}
                {(footer.twitter_url ||
                  footer.instagram_url ||
                  footer.linkedin_url ||
                  footer.youtube_url) && (
                  <div className="space-y-4 p-6 border border-white/10 rounded-xl bg-black/40 hover:border-[#EFFC76]/30 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-[#EFFC76] border-b border-white/10 pb-4">
                      Social Media Links
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {footer.twitter_url && (
                        <div>
                          <p className="text-sm font-medium text-white/50 mb-1">
                            Twitter
                          </p>
                          <a
                            href={footer.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#EFFC76] hover:text-[#f5ff9a] underline text-base break-all"
                          >
                            {footer.twitter_url}
                          </a>
                        </div>
                      )}
                      {footer.instagram_url && (
                        <div>
                          <p className="text-sm font-medium text-white/50 mb-1">
                            Instagram
                          </p>
                          <a
                            href={footer.instagram_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#EFFC76] hover:text-[#f5ff9a] underline text-base break-all"
                          >
                            {footer.instagram_url}
                          </a>
                        </div>
                      )}
                      {footer.linkedin_url && (
                        <div>
                          <p className="text-sm font-medium text-white/50 mb-1">
                            LinkedIn
                          </p>
                          <a
                            href={footer.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#EFFC76] hover:text-[#f5ff9a] underline text-base break-all"
                          >
                            {footer.linkedin_url}
                          </a>
                        </div>
                      )}
                      {footer.youtube_url && (
                        <div>
                          <p className="text-sm font-medium text-white/50 mb-1">
                            YouTube
                          </p>
                          <a
                            href={footer.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#EFFC76] hover:text-[#f5ff9a] underline text-base break-all"
                          >
                            {footer.youtube_url}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Links Sections */}
                {(footer.company_links?.length > 0 ||
                  footer.services_links?.length > 0 ||
                  footer.legal_links?.length > 0) && (
                  <div className="space-y-4 p-6 border border-white/10 rounded-xl bg-black/40 hover:border-[#EFFC76]/30 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-[#EFFC76] border-b border-white/10 pb-4">
                      Footer Links
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {footer.company_links?.length > 0 && (
                        <div>
                          <p className="text-base font-semibold text-white mb-3">
                            {footer.company_links_title || "Company"}
                          </p>
                          <ul className="space-y-2">
                            {footer.company_links.map((link, index) => (
                              <li key={index}>
                                <a
                                  href={link.url}
                                  className="text-white/70 hover:text-[#EFFC76] transition-colors text-sm"
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {footer.services_links?.length > 0 && (
                        <div>
                          <p className="text-base font-semibold text-white mb-3">
                            {footer.services_links_title || "Services"}
                          </p>
                          <ul className="space-y-2">
                            {footer.services_links.map((link, index) => (
                              <li key={index}>
                                <a
                                  href={link.url}
                                  className="text-white/70 hover:text-[#EFFC76] transition-colors text-sm"
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {footer.legal_links?.length > 0 && (
                        <div>
                          <p className="text-base font-semibold text-white mb-3">
                            {footer.legal_links_title || "Legal"}
                          </p>
                          <ul className="space-y-2">
                            {footer.legal_links.map((link, index) => (
                              <li key={index}>
                                <a
                                  href={link.url}
                                  className="text-white/70 hover:text-[#EFFC76] transition-colors text-sm"
                                >
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/50 mb-4">
                  No footer configuration found.
                </p>
                <Button
                  onClick={() => setShowDialog(true)}
                  className="bg-[#EFFC76] hover:bg-[#dbe86c] text-black"
                >
                  Create Footer
                </Button>
              </div>
            )}
          </div>

          <FooterForm
            open={showDialog}
            onOpenChange={setShowDialog}
            onSuccess={() => {
              toast.success("Footer updated successfully!");
              refetch();
            }}
          />
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
