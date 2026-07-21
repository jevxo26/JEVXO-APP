export const encouragingQuotes = [
  {
    text: "The prayer is the pillar of religion.",
    source: "Al-Tirmidhi",
    type: "Hadith"
  },
  {
    text: "Between a man and shirk and kufr there stands his neglect of the prayer.",
    source: "Sahih Muslim",
    type: "Hadith"
  },
  {
    text: "The first thing for which a servant of Allah will be held accountable on the Day of Judgment is his prayer.",
    source: "Sunan an-Nasa'i",
    type: "Hadith"
  },
  {
    text: "Verily, the prayer keeps one away from the great sins and evil deeds.",
    source: "Surah Al-Ankabut 29:45",
    type: "Quran"
  },
  {
    text: "Successful indeed are the believers, those who humble themselves in their prayers.",
    source: "Surah Al-Mu'minun 23:1-2",
    type: "Quran"
  },
  {
    text: "And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive.",
    source: "Surah Al-Baqarah 2:45",
    type: "Quran"
  }
];

export const advisoryQuotes = [
  {
    text: "Do not neglect your prayers, for it is the connection between you and your Lord.",
    source: "General Advice",
    type: "Advice"
  },
  {
    text: "Establish prayer, for prayer restrains from shameful and unjust deeds.",
    source: "Surah Al-Ankabut 29:45",
    type: "Quran"
  },
  {
    text: "The covenant between us and them is prayer, so whoever abandons it has committed disbelief.",
    source: "Sunan Ibn Majah",
    type: "Hadith"
  },
  {
    text: "Woe to those who pray, but are heedless of their prayer.",
    source: "Surah Al-Ma'un 107:4-5",
    type: "Quran"
  },
  {
    text: "Guard strictly your (habit of) prayers...",
    source: "Surah Al-Baqarah 2:238",
    type: "Quran"
  }
];

export function getQuote(performanceScore) {
  // performanceScore is a percent (0-100)
  // If score > 70, return encouraging quote (positive reinforcement)
  // If score <= 70, return advisory quote (gentle reminder/warning)
  
  if (performanceScore >= 70) {
    const randomIndex = Math.floor(Math.random() * encouragingQuotes.length);
    return encouragingQuotes[randomIndex];
  } else {
    const randomIndex = Math.floor(Math.random() * advisoryQuotes.length);
    return advisoryQuotes[randomIndex];
  }
}
