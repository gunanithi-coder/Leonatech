import { useEffect, useState, useRef } from 'react';

export default function LogoIntro({ onComplete }) {
  const [phase, setPhase] = useState('scan');
  // phases: scan → reveal → particles → type → fly → done
  const [typedText, setTypedText] = useState('');
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const tagline = 'Precision from Above. Intelligence Below.';

  // PHASE TIMELINE
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'),    800);   // scan done → logo clips in
    const t2 = setTimeout(() => setPhase('particles'), 1400);  // particles start
    const t3 = setTimeout(() => setPhase('type'),      1800);  // tagline types
    const t4 = setTimeout(() => setPhase('fly'),       4200);  // logo flies to nav
    const t5 = setTimeout(() => setPhase('done'),      5100);  // unmount
    const t6 = setTimeout(() => onComplete(),          5000);  // site fades in

    return () => [t1,t2,t3,t4,t5,t6].forEach(clearTimeout);
  }, [onComplete]);

  // TYPEWRITER EFFECT
  useEffect(() => {
    if (phase !== 'type') return;
    let i = 0;
    setTypedText('');
    const interval = setInterval(() => {
      i++;
      setTypedText(tagline.slice(0, i));
      if (i >= tagline.length) clearInterval(interval);
    }, 52);
    return () => clearInterval(interval);
  }, [phase]);

  // PARTICLE CANVAS
  useEffect(() => {
    if (phase !== 'particles' && phase !== 'type' && phase !== 'fly') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLS = Math.floor(canvas.width  / 36);
    const ROWS = Math.floor(canvas.height / 36);
    const dots = [];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (Math.random() > 0.72) {
          dots.push({
            x: c * 36 + 18,
            y: r * 36 + 18,
            opacity: Math.random() * 0.4 + 0.05,
            speed: Math.random() * 0.008 + 0.003,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        const pulse = Math.sin(frame * d.speed + d.phase);
        const alpha = d.opacity + pulse * 0.15;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,166,35,${Math.max(0, alpha)})`;
        ctx.fill();
      });
      frame++;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [phase]);

  if (phase === 'done') return null;

  const isFly = phase === 'fly';

  return (
    <>
      {/* ── DARK OVERLAY ── */}
      <div style={{
        position: 'fixed', inset: 0,
        background: '#0D1526',
        zIndex: 9998,
        opacity: isFly ? 0 : 1,
        transition: 'opacity 0.9s ease',
        pointerEvents: 'none',
      }} />

      {/* ── PARTICLE CANVAS ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', inset: 0,
          zIndex: 9999,
          opacity: (phase === 'particles' || phase === 'type') ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── SCAN LINE ── */}
      {phase === 'scan' && (
        <div style={{
          position: 'fixed', zIndex: 10001,
          top: 0, left: '-100%',
          width: '100%', height: '2px',
          background: 'linear-gradient(90deg, transparent, #F5A623, #FFBA45, transparent)',
          boxShadow: '0 0 18px 4px rgba(245,166,35,0.5)',
          animation: 'scanLine 0.75s cubic-bezier(0.4,0,0.2,1) forwards',
          pointerEvents: 'none',
        }} />
      )}

      {/* ── LOGO ── */}
      <div style={{
        position: 'fixed',
        zIndex: 10002,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        pointerEvents: 'none',
        transition: isFly
          ? 'all 0.9s cubic-bezier(0.77,0,0.18,1)'
          : 'none',

        ...(phase === 'scan' && {
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 0,
        }),
        ...((phase === 'reveal' || phase === 'particles') && {
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1,
          animation: 'clipReveal 0.55s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
        }),
        ...(phase === 'type' && {
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1,
        }),
        ...(isFly && {
          top: '18px', left: '28px',
          transform: 'translate(0,0) scale(0.52)',
          opacity: 0,
        }),
      }}>
        <img
          src="/leona-icon.png"
          alt="Leona Shield"
          style={{
            height: '100px', width: 'auto',
            objectFit: 'contain',
            filter: phase === 'scan' ? 'none'
              : 'drop-shadow(0 0 18px rgba(245,166,35,0.35))',
          }}
        />
        <img
          src="/leona-text.png"
          alt="Leona"
          style={{
            height: '88px', width: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* ── TAGLINE TYPEWRITER ── */}
      <div style={{
        position: 'fixed',
        zIndex: 10002,
        top: 'calc(50% + 90px)',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        opacity: (phase === 'type') ? 1 : 0,
        transition: 'opacity 0.4s ease',
        whiteSpace: 'nowrap',
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'rgba(245,166,35,0.75)',
        }}>
          {typedText}
          <span style={{
            display: 'inline-block',
            width: '2px', height: '14px',
            background: '#F5A623',
            marginLeft: '2px',
            verticalAlign: 'middle',
            animation: 'blink 0.7s step-end infinite',
          }} />
        </span>
      </div>

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes scanLine {
          0%   { left: -100%; top: 48%; opacity: 1; }
          100% { left: 100%;  top: 48%; opacity: 0; }
        }
        @keyframes clipReveal {
          0%   { clip-path: inset(0 100% 0 0); opacity: 1; }
          100% { clip-path: inset(0 0% 0 0);   opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </>
  );
}