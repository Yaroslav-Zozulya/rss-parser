export const generatePubTime = () => {
  const currentDate = new Date();
  const options = {
    weekday: 'short' as const,
    day: '2-digit' as const,
    month: 'short' as const,
    year: '2-digit' as const,
    hour: '2-digit' as const,
    minute: '2-digit' as const,
    second: '2-digit' as const,
    hour12: false,
    timeZoneName: 'short' as const,
  };

  return currentDate.toLocaleString('en-US', options);
};
