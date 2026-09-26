"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Bookmark, CalendarPlus } from "lucide-react";
import { toast } from "sonner";
import type { Workout } from "@/data/workouts";
import { getWorkout } from "@/lib/workouts-api";
import { LoadingState } from "@/components/loading-state";
import { PLAN_LIMIT, usePlan } from "@/context/plan-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { plan, saved, addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    getWorkout(Number(params.id))
      .then(setWorkout)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <LoadingState label="Loading workout…" />;
  if (!workout) return <p className="mt-10 text-sm text-muted-foreground">Workout not found.</p>;

  const inPlan = plan.includes(workout.id);
  const isSaved = saved.includes(workout.id);
  const planFull = plan.length >= PLAN_LIMIT;

  const handleAdd = () => {
    const result = addToPlan(workout.id);
    if (result === "added") toast.success("Added to today's plan", { description: workout.name });
    else if (result === "exists") toast.info("Already in today's plan");
    else toast.error(`Today's plan is full (${PLAN_LIMIT} lifts max)`);
  };

  const handleSave = () => {
    const result = saveForLater(workout.id);
    if (result === "added") toast.success("Saved for later", { description: workout.name });
    else toast.info("Already saved");
  };

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
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <img src={workout.image} alt="" className="aspect-4/5 w-full rounded-2xl object-cover lg:max-h-[560px]" />
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-[0.01em] uppercase">{workout.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{workout.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <Badge key={group} className="rounded-full px-2.5 text-[10px] font-bold">
              {group}
            </Badge>
          ))}
        </div>
        <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
          {specs.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 px-4 py-3 text-xs">
              <dt className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <h2 className="mt-8 font-heading text-base font-bold tracking-[0.04em]">INSTRUCTIONS</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          {workout.instructions.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={handleAdd} disabled={inPlan || planFull} className="h-9 rounded-lg px-4">
            <CalendarPlus />
            {inPlan ? "In today's plan" : planFull ? "Plan is full" : "Add to today's plan"}
          </Button>
          <Button variant="outline" onClick={handleSave} disabled={isSaved} className="h-9 rounded-lg px-4">
            <Bookmark />
            {isSaved ? "Saved" : "Save for later"}
          </Button>
        </div>
      </div>
    </div>
  );
}
