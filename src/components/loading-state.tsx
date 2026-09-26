import { LoaderCircle } from "lucide-react";

export function LoadingState({ label = "Loading workouts…" }: { label?: string }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-20 text-sm text-muted-foreground">
      <LoaderCircle className="size-8 animate-spin text-primary" />
      {label}
    </div>
  );
}
