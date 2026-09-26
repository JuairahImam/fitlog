import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <p className="font-heading text-7xl font-bold text-primary sm:text-8xl">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold">PAGE NOT FOUND</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        This lift isn&apos;t in the library. Head back and pick another one.
      </p>
      <Button nativeButton={false} render={<Link href="/" />} className="mt-6 rounded-full px-5">
        Go to workouts
      </Button>
    </div>
  );
}
