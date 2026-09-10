export function QuizProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className={`text-xs tracking-widest ${
              i === current ? "text-lux-deep" : "text-lux-brown/40"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          {i < total - 1 && <span className="h-px w-6 bg-lux-brown/25" />}
        </div>
      ))}
    </div>
  );
}
