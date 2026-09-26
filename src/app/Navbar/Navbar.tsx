"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePlan } from "@/context/plan-context";

export function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const onWorkouts = pathname === "/" || pathname.startsWith("/workout");
  const onPlan = pathname.startsWith("/my-plan");

  const navLink = (active: boolean) =>
    cn(
      "rounded-full px-3 py-1 text-[11px] font-semibold transition-colors",
      active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
    );

  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-border pb-4">
      <Link href="/" className="inline-flex items-center gap-1.5 font-heading text-sm font-bold tracking-[0.08em]">
        <img src="/assets/logo.png" alt="" className="size-4" />
        FITLOG
      </Link>

      <nav className="flex items-center gap-1">
        <Link href="/" className={navLink(onWorkouts)}>
          Workouts
        </Link>
        <Link href="/my-plan" className={navLink(onPlan)}>
          My Plan
        </Link>
      </nav>

      <div className="flex items-center justify-end gap-4 text-[11px] font-semibold">
        <Link href="/my-plan" className="inline-flex items-center gap-1.5">
          Plan
          <span className="grid size-4.5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
            {plan.length}
          </span>
        </Link>
        <Link href="/my-plan?tab=saved" className="inline-flex items-center gap-1.5 text-muted-foreground">
          Saved
          <span className="grid size-4.5 place-items-center rounded-full bg-secondary text-[10px] text-foreground ring-1 ring-border">
            {saved.length}
          </span>
        </Link>
      </div>
    </header>
  );
}
