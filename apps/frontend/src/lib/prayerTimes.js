import { Coordinates, CalculationMethod, PrayerTimes as AdhanPrayerTimes } from 'adhan';

/**
 * Get prayer times for a specific location and date
 * 
 * @param {Date} date - Date to get prayer times for
 * @param {Object} location - Location coordinates {latitude, longitude}
 * @returns {Object} Prayer times object
 */
export function getPrayerTimes(date = new Date(), location = { latitude: 23.8103, longitude: 90.4125 }) {
  try {
    // Default location: Dhaka, Bangladesh
    const coordinates = new Coordinates(location.latitude, location.longitude);
    const params = CalculationMethod.Karachi(); // Good for Bangladesh/South Asia
    const prayerTimes = new AdhanPrayerTimes(coordinates, date, params);

    return {
      fajr: prayerTimes.fajr,
      dhuhr: prayerTimes.dhuhr,
      asr: prayerTimes.asr,
      maghrib: prayerTimes.maghrib,
      isha: prayerTimes.isha,
      sunrise: prayerTimes.sunrise,
      date: date
    };
  } catch (error) {
    console.error("Error calculating prayer times:", error);
    return null;
  }
}

/**
 * Get the next upcoming prayer
 * 
 * @param {Object} prayerTimes - Prayer times object
 * @returns {Object} Next prayer {name, time, arabicName}
 */
export function getNextPrayer(prayerTimes) {
  if (!prayerTimes) return null;
  
  const now = new Date();
  const prayers = [
    { name: 'Fajr', arabicName: 'الفجر', time: prayerTimes.fajr },
    { name: 'Dhuhr', arabicName: 'الظهر', time: prayerTimes.dhuhr },
    { name: 'Asr', arabicName: 'العصر', time: prayerTimes.asr },
    { name: 'Maghrib', arabicName: 'المغرب', time: prayerTimes.maghrib },
    { name: 'Isha', arabicName: 'العشاء', time: prayerTimes.isha }
  ];

  // Find next prayer
  for (const prayer of prayers) {
    if (prayer.time > now) {
      return prayer;
    }
  }

  // If all prayers passed, return tomorrow's Fajr
  try {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowPrayers = getPrayerTimes(tomorrow);
    
    if (tomorrowPrayers) {
      return {
        name: 'Fajr',
        arabicName: 'الفجر',
        time: tomorrowPrayers.fajr
      };
    }
  } catch (e) {
    console.error("Error getting next day prayer", e);
  }
  
  return null;
}

/**
 * Get time remaining until a specific prayer
 * 
 * @param {Date} prayerTime - Prayer time
 * @returns {Object} Time remaining {hours, minutes, seconds, totalMinutes}
 */
export function getTimeUntilPrayer(prayerTime) {
  if (!prayerTime) return { hours: 0, minutes: 0, seconds: 0, totalMinutes: 0 };
  
  const now = new Date();
  const diff = prayerTime - now;

  if (diff < 0) {
    return { hours: 0, minutes: 0, seconds: 0, totalMinutes: 0 };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const totalMinutes = Math.floor(diff / (1000 * 60));

  return { hours, minutes, seconds, totalMinutes };
}

/**
 * Get Islamic (Hijri) date
 * 
 * @param {Date} date - Gregorian date
 * @returns {string} Formatted Hijri date
 */
export function getIslamicDate(date = new Date()) {
  try {
    // Use Intl API for Islamic calendar
    return new Intl.DateTimeFormat('en-US-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    console.error("Error formatting Islamic date:", error);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  }
}

/**
 * Format time for display
 * 
 * @param {Date} time - Time to format
 * @returns {string} Formatted time (12-hour format)
 */
export function formatPrayerTime(time) {
  if (!time) return "";
  try {
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (e) {
    return "";
  }
}

/**
 * Check if it's time to send prayer reminder (10 minutes before)
 * 
 * @param {Date} prayerTime - Prayer time
 * @returns {boolean} True if should send reminder
 */
export function shouldSendReminder(prayerTime) {
  if (!prayerTime) return false;
  const now = new Date();
  const diff = prayerTime - now;
  const minutesUntil = Math.floor(diff / (1000 * 60));
  
  // Send reminder exactly 10 minutes before
  return minutesUntil === 10;
}

/**
 * Get all prayer times formatted for display
 * 
 * @param {Object} prayerTimes - Prayer times object
 * @returns {Array} Array of prayer objects with formatted times
 */
export function getFormattedPrayerTimes(prayerTimes) {
  if (!prayerTimes) return [];
  return [
    {
      name: 'Fajr',
      arabicName: 'الفجر',
      time: prayerTimes.fajr,
      formatted: formatPrayerTime(prayerTimes.fajr)
    },
    {
      name: 'Dhuhr',
      arabicName: 'الظهر',
      time: prayerTimes.dhuhr,
      formatted: formatPrayerTime(prayerTimes.dhuhr)
    },
    {
      name: 'Asr',
      arabicName: 'العصر',
      time: prayerTimes.asr,
      formatted: formatPrayerTime(prayerTimes.asr)
    },
    {
      name: 'Maghrib',
      arabicName: 'المغرب',
      time: prayerTimes.maghrib,
      formatted: formatPrayerTime(prayerTimes.maghrib)
    },
    {
      name: 'Isha',
      arabicName: 'العشاء',
      time: prayerTimes.isha,
      formatted: formatPrayerTime(prayerTimes.isha)
    }
  ];
}
