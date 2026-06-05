import { useEffect, useRef, useState } from "react";

export default function LogoIntro({ onComplete }) {
  const videoRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);

  // Lock scroll during intro
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleEnded = () => {
    setFadeOut(true);
    setTimeout(() => onComplete?.(), 900); // wait for fade to finish
  };

  // Fallback: if video fails to play or takes too long, skip after 10s
  useEffect(() => {
    const fallback = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onComplete?.(), 900);
    }, 10000);
    return () => clearTimeout(fallback);
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.9s ease",
        pointerEvents: "none",
      }}
    >
      <video
        ref={videoRef}
        src="/leona-animation.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",  // or "contain" if you want letterboxing
        }}
      />
    </div>
  );
}