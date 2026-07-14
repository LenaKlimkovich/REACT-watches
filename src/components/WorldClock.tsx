export interface Clock {
  id: string;
  name: string;
  timeZone: string;
}

interface WorldClockProps {
  clock: Clock;
  onDelete: (id: string) => void;
  currentTime: Date;
}

export default function WorldClock({
  clock,
  onDelete,
  currentTime,
}: WorldClockProps) {
  const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
  const targetDate = new Date(utc + Number(clock.timeZone) * 3600000);

  const hours = targetDate.getHours();
  const minutes = targetDate.getMinutes();
  const seconds = targetDate.getSeconds();

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  const handStyle = {
    position: "absolute" as const,
    left: "50%",
    bottom: "50%",
    transformOrigin: "bottom center",
  };

  return (
    <div
      className="clockContainer position-relative border rounded p-3 m-2 text-center bg-white shadow-sm"
      style={{ width: "160px" }}
    >
      <span
        className="name d-block fw-bold mb-2 text-truncate pe-3"
        title={clock.name}
      >
        {clock.name}
      </span>

      <button
        className="btn btn-sm text-danger position-absolute top-0 end-0 m-1"
        style={{ padding: "0 5px", fontSize: "16px", lineHeight: "1" }}
        onClick={() => onDelete(clock.id)}
      >
        &times;
      </button>

      <div
        className="analog-clock mx-auto position-relative rounded-circle border border-secondary bg-light"
        style={{ width: "120px", height: "120px" }}
      >
        <div
          className="hand hour-hand bg-dark"
          style={{
            ...handStyle,
            width: "4px",
            height: "30px",
            marginLeft: "-2px",
            transform: `rotate(${hourAngle}deg)`,
          }}
        />

        <div
          className="hand minute-hand bg-secondary"
          style={{
            ...handStyle,
            width: "3px",
            height: "45px",
            marginLeft: "-1.5px",
            transform: `rotate(${minuteAngle}deg)`,
          }}
        />

        <div
          className="hand second-hand bg-danger"
          style={{
            ...handStyle,
            width: "1.5px",
            height: "52px",
            marginLeft: "-0.75px",
            transform: `rotate(${secondAngle}deg)`,
          }}
        />

        <div
          className="clock-center bg-dark rounded-circle position-absolute start-50 top-50 translate-middle"
          style={{ width: "8px", height: "8px", zIndex: 10 }}
        />
      </div>
    </div>
  );
}
