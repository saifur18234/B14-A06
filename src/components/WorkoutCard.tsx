import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-accent/50"
    >
      <div className="aspect-[2/1] overflow-hidden">
        <img
          src={workout.image}
          alt={`${workout.name} demonstration`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((m) => (
            <span
              key={m}
              className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase text-black"
            >
              {m}
            </span>
          ))}
        </div>
        <h3 className="font-display mt-3 text-xl font-bold">{workout.name}</h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>
        <div className="mt-4 flex items-center gap-4 border-t border-line pt-3 text-xs text-white/80">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-accent" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame size={14} className="text-accent" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star size={14} className="text-accent" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
