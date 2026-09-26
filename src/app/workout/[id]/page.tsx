"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Bookmark, Plus } from "lucide-react";
import type { Workout } from "@/data/workouts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${params.id}`)
      .then((res) => res.json())
      .then((data: Workout) => setWorkout(data))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <p className="mt-10 text-sm text-muted-foreground">Loading workouts…</p>;
  if (!workout) return <p className="mt-10 text-sm text-muted-foreground">Workout not found.</p>;

  const specs = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", String(workout.sets)],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.caloriesBurned} kcal`],
    ["RATING", workout.rating.toFixed(1)],
  ];

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <img src={workout.image} alt="" className="h-full max-h-[560px] w-full rounded-3xl object-cover" />
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight uppercase">{workout.name}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{workout.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <Badge key={group}>{group}</Badge>
          ))}
        </div>
        <dl className="mt-6 divide-y divide-border rounded-2xl border border-border">
          {specs.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
              <dt className="text-[11px] tracking-[0.12em] text-muted-foreground">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mt-6 text-xs font-bold tracking-[0.14em]">INSTRUCTIONS</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          {workout.instructions.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button>
            <Plus />
            Add to today&apos;s plan
          </Button>
          <Button variant="outline">
            <Bookmark />
            Save for later
          </Button>
        </div>
      </div>
    </div>
  );
}