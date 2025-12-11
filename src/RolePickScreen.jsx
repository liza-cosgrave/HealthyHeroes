// src/RolePickScreen.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LS_ROLE = "hh_role_v1";
const LS_GEAR = "hh_gear_v1";
const P = (p) => `${process.env.PUBLIC_URL || ""}${p}`;

const WARRIOR_GEAR = {
  hat: P("/assets/warrior/hat1.png"),
  shirt: P("/assets/warrior/shirt1.png"),
  legs: P("/assets/warrior/legs1.png"),
  shoes: P("/assets/warrior/shoes1.png"),
  weapon: P("/assets/warrior/sword1.png"),
};

export default function RolePickScreen() {
  const navigate = useNavigate();

  const choose = (role) => {
    localStorage.setItem(LS_ROLE, role);

    if (role === "warrior") {
      localStorage.setItem(LS_GEAR, JSON.stringify(WARRIOR_GEAR));
    } else {
      // for now: clear gear or keep empty; you’ll fill later with defaults
      localStorage.setItem(LS_GEAR, JSON.stringify({}));
    }

    navigate("/main");
  };

  const Card = ({ title, onClick, locked }) => (
    <button
      onClick={!locked ? onClick : undefined}
      className="RoleCard"
      disabled={locked}
      aria-disabled={locked}
      style={{
        padding: 16,
        width: 220,
        height: 220,
        borderRadius: 16,
        border: "1px solid #e6e8f0",
        background: locked ? "#f3f4f8" : "white",
        boxShadow: "0 6px 24px rgba(18, 38, 63, 0.08)",
        cursor: locked ? "not-allowed" : "pointer",
      }}
    >
      <div style={{ fontSize: 64, marginBottom: 12 }}>
        {title === "Warrior" ? "🛡️" : title === "Princess" ? "👑" : "🪄"}
      </div>
      <div style={{ fontWeight: 700 }}>{title}</div>
      {locked && <div style={{ fontSize: 12, opacity: 0.6 }}>Locked</div>}
    </button>
  );

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 8 }}>Pick a Character Class</h2>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        You can unlock more classes later. Each class has its own outfits and
        items!
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          maxWidth: 920,
        }}
      >
        <Card title="Warrior" onClick={() => choose("warrior")} />
        <Card title="Princess" onClick={() => choose("princess")} />
        <Card title="Wizard" onClick={() => choose("wizard")} />

        {/* examples of locked roles; you can remove these if you don’t want to show them */}
        <Card title="Fairy" locked />
        <Card title="Dragon" locked />
        <Card title="Mermaid" locked />
        <Card title="Elf" locked />
        <Card title="Unicorn" locked />
      </div>
    </div>
  );
}
