export function formatTime(ms) {
  const hours = String(Math.floor(ms / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor(ms / (1000 * 60)) % 60).padStart(2, "0");
  const seconds = String(Math.floor(ms / 1000) % 60).padStart(2, "0");
  const milliseconds = String(ms % 1000).padStart(3, "0");
  
  return {
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}
