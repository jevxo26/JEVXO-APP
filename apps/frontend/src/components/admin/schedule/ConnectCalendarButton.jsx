"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarCheck, CalendarX } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ConnectCalendarButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check for success param
    if (searchParams.get('success') === 'calendar_connected') {
      setIsConnected(true);
      // Clean up URL
      router.replace('/admin/schedule');
    }
    
    // Also check if we have the cookie (client-side check is weak, 
    // ideally we check via an API endpoint, but this is a visual indicator)
    // Since cookie is httpOnly, we can't check it here actually.
    // We'll rely on a check-status API or just local state for now for the immediate feedback.
    
    // Real implementation: fetch('/api/calendar/status').then(...)
  }, [searchParams, router]);

  const handleConnect = () => {
    window.location.href = '/api/calendar/auth';
  };

  if (isConnected) {
    return (
      <Button 
        variant="outline" 
        className="text-green-500 border-green-500/20 bg-green-500/10 hover:bg-green-500/20"
        disabled
      >
        <CalendarCheck className="w-4 h-4 mr-2" />
        Calendar Connected
      </Button>
    );
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleConnect}
      className="bg-[#0A0A0A]/95 backdrop-blur-xl border-white/10 text-white hover:bg-white/10 hover:text-white transition-all duration-300 shadow-lg"
    >
      {isConnected ? <CalendarCheck className="w-4 h-4 mr-2" /> : <CalendarX className="w-4 h-4 mr-2" />}
      {isConnected ? 'Calendar Connected' : 'Connect Google Calendar'}
    </Button>
  );
}
