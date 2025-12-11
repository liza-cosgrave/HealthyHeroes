import React, { useMemo } from "react";
import BackButton from "./components/BackButton";
import { useProgress } from "./ProgressContext";

/* Utilities */
const todayKey = (d = new Date()) => d.toISOString().slice(0, 10);
const clamp01 = (n) => Math.max(0, Math.min(1, n || 0));

/**
 * We compute everything from useProgress() safely.
 * We expect:
 *   meals: [{ id, dateISO, type: "fruit"|"veg"|"water"|"other", servings?, amount? }]
 *   daily.counts: { fvServings, waterMl, meals }
 *   totals.counts: { healthyFoods, ... }  // long-term totals for milestones
 */
export default function QuestScreen() {
  const p = useProgress() || {};
  const meals = p.meals || [];
  const daily = p.daily || { counts: {} };
  const totals = p.totals || { counts: {} };
  const counts = daily.counts || {};
  const tcounts = totals.counts || {};

  const today = todayKey();
  const todaysMeals = useMemo(
    () => meals.filter((m) => (m?.dateISO || "").startsWith(today)),
    [meals, today]
  );

  /* ------ DAILY ------ */
  const qDaily = [
    {
      id: "fruit1",
      icon: "🍎",
      title: "Eat a fruit",
      hint: "Have at least one fruit.",
      now: todaysMeals.some((m) => m.type === "fruit") ? 1 : 0,
      goal: 1,
    },
    {
      id: "veg1",
      icon: "🥦",
      title: "Eat a vegetable",
      hint: "Have at least one vegetable.",
      now: todaysMeals.some((m) => m.type === "veg") ? 1 : 0,
      goal: 1,
    },
    {
      id: "fiveaday",
      icon: "🌈",
      title: "5-a-day",
      hint: "Log 5 fruit & veg servings.",
      now: Number(counts.fvServings || 0),
      goal: 5,
    },
    {
      id: "water1l",
      icon: "💧",
      title: "Drink water",
      hint: "Drink 1000 ml of water.",
      now: Number(counts.waterMl || 0),
      goal: 1000,
      renderValue: (n) => `${n} / 1000 ml`,
    },
    {
      id: "meals3",
      icon: "🍽️",
      title: "Log 3 meals",
      hint: "Log at least 3 meals.",
      now: Number(counts.meals || 0),
      goal: 3,
    },
  ];

  /* ------ CHALLENGES (fun extras, still based on food log) ------ */
  const qChallenges = [
    {
      id: "newFood",
      icon: "👀",
      title: "Taste a new food",
      hint: "Try something you don’t usually eat.",
      // naive check: any "other" item today counts as “new” once
      now: todaysMeals.some((m) => m.type === "other") ? 1 : 0,
      goal: 1,
    },
    {
      id: "protein",
      icon: "🍗",
      title: "Proteins for power!",
      hint: "Eat chicken, egg, beans, or cheese.",
      now: todaysMeals.some((m) =>
        ["🍗", "🥚", "🫘", "🧀"].some((emoji) => (m.name || "").includes(emoji))
      )
        ? 1
        : 0,
      goal: 1,
    },
    {
      id: "twoFruits",
      icon: "🍏",
      title: "Two fruits in one day",
      hint: "Log at least 2 fruits today.",
      now: todaysMeals.filter((m) => m.type === "fruit").length,
      goal: 2,
    },
  ];

  /* ------ MILESTONES (lifetime totals) ------ */
  const qMilestones = [
    {
      id: "bronze",
      icon: "🥉",
      title: "Bronze Hero",
      hint: "Logged 30 healthy foods.",
      now: Number(tcounts.healthyFoods || 0),
      goal: 30,
    },
    {
      id: "silver",
      icon: "🥈",
      title: "Silver Hero",
      hint: "Logged 60 healthy foods.",
      now: Number(tcounts.healthyFoods || 0),
      goal: 60,
    },
    {
      id: "gold",
      icon: "🥇",
      title: "Gold Hero",
      hint: "Logged 100 healthy foods.",
      now: Number(tcounts.healthyFoods || 0),
      goal: 100,
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div
        className="TopBar"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <BackButton />
        <h2 className="ScreenTitle">Quests 🧾</h2>
      </div>

      <Section title="Daily" icon="📑" items={qDaily} />
      <Section title="Challenge" icon="🌀" items={qChallenges} />
      <Section title="Milestones" icon="🏅" items={qMilestones} />
    </div>
  );
}

function Section({ title, icon, items }) {
  return (
    <div style={{ maxWidth: 760, margin: "14px auto 22px" }}>
      <h3 style={{ margin: "12px 6px" }}>
        <span style={{ marginRight: 6 }}>{icon}</span>
        {title}
      </h3>
      <div style={{ display: "grid", gap: 12 }}>
        {items.map((q) => (
          <QuestRow key={q.id} {...q} />
        ))}
      </div>
    </div>
  );
}

function QuestRow({ icon, title, hint, now, goal, renderValue }) {
  const pct = clamp01((now || 0) / (goal || 1));
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #edf0f3",
        borderRadius: 14,
        padding: "12px 16px",
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 80px",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 22 }}>{icon}</div>
        <div>
          <div style={{ fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{hint}</div>
          <div
            style={{
              marginTop: 6,
              height: 8,
              background: "#f1f3f5",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.round(pct * 100)}%`,
                height: "100%",
                background: "#7c9cff",
              }}
            />
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: 12, opacity: 0.7 }}>
          {renderValue ? renderValue(now) : `${now || 0} / ${goal}`}
        </div>
      </div>
    </div>
  );
}
