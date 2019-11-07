export const getStats = diary => {
  const stats = {
    totalDays: 0,
    totalWords: 0,
    avarageWordsPerDay: 0
  };

  diary.forEach(day => {
    stats.totalDays++;
    stats.totalWords += day.text.split(" ").length;
  });

  stats.avarageWordsPerDay =
    Math.round(stats.totalWords / stats.totalDays) || 0;

  return stats;
};
