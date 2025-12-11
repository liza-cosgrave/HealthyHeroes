import React from "react";
import BackButton from "./components/BackButton";
import { BASE_BODY } from "./faceAssets";

/**
 * Equips simple warrior items from /public/assets/warrior/
 * Keeps names exactly as your files: hat1.png, shirt1.png, legs1.png, shoes1.png, sword1.png
 * Saves to localStorage key 'hh_equip_v1'
 */

const LS_EQUIP = "hh_equip_v1";
const WARRIOR = {
  hat: `${process.env.PUBLIC_URL}/assets/warrior/hat1.png`,
  shirt: `${process.env.PUBLIC_URL}/assets/warrior/shirt1.png`,
  legs: `${process.env.PUBLIC_URL}/assets/warrior/legs1.png`,
  shoes: `${process.env.PUBLIC_URL}/assets/warrior/shoes1.png`,
  weapon: `${process.env.PUBLIC_URL}/assets/warrior/sword1.png`,
};

const SLOTS = ["hat", "shirt", "legs", "shoes", "weapon"];

export default function CustomizeCharacterScreen() {
  const [equipped, setEquipped] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_EQUIP)) || {};
    } catch {
      return {};
    }
  });

  const save = (next) => {
    setEquipped(next);
    localStorage.setItem(LS_EQUIP, JSON.stringify(next));
  };

  const equipWarriorSet = () => save({ ...WARRIOR });

  const setSlot = (slot, src) => {
    const next = { ...equipped, [slot]: src };
    save(next);
  };

  const layer = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    pointerEvents: "none",
  };

  return (
    <div style={{ padding: 20 }}>
      <div
        className="TopBar"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <BackButton />
        <h2 className="ScreenTitle">Customise 🎒</h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 16,
          alignItems: "start",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Preview panel */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #edf0f3",
            borderRadius: 16,
            padding: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,.05)",
            minHeight: 360,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "280 / 360",
            }}
          >
            <img
              alt="Character"
              className="character-base"
              src={BASE_BODY}
              style={layer}
            />
            {SLOTS.map((slot) =>
              equipped[slot] ? (
                <img
                  key={slot}
                  src={equipped[slot]}
                  alt={slot}
                  style={{ ...layer, zIndex: 3 }}
                />
              ) : null
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "grid", gap: 12 }}>
          <button
            onClick={equipWarriorSet}
            style={{
              padding: "10px 14px",
              borderRadius: 999,
              border: "1px solid #d7def3",
              background: "#fff",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Equip Warrior set
          </button>

          <SlotCard title="HAT">
            <button
              className="pill"
              onClick={() => setSlot("hat", WARRIOR.hat)}
            >
              Use warrior hat
            </button>
          </SlotCard>

          <SlotCard title="SHIRT">
            <button
              className="pill"
              onClick={() => setSlot("shirt", WARRIOR.shirt)}
            >
              Use warrior shirt
            </button>
          </SlotCard>

          <SlotCard title="LEGS">
            <button
              className="pill"
              onClick={() => setSlot("legs", WARRIOR.legs)}
            >
              Use warrior legs
            </button>
          </SlotCard>

          <SlotCard title="SHOES">
            <button
              className="pill"
              onClick={() => setSlot("shoes", WARRIOR.shoes)}
            >
              Use warrior shoes
            </button>
          </SlotCard>

          <SlotCard title="WEAPON">
            <button
              className="pill"
              onClick={() => setSlot("weapon", WARRIOR.weapon)}
            >
              Use warrior weapon
            </button>
          </SlotCard>
        </div>
      </div>
    </div>
  );
}

function SlotCard({ title, children }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #edf0f3",
        borderRadius: 16,
        padding: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      <div
        style={{ fontSize: 12, fontWeight: 800, opacity: 0.6, marginBottom: 8 }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}
