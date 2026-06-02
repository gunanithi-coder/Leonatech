import { useEffect, useState, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

// 🔥 INCREASED INTRO LOGO SIZE (ONLY VISUAL IN INTRO)
const NAV_SIZE = 50;
// navbar match size stays unchanged

export default function LogoIntro({ onComplete }) {
  const startRef = useRef(null);

  const [progress, setProgress] = useState(0);

  const [iconReady, setIconReady] = useState(false);
  const [textReady, setTextReady] = useState(false);

  const [target, setTarget] = useState({
    x: 0,
    y: 0,
    scale: 1,
  });

  // ---------------- LOCK SCROLL ----------------
useEffect(() => {
  const t1 = setTimeout(() => setIconReady(true), 900);   // was 700
  const t2 = setTimeout(() => setTextReady(true), 1500);  // was 1200

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
  };
}, []);

useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => (document.body.style.overflow = "");
}, []);
  // ---------------- FAST ICON/TEXT REVEAL ----------------
 
  // ---------------- MEASURE NAVBAR ----------------
  useEffect(() => {
    const measure = () => {
      const el = document.getElementById("navbar-logo-anchor");
      if (!el) return;

      const r = el.getBoundingClientRect();

      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      setTarget({
        x: cx - window.innerWidth / 2,
        y: cy - window.innerHeight / 2,
        scale: r.height / NAV_SIZE,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ---------------- SHORTER TIMELINE ----------------
  useAnimationFrame((t) => {
    if (!startRef.current) startRef.current = t;

    // 🔥 reduced from ~7600ms → ~5600ms (faster intro)
    const p = Math.min((t - startRef.current) / 9200, 1);

    setProgress(p);

    if (p === 1) {
      setTimeout(() => onComplete?.(), 150);
    }
  });

  const ease = (t) => t * t * (3 - 2 * t);

  const t = ease(progress);

  const x = target.x * t;
  const y = target.y * t;

  const scale = 1 - (1 - target.scale) * t;

  const fadeOut = progress > 0.92;

  return (
    <>
      {/* BACKDROP */}
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          background:
            "radial-gradient(circle at center, #0b1220 0%, #05070b 55%, #000 100%)",
          pointerEvents: "none",
        }}
        animate={{
          opacity: fadeOut ? 0 : 1,
        }}
        transition={{
          duration: 1.2,
          ease: EASE,
        }}
      />

      {/* LOGO GROUP */}
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
        animate={{
          x,
          y,
          scale,
          opacity: fadeOut ? 0 : 1,
        }}
        transition={{
          duration: 1.05,
          ease: EASE,
        }}
      >
        {/* ICON + TEXT */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          {/* 🔥 BIGGER ICON (INTRO ONLY) */}
          <motion.img
            src="/leona-icon.png"
            alt="Leona Shield"
            style={{
              height: NAV_SIZE,
              width: "auto",
              objectFit: "contain",
            }}
            animate={{
              opacity: iconReady ? 1 : 0,
              scale: iconReady ? 1 : 0.96,
            }}
            transition={{
              duration: 0.8,
              ease: EASE,
            }}
          />

          {/* 🔥 BIGGER TEXT (INTRO ONLY) */}
          <motion.img
            src="/leona-text.png"
            alt="Leona Tech & Geo Solutions Private Limited"
            style={{
              height: NAV_SIZE * 0.7,
              width: "auto",
              objectFit: "contain",
            }}
            animate={{
              opacity: textReady ? 1 : 0,
              x: textReady ? 0 : 6,
            }}
            transition={{
              duration: 0.9,
              ease: EASE,
            }}
          />
        </div>
      </motion.div>
    </>
  );
}