// Decorative circle row — like the POLY-8 pad grid
function CircleRow({ count = 10, filled = [1, 4, 7] }: { count?: number; filled?: number[] }) {
  return (
    <div className="flex justify-center gap-2.5" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`w-5 h-5 rounded-full border-2 border-white ${
            filled.includes(i) ? "bg-white" : "opacity-40"
          }`}
        />
      ))}
    </div>
  );
}

export default function PageHeader() {
  return (
    <header className="bg-poly-mid border-b border-poly-line py-10 px-4 text-center">
      {/* Top pad row */}
      <div className="mb-7">
        <CircleRow filled={[1, 4, 6, 9]} />
      </div>

      {/* Main title */}
      <h1
        className="font-display font-black text-poly-white uppercase leading-none"
        style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)", letterSpacing: "-0.01em" }}
      >
        PENDECHO
      </h1>

      {/* AWARDS line */}
      <div className="flex items-center justify-center gap-4 mt-1 mb-2">
        <span className="h-px flex-1 max-w-[100px] bg-white opacity-30" />
        <h2
          className="font-display font-semibold text-poly-white uppercase tracking-[0.4em]"
          style={{ fontSize: "clamp(1rem, 4vw, 2.2rem)" }}
        >
          AWARDS
        </h2>
        <span className="h-px flex-1 max-w-[100px] bg-white opacity-30" />
      </div>

      {/* Tagline */}
      <p className="font-display font-semibold text-poly-dim uppercase tracking-[0.22em] text-xs mt-1">
        Het Beste Stemplatform van Nederland
      </p>

      {/* Bottom pad row */}
      <div className="mt-7">
        <CircleRow filled={[0, 3, 5, 8]} />
      </div>
    </header>
  );
}
