"use client";
export const instant = false;
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, ListChecks } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const linkClass = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active ? "bg-accent/10 text-accent" : "text-muted hover:text-white"
    }`;

  const isHome = pathname === "/" || pathname.startsWith("/workout");
  const isPlan = pathname === "/my-plan";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto grid h-16 max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
            <span className="font-display text-xl font-bold tracking-wide">
              FitLog
            </span>
          </Link>

          <nav className="hidden justify-center gap-2 sm:flex">
            <Link href="/" className={linkClass(isHome)}>
              Workouts
            </Link>
            <Link href="/my-plan" className={linkClass(isPlan)}>
              My Plan
            </Link>
          </nav>

          <div className="col-start-3 flex items-center gap-3 text-sm">
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-white"
            >
              Plan
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-xs font-bold text-black">
                {plan.length}
              </span>
            </Link>
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-muted"
            >
              Saved
              <span className="grid h-5 min-w-5 place-items-center rounded-full border border-line px-1.5 text-xs text-white">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-bg/95 backdrop-blur sm:hidden">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-3 text-xs ${isHome ? "text-accent" : "text-muted"}`}
        >
          <Dumbbell size={20} /> Workouts
        </Link>
        <Link
          href="/my-plan"
          className={`flex flex-col items-center gap-1 py-3 text-xs ${isPlan ? "text-accent" : "text-muted"}`}
        >
          <ListChecks size={20} /> My Plan
        </Link>
      </nav>
    </>
  );
}
