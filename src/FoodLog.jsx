// src/FoodLog.jsx
import React, { useMemo, useState } from "react";
import { useProgress } from "./ProgressContext";
import BackButton from "./components/BackButton";

const todayKey = (d = new Date()) => d.toISOString().slice(0, 10);

const QUICK = [
  // Water
  { label: "Water 200ml", type: "water", amount: 200, emoji: "💧" },
  { label: "Water 300ml", type: "water", amount: 300, emoji: "💧" },
  { label: "Water 500ml", type: "water", amount: 500, emoji: "💧" },
  // Fruit
  { label: "Apple", type: "fruit", servings: 1, emoji: "🍎" },
  { label: "Banana", type: "fruit", servings: 1, emoji: "🍌" },
  { label: "Orange", type: "fruit", servings: 1, emoji: "🍊" },
  { label: "Grapes", type: "fruit", servings: 1, emoji: "🍇" },
  { label: "Strawberries", type: "fruit", servings: 1, emoji: "🍓" },
  { label: "Kiwi", type: "fruit", servings: 1, emoji: "🥝" },
  // Veg
  { label: "Carrot", type: "veg", servings: 1, emoji: "🥕" },
  { label: "Cucumber", type: "veg", servings: 1, emoji: "🥒" },
  { label: "Broccoli", type: "veg", servings: 1, emoji: "🥦" },
  { label: "Tomatoes", type: "veg", servings: 1, emoji: "🍅" },
  { label: "Peas", type: "veg", servings: 1, emoji: "🟢" },
  // Other
  { label: "Eggs", type: "other", servings: 1, emoji: "🥚" },
  { label: "Chicken", type: "other", servings: 1, emoji: "🍗" },
  { label: "Beans", type: "other", servings: 1, emoji: "🫘" },
  { label: "Cheese", type: "other", servings: 1, emoji: "🧀" },
  { label: "Yogurt", type: "other", servings: 1, emoji: "🥛" },
  { label: "Oatmeal", type: "other", servings: 1, emoji: "🥣" },
  { label: "Whole-wheat toast", type: "other", servings: 1, emoji: "🍞" },
];

export default function FoodLog() {
  const {
    meals = [],
    addMeal,
    removeMeal,
    daily = { counts: {} },
  } = useProgress() || {};
  const [custom, setCustom] = useState("");
  const today = todayKey();

  const todaysMeals = useMemo(
    () => meals.filter((m) => (m?.dateISO || "").startsWith(today)),
    [meals, today]
  );

  const logEntry = (entry) => {
    const safe = {
      id: entry?.id || `m-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      dateISO: entry?.dateISO || new Date().toISOString(),
      name: entry?.name || entry?.label || "food",
      type: entry?.type || "other",
      ...(entry?.amount ? { amount: Number(entry.amount) } : {}),
      ...(entry?.servings ? { servings: Number(entry.servings) } : {}),
    };
    addMeal(safe);
  };

  const handleQuick = (q) => {
    if (q.type === "water") {
      logEntry({
        name: `${q.emoji} water ${q.amount}ml`,
        type: "water",
        amount: q.amount,
      });
    } else {
      logEntry({
        name: `${q.emoji} ${q.label}`,
        type: q.type,
        servings: q.servings || 1,
      });
    }
  };

  const handleCustom = (e) => {
    e.preventDefault();
    if (!custom.trim()) return;
    const s = custom.trim();
    const m = s.toLowerCase().match(/water\s*(\d+)\s*ml/);
    if (m) {
      return logEntry({
        name: `💧 water ${Number(m[1])}ml`,
        type: "water",
        amount: Number(m[1]),
      });
    }
    logEntry({ name: s, type: "other", servings: 1 });
    setCustom("");
  };

  const counts = {
    fvServings: daily?.counts?.fvServings || 0,
    waterMl: daily?.counts?.waterMl || 0,
    meals: daily?.counts?.meals || 0,
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <div
        className="TopBar"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <BackButton />
        <h2 className="ScreenTitle">Food Log 🥕</h2>
      </div>

      {/* Quick palette */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))",
          gap: 10,
          maxWidth: 860,
          margin: "12px auto",
        }}
      >
        {QUICK.map((q) => (
          <button
            key={q.emoji + q.label}
            onClick={() => handleQuick(q)}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "10px 12px",
              boxShadow: "0 1px 3px rgba(0,0,0,.06)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{q.emoji}</div>
            <div style={{ fontWeight: 700 }}>{q.label}</div>
          </button>
        ))}
      </div>

      {/* Manual entry */}
      <form onSubmit={handleCustom} style={{ margin: "8px 0 14px" }}>
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder='Type e.g. "orange" or "water 300ml"'
          style={{
            width: 280,
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #d1d5db",
            marginRight: 8,
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            border: "none",
            background: "#4cafef",
            color: "#fff",
          }}
        >
          Add
        </button>
      </form>

      {/* Today totals (safe) */}
      <div style={{ marginBottom: 10 }}>
        Fruit & Veg: <b>{counts.fvServings}</b> / 5
        <span style={{ margin: "0 10px" }} />
        Water: <b>{counts.waterMl}</b> ml
        <span style={{ margin: "0 10px" }} />
        Meals: <b>{counts.meals}</b>
      </div>

      {/* Today list */}
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "left" }}>
        {todaysMeals.length === 0 ? (
          <div style={{ opacity: 0.7 }}>No meals yet — add one above.</div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {todaysMeals.map((m) => (
              <li
                key={m.id}
                style={{
                  background: "#fff",
                  margin: "10px 0",
                  padding: "12px 14px",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{m.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.75 }}>
                    {new Date(m.dateISO).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    — {m.type}
                    {m.type === "water" && m.amount ? ` • ${m.amount} ml` : ""}
                    {(m.type === "fruit" || m.type === "veg") && m.servings
                      ? ` • ${m.servings} serving`
                      : ""}
                  </div>
                </div>
                <button
                  onClick={() => removeMeal(m.id)}
                  title="Delete entry"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "1px solid #e5e7eb",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
