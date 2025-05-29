// Formats time in milliseconds to MM:SS,cs
// MM = minutes, SS = seconds, cs = centiseconds (1/100th of a second)
export const formatTime = (timeMillis: number): string => {
  const centiseconds = Math.floor((timeMillis % 1000) / 10)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((timeMillis / 1000) % 60)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor(timeMillis / 60000)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${seconds},${centiseconds}`;
};
