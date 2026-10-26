"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, CalendarPlus } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/utils/api";
import { Workout } from "@/types";

type Params = Promise<{ id: string }>;

export default function WorkoutDetails({ params }: { params: Params }) {
  const { id } = use(params);
  const { plan, saved, addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkout() {
      try {
        setWorkout(await getWorkoutById(id));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-3xl font-bold">Workout not found</h1>
        <Link
          href="/"
          className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-bold text-black"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const isPlanFull = plan.length >= 5;
  const isAlreadyInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  const specs: [string, string | number][] = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-line">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full max-h-[740px] w-full object-cover"
        />
      </div>

      <div>
        <h1 className="font-display text-4xl font-bold sm:text-5xl">
          {workout.name}
        </h1>
        <p className="mt-3 text-muted">{workout.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {workout.muscleGroups.map((m) => (
            <span
              key={m}
              className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black"
            >
              {m}
            </span>
          ))}
        </div>

        <dl className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
          {specs.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between border-b border-line px-6 py-4 last:border-b-0"
            >
              <dt className="text-xs font-semibold uppercase tracking-widest text-muted">
                {label}
              </dt>
              <dd className="text-sm">{value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-10 text-sm font-bold uppercase tracking-widest">
          Instructions
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-muted">
          {workout.instructions.map((step, i) => (
            <li key={i}>
              {i + 1}. {step}
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            onClick={() => addToPlan(workout)}
            disabled={isPlanFull || isAlreadyInPlan}
            className="flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CalendarPlus size={16} />
            {isAlreadyInPlan
              ? "Already in Plan"
              : isPlanFull
                ? "Plan Full"
                : "Add to today's plan"}
          </button>
          <button
            onClick={() => addToSaved(workout)}
            disabled={isSaved}
            className="flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm transition hover:border-accent/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Bookmark size={16} />
            {isSaved ? "Saved" : "Save for later"}
          </button>
        </div>
      </div>
    </div>
  );
}
