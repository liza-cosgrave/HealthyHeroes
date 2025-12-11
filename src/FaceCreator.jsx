import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BASE_BODY,
  EYES,
  EYEBROWS,
  NOSES,
  MOUTHS,
  HAIR,
  UI, // { eyesTab, browsTab, noseTab, mouthTab, hairTab, settings, nice }
} from "./faceAssets";
import "./FaceCreator.css";

/* -------- localStorage keys -------- */
const LS_FACE = "hh_face_v1";
const LS_ONBOARDED = "hh_onboarded_v1";

/* -------- remember current offsets (as agreed) -------- */
const EYES_DY = 0; // %
const BROWS_DY = 0; // %
const NOSE_DY = -1; // %
const MOUTH_DY = 0; // %
const HAIR_DY = 0; // %

/* -------- helper persistence -------- */
const readFace = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_FACE)) || {};
  } catch {
    return {};
  }
};
const writeFace = (f) => localStorage.setItem(LS_FACE, JSON.stringify(f));

/* -------- wizard steps -------- */
const STEPS = [
  { key: "eyes", label: "Eyes", items: EYES, icon: UI.eyesTab },
  { key: "brows", label: "Brows", items: EYEBROWS, icon: UI.browsTab },
  { key: "nose", label: "Nose", items: NOSES, icon: UI.noseTab },
  { key: "mouth", label: "Mouth", items: MOUTHS, icon: UI.mouthTab },
  { key: "hair", label: "Hair", items: HAIR, icon: UI.hairTab },
];

export default function FaceCreator() {
  const navigate = useNavigate();
  const [face, setFace] = React.useState(() => readFace());
  const [stepIndex, setStepIndex] = React.useState(0);

  const step = STEPS[stepIndex];

  const apply = (key, src) => {
    const next = { ...face, [key]: src };
    setFace(next);
    writeFace(next);
  };

  const nextStep = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      // finished wizard → mark onboarded then go pick a role
      localStorage.setItem(LS_ONBOARDED, "1");
      navigate("/character");
    }
  };

  /* ---------- derived sizing for preview box ---------- */
  const bg = `${process.env.PUBLIC_URL}/assets/ui/custom_char_window_back.png`;
  const box = { width: 280, height: Math.round(280 * (360 / 280)) }; // same ratio as MainScreen avatar

  return (
    <div className="HeroCreatorWrapper">
      <div className="HeroIntro">
        <h1>Create Your Hero! ⚔️</h1>
        <p>Choose your look and begin your adventure!</p>
      </div>

      <div className="CreatorStage">
        {/* Left: preview area */}
        <div className="LeftCol">
          <div
            className="FacePreview"
            style={{
              ...box,
              backgroundImage: `url(${bg})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: 18,
            }}
          >
            {/* base */}
            <img className="Layer Layer_Base" src={BASE_BODY} alt="" />
            {/* hair */}
            {face.hair && (
              <img
                className="Layer"
                src={face.hair}
                alt=""
                style={{ transform: `translateY(${HAIR_DY}%)` }}
              />
            )}
            {/* eyes */}
            {face.eyes && (
              <img
                className="Layer"
                src={face.eyes}
                alt=""
                style={{ transform: `translateY(${EYES_DY}%)` }}
              />
            )}
            {/* brows */}
            {face.brows && (
              <img
                className="Layer"
                src={face.brows}
                alt=""
                style={{ transform: `translateY(${BROWS_DY}%)` }}
              />
            )}
            {/* nose */}
            {face.nose && (
              <img
                className="Layer"
                src={face.nose}
                alt=""
                style={{ transform: `translateY(${NOSE_DY}%)` }}
              />
            )}
            {/* mouth */}
            {face.mouth && (
              <img
                className="Layer"
                src={face.mouth}
                alt=""
                style={{ transform: `translateY(${MOUTH_DY}%)` }}
              />
            )}
          </div>
        </div>

        {/* Right: grid + mini tabs */}
        <div className="RightCol">
          <div className="TabsRow">
            {STEPS.map((s, i) => (
              <button
                key={s.key}
                className={`TabBtn ${i === stepIndex ? "active" : ""}`}
                onClick={() => setStepIndex(i)}
                aria-label={s.label}
                title={s.label}
              >
                <img src={s.icon} alt={s.label} />
              </button>
            ))}

            {/* Settings shortcut */}
            <button
              className="TabBtn"
              onClick={() => navigate("/settings")}
              aria-label="Settings"
              title="Settings"
              style={{ marginLeft: "auto" }}
            >
              <img src={UI.settings} alt="Settings" />
            </button>
          </div>

          <h3 style={{ margin: "6px 0 8px" }}>
            Choose {step.label.toLowerCase()}
          </h3>

          <div
            className="Grid"
            role="listbox"
            aria-label={step.label}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {(step.items || []).map((src, i) => {
              const active = face[step.key] === src;
              return (
                <button
                  key={src + i}
                  onClick={() => apply(step.key, src)}
                  aria-pressed={active}
                  className="SlotBtn"
                  style={{
                    background: "white",
                    borderRadius: 16,
                    padding: 10,
                    height: 120,
                    display: "grid",
                    placeItems: "center",
                    boxShadow: active
                      ? "0 10px 28px rgba(124,133,255,.35), 0 0 0 2px #7c8cff inset"
                      : "0 8px 18px rgba(0,0,0,.08)",
                    border: active ? "2px solid #7c8cff" : "1px solid #eee",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={src}
                    alt={step.key}
                    style={{
                      width: "70%",
                      height: "70%",
                      objectFit: "contain",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Nice = next */}
          <button
            className="NiceBtn"
            onClick={nextStep}
            aria-label="Next"
            style={{
              marginTop: 16,
              display: "inline-grid",
              placeItems: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <img src={UI.nice} alt="Nice!" style={{ height: 64 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
