import { fallbackWorkouts, type Workout } from "@/data/workouts";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

// Shared across pages so navigating around doesn't re-hit the rate-limited API.
let listCache: Promise<Workout[]> | null = null;
const detailCache = new Map<number, Promise<Workout | null>>();

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export function getWorkouts(): Promise<Workout[]> {
  if (!listCache) {
    listCache = fetchJson<Workout[]>(API_URL).catch(() => fallbackWorkouts);
  }
  return listCache;
}

export function getWorkout(id: number): Promise<Workout | null> {
  if (!detailCache.has(id)) {
    detailCache.set(
      id,
      fetchJson<Workout>(`${API_URL}/${id}`).catch(
        () => fallbackWorkouts.find((workout) => workout.id === id) ?? null
      )
    );
  }
  return detailCache.get(id)!;
}
