export function getTimeZoneOffset(displayDate, timeZone) {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "shortOffset",
    }).formatToParts(displayDate);

    const offset = parts.find((p) => p.type === "timeZoneName")?.value;

    if (!offset) return "UTC";

    const formatted = offset.replace("GMT", "UTC");
    return formatted === "UTC" ? "UTC+0" : formatted;
  } catch (e) {
    return "UTC";
  }
}
