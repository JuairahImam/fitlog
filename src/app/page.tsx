import type { ReactNode } from "react";
import { Bookmark, Clock, Flame, Star } from "lucide-react";
import { workouts } from "@/data/workouts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold tracking-[0.16em] ${compact ? "text-[11px]" : "text-xs"}`}
    >
      <img src="/assets/logo.png" alt="" className="size-4" />
      FITLOG
    </span>
  );
}

function Stat({
  icon,
  label,
  tip,
}: {
  icon: ReactNode;
  label: string;
  tip: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger className="inline-flex items-center gap-1 rounded-md text-[11px] text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
        {icon}
        {label}
      </TooltipTrigger>
      <TooltipContent>{tip}</TooltipContent>
    </Tooltip>
  );
}

export default function Home() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <div className="mx-auto flex min-h-full w-full max-w-270 flex-col px-5 py-6 sm:px-8">
        <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Logo />
          <nav className="flex items-center gap-1">
            <Button size="xs" className="rounded-full px-3 font-semibold">
              Workouts
            </Button>
            <Button size="xs" variant="ghost" className="text-muted-foreground">
              My Plan
            </Button>
          </nav>
          <div className="flex items-center justify-end gap-1">
            <Button size="xs" variant="ghost">
              <span className="size-2 rounded-full bg-primary" />
              Plan
            </Button>
            <Button size="xs" variant="ghost" className="text-muted-foreground">
              <Bookmark />
              Saved
            </Button>
          </div>
        </header>

        <Card className="mt-6 rounded-3xl py-0">
          <div className="grid items-center gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1.35fr_0.75fr]">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] text-primary">
                WORKOUT LIBRARY
              </p>
              <h1 className="mt-4 text-[2.35rem] font-extrabold leading-[0.92] tracking-[-0.035em] text-foreground sm:text-[2.85rem]">
                TRAIN WITH INTENT. LOG
                <br />
                EVERY SET.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                FitLog is a dark, no-nonsense gym companion: pick a lift, tack it into today&apos;s
                plan, and watch the week&apos;s work add up.
              </p>
              <Button
                nativeButton={false}
                render={<a href="#library" />}
                size="sm"
                className="mt-6 h-8 w-fit rounded-md px-3.5 text-[11px] font-bold tracking-[0.08em]"
              >
                BROWSE WORKOUTS
              </Button>
            </div>
            <div className="hidden h-56 lg:block">
              <img
                src="/assets/banner.png"
                alt=""
                className="h-full w-full object-contain object-right"
              />
            </div>
          </div>
        </Card>

        <section id="library" className="mt-10 scroll-mt-6">
          <h2 className="text-sm font-bold tracking-[0.14em]">THE LIBRARY</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Twelve lifts covering every major muscle group.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <Card
                key={workout.id}
                size="sm"
                className="rounded-2xl pt-0 transition-[box-shadow,ring-color] hover:ring-primary/40"
              >
                <div className="relative aspect-16/11">
                  <img src={workout.image} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 bg-linear-to-t from-black/80 to-transparent px-3 pt-8 pb-3">
                    {workout.muscleGroups.map((group) => (
                      <Badge
                        key={group}
                        className="h-4 rounded-full px-2 text-[9px] font-bold tracking-[0.08em]"
                      >
                        {group.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardHeader className="pb-0">
                  <CardTitle className="text-[13px] font-bold tracking-[0.04em] uppercase">
                    {workout.name}
                  </CardTitle>
                  <CardDescription className="text-[11px]">{workout.equipment}</CardDescription>
                </CardHeader>
                <CardFooter className="gap-3 border-0 bg-transparent pt-0">
                  <Stat
                    icon={<Clock />}
                    label={`${workout.duration} min`}
                    tip={`${workout.duration} minute session`}
                  />
                  <Stat
                    icon={<Flame />}
                    label={`${workout.caloriesBurned} kcal`}
                    tip={`${workout.caloriesBurned} calories`}
                  />
                  <Stat
                    icon={<Star />}
                    label={workout.rating.toFixed(1)}
                    tip={`Rated ${workout.rating.toFixed(1)} out of 5`}
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <footer className="mt-12">
          <Separator />
          <div className="flex items-center justify-between gap-4 py-5 text-muted-foreground">
            <Logo compact />
            <p className="text-[10px] sm:text-[11px]">
              © 2026 FitLog — Workout library. Train hard, log honest.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
