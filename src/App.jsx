import { useEffect, useState } from "react";
import WorldClockForm from "./components/WorldClockForm";
import WorldClockList from "./components/WorldClockList";

export default function App() {
  const [clocks, setClocks] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const handleClockAdded = (newClock) => {
    setClocks((prevClocks) => [...prevClocks, newClock]);
  };

  const handleClockRemoved = (id) => {
    setClocks((prevClocks) => prevClocks.filter((clock) => clock.id !== id));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <WorldClockForm onClockAdded={handleClockAdded} />
      <WorldClockList
        clocks={clocks}
        onDelete={handleClockRemoved}
        currentTime={currentTime}
      />
    </div>
  );
}
