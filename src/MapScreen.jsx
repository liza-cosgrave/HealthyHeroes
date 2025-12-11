import React from "react";
import BackButton from "./components/BackButton";
import "./MapScreen.css";

export default function MapScreen() {
  const bg = `${process.env.PUBLIC_URL || ""}/assets/Map-placeholder.jpeg`;

  // Example checkpoint layout (percent positions)
  const checkpoints = [
    { id: 1, top: "40%", left: "20%" },
    { id: 2, top: "55%", left: "28%" },
    { id: 3, top: "70%", left: "36%" },
    { id: 4, top: "75%", left: "50%" },
    { id: 5, top: "65%", left: "65%" },
    { id: 6, top: "50%", left: "70%" },
    { id: 7, top: "35%", left: "75%" },
    { id: 8, top: "25%", left: "60%" },
    { id: 9, top: "15%", left: "45%" },
    { id: 10, top: "10%", left: "30%" },
    { id: 11, top: "20%", left: "20%" },
    { id: 12, top: "30%", left: "10%" },
  ];

  return (
    <div className="MapScreen">
      <div className="TopBar">
        <BackButton />
        <h2 className="ScreenTitle">World Map</h2>
      </div>

      <div className="MapContainer">
        <img src={bg} alt="Map" className="MapImage" />
        <div className="Overlay">
          {checkpoints.map((cp) => (
            <button
              key={cp.id}
              className="Checkpoint"
              style={{ top: cp.top, left: cp.left }}
              aria-label={`Checkpoint ${cp.id}`}
              onClick={() => alert(`Checkpoint ${cp.id}`)}
            >
              {cp.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
