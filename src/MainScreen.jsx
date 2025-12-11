import React from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "./ProgressContext";
import CompositeAvatar from "./CompositeAvatar";
import "./MainScreen.css";

export default function MainScreen() {
  const navigate = useNavigate();
  const { progress = 0 } = useProgress() || {};

  const tiles = [
    {
      id: "quests",
      label: "Quests",
      icon: "📝",
      onClick: () => navigate("/quests"),
    },
    { id: "map", label: "Map", icon: "🗺️", onClick: () => navigate("/map") },
    {
      id: "rewards",
      label: "Rewards",
      icon: "🏅",
      onClick: () => navigate("/rewards"),
    },

    // ✅ these three routes are wired in App.jsx
    {
      id: "custom",
      label: "Customise",
      icon: "🎒",
      onClick: () => navigate("/customize-character"),
    },
    {
      id: "character",
      label: "Character",
      icon: "🧝",
      onClick: () => navigate("/character"),
    },
    {
      id: "foodlog",
      label: "Food Log",
      icon: "🥕",
      onClick: () => navigate("/food"),
    },

    {
      id: "games",
      label: "Games",
      icon: "🎮",
      onClick: () => navigate("/games"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <div className="MainScreen">
      <h1 className="MainTitle">Welcome, Healthy Hero! 🧚‍♂️</h1>

      <div className="MainHeader">
        <CompositeAvatar size={140} />
        <div className="ProgressWrap">
          <div className="ProgressBar">
            <div
              className="ProgressFill"
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </div>
          <div className="ProgressText">{Math.round(progress)}%</div>
        </div>
      </div>

      <div className="TileGrid">
        {tiles.map((t) => (
          <button key={t.id} className="Tile" onClick={t.onClick}>
            <div className="TileIcon">{t.icon}</div>
            <div className="TileLabel">{t.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
