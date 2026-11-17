export function calculateStreak(lastActiveDate: string | null, today: Date = new Date()) {
  if (!lastActiveDate) {
    return 0;
  }

  const lastActive = new Date(lastActiveDate);
  const current = new Date(today);
  current.setHours(0, 0, 0, 0);
  lastActive.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (current.getTime() - lastActive.getTime()) / (24 * 60 * 60 * 1000),
  );

  return diffDays >= 0 ? diffDays : 0;
}

export function getTodayString(date: Date = new Date()) {
  return date.toISOString().slice(0, 10);
}
