import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * BackButton — tries history back, otherwise falls back to `to` (default /main).
 * Also listens to Escape key to go back.
 */
export default function BackButton({ to = "/main", label = "Back" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = React.useCallback(() => {
    const noHistory =
      (window.history?.length || 0) <= 1 || location.key === "default"; // some routers mark first entry like this

    if (noHistory || document.referrer === "") {
      navigate(to, { replace: true });
    } else {
      navigate(-1);
    }
  }, [navigate, to, location.key]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") goBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goBack]);

  return (
    <button
      onClick={goBack}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 12px",
        borderRadius: 10,
        border: "1px solid #d9dee6",
        background: "#f3f5f8",
      }}
    >
      <span>⬅</span> {label}
    </button>
  );
}
