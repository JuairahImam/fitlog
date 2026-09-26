"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Clock, Flame, Star, X } from "lucide-react";
import { toast } from "sonner";
import type { Workout } from "@/data/workouts";
import { getWorkouts } from "@/lib/workouts-api";
import { usePlan } from "@/context/plan-context";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/loading-state";
import { cn } from "@/lib/utils";

type Tab = "plan" | "saved";
type SortKey = "duration" | "calories" | "rating";

export function MyPlan({ initialTab }: { initialTab: Tab }) {
  const { plan, saved, done, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>(initialTab);
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .finally(() => setLoading(false));
  }, []);

  const planWorkouts = workouts.filter((workout) => plan.includes(workout.id));
  const savedWorkouts = workouts.filter((workout) => saved.includes(workout.id));
  const minutes = planWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
  const calories = planWorkouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);

  const sorted = [...(tab === "plan" ? planWorkouts : savedWorkouts)].sort((a, b) => {
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.duration - a.duration;
  });

  const handleRemove = (workout: Workout) => {
    if (tab === "plan") removeFromPlan(workout.id);
    else removeFromSaved(workout.id);
    toast(`Removed ${workout.name}`);
  };

  const handleDone = (workout: Workout) => {
    markDone(workout.id);
    toast.success("Nice work!", { description: `${workout.name} marked as done` });
  };

  const stats = [
    { label: "Exercises", value: plan.length, highlight: true },
    { label: "Minutes", value: minutes },
    { label: "Calories", value: calories },
  ];

  return (
    <div className="mt-8">
      <h1 className="font-heading text-3xl font-bold">MY PLAN</h1>
      <p className="mt-1 text-xs text-muted-foreground">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-6 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-card">
        {stats.map((stat) => (
          <div key={stat.label} className="px-5 py-4">
            <p className="text-[11px] text-muted-foreground">{stat.label}</p>
            <p className={cn("mt-1 font-heading text-3xl font-bold", stat.highlight && "text-primary")}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="inline-flex rounded-lg border border-border bg-card p-1 text-[11px] font-semibold">
          {(["plan", "saved"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                "rounded-md px-3 py-1.5 transition-colors",
                tab === key ? "bg-secondary text-foreground ring-1 ring-border" : "text-muted-foreground"
              )}
            >
              {key === "plan" ? "Today's Plan" : "Saved"}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-[11px] text-muted-foreground">
          Sort By
          <span className="relative">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortKey)}
              className="appearance-none rounded-md border border-border bg-card py-1.5 pr-7 pl-2 text-foreground"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2" />
          </span>
        </label>
      </div>

      {loading ? (
        <LoadingState />
      ) : sorted.length === 0 ? (
        <div className="mt-4 flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-20 text-center">
          <h2 className="font-heading text-lg font-bold">NOTHING HERE YET</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Browse the library and add a lift to get today moving.
          </p>
          <Button nativeButton={false} render={<Link href="/" />} className="mt-5 rounded-full px-5">
            Go to workouts
          </Button>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {sorted.map((workout) => {
            const isDone = done.includes(workout.id);
            return (
              <li
                key={workout.id}
                className={cn(
                  "flex items-center gap-4 rounded-2xl border border-border bg-card p-3",
                  isDone && "opacity-60"
                )}
              >
                <img src={workout.image} alt="" className="h-14 w-24 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-heading text-sm font-bold uppercase">{workout.name}</h3>
                  <p className="text-[11px] text-muted-foreground">{workout.equipment}</p>
                  <div className="mt-1 flex gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock className="size-3" />{workout.duration} min</span>
                    <span className="inline-flex items-center gap-1"><Flame className="size-3" />{workout.caloriesBurned} kcal</span>
                    <span className="inline-flex items-center gap-1"><Star className="size-3" />{workout.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={<Link href={`/workout/${workout.id}`} />}
                    className="rounded-full"
                  >
                    View Details
                  </Button>
                  {tab === "plan" && (
                    <Button size="sm" onClick={() => handleDone(workout)} disabled={isDone} className="rounded-full">
                      <Check />
                      {isDone ? "Done" : "Mark as Done"}
                    </Button>
                  )}
                  <button
                    onClick={() => handleRemove(workout)}
                    aria-label={`Remove ${workout.name}`}
                    className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
