"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "squadlog_salah_tracker";

export function useSalahTracker() {
  const [trackerData, setTrackerData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTrackerData(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load salah tracker data:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trackerData));
    }
  }, [trackerData, isLoaded]);

  const togglePrayer = (dateStr, prayerKey) => {
    const todayData = trackerData[dateStr] || {};
    const newStatus = !todayData[prayerKey];

    setTrackerData((prev) => ({
      ...prev,
      [dateStr]: {
        ...prev[dateStr],
        [prayerKey]: newStatus,
      },
    }));

    return newStatus;
  };

  const getStats = () => {
    // Calculate total prayers performed
    let totalPrayers = 0;
    const dates = Object.keys(trackerData).sort(); // Sort dates chronologically

    dates.forEach((date) => {
      const dayData = trackerData[date];
      if (dayData) {
        totalPrayers += Object.values(dayData).filter(Boolean).length;
      }
    });

    // Calculate current streak (consecutive days with at least 1 prayer? or all 5?
    // Let's go with "days with at least 1 prayer" for now as a softer streak,
    // or arguably "all 5" for a strict streak. Let's do "completed all 5" strict streak as a premium metric)
    // Actually, simple streak: consecutive days with ANY activity.

    let currentStreak = 0;
    // TBD: complex streak logic can be added later if needed.
    // For now returning basic verification stats.

    return {
      totalPrayers,
      daysTracked: dates.length,
      currentStreak,
    };
  };

  const getDailyStatus = (date) => {
    // date can be a Date object or YYYY-MM-DD string
    let dKey = date;
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      dKey = `${year}-${month}-${day}`;
    }
    return trackerData[dKey] || {};
  };

  const getHistory = (range = "7d") => {
    // returns array of { date: 'YYYY-MM-DD', count: N }
    // ranges: 7d, 1m, 6m, 1y
    const now = new Date();
    const dataPoints = [];
    let daysToLookBack = 7;

    if (range === "1m") daysToLookBack = 30;
    if (range === "6m") daysToLookBack = 180;
    if (range === "1y") daysToLookBack = 365;

    for (let i = daysToLookBack - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dKey = `${year}-${month}-${day}`;

      const dayData = trackerData[dKey] || {};
      const count = Object.values(dayData).filter(Boolean).length;

      // For chart display, maybe format date differently?
      // Let's stick to standard format for now or short format
      const shortDate = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      dataPoints.push({
        date: dKey,
        shortDate,
        count,
      });
    }
    return dataPoints;
  };

  return {
    trackerData,
    togglePrayer,
    getStats,
    getDailyStatus,
    getHistory,
    isLoaded,
  };
}
