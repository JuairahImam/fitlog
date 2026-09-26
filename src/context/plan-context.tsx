"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const PLAN_LIMIT = 5;
const STORAGE_KEY = "fitlog-plan";

type PlanContextValue = {
  plan: number[];
  saved: number[];
  done: number[];
  addToPlan: (id: number) => "added" | "exists" | "full";
  saveForLater: (id: number) => "added" | "exists";
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  // localStorage only exists in the browser, so it can only be read after the first render.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    setPlan(data.plan || []);
    setSaved(data.saved || []);
    setDone(data.done || []);
    setLoaded(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved, done }));
    }
  }, [plan, saved, done, loaded]);

  function addToPlan(id: number) {
    if (plan.includes(id)) return "exists";
    if (plan.length >= PLAN_LIMIT) return "full";
    setPlan([...plan, id]);
    return "added";
  }

  function saveForLater(id: number) {
    if (saved.includes(id)) return "exists";
    setSaved([...saved, id]);
    return "added";
  }

  function removeFromPlan(id: number) {
    setPlan(plan.filter((item) => item !== id));
    setDone(done.filter((item) => item !== id));
  }

  function removeFromSaved(id: number) {
    setSaved(saved.filter((item) => item !== id));
  }

  function markDone(id: number) {
    if (!done.includes(id)) setDone([...done, id]);
  }

  return (
    <PlanContext.Provider
      value={{ plan, saved, done, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used inside PlanProvider");
  return context;
}
