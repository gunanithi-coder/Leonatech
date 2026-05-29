export const C = {
  bgDeep:   "#07101F",
  bgDark:   "#0C1B38",
  bgMid:    "#0F1F3A",
  bgLight:  "#1A3060",
  orange:   "#E05B2A",
  orangeHi: "#F06D36",
  blue:     "#1A3A7A",
  textPri:  "#FFFFFF",
  textSec:  "#B8CAE0",
  textMut:  "#7A93B8",
  border:   "rgba(255,255,255,0.06)",
  borderHi: "rgba(224,91,42,0.35)",
};

export const CAT_COLORS = {
  "Urban Planning":      "#E05B2A",
  "Water & Environment": "#3A9BBF",
  "Infrastructure":      "#7B5EA7",
  "Mining & Volumetric": "#C49A28",
  "Monitoring":          "#4AAE8F",
};

export const hexToRgb = (hex) => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, "#$1$1$2$2$3$3")
  );
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "224,91,42";
};