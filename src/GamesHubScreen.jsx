import React from "react";
import BackButton from "./components/BackButton";

export default function GamesHubScreen() {
  const games = [
    { id: "flip", title: "Fruit Flip (Pairs)", status: "Coming soon" },
    { id: "color", title: "Colour-In Veggies", status: "Coming soon" },
    { id: "hidden", title: "Hidden Snacks", status: "Coming soon" },
    { id: "plate", title: "Plate Builder", status: "Coming soon" },
    { id: "smoothie", title: "Smoothie Mixer", status: "Coming soon" },
  ];

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <div className="TopBar">
        <BackButton />
        <h2 className="ScreenTitle">Mini Games 🎮</h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
          gap: 12,
          maxWidth: 900,
          margin: "12px auto",
        }}
      >
        {games.map((g) => (
          <div
            key={g.id}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 14,
              boxShadow: "0 2px 8px rgba(0,0,0,.06)",
              border: "1px solid #eef2f7",
            }}
          >
            <div style={{ fontWeight: 700 }}>{g.title}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>{g.status}</div>
            <button
              disabled
              style={{
                marginTop: 8,
                padding: "8px 12px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "#f3f4f6",
                cursor: "not-allowed",
              }}
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
