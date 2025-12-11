import React, { useState } from "react";
import BackButton from "./components/BackButton";

/** Simple catalogue (locked/unlocked) */
const CHARACTERS = [
  { id: "warrior", title: "Warrior", emoji: "🛡️", unlocked: true },
  { id: "princess", title: "Princess", emoji: "👑", unlocked: false },
  { id: "wizard", title: "Wizard", emoji: "🪄", unlocked: false },
  { id: "fairy", title: "Fairy", emoji: "🧚", unlocked: false },
  { id: "mermaid", title: "Mermaid", emoji: "🧜‍♀️", unlocked: false },
  { id: "elf", title: "Elf", emoji: "🧝", unlocked: false },
  { id: "dragon", title: "Dragon", emoji: "🐲", unlocked: false },
  { id: "unicorn", title: "Unicorn", emoji: "🦄", unlocked: false },
];

export default function CharacterScreen() {
  const [selected, setSelected] = useState(
    localStorage.getItem("hh_role_v1") || "warrior"
  );

  const pick = (id) => {
    const char = CHARACTERS.find((c) => c.id === id);
    if (!char) return;
    if (!char.unlocked) return; // locked for now
    setSelected(id);
    localStorage.setItem("hh_role_v1", id);
  };

  return (
    <div style={{ padding: 20 }}>
      <div
        className="TopBar"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <BackButton />
        <h2 className="ScreenTitle">Choose Your Character</h2>
      </div>

      <div
        className="character-grid"
        style={{
          maxWidth: 900,
          margin: "16px auto",
          display: "grid",
          gap: 14,
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        }}
      >
        {CHARACTERS.map((c) => {
          const active = selected === c.id;
          const locked = !c.unlocked;
          return (
            <button
              key={c.id}
              onClick={() => pick(c.id)}
              disabled={locked}
              style={{
                background: "#fff",
                border: active ? "2px solid #7c9cff" : "1px solid #edf0f3",
                borderRadius: 14,
                padding: 14,
                boxShadow: "0 2px 8px rgba(0,0,0,.05)",
                cursor: locked ? "not-allowed" : "pointer",
                opacity: locked ? 0.5 : 1,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 38 }}>{c.emoji}</div>
              <div style={{ fontWeight: 700, marginTop: 6 }}>{c.title}</div>
              {locked && (
                <div style={{ fontSize: 12, opacity: 0.7 }}>Locked</div>
              )}
              {active && c.unlocked && (
                <div style={{ marginTop: 6, fontSize: 12, color: "#3b82f6" }}>
                  Selected ✓
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
