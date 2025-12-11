import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";

export default function HomeScreen() {
  const navigate = useNavigate();
  const bg = `${process.env.PUBLIC_URL}/assets/start_screen.png`;

  const onPlay = () => {
    const hasFace = !!localStorage.getItem("hh_face_v1");
    const onboarded = !!localStorage.getItem("hh_onboarded_v1");
    if (!hasFace || !onboarded) navigate("/create-hero");
    else navigate("/main");
  };

  return (
    <div
      className="HomeScreen hero-bg"
      style={{
        "--hero-bg": `url("${bg}")`,
      }}
    >
      <div className="HeroContent">
        <h1 className="HeroTitle">Healthy Heroes</h1>
        <p className="HeroSubtitle">Eat, play, and level up!</p>
        <button className="PlayButton" onClick={onPlay}>
          ► Play
        </button>
      </div>
    </div>
  );
}
