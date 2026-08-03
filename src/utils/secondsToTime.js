export function secondsToTime(totalSeconds) {
  const total = {
    h: Math.floor(totalSeconds / 3600),
    m: Math.floor((totalSeconds % 3600) / 60),
    s: totalSeconds % 60,
  };

  const days = {
    d: Math.floor(totalSeconds / (24 * 3600)),
    h: Math.floor((totalSeconds % (24 * 3600)) / 3600),
    m: Math.floor((totalSeconds % 3600) / 60),
    s: totalSeconds % 60,
  };

  const hours = {
    h: Math.floor(totalSeconds / 3600),
    m: Math.floor((totalSeconds % 3600) / 60),
    s: totalSeconds % 60,
  };

  const minutes = {
    m: Math.floor(totalSeconds / 60),
    s: totalSeconds % 60,
  };

  const seconds = {
    s: totalSeconds,
  };

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}