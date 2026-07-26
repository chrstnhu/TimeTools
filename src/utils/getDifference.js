export function getDifference(displayDate, timeZone, localTimeZone) {
  try {
    const getOffsetInMinutes = (tz) => {
      const dateString = displayDate.toLocaleString("en-US", { timeZone: tz });
      const timeZoneDate = new Date(dateString);
      const utcDate = new Date(
        displayDate.toLocaleString("en-US", { timeZone: "UTC" }),
      );
      return (timeZoneDate - utcDate) / (1000 * 60);
    };

    const targetOffset = getOffsetInMinutes(timeZone);
    const localOffset = getOffsetInMinutes(localTimeZone);

    const diffHours = (targetOffset - localOffset) / 60;

    if (diffHours === 0) return "same time";
    return diffHours > 0 ? `+${diffHours}h` : `${diffHours}h`;
  } catch (e) {
    return "";
  }
}
