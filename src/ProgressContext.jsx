// src/ProgressContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

const Ctx = createContext(null);
export const useProgress = () => useContext(Ctx);

// --- helpers
const todayKey = (d = new Date()) => d.toISOString().slice(0, 10);

// 7-day rotating daily pool (we’ll pick 5 for the dayIndex)
const DAILY_POOL = [
  {
    id: "fruit1",
    title: "Eat a fruit",
    desc: "Have at least one fruit.",
    goal: 1,
    kind: "fruit",
  },
  {
    id: "veg1",
    title: "Eat a vegetable",
    desc: "Have at least one vegetable.",
    goal: 1,
    kind: "veg",
  },
  {
    id: "fiveaday",
    title: "5-a-day",
    desc: "Hit 5 fruit/veg servings.",
    goal: 5,
    kind: "fv",
  },
  {
    id: "water1",
    title: "Drink water",
    desc: "Drink 1000 ml.",
    goal: 1000,
    kind: "water",
  },
  {
    id: "meals3",
    title: "Log 3 meals",
    desc: "Log at least 3 meals.",
    goal: 3,
    kind: "meals",
  },
  {
    id: "trynew",
    title: "Taste a new food",
    desc: "Try something new!",
    goal: 1,
    kind: "other",
  },
  {
    id: "protein",
    title: "Proteins for power",
    desc: "Eat chicken, egg, beans, or cheese.",
    goal: 1,
    kind: "protein",
  },
];

// static challenge and milestone sets
const CHALLENGES = [
  {
    id: "c-new",
    title: "Taste a new food",
    desc: "Try something you don’t usually eat.",
    goal: 1,
    unit: "",
    progKey: "newFood",
  },
  {
    id: "c-prot",
    title: "Proteins for power!",
    desc: "Eat chicken, egg, beans, or cheese.",
    goal: 1,
    unit: "",
    progKey: "protein",
  },
  {
    id: "c-two",
    title: "Two fruits in one day",
    desc: "Log at least 2 fruits today.",
    goal: 2,
    unit: "/2",
    progKey: "fruits",
  },
];

const MILESTONES = [
  {
    id: "m30",
    title: "Bronze Hero",
    desc: "Logged 30 healthy foods.",
    goal: 30,
    progKey: "healthyTotal",
  },
  {
    id: "m60",
    title: "Silver Hero",
    desc: "Logged 60 healthy foods.",
    goal: 60,
    progKey: "healthyTotal",
  },
  {
    id: "m100",
    title: "Gold Hero",
    desc: "Logged 100 healthy foods.",
    goal: 100,
    progKey: "healthyTotal",
  },
];

export function ProgressProvider({ children }) {
  const [meals, setMeals] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("hh_meals_v1")) || [];
    } catch {
      return [];
    }
  });

  const saveMeals = (next) => {
    setMeals(next);
    try {
      localStorage.setItem("hh_meals_v1", JSON.stringify(next));
    } catch {}
  };

  const addMeal = (m) => saveMeals([m, ...meals]);
  const removeMeal = (id) => saveMeals(meals.filter((x) => x.id !== id));

  const today = todayKey();

  const daily = useMemo(() => {
    // aggregate just for today
    const todayMeals = meals.filter((m) =>
      (m?.dateISO || "").startsWith(today)
    );

    const waterMl = todayMeals
      .filter((m) => m.type === "water")
      .reduce((a, b) => a + (Number(b.amount) || 0), 0);

    const fruits = todayMeals
      .filter((m) => m.type === "fruit")
      .reduce((a, b) => a + (Number(b.servings) || 1), 0);

    const veg = todayMeals
      .filter((m) => m.type === "veg")
      .reduce((a, b) => a + (Number(b.servings) || 1), 0);

    const protein = todayMeals.some(
      (m) =>
        ["other"].includes(m.type) &&
        /egg|bean|chicken|cheese/i.test(m.name || "")
    )
      ? 1
      : 0;

    // crude: “newFood” if name includes “new” or if more than 1 unique non-water food
    const nonWaterNames = Array.from(
      new Set(
        todayMeals
          .filter((m) => m.type !== "water")
          .map((m) => (m.name || "").toLowerCase())
      )
    );
    const newFood =
      nonWaterNames.some((n) => /new/.test(n)) || nonWaterNames.length >= 2
        ? 1
        : 0;

    const counts = {
      fvServings: fruits + veg,
      waterMl,
      meals: todayMeals.length,
      fruits,
      veg,
      protein,
      newFood,
    };

    return { counts };
  }, [meals, today]);

  // overall “healthyTotal” (fruits + veg for all time)
  const healthyTotal = useMemo(() => {
    let fv = 0;
    for (const m of meals) {
      if (m.type === "fruit" || m.type === "veg") {
        fv += Number(m.servings) || 1;
      }
    }
    return fv;
  }, [meals]);

  // pick 5 dailies for today (rotate pool by weekday)
  const dailies = useMemo(() => {
    const dayIndex = new Date().getDay(); // 0..6
    const rolled = [
      ...DAILY_POOL.slice(dayIndex),
      ...DAILY_POOL.slice(0, dayIndex),
    ];
    return rolled.slice(0, 5).map((q) => {
      let progress = 0;
      if (q.kind === "fruit") progress = daily.counts.fruits;
      if (q.kind === "veg") progress = daily.counts.veg;
      if (q.kind === "fv") progress = daily.counts.fvServings;
      if (q.kind === "water") progress = daily.counts.waterMl;
      if (q.kind === "meals") progress = daily.counts.meals;
      if (q.kind === "protein") progress = daily.counts.protein;
      if (q.kind === "other") progress = daily.counts.newFood;
      return { ...q, progress };
    });
  }, [daily]);

  const challenges = useMemo(
    () =>
      CHALLENGES.map((c) => {
        let progress = 0;
        if (c.progKey === "fruits") progress = daily.counts.fruits;
        if (c.progKey === "protein") progress = daily.counts.protein;
        if (c.progKey === "newFood") progress = daily.counts.newFood;
        return { ...c, progress };
      }),
    [daily]
  );

  const milestones = useMemo(
    () => MILESTONES.map((m) => ({ ...m, progress: healthyTotal })),
    [healthyTotal]
  );

  // overall progress bar 0..100 (simple blend)
  const progress = useMemo(() => {
    const a = Math.min(1, daily.counts.fvServings / 5);
    const b = Math.min(1, daily.counts.waterMl / 1000);
    const c = Math.min(1, daily.counts.meals / 3);
    return Math.round(((a + b + c) / 3) * 100);
  }, [daily]);

  return (
    <Ctx.Provider
      value={{
        meals,
        addMeal,
        removeMeal,
        daily,
        dailies,
        challenges,
        milestones,
        progress,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
