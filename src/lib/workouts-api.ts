import { fallbackWorkouts, type Workout } from "@/data/workouts";


const API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

let listCache: Promise<Workout[]> | null = null;
const detailCache = new Map<number, Promise<Workout | null>>();

async function fetchFromApis<T>(path: string): Promise<T> {
  for (const baseUrl of API_URLS) {
    try {
      const res = await fetch(`${baseUrl}${path}`);
      if (res.ok) return await res.json();
    } catch {
  
    }
  }
  throw new Error("All workout APIs failed");
}

export function getWorkouts(): Promise<Workout[]> {
  if (!listCache) {
    listCache = fetchFromApis<Workout[]>("").catch(() => fallbackWorkouts);
  }
  return listCache;
}

export function getWorkout(id: number): Promise<Workout | null> {
  if (!detailCache.has(id)) {
    detailCache.set(
      id,
      fetchFromApis<Workout>(`/${id}`).catch(
        () => fallbackWorkouts.find((workout) => workout.id === id) ?? null
      )
    );
  }
  return detailCache.get(id)!;
}
