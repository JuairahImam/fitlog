"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const planCount = 0;
const savedCount = 0;

export function Navbar() {
  const pathname = usePathname();
  const onWorkouts = pathname === "/";
  const onPlan = pathname.startsWith("/my-plan");

  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.16em]">
        <img src="/assets/logo.png" alt="" className="size-4" />
        FITLOG
      </Link>

      <nav className="flex items-center gap-1">
        <Link
          href="/"
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-semibold",
            onWorkouts ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          )}
        >
          Workout
        </Link>
        <Link
          href="/my-plan"
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-semibold",
            onPlan ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          )}
        >
          My Plan
        </Link>
      </nav>

      <div className="flex items-center justify-end gap-2">
        <Link href="/my-plan" className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
          Plan {planCount}
        </Link>
        <Link href="/my-plan" className="rounded-full border border-primary px-2.5 py-1 text-[11px] font-semibold text-primary">
          Saved {savedCount}
        </Link>
      </div>
    </header>
  );
}