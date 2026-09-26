import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Library } from "./Library/Library";

export default function Home() {
  return (
    <div>
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
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s
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

      <Library />
    </div>
  );
}
