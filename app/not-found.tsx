import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <p className="font-mono text-xs uppercase text-[var(--muted)]">
        [ 404 ]
      </p>
      <h1 className="mt-3 text-2xl font-semibold">
        This node doesn't exist in the system.
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        The page you're looking for was moved, renamed, or never built.
      </p>
      <Link
        href="/"
        className="mt-8 border border-[var(--fg)] px-4 py-2 font-mono text-xs uppercase"
      >
        Return to Homepage
      </Link>
    </main>
  )
}