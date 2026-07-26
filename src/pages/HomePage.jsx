import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import { menuItems } from "@/constants/menuItems";

function HomePage() {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.path} to={item.path} className="group outline-none">
              <Card
                className="
                  h-48
                  p-6
                  flex
                  flex-col
                  items-center
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
                  <Icon size={32} />
                </div>

                <p className="text-center font-bold text-base text-[var(--text)] transition-colors group-hover:text-[var(--primary)]">
                  {item.name}
                </p>
                <p
                  className="
                  text-center 
                  font-medium 
                  text-sm 
                  text-[var(--text)] 
                  opacity-0
                  translate-y-2
                  transition-colors 
                  group-hover:opacity-100
                  group-hover:translate-y-0
                  "
                >
                  {item.label}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
