import { useEffect, useState } from "react";
import ClockDisplay from "@/components/ui/ClockDisplay";
import TimeZoneInput from "@/components/calculator/TimeZoneInput";
import { Switch } from "@/components/ui/switch";

const timeZones = [
  { city: "London", zone: "Europe/London" },
  { city: "Paris", zone: "Europe/Paris" },
  { city: "Moscow", zone: "Europe/Moscow" },
  { city: "Dubai", zone: "Asia/Dubai" },
  { city: "Shanghai", zone: "Asia/Shanghai" },
  { city: "Tokyo", zone: "Asia/Tokyo" },
  { city: "Sydney", zone: "Australia/Sydney" },
  { city: "New York", zone: "America/New_York" },
  { city: "Chicago", zone: "America/Chicago" },
  { city: "Los Angeles", zone: "America/Los_Angeles" },
];

function TimeZone() {
  const [date, setDate] = useState(new Date());
  const [is12Hours, setIs12Hours] = useState(false);
  const [customTime, setCustomTime] = useState(null);
  const displayDate = customTime ?? date;

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getTime(timeZone) {
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

      period: hour24 >= 12 ? "PM" : "AM",

      weekday: new Intl.DateTimeFormat("en-US", {
        timeZone,
        weekday: "long",
      }).format(displayDate),

      // ☀️ day / 🌙 night
      isDay: hour24 >= 6 && hour24 < 18,
    };
  }

  function getTimeZoneOffset(timeZone) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "shortOffset",
    }).formatToParts(displayDate);

    return (
      parts
        .find((p) => p.type === "timeZoneName")
        ?.value.replace("GMT", "UTC") || "UTC"
    );
  }

  function getDifference(timeZone) {
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

  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const zones = [
    { city: "My Time Zone", zone: localTimeZone, isLocal: true },
    ...timeZones.filter((item) => item.zone !== localTimeZone),
  ];

  return (
    <div className="clock text-white text-center align-center">
      <label> Try time in different countries</label>
      <TimeZoneInput setCustomTime={setCustomTime} />

      <div className="flex items-center justify-center space-x-2">
        <span className={`text-sm ${!is12Hours ? 'text-white font-bold text-xl' : 'text-gray-500'}`}>24h</span>
        <Switch checked={is12Hours} onCheckedChange={setIs12Hours} />
        <span className={`text-sm ${is12Hours ? 'text-white font-bold text-xl' : 'text-gray-500'}`}>12h</span>
      </div>

      <section
        className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        gap-6 
        m-6
      "
      >
        {zones.map((item) => {
          const time = getTime(item.zone);

          return (
            <div
              key={item.zone}
              className="
              rounded-lg
              bg-[var(--surface)]
              p-5
            "
            >
              <div className="items-center">
                <div>
                  <h2 className="text-xl font-bold">{item.city}</h2>

                  <p className="text-sm text-gray-400">
                    {item.zone} ({getTimeZoneOffset(item.zone)})
                  </p>
                </div>
              </div>

              <ClockDisplay time={time} />

              <p className="text-sm text-gray-400">
                {time.weekday} {getDifference(item.zone)}
                <span className="text-xs text-gray-500 ml-1">(from you)</span>
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default TimeZone;
