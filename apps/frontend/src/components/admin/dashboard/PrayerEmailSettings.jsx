"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Mail, Clock, Save, RotateCcw, Eye } from "lucide-react";

const DEFAULT_EMAIL_TEMPLATE = {
  subject: "Prayer Reminder: {{prayerName}} in 10 minutes",
  body: `Dear {{employeeName}},

This is a reminder that {{prayerName}} prayer time is in 10 minutes.

Prayer Time: {{prayerTime}}

May Allah accept your prayers.

Best regards,
SquadLog Team`
};

export default function PrayerEmailSettings({ open, onOpenChange, prayerTimes }) {
  const [enabledPrayers, setEnabledPrayers] = useState({
    Fajr: true,
    Dhuhr: true,
    Asr: true,
    Maghrib: true,
    Isha: true
  });
  
  const [template, setTemplate] = useState(DEFAULT_EMAIL_TEMPLATE);
  const [activeTab, setActiveTab] = useState("notifications");

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('prayerEmailSettings');
    if (savedSettings) {
      const { enabled, template } = JSON.parse(savedSettings);
      if (enabled) setEnabledPrayers(enabled);
      if (template) setTemplate(template);
    }
  }, []);

  const handleSave = () => {
    const settings = {
      enabled: enabledPrayers,
      template: template
    };
    localStorage.setItem('prayerEmailSettings', JSON.stringify(settings));
    toast.success("Settings saved successfully!");
    onOpenChange(false);
  };

  const handleReset = () => {
    setTemplate(DEFAULT_EMAIL_TEMPLATE);
    toast.success("Template reset to default");
  };

  const togglePrayer = (name) => {
    setEnabledPrayers(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const getPreview = () => {
    let subject = template.subject;
    let body = template.body;
    
    const replacements = {
      '{{prayerName}}': 'Dhuhr',
      '{{prayerTime}}': '12:30 PM',
      '{{employeeName}}': 'John Doe'
    };
    
    Object.entries(replacements).forEach(([key, value]) => {
      subject = subject.replace(new RegExp(key, 'g'), value);
      body = body.replace(new RegExp(key, 'g'), value);
    });
    
    return { subject, body };
  };

  const preview = getPreview();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl glass-card border-white/20 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Mail className="w-5 h-5 text-[#EFFC76]" />
            Prayer Notification Settings
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Manage email alerts and customize templates
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white/5 border border-white/10 w-full justify-start">
            <TabsTrigger value="notifications" className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="template" className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black">
              Email Template
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="py-4 space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
              <div className="flex gap-2">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <p className="text-sm text-blue-200">
                  Emails will be sent automatically 10 minutes before each enabled prayer time to all employees.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {prayerTimes.map((prayer) => (
                <div 
                  key={prayer.name} 
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EFFC76]/10 flex items-center justify-center text-[#EFFC76] font-bold text-lg">
                      {prayer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{prayer.name}</div>
                      <div className="text-xs text-white/60">{prayer.formatted}</div>
                    </div>
                  </div>
                  <Switch
                    checked={enabledPrayers[prayer.name]}
                    onCheckedChange={() => togglePrayer(prayer.name)}
                    className="data-[state=checked]:bg-[#EFFC76]"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="template" className="py-4 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Subject Line</Label>
                <Input
                  value={template.subject}
                  onChange={(e) => setTemplate(prev => ({ ...prev, subject: e.target.value }))}
                  className="bg-black/40 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Email Body</Label>
                <Textarea
                  value={template.body}
                  onChange={(e) => setTemplate(prev => ({ ...prev, body: e.target.value }))}
                  rows={8}
                  className="bg-black/40 border-white/20 text-white font-mono text-sm"
                />
                <p className="text-xs text-white/50">
                  Available variables: <code className="text-[#EFFC76]">{"{{prayerName}}"}</code>, <code className="text-[#EFFC76]">{"{{prayerTime}}"}</code>, <code className="text-[#EFFC76]">{"{{employeeName}}"}</code>
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-[#EFFC76]" />
                  <span className="text-sm font-semibold text-white">Preview</span>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-lg p-4 space-y-2">
                  <div className="text-sm font-bold text-white border-b border-white/10 pb-2">
                    Subject: {preview.subject}
                  </div>
                  <pre className="text-sm text-white/80 whitespace-pre-wrap font-sans">
                    {preview.body}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2">
          {activeTab === "template" && (
            <Button
              variant="outline"
              onClick={handleReset}
              className="glass-button border border-white/20 bg-white/5 text-white hover:bg-white/10 mr-auto"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Template
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="glass-button border border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black font-semibold"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
