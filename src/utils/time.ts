export const convertToTimezone = (timezoneOffsetSeconds: number): string => {
  const currentUTC = new Date(
    Date.now() + new Date().getTimezoneOffset() * 60000,
  );
  const localTime = new Date(
    currentUTC.getTime() + timezoneOffsetSeconds * 1000,
  );
  return localTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const dayFromDate = (dateString?: string): string => {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {weekday: 'long'};
  return new Intl.DateTimeFormat('en-US', options).format(date);
};
