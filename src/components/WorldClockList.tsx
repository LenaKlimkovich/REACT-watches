import WorldClock, { Clock } from "./WorldClock";

interface WorldClockListProps {
  clocks: Clock[];
  onDelete: (id: string) => void;
  currentTime: Date;
}

export default function WorldClockList({
  clocks,
  onDelete,
  currentTime,
}: WorldClockListProps) {
  return (
    <div className="clocksList d-flex flex-wrap gap-3 mt-4 justify-content-start">
      {clocks.map((c) => {
        return (
          <WorldClock
            key={c.id}
            clock={c}
            onDelete={onDelete}
            currentTime={currentTime}
          />
        );
      })}
    </div>
  );
}
