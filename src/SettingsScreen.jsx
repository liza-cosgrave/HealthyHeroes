import React from "react";
import BackButton from "./components/BackButton";
import { useNavigate } from "react-router-dom";

export default function SettingsScreen() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <div
        className="TopBar"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <BackButton />
        <h2 className="ScreenTitle">Settings ⚙️</h2>
      </div>

      <div
        style={{ maxWidth: 720, margin: "16px auto", display: "grid", gap: 12 }}
      >
        <Row
          label="Reset avatar"
          onClick={() => {
            localStorage.removeItem("hh_face_v1");
            localStorage.removeItem("hh_role_v1");
            localStorage.removeItem("hh_equip_v1");
            navigate("/create-hero");
          }}
        />
        <Row
          label="Reset progress"
          onClick={() => {
            localStorage.removeItem("hh_progress_v1");
            navigate("/main");
          }}
        />
      </div>
    </div>
  );
}

function Row({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        background: "#fff",
        border: "1px solid #edf0f3",
        borderRadius: 14,
        padding: "14px 16px",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      {label}
    </button>
  );
}
