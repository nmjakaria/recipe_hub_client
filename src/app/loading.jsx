
export default function Loading() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-16 px-4">
      {/* Spinner Container */}
      <div className="relative flex h-16 w-16 items-center justify-center">
        {/* Outer Background Ring */}
        <span className="absolute inset-0 rounded-full border-4 border-accent/10" />
        
        {/* Active Spinner Segment */}
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-accent transition-all duration-300" />
        
        {/* Core Decorative Pulse (Adding a modern depth feel) */}
        <span className="h-6 w-6 rounded-full bg-accent/20 animate-pulse" />
      </div>

      {/* Loading Text */}
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="font-display text-xl font-bold tracking-tight text-foreground">
          Cooking up your recipes…
        </p>
        <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase animate-pulse">
          Setting the table
        </p>
      </div>
    </main>
  );
}