import { Workout } from "@/types";


const fallbackWorkouts: Workout[] = [];


const API_URLS = [
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function fetchFromApis(path = ""): Promise<unknown> {
  let lastError: unknown;
  for (const base of API_URLS) {
    try {
      const res = await fetch(`${base}${path}`);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export async function getAllWorkouts(): Promise<Workout[]> {
  try {
    const data = await fetchFromApis();
    if (!Array.isArray(data)) throw new Error("Unexpected API response");
    return data as Workout[];
  } catch (err) {
    console.warn("APIs unreachable, using bundled data.", err);
    return fallbackWorkouts;
  }
}

export async function getWorkoutById(id: string | number): Promise<Workout | null> {
  try {
    const data = await fetchFromApis(`/${id}`);
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new Error("Unexpected API response");
    }
    return data as Workout;
  } catch (err) {
    console.warn("APIs unreachable, using bundled data.", err);
    return fallbackWorkouts.find((w) => w.id === Number(id)) ?? null;
  }
}
