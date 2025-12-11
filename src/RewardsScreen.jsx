import React from "react";
import BackButton from "./components/BackButton";
import { useProgress } from "./ProgressContext";

const PROGRESS_BADGES = [
  { id: "bronze", title: "Bronze Hero", need: 30, emoji: "🥉" },
  { id: "silver", title: "Silver Hero", need: 60, emoji: "🥈" },
  { id: "gold", title: "Gold Hero", need: 100, emoji: "🥇" },
];

export default function RewardsScreen() {
  const p = useProgress() || {};
  const totals = p.totals || { counts: {} };
  const rewardsLog = p.rewardsLog || []; // safe default
  const healthy = Number(totals.counts?.healthyFoods || 0);

  const next = PROGRESS_BADGES.find((b) => healthy < b.need) ?? {
    id: "max",
    title: "Legend!",
    need: healthy,
    emoji: "🏆",
  };

  return (
    <div style={{ padding: 20 }}>
      <div
        className="TopBar"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <BackButton />
        <h2 className="ScreenTitle">Rewards 🎁</h2>
      </div>

      <div style={{ maxWidth: 720, margin: "16px auto" }}>
        <Card>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>
            Lifetime healthy foods: {healthy}
          </div>
          <div>
            Next badge:{" "}
            <b>
              {next.emoji} {next.title}
            </b>{" "}
            at {next.need}
          </div>
          <div style={{ marginTop: 10 }}>
            <small>
              Unlocked:{" "}
              {rewardsLog.map((r) => r.emoji || "🏅").join(" ") || "—"}
            </small>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #edf0f3",
        borderRadius: 14,
        padding: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      {children}
    </div>
  );
}
