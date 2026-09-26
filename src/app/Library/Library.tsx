"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/data/workouts";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type SortKey = "duration" | "calories" | "rating";

export function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data: Workout[]) => setWorkouts(data))
      .finally(() => setLoading(false));
  }, []);

  const sorted = useMemo(() => {
    const list = [...workouts];
    if (sortBy === "calories") return list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    if (sortBy === "rating") return list.sort((a, b) => b.rating - a.rating);
    return list.sort((a, b) => b.duration - a.duration);
  }, [workouts, sortBy]);

  if (loading) {
    return <p className="mt-10 text-sm text-muted-foreground">Loading workouts…</p>;
  }

  return (
    <section id="library" className="mt-10 scroll-mt-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold tracking-[0.14em]">THE LIBRARY</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <label className="relative text-[11px] text-muted-foreground">
          Sort By
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortKey)}
            className="mt-1 block appearance-none rounded-md border border-border bg-card py-1.5 pr-7 pl-2 text-foreground"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 bottom-2 size-3.5" />
        </label>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((workout) => (
          <Link key={workout.id} href={`/workout/${workout.id}`}>
            <Card size="sm" className="rounded-2xl pt-0 transition-[box-shadow,ring-color] hover:ring-primary/40">
              <div className="relative aspect-16/11">
                <img src={workout.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 bg-linear-to-t from-black/80 to-transparent px-3 pt-8 pb-3">
                  {workout.muscleGroups.map((group) => (
                    <Badge key={group} className="h-4 rounded-full px-2 text-[9px] font-bold tracking-[0.08em]">
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
              <CardFooter className="gap-3 border-0 bg-transparent pt-0 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="size-3.5" />{workout.duration} min</span>
                <span className="inline-flex items-center gap-1"><Flame className="size-3.5" />{workout.caloriesBurned} kcal</span>
                <span className="inline-flex items-center gap-1"><Star className="size-3.5" />{workout.rating.toFixed(1)}</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}