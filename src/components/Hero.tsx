import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 sm:pt-12">
      <div className="grid items-center gap-8 rounded-2xl border border-line bg-surface p-6 sm:p-12 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-[0.15em] text-accent">
            WORKOUT LIBRARY
          </span>
          <h1 className="font-display mt-5 text-5xl font-bold leading-[1.05] sm:text-6xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-5 max-w-md text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold tracking-wide text-black transition hover:brightness-110"
          >
            BROWSE WORKOUTS
            <ArrowDown size={16} />
          </a>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/banner.png"
            alt="Gym machine illustration"
            width={334}
            height={334}
            priority
            className="h-auto w-64 sm:w-80"
          />
        </div>
      </div>
    </section>
  );
}
