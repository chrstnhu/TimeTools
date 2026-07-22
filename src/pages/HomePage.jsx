import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import { menuItems } from "@/constants/menuItems";

function HomePage() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link key={item.path} to={item.path}>
            <Card
              className="
                h-44
                flex
                flex-col
                items-center
                justify-center
                gap-4
                cursor-pointer
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-xl
                hover:bg-[var(--surface-hover)]
              "
            >
              <div className="rounded-full bg-[var(--primary)]/40 p-5">
                <Icon
                  size={38}
                  className="text-[var(--text)]"
                />
              </div>

              <p className="text-center font-semibold text-lg">
                {item.name}
              </p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export default HomePage;
