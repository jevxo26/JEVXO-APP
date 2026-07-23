"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSalahTracker } from "@/hooks/useSalahTracker";
import { CheckCircle2, Trophy, CalendarDays, BarChart3, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Bar, BarChart, ComposedChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { getQuote } from "@/lib/islamicQuotes";

export default function SalahTrackerModal({ open, onOpenChange, prayerTimes }) {
  const { trackerData, togglePrayer, getStats, getDailyStatus, getHistory } = useSalahTracker();
  const [dateStr, setDateStr] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stats, setStats] = useState({ totalPrayers: 0, daysTracked: 0, currentStreak: 0 });
  const [historyRange, setHistoryRange] = useState("7d");
  const [chartData, setChartData] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);

  useEffect(() => {
    // Set date string key from selected date
    if (selectedDate) {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        setDateStr(`${year}-${month}-${day}`);
    }
    
    // Update stats
    const currentStats = getStats();
    setStats(currentStats);

    // Update quote based on recent performance (approximate logic)
    // Calculate percentage of last 7 days
    const history7d = getHistory('7d');
    const totalPerformed = history7d.reduce((sum, day) => sum + day.count, 0);
    const maxPossible = history7d.length * 5;
    const score = maxPossible > 0 ? (totalPerformed / maxPossible) * 100 : 0;
    
    setCurrentQuote(getQuote(score));

  }, [open, trackerData, selectedDate]);

  useEffect(() => {
      setChartData(getHistory(historyRange));
  }, [historyRange, trackerData, open]);

  const handleToggle = (prayerKey) => {
    togglePrayer(dateStr, prayerKey);
  };

  const dayStatus = getDailyStatus(selectedDate);
  
  const getStatus = (prayerKey) => {
    return dayStatus[prayerKey] || false;
  };

  // Calculate daily progress for selected date
  const completedCount = prayerTimes.filter(p => getStatus(p.name.toLowerCase())).length;
  const progressPercent = (completedCount / 5) * 100;

  const isToday = new Date().toDateString() === selectedDate?.toDateString();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-[#121212] border-white/10 text-white overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[#EFFC76]" />
            Prayer Tracker
          </DialogTitle>
          <DialogDescription className="text-white/50">
            Track your prayers, view history, and reflect on your progress.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="tracker" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 mb-4">
            <TabsTrigger value="tracker" className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black">Tracker & Calendar</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black">Reports & Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tracker" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Calendar */}
                <div className="flex-1">
                    <div className="bg-white/5 rounded-xl border border-white/10 p-4">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => date && setSelectedDate(date)}
                            className="bg-transparent text-white w-full"
                            captionLayout="dropdown-buttons"
                            fromYear={2024}
                            toYear={2030}
                            classNames={{
                                day_selected: "bg-[#EFFC76] text-black hover:bg-[#EFFC76] hover:text-black focus:bg-[#EFFC76] focus:text-black",
                                day_today: "bg-white/10 text-white font-bold",
                                head_cell: "text-white/50 w-9 font-normal text-[0.8rem]",
                                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-white/10 hover:text-white rounded-md transition-colors text-white",
                                nav_button: "border border-white/10 hover:bg-white/10 hover:text-white text-white/70",
                                caption_label: "hidden", // Hide textual label since we have dropdowns
                                dropdown: "bg-[#1E1E1E] border-white/10 text-white rounded-md p-1 focus:ring-[#EFFC76] focus:border-[#EFFC76]",
                                dropdown_icon: "text-white/50",
                                caption_dropdowns: "flex gap-2 justify-center",
                                vhidden: "hidden"
                            }}
                            disabled={(date) => date > new Date()}
                        />
                    </div>
                </div>

                {/* Right: Checklist for Selected Date */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{isToday ? "Today's Prayers" : selectedDate?.toLocaleDateString(undefined, {weekday: 'long', month: 'short', day: 'numeric'})}</h3>
                        <span className="font-mono text-[#EFFC76] text-sm">{completedCount}/5 Done</span>
                    </div>

                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                        className="h-full bg-[#EFFC76] transition-all duration-500 ease-out"
                        style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>

                    <div className="space-y-2">
                    {prayerTimes.map((prayer) => {
                        const isChecked = getStatus(prayer.name.toLowerCase());
                        return (
                        <div 
                            key={prayer.name}
                            className={cn(
                            "flex items-center justify-between p-3 rounded-lg border transition-all duration-200",
                            isChecked 
                                ? "bg-[#EFFC76]/10 border-[#EFFC76]/30" 
                                : "bg-white/5 border-white/5 hover:bg-white/10"
                            )}
                        >
                            <div className="flex flex-col">
                            <Label htmlFor={`prayer-${prayer.name}`} className={cn("text-sm font-medium cursor-pointer", isChecked ? "text-[#EFFC76]" : "text-white")}>
                                {prayer.name}
                            </Label>
                            </div>
                            
                            <Checkbox 
                            id={`prayer-${prayer.name}`}
                            checked={isChecked}
                            onCheckedChange={() => handleToggle(prayer.name.toLowerCase())}
                            className={cn(
                                "w-5 h-5 border-2 data-[state=checked]:bg-[#EFFC76] data-[state=checked]:text-black data-[state=checked]:border-[#EFFC76]",
                                isChecked ? "border-[#EFFC76]" : "border-white/30"
                            )}
                            />
                        </div>
                        );
                    })}
                    </div>
                </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="pt-6 flex flex-col items-center text-center p-4">
                  <Trophy className="w-8 h-8 text-[#EFFC76] mb-2 opacity-80" />
                  <div className="text-2xl font-bold font-mono text-[#EFFC76] mb-1">{stats.totalPrayers}</div>
                  <div className="text-xs text-white/50">Total Prayers</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="pt-6 flex flex-col items-center text-center p-4">
                  <CalendarDays className="w-8 h-8 text-emerald-400 mb-2 opacity-80" />
                  <div className="text-2xl font-bold font-mono text-emerald-400 mb-1">{stats.daysTracked}</div>
                  <div className="text-xs text-white/50">Days Active</div>
                </CardContent>
              </Card>
            </div>

            {/* Chart Section */}
            <Card className="bg-white/5 border-white/10 text-white">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-white/70">Prayer Trends</CardTitle>
                    <Select value={historyRange} onValueChange={setHistoryRange}>
                        <SelectTrigger className="w-[120px] h-8 text-xs bg-white/10 border-white/10 text-white">
                            <SelectValue placeholder="Range" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1E1E1E] border-white/10 text-white">
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="1m">Last 30 Days</SelectItem>
                            <SelectItem value="6m">Last 6 Months</SelectItem>
                            <SelectItem value="1y">Last Year</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent>
                    <div className="h-[250px] w-full mt-4 bg-black/20 rounded-xl p-4 border border-white/5">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart
                                data={chartData}
                                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                                barSize={historyRange === '7d' ? 48 : 16}
                            >
                                <defs>
                                    <linearGradient id="prayerBarGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#EFFC76" stopOpacity={0.8} />
                                        <stop offset="90%" stopColor="#EFFC76" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <XAxis 
                                    dataKey="shortDate" 
                                    stroke="rgba(255,255,255,0.2)" 
                                    tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 10}} 
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                    interval={historyRange === '1m' ? 2 : 'preserveStartEnd'}
                                />
                                <YAxis 
                                    hide 
                                    domain={[0, 6]} // Slightly higher domain for visual breathing room (max is 5)
                                />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#1E1E1E', borderColor: 'rgba(255,255,255,0.1)', color: '#fff'}}
                                    itemStyle={{color: '#EFFC76'}}
                                    cursor={{fill: 'transparent'}}
                                    formatter={(value) => [`${value} Prayers`, undefined]}
                                    labelStyle={{color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem'}}
                                />
                                <Bar 
                                    dataKey="count" 
                                    fill="url(#prayerBarGradient)" 
                                    radius={[50, 50, 50, 50]}
                                    background={{ fill: 'rgba(255,255,255,0.05)', radius: [50, 50, 50, 50] }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#EFFC76"
                                    strokeWidth={2}
                                    strokeDasharray="4 4"
                                    dot={{ r: 4, stroke: "white", strokeWidth: 2, fill: "#EFFC76" }}
                                    activeDot={{ r: 6, stroke: 'white', strokeWidth: 2, fill: '#EFFC76' }}
                                    isAnimationActive={true}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            
            {/* Spiritual Insight Card */}
            {currentQuote && (
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-emerald-900/20 to-black p-6">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Quote className="w-24 h-24 text-white" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] uppercase tracking-wider font-bold border border-emerald-500/20">
                                {currentQuote.type}
                            </span>
                        </div>
                        <p className="text-lg font-medium text-white/90 italic mb-4 leading-relaxed">
                            "{currentQuote.text}"
                        </p>
                        <p className="text-sm text-white/50 font-mono border-t border-white/10 pt-3 inline-block">
                            — {currentQuote.source}
                        </p>
                    </div>
                </div>
            )}
            
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
