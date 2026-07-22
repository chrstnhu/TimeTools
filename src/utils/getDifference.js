export  function getDifference(displayDate, timeZone, localTimeZone) {
    const localHour = Number(
      new Intl.DateTimeFormat("en-US", {
        timeZone: localTimeZone,
        hour: "numeric",
        hour12: false,
      }).format(displayDate),
    );

    const zoneHour = Number(
      new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "numeric",
        hour12: false,
      }).format(displayDate),
    );

    const diff = zoneHour - localHour;

    return diff >= 0 ? `+${diff}h` : `${diff}h`;
  }