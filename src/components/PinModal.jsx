import React, { useState, useEffect } from "react";

export default function PinModal({ onCancel, onSubmit }) {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    setPin("");
    setErr("");
  }, []);

  const handleOk = () => {
    const p = pin.trim();
    if (!/^\d{4,}$/.test(p)) {
      setErr("Enter your 4+ digit PIN.");
      return;
    }
    const msg = onSubmit?.(p);
    if (typeof msg === "string" && msg) {
      setErr(msg);
      return;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.4)",
        display: "grid",
        placeItems: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 16,
          width: 300,
          boxShadow: "0 10px 30px rgba(0,0,0,.2)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Parent PIN</h3>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter PIN"
          inputMode="numeric"
          style={{
            width: "100%",
            padding: 10,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        />
        {err && (
          <div style={{ color: "#b91c1c", fontSize: 12, marginTop: 6 }}>
            {err}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 12,
          }}
        >
          <button
            onClick={onCancel}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              background: "#f3f4f6",
              border: "none",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleOk}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              background: "#4cafef",
              color: "#fff",
              border: "none",
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
