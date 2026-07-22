export function getTimeZoneOffset(displayDate, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(displayDate);

  return (
    parts.find((p) => p.type === "timeZoneName")?.value.replace("GMT", "UTC") ||
    "UTC"
  );
}
