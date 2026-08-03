import { useEffect, useState, useMemo } from "react";
import { useLocation, Navigate } from "react-router-dom";
import ClockDisplay from "@/components/time/ClockDisplay";
import TimeZoneInput from "@/components/forms/TimeZoneInput";
import Card from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { timeZones } from "@/constants/timeZones";
import { getTime } from "@/utils/getTime";
import { getTimeZoneOffset } from "@/utils/getTimeZoneOffset";
import { getDifference } from "@/utils/getDifference";
import PageTitle from "@/components/ui/PageTitle";
import { menuItems } from "@/constants/menuItems";

function TimeZone() {
  const location = useLocation();
  const currentItem = menuItems.find((item) => item.path === location.pathname);

  if (!currentItem) {
    return <Navigate to="/" replace />;
  }

  const [date, setDate] = useState(new Date());
  const [is12Hours, setIs12Hours] = useState(false);
  const [customTime, setCustomTime] = useState(null);

  const displayDate = customTime ?? date;

  useEffect(() => {
    if (customTime) return; // Pause live clock when custom time is set

    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [customTime]);

  const localTimeZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Paris";

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
    <div className="mx-auto max-w-5xl flex flex-col gap-6 p-4">
      {/* ─── HEADER CARD ─── */}
      <Card className="p-8 shadow-md rounded-3xl bg-[var(--surface)]">
        <div className="flex flex-col gap-6">
          <PageTitle
            title={currentItem.title}
            icon={<currentItem.icon />}
            label={currentItem.label}
            withBorder={true}
          />

          <TimeZoneInput setCustomTime={setCustomTime} />

          {/* 12h / 24h Format Switch */}
          <div className="flex justify-center items-center gap-3 pt-2 border-t border-[var(--border)]">
            <span className={!is12Hours ? "font-bold" : "text-gray-500"}>
              24h
            </span>
            <Switch checked={is12Hours} onCheckedChange={setIs12Hours} />
            <span className={is12Hours ? "font-bold" : "text-gray-500"}>
              12h
            </span>
          </div>
        </div>
      </Card>

      {/* ─── TIMEZONE GRID ─── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zones.map((item) => {
          const time = getTime(displayDate, item.zone, is12Hours);

          return (
            <Card
              key={item.zone}
              className="p-6 shadow-sm rounded-3xl transition-all bg-[var(--surface)] hover:border-[var(--primary)]/50 border border-[var(--border)]"
            >
              <div className="flex flex-col gap-4 text-center">
                <div>
                  <h3 className="text-lg font-bold">{item.city}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.zone} ({getTimeZoneOffset(displayDate, item.zone)})
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="border border-[var(--border)] bg-[var(--background)]/50 p-3 rounded-2xl w-fit shadow-inner">
                    <ClockDisplay time={time} />
                  </div>
                </div>

                <p className="text-xs text-gray-400 font-medium">
                  {time.weekday}{" "}
                  <span className="font-semibold text-[var(--text)]">
                    {getDifference(displayDate, item.zone, localTimeZone)}
                  </span>
                  <span className="ml-1 text-[10px] opacity-75">
                    (from you)
                  </span>
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
