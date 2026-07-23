"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Moon, Clock, CheckCircle2 } from "lucide-react";
import {
  getPrayerTimes,
  getNextPrayer,
  getTimeUntilPrayer,
  getIslamicDate,
  getFormattedPrayerTimes
} from "@/lib/prayerTimes";
import PrayerEmailSettings from "./PrayerEmailSettings";
import SalahTrackerModal from "./SalahTrackerModal";
import { toast } from "sonner";

export default function PrayerTimeWidget() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [islamicDate, setIslamicDate] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showTracker, setShowTracker] = useState(false);

  // ... (existing effects remain unchanged) ...
  // Initialize prayer times
  useEffect(() => {
    try {
      const times = getPrayerTimes();
      setPrayerTimes(times);
      setIslamicDate(getIslamicDate());
      
      const next = getNextPrayer(times);
      setNextPrayer(next);
    } catch (error) {
      console.error("Failed to initialize prayer times:", error);
    }
  }, []);

  // Check for email reminders
  useEffect(() => {
    if (!prayerTimes) return;

    const checkReminders = () => {
      const now = new Date();
      const settings = localStorage.getItem('prayerEmailSettings');
      const { enabled = {} } = settings ? JSON.parse(settings) : {
        enabled: { Fajr: true, Dhuhr: true, Asr: true, Maghrib: true, Isha: true }
      };

      Object.entries(prayerTimes).forEach(([name, time]) => {
        if (name === 'sunrise' || name === 'date' || !time) return;
        
        // Capitalize name for checking enabled settings
        const capitalName = name.charAt(0).toUpperCase() + name.slice(1);
        
        if (enabled[capitalName]) {
          const diff = time - now;
          const minutesUntil = Math.floor(diff / (1000 * 60));
          
          // Send reminder if exactly 10 minutes (check with some tolerance for interval drift)
          // Using a session storage key to prevent duplicate sends within the minute
          const reminderKey = `prayer_reminder_${name}_${now.toDateString()}_${now.getHours()}_${now.getMinutes()}`;
          
          if (minutesUntil === 10 && !sessionStorage.getItem(reminderKey)) {
            // Send notification
            toast.info(`Sending email reminder for ${capitalName} prayer (10 mins remaining)`);
            sessionStorage.setItem(reminderKey, 'sent');
            
            // In a real app, this would call an API
            console.log(`Sending email for ${capitalName}`);
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [prayerTimes]);

  // Update countdown every second
  useEffect(() => {
    if (!nextPrayer) return;

    const interval = setInterval(() => {
      const timeLeft = getTimeUntilPrayer(nextPrayer.time);
      setCountdown(timeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextPrayer]);

  if (!prayerTimes) return null;

  const formattedPrayers = getFormattedPrayerTimes(prayerTimes);

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition-colors hover:border-[#EFFC76]/50 min-h-[450px] flex flex-col">
        {/* Decorative Background Glows - Refined */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#EFFC76]/5 rounded-full blur-[100px] -mr-48 -mt-48 transition-opacity duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#EFFC76]/3 rounded-full blur-[100px] -ml-48 -mb-48"></div>

        {/* Content Layout: Responsive Stack */}
        <div className="relative z-10 flex flex-col md:flex-row flex-1">
          
          {/* Left Side: Visual & Countdown */}
          <div className="w-full md:w-1/3 p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E1E1E] to-[#121212] opacity-80"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[#EFFC76]/10">
                  <Moon className="w-6 h-6 text-[#EFFC76]" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Prayer Times</h2>
              </div>
              <p className="text-[#EFFC76] text-sm font-medium tracking-wide">{islamicDate}</p>
              <p className="text-white/40 text-xs mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Dhaka, Bangladesh
              </p>
            </div>

            {/* Countdown - Centered and Large */}
            {nextPrayer && (
              <div className="relative z-10 my-10">
                <div className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">Upcoming: {nextPrayer.name}</div>
                <div className="text-5xl font-mono font-bold text-white tabular-nums tracking-tighter mb-1">
                  {countdown.hours > 0 && `${countdown.hours}:`}
                  {countdown.minutes.toString().padStart(2, '0')}:
                  {countdown.seconds.toString().padStart(2, '0')}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[11px]">
                  <Clock className="w-3 h-3" />
                  Time until Adhan
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="relative z-10 mt-auto space-y-3">
              <Button
                size="sm"
                onClick={() => setShowTracker(true)}
                className="w-full justify-center bg-[#EFFC76] text-black hover:bg-[#dce865] border-transparent font-medium py-5"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Track Prayers
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="w-full justify-center border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium py-5"
              >
                <Settings className="w-4 h-4 mr-2" />
                Notification Settings
              </Button>
            </div>
          </div>

          {/* Right Side: Prayer Cards */}
          <div className="w-full md:w-2/3 p-8 md:p-10 relative flex flex-col">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 h-full items-start pt-12 relative z-20">
              {formattedPrayers.map((prayer) => {
                const isNext = nextPrayer && prayer.name === nextPrayer.name;
                
                return (
                  <div
                    key={prayer.name}
                    className={`relative overflow-hidden rounded-2xl p-5 md:p-7 text-center transition-all duration-500 group border min-h-[160px] flex flex-col justify-center ${
                      isNext
                        ? 'bg-[#EFFC76] text-black scale-110 shadow-[0_25px_50px_rgba(239,252,118,0.2)] border-transparent z-10'
                        : 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {/* Active Indicator */}
                    {isNext && (
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-black animate-ping"></div>
                    )}

                    <div className={`text-[10px] uppercase tracking-[0.15em] font-bold mb-3 ${isNext ? 'text-black/50' : 'text-white/30'}`}>
                      {prayer.arabicName}
                    </div>
                    <div className={`text-base font-bold mb-4 ${isNext ? 'text-black' : 'text-white'}`}>
                      {prayer.name}
                    </div>
                    <div className={`text-xl font-mono font-bold tracking-tight ${isNext ? 'text-black' : 'text-[#EFFC76]'}`}>
                      {prayer.formatted}
                    </div>
                    
                    {/* Inner Glow for Next Prayer */}
                    {isNext && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Mosque Silhouette at Bottom - Enhanced for Pixel-Perfect Clarity */}
            <div className="absolute bottom-0 right-0 w-full h-[180px] pointer-events-none opacity-[0.12] flex items-end overflow-hidden">
              <svg 
                viewBox="0 0 1000 200" 
                className="w-full h-full transform translate-y-1" 
                xmlns="http://www.w3.org/2000/svg" 
                preserveAspectRatio="xMidYMax slice"
              >
                <defs>
                  <linearGradient id="mosque-grad-premium" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#EFFC76', stopOpacity: 0.9 }} />
                    <stop offset="50%" style={{ stopColor: 'white', stopOpacity: 0.4 }} />
                    <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0.1 }} />
                  </linearGradient>
                </defs>
                
                {/* Far Background Domes - Subtle */}
                <ellipse cx="150" cy="190" rx="80" ry="50" fill="url(#mosque-grad-premium)" opacity="0.3" />
                <ellipse cx="850" cy="190" rx="80" ry="50" fill="url(#mosque-grad-premium)" opacity="0.3" />
                
                {/* Exterior Minarets - Sharp & Defined */}
                <rect x="30" y="20" width="10" height="180" rx="2" fill="url(#mosque-grad-premium)" />
                <path d="M25,20 L45,20 L35,-5 Z" fill="url(#mosque-grad-premium)" />
                <circle cx="35" cy="-8" r="3" fill="#EFFC76" />
                
                <rect x="960" y="20" width="10" height="180" rx="2" fill="url(#mosque-grad-premium)" />
                <path d="M955,20 L975,20 L965,-5 Z" fill="url(#mosque-grad-premium)" />
                <circle cx="965" cy="-8" r="3" fill="#EFFC76" />

                {/* Main Building Structure - Solid Base */}
                <rect x="300" y="130" width="400" height="70" rx="4" fill="url(#mosque-grad-premium)" />
                
                {/* Main Central Dome - High Detail */}
                <path d="M350,130 C350,30 650,30 650,130 Z" fill="url(#mosque-grad-premium)" />
                <rect x="496" y="15" width="8" height="30" fill="#EFFC76" />
                <circle cx="500" cy="10" r="6" fill="#EFFC76" />
                <path d="M500,2 L497,10 L503,10 Z" fill="#EFFC76" /> {/* Small Crescent symbolish shape */}
                
                {/* Secondary Symmetrical Domes */}
                <path d="M220,130 C220,80 340,80 340,130 Z" fill="url(#mosque-grad-premium)" opacity="0.8" />
                <path d="M660,130 C660,80 780,80 780,130 Z" fill="url(#mosque-grad-premium)" opacity="0.8" />
                
                {/* Central Minarets - Flanking the Main Dome */}
                <rect x="340" y="50" width="6" height="150" rx="1" fill="url(#mosque-grad-premium)" />
                <path d="M335,50 L351,50 L343,35 Z" fill="#EFFC76" />
                
                <rect x="654" y="50" width="6" height="150" rx="1" fill="url(#mosque-grad-premium)" />
                <path d="M649,50 L665,50 L657,35 Z" fill="#EFFC76" />

                {/* Architectural Details - Windows/Arches */}
                <rect x="475" y="150" width="50" height="50" rx="25" fill="#121212" opacity="0.4" />
                <rect x="400" y="160" width="30" height="40" rx="15" fill="#121212" opacity="0.3" />
                <rect x="570" y="160" width="30" height="40" rx="15" fill="#121212" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Email Settings Dialog */}
      <PrayerEmailSettings
        open={showSettings}
        onOpenChange={setShowSettings}
        prayerTimes={formattedPrayers}
      />
      
      {/* Salah Tracker Dialog */}
      <SalahTrackerModal
        open={showTracker}
        onOpenChange={setShowTracker}
        prayerTimes={formattedPrayers}
      />
    </>
  );
}
