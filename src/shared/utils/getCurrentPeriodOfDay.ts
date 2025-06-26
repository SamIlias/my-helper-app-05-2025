export const getCurrentPeriodOfDay: () => 'day' | 'night' = () => {
  const currentHour = new Date().getHours();
  return 6 < currentHour && currentHour < 18 ? `day` : 'night';
};
