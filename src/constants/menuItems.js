import {
  Home,
  Clock,
  Logs,
  Calendars,
  Cake,
  Globe,
  ClockPlus,
  Timer,
} from "lucide-react";

export const menuItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Time Calculator", path: "/time-calculator", icon: Clock },
  {
    name: "Duration Calculator",
    path: "/duration-calculator",
    icon: ClockPlus,
  },
  { name: "Day Calculator", path: "/day-calculator", icon: Logs },
  { name: "Date Calculator", path: "/date-calculator", icon: Calendars },
  { name: "Age Calculator", path: "/age-calculator", icon: Cake },
  { name: "Time Zone", path: "/time-zone", icon: Globe },
  { name: "Chronometer", path: "/chronometer", icon: Timer },
];