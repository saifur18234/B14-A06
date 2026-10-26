import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="font-display mt-2 text-3xl font-bold">Page Not Found</h1>
      <p className="mt-3 text-muted">
        The page you&apos;re looking for skipped leg day and disappeared.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-bold text-black hover:brightness-110"
      >
        Back to Home
      </Link>
    </section>
  );
}
