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
          Workout
        </Link>
        <Link href="/my-plan" className={navLink(onPlan)}>
          My Plan
        </Link>
      </nav>

      <div className="flex items-center justify-end gap-2 text-[11px] font-semibold">
        <Link href="/my-plan" className="rounded-full bg-primary px-2.5 py-1 text-primary-foreground">
          Plan {plan.length}
        </Link>
        <Link href="/my-plan?tab=saved" className="rounded-full border border-primary px-2.5 py-1 text-primary">
          Saved {saved.length}
        </Link>
      </div>
    </header>
  );
}
