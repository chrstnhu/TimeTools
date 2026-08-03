import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import { menuItems } from "@/constants/menuItems";
import { motion } from "framer-motion";

function HomePage() {
  const filteredMenuItems = menuItems.filter((item) => item.path !== "/");

  return (
    <div className="mx-auto max-w-6xl p-6 flex justify-center items-center">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {filteredMenuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.3,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              <Link to={item.path} className="group outline-none block h-full">
                <Card
                  className="
                    h-50
                    p-7
                    flex
                    flex-col
                    items-center
                    sm:items-start
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
                    <p className="font-bold text-2xl text-center sm:text-start text-[var(--text-title)] transition-colors">
                      {item.name}
                    </p>

                    {item.label && (
                      <p className="font-medium text-sm text-center sm:text-start text-[var(--text)] opacity-75">
                        {item.label}
                      </p>
                    )}
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
