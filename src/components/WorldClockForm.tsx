import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Clock } from "./WorldClock";

interface WorldClockFormProps {
  onClockAdded: (newClock: Clock) => void;
}

export default function WorldClockForm({ onClockAdded }: WorldClockFormProps) {
  const [name, setName] = useState("");
  const [timeZone, setTimeZone] = useState("");

  const handleClockAdded = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || timeZone === "") return;

    const newClock: Clock = {
      id: uuidv4(),
      name: name.trim(),
      timeZone: timeZone,
    };
    onClockAdded(newClock);
    setName("");
    setTimeZone("");
  };

  return (
    <form
      onSubmit={handleClockAdded}
      className="p-4 border rounded bg-light shadow-sm mb-4"
    >
      <div className="mb-3">
        <label htmlFor="clockName" className="form-label fw-bold">
          Название города
        </label>
        <input
          id="clockName"
          type="text"
          className="form-control"
          placeholder="Например, Лондон, Токио"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="clockTimeZone" className="form-label fw-bold">
          Временная зона (UTC)
        </label>
        <input
          id="clockTimeZone"
          type="number"
          className="form-control"
          placeholder="Например, +3 или -5"
          step="any"
          min="-12"
          max="14"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100 fw-bold">
        Добавить часы
      </button>
    </form>
  );
}
