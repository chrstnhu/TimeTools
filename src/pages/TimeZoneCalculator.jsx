import { useEffect, useState, useMemo } from "react";
import ClockDisplay from "@/components/time/ClockDisplay";
import TimeZoneInput from "@/components/forms/TimeZoneInput";
import Card from "@/components/ui/Card";
import { Switch } from "@/components/ui/switch";
import { timeZones } from "@/constants/timeZones";
import { getTime } from "@/utils/getTime";
import { getTimeZoneOffset } from "@/utils/getTimeZoneOffset";
import { getDifference } from "@/utils/getDifference";

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

  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const zones = useMemo(() => {
    return [
      {
        city: "My Time Zone",
        zone: localTimeZone,
      },

      ...timeZones.filter((item) => item.zone !== localTimeZone),
    ];
  }, [localTimeZone]);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        {/* <StaticTimePickerLandscape /> */}
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h2 className="text-xl font-bold">World Clock</h2>

            <p className="text-sm text-gray-400">
              Check the current time around the world.
            </p>
          </div>

          <TimeZoneInput setCustomTime={setCustomTime} />

          <div className="flex justify-center items-center gap-3">
            <span
              className={!is12Hours ? "font-bold text-lg" : "text-gray-500"}
            >
              24h
            </span>

            <Switch checked={is12Hours} onCheckedChange={setIs12Hours} />

            <span className={is12Hours ? "font-bold text-lg" : "text-gray-500"}>
              12h
            </span>
          </div>
        </div>
      </Card>

      <section
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      "
      >
        {zones.map((item) => {
          const time = getTime(displayDate, item.zone, is12Hours);

          return (
            <Card key={item.zone}>
              <div className="flex flex-col gap-3 text-center">
                <div>
                  <h2 className="text-xl font-bold">{item.city}</h2>

                  <p className="text-sm text-gray-400">
                    {item.zone} ({getTimeZoneOffset(displayDate, item.zone)})
                  </p>
                </div>

                <div className="flex justify-center">
                  <Card className="w-fit">
                    <ClockDisplay time={time} />
                  </Card>
                </div>

                <p className="text-sm text-gray-400">
                  {time.weekday}{" "}
                  {getDifference(displayDate, item.zone, localTimeZone)}
                  <span className="ml-1 text-xs">(from you)</span>
                </p>
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

export default TimeZone;
