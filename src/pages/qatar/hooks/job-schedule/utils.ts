
export const generateUniqueScheduleNumber = (): string => {
  const timestamp = new Date().getTime();
  return `${timestamp % 10000}${Math.floor(Math.random() * 1000)}`;
};
