import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import { menuItems } from "@/constants/menuItems";
import { motion } from "framer-motion";

function HomePage() {
  const filteredMenuItems = menuItems.filter(
    (item) => item.path !== "/"
  );

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl items-center justify-center p-3 sm:p-6">
      <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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
              className="w-full min-w-0"
            >
              <Link
                to={item.path}
                className="group block h-full w-full min-w-0 outline-none"
              >
                <Card
                  className="
                    flex h-50 w-full min-w-0
                    flex-col items-center justify-center gap-4
                    overflow-hidden
                    rounded-3xl border-2
                    border-[var(--border)]
                    bg-[var(--surface)]
                    p-5 sm:p-7
                    shadow-md
                    transition-all duration-300
                    cursor-pointer
                    hover:-translate-y-1.5
                    hover:border-[var(--primary)]/50
                    hover:bg-[var(--surface-hover)]
                    hover:shadow-xl
                    sm:items-start
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      shrink-0 rounded-2xl
                      bg-[var(--primary)]/10
                      p-4 text-[var(--primary)]
                      transition-all duration-300
                      group-hover:scale-110
                      group-hover:bg-[var(--primary)]
                      group-hover:text-white
                      group-hover:shadow-md
                    "
                  >
                    <Icon size={28} />
                  </div>

                  {/* Text */}
                  <div className="flex w-full min-w-0 flex-col">
                    <p className="break-words text-center text-2xl font-bold text-[var(--text-title)] transition-colors sm:text-start">
                      {item.name}
                    </p>

                    {item.label && (
                      <p className="break-words text-center text-sm font-medium text-[var(--text)] opacity-75 sm:text-start">
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