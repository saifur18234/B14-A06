"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Clock, Flame, Star, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout, PlanWorkout } from "@/types";

type Tab = "plan" | "saved";
type SortKey = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    metrics,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    isHydrated,
  } = usePlan();
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const currentList: (Workout | PlanWorkout)[] =
    activeTab === "plan" ? plan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    return b.rating - a.rating;
  });

  const stats = [
    { label: "Exercises", value: metrics.exercises, accent: true },
    { label: "Minutes", value: metrics.minutes },
    { label: "Calories", value: metrics.calories },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">My Plan</h1>
      <p className="mt-2 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface">
        {stats.map((s) => (
          <div key={s.label} className="p-4 sm:p-6">
            <p className="text-xs text-muted sm:text-sm">{s.label}</p>
            <p
              className={`font-display mt-3 text-4xl font-bold sm:text-5xl ${s.accent ? "text-accent" : ""}`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex rounded-xl border border-line bg-surface p-1">
          {(["plan", "saved"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`rounded-lg px-5 py-2 text-sm transition ${
                activeTab === t
                  ? "bg-surface-2 font-semibold text-white"
                  : "text-muted hover:text-white"
              }`}
            >
              {t === "plan" ? "Today's Plan" : "Saved"}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 text-sm text-muted">
          Sort By
          <span className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="appearance-none rounded-lg border border-line bg-surface py-2 pl-3 pr-9 text-sm text-white outline-none focus:border-accent/60"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
            />
          </span>
        </label>
      </div>

      {!isHydrated ? (
        <div className="mt-6 flex min-h-[300px] flex-col items-center justify-center gap-4 text-muted">
          <div className="spinner" />
          <p className="text-sm">Loading workouts…</p>
        </div>
      ) : sortedList.length === 0 ? (
        <div className="mt-6 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-line px-4 text-center">
          <h2 className="font-display text-2xl font-bold">Nothing here yet</h2>
          <p className="mt-1 text-sm text-muted">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-6 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-black shadow-[0_8px_24px_rgba(204,255,0,0.2)] hover:brightness-110"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {sortedList.map((item) => {
            const done =
              activeTab === "plan" && "isDone" in item && item.isDone;
            return (
              <li
                key={item.id}
                className={`flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-4 ${done ? "opacity-60" : ""}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-36 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-display text-xl font-bold ${done ? "line-through" : ""}`}
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs font-semibold text-muted">
                    {item.equipment}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-accent" />
                      {item.duration} min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Flame size={13} className="text-accent" />
                      {item.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star size={13} className="text-accent" />
                      {item.rating}
                    </span>
                  </div>
                </div>

                <div className="ml-auto flex items-center gap-3">
                  <Link
                    href={`/workout/${item.id}`}
                    className="rounded-full border border-line px-4 py-2 text-xs hover:border-accent/50"
                  >
                    View Details
                  </Link>
                  {activeTab === "plan" && !done && (
                    <button
                      onClick={() => markAsDone(item.id)}
                      className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-bold text-black hover:brightness-110"
                    >
                      <Check size={14} /> Mark as Done
                    </button>
                  )}
                  {done && (
                    <span className="rounded-full border border-accent/40 px-3 py-1.5 text-xs font-semibold text-accent">
                      Completed
                    </span>
                  )}
                  <button
                    aria-label={`Remove ${item.name}`}
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(item.id)
                        : removeFromSaved(item.id)
                    }
                    className="text-muted transition hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
