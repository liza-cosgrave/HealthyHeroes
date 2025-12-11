import React, { useMemo, useState } from "react";
import BackButton from "./components/BackButton";
import "./CharacterScreen.css";

/** Characters that exist in /public/characters */
const CHARACTERS = [
  { id: "warrior", label: "Warrior", image: "/characters/warrior.png" },
  { id: "princess", label: "Princess", image: "/characters/princess.png" },
  { id: "wizard", label: "Wizard", image: "/characters/wizard.png" },
  { id: "fairy", label: "Fairy", image: "/characters/fairy.png" },
  { id: "dragon", label: "Dragon", image: "/characters/dragon.png" },
  { id: "unicorn", label: "Unicorn", image: "/characters/unicorn.png" },
  { id: "mermaid", label: "Mermaid", image: "/characters/mermaid.png" },
  { id: "elf", label: "Elf", image: "/characters/elf.png" },
];

/** Default-open characters */
const OPEN_BY_DEFAULT = new Set(["warrior", "princess"]);

export default function PickCharacterScreen() {
  const current = localStorage.getItem("character") || "warrior";
  const [selected, setSelected] = useState(null);

  // (stub) gating — for now only warrior/princess unlocked
  const unlockMap = useMemo(() => {
    const res = {};
    for (const c of CHARACTERS) res[c.id] = OPEN_BY_DEFAULT.has(c.id);
    return res;
  }, []);

  const isUnlocked = (char) => !!unlockMap[char.id];

  const confirmUse = () => {
    if (!selected) return;
    localStorage.setItem("character", selected.id);
    setSelected(null);
    window.history.back(); // go back to Main
  };

  if (selected) {
    return (
      <div className="character-screen">
        <div className="TopBar">
          <BackButton />
          <h2 className="ScreenTitle">Use This Character?</h2>
        </div>

        <img
          src={selected.image}
          alt={selected.label}
          className="character-image large"
        />
        <p style={{ fontWeight: 700 }}>{selected.label}</p>

        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <button onClick={confirmUse}>✅ Yes, Use This</button>
          <BackButton>⬅ Back</BackButton>
        </div>
      </div>
    );
  }

  return (
    <div className="character-screen">
      <div className="TopBar">
        <BackButton />
        <h2 className="ScreenTitle">Pick a Character</h2>
      </div>

      <div className="character-grid">
        {CHARACTERS.map((char) => {
          const unlocked = isUnlocked(char);
          const isCurrent = char.id === current;
          return (
            <button
              key={char.id}
              className={`character-button ${isCurrent ? "selected" : ""}`}
              onClick={() =>
                unlocked
                  ? setSelected(char)
                  : alert("🔒 Locked — keep playing to unlock!")
              }
              disabled={!unlocked}
              title={!unlocked ? "Locked" : ""}
            >
              <img
                src={char.image}
                alt={char.label}
                className="character-image small"
              />
              <div className="character-name">{char.label}</div>
              {isCurrent && <div className="selected-label">✅ Selected</div>}
              {!unlocked && <div className="locked-overlay">🔒</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
