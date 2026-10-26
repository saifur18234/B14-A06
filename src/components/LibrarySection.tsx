"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/types";
import { getAllWorkouts } from "@/utils/api";
import WorkoutCard from "./WorkoutCard";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setWorkouts(await getAllWorkouts());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section
      id="library"
      className="mx-auto max-w-[1280px] scroll-mt-20 px-4 py-14 sm:px-6"
    >
      <h2 className="font-display text-3xl font-bold">The Library</h2>
      <p className="mt-1 text-sm text-muted">
        Twelve lifts covering every major muscle group.
      </p>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="spinner" />
        </div>
      ) : workouts.length === 0 ? (
        <p className="py-16 text-center text-muted">
          Could not load workouts. Please refresh.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}
