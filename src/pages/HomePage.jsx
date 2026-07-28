import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import { menuItems } from "@/constants/menuItems";

function HomePage() {
  const filteredMenuItems = menuItems.filter((item) => item.path !== "/");

  return (
    <div className="mx-auto max-w-6xl p-6 flex justify-center items-center">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.path} to={item.path} className="group outline-none">
              <Card
                className="
                  h-50
                  p-7
                  flex
                  flex-col
                  items-start
                  justify-center
                  gap-4
                  cursor-pointer
                  border-2
                  border-[var(--border)]
                  rounded-3xl
                  bg-[var(--surface)]
                  shadow-md
                  transition-all
                  duration-300
                  hover:-translate-y-1.5
                  hover:shadow-xl
                  hover:border-[var(--primary)]/50
                  hover:bg-[var(--surface-hover)]
                "
              >
                {/* Icon Container with subtle glow on hover */}
                <div
                  className="
                    rounded-2xl
                    bg-[var(--primary)]/10
                    p-4
                    text-[var(--primary)]
                    transition-all
                    duration-300
                    group-hover:bg-[var(--primary)]
                    group-hover:text-white
                    group-hover:scale-110
                    group-hover:shadow-md
                  "
                >
                  <Icon size={28} />
                </div>

                <div className="flex flex-col">
                  <p className="font-bold text-2xl text-start text-[var(--text-title)] transition-colors ">
                    {item.name}
                  </p>

                  {item.label && (
                    <p className="font-medium text-sm text-start text-[var(--text)] opacity-75">
                      {item.label}
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
