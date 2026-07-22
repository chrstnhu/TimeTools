export function getTime(displayDate, timeZone, is12Hours) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(displayDate);

  const get = (type) => parts.find((p) => p.type === type)?.value;

  const hour24 = Number(get("hour"));

  return {
    hour: is12Hours ? hour24 % 12 || 12 : hour24,
    minute: get("minute"),
    second: get("second"),
    period: is12Hours ? (hour24 >= 12 ? "PM" : "AM") : "",
    weekday: new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "long",
    }).format(displayDate),
    isDay: hour24 >= 6 && hour24 < 18,
  };
}