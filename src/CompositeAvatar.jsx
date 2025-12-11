import React from "react";
import { BASE_BODY } from "./faceAssets";

const LS_FACE = "hh_face_v1";

export default function CompositeAvatar({ size = 128 }) {
  const face = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_FACE)) || {};
    } catch {
      return {};
    }
  }, []);

  const box = { width: size, height: Math.round(size * (360 / 280)) }; // same ratio as creator

  return (
    <div style={{ position: "relative", ...box }}>
      <img src={BASE_BODY} alt="" style={layerStyle} />
      {face.hair && (
        <img src={face.hair} alt="" style={{ ...layerStyle, zIndex: 4 }} />
      )}
      {face.eyes && (
        <img src={face.eyes} alt="" style={{ ...layerStyle, zIndex: 3 }} />
      )}
      {face.nose && (
        <img src={face.nose} alt="" style={{ ...layerStyle, zIndex: 3 }} />
      )}
      {face.mouth && (
        <img src={face.mouth} alt="" style={{ ...layerStyle, zIndex: 3 }} />
      )}
    </div>
  );
}

const layerStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  pointerEvents: "none",
};
