import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-app flex min-h-[80vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <BrokenBowlIllustration className="h-44 w-44 text-accent sm:h-52 sm:w-52" />

      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Error 404
        </p>
        <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
          This recipe isn&apos;t on the menu
        </h1>
        <p className="mx-auto max-w-md text-foreground/60">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or
          got eaten before we could save it.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
      >
        Back to Home
      </Link>
    </main>
  );
}

/** Simple line-art bowl, fork & spoon — no external assets, inherits theme color. */
function BrokenBowlIllustration({ className }) {
  return (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="120" cy="108" r="92" fill="currentColor" opacity="0.08" />

      {/* fork */}
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <line x1="44" y1="176" x2="76" y2="86" />
        <line x1="69" y1="70" x2="73" y2="90" />
        <line x1="77" y1="68" x2="78" y2="90" />
        <line x1="85" y1="70" x2="82" y2="90" />
      </g>

      {/* spoon */}
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        <line x1="196" y1="176" x2="166" y2="92" />
        <ellipse
          cx="160"
          cy="78"
          rx="11"
          ry="15"
          transform="rotate(-18 160 78)"
        />
      </g>

      {/* bowl */}
      <g stroke="currentColor" strokeWidth="4" fill="none">
        <ellipse cx="120" cy="74" rx="66" ry="13" />
        <path
          d="M54,74 C54,74 62,142 120,142 C178,142 186,74 186,74"
          strokeLinecap="round"
        />
      </g>

      {/* crack */}
      <path
        d="M100,62 L112,92 L98,112 L116,136"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />

      {/* crumbs */}
      <circle cx="58" cy="166" r="3" fill="currentColor" opacity="0.35" />
      <circle cx="182" cy="160" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="128" cy="176" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}