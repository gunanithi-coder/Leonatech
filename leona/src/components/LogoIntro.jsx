import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LogoIntro({ onComplete }) {
const [phase, setPhase] = useState("dark");
const canvasRef = useRef(null);
const rafRef = useRef(null);

useEffect(() => {
const timers = [
setTimeout(() => setPhase("logo"), 800),
setTimeout(() => setPhase("text"), 2200),
setTimeout(() => setPhase("exit"), 5000),
setTimeout(() => {
if (onComplete) onComplete();
}, 6000),
];


return () => timers.forEach(clearTimeout);


}, [onComplete]);

useEffect(() => {
const canvas = canvasRef.current;
if (!canvas) return;


const ctx = canvas.getContext("2d");

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

resize();
window.addEventListener("resize", resize);

const particles = Array.from({ length: 90 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 1.4 + 0.2,
  vx: (Math.random() - 0.5) * 0.08,
  vy: (Math.random() - 0.5) * 0.08,
  opacity: Math.random() * 0.25 + 0.05,
  phase: Math.random() * Math.PI * 2,
}));

let frame = 0;

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;

    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(255,255,255,${
      p.opacity + Math.sin(frame * 0.01 + p.phase) * 0.05
    })`;

    ctx.fill();
  });

  frame++;
  rafRef.current = requestAnimationFrame(draw);
};

draw();

return () => {
  cancelAnimationFrame(rafRef.current);
  window.removeEventListener("resize", resize);
};


}, []);

return ( <AnimatePresence>
<motion.div
initial={{ opacity: 1 }}
animate={{
opacity: phase === "exit" ? 0 : 1,
}}
transition={{
duration: 1.2,
ease: "easeInOut",
}}
style={{
position: "fixed",
inset: 0,
zIndex: 99999,
overflow: "hidden",
background:
"radial-gradient(circle at center,#0a1425 0%,#05070b 60%,#000000 100%)",
}}
>
{/* ATMOSPHERIC GLOW */}


    <motion.div
      animate={{
        opacity: [0.08, 0.18, 0.08],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
      }}
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at center, rgba(255,255,255,.08), transparent 70%)",
      }}
    />

    {/* PARTICLES */}

    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    />

    {/* CENTER CONTENT */}

    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* ICON */}

      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.img
          src="/leona-icon.png"
          alt="Leona"
          initial={{
            opacity: 0,
            scale: 0.82,
            y: 15,
          }}
          animate={{
            opacity: phase !== "dark" ? 1 : 0,
            scale: phase !== "dark" ? 1 : 0.82,
            y: phase !== "dark" ? 0 : 15,
          }}
          transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            width: "180px",
            height: "180px",
            objectFit: "contain",
            filter:
              "drop-shadow(0 0 25px rgba(255,255,255,.08))",
          }}
        />

        {/* LIGHT SWEEP */}

        <motion.div
          initial={{
            x: "-150%",
          }}
          animate={{
            x:
              phase === "text" || phase === "exit"
                ? "150%"
                : "-150%",
          }}
          transition={{
            duration: 1.6,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(105deg, transparent, rgba(255,255,255,.35), transparent)",
          }}
        />
      </div>

      {/* LEONA WORDMARK REVEAL */}

      <motion.div
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={{
          width:
            phase === "text" || phase === "exit"
              ? "500px"
              : 0,
          opacity:
            phase === "text" || phase === "exit"
              ? 1
              : 0,
        }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          overflow: "hidden",
          marginTop: "18px",
        }}
      >
        <img
          src="/leona-text.png"
          alt="Leona"
          style={{
            width: "500px",
            maxWidth: "90vw",
            display: "block",
          }}
        />
      </motion.div>

      {/* SUBTITLE */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity:
            phase === "text" || phase === "exit"
              ? 1
              : 0,
          y:
            phase === "text" || phase === "exit"
              ? 0
              : 20,
        }}
        transition={{
          delay: 0.4,
          duration: 1,
        }}
        style={{
          marginTop: "10px",
          color: "rgba(255,255,255,.65)",
          fontSize: "12px",
          letterSpacing: "0.55em",
          textTransform: "uppercase",
          fontWeight: 300,
        }}
      >
        TECH & GEO SOLUTIONS
      </motion.div>

      {/* THIN LINE */}

      <motion.div
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX:
            phase === "text" || phase === "exit"
              ? 1
              : 0,
        }}
        transition={{
          delay: 0.2,
          duration: 1,
        }}
        style={{
          width: "260px",
          height: "1px",
          marginTop: "18px",
          background:
            "linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)",
          transformOrigin: "center",
        }}
      />
    </div>
  </motion.div>
</AnimatePresence>


);
}
