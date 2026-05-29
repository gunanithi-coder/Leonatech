import { useState, useEffect, useRef } from 'react';

/**
 * useCountUp — triggers a number count-up animation when element scrolls into view
 * @param {number} target     — the final number to count to
 * @param {number} duration   — animation duration in ms (default 2000)
 * @param {number} startDelay — delay before counting starts in ms (default 0)
 */
export default function useCountUp(target, duration = 2000, startDelay = 0) {
  const [count, setCount]     = useState(0);
  const [started, setStarted] = useState(false);
  const ref                   = useRef(null);

  // Watch for element entering viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  // Run the count-up once triggered
  useEffect(() => {
    if (!started) return;

    let startTime = null;
    let frame;

    const timer = setTimeout(() => {
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed  = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic — fast start, slow finish
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));

        if (progress < 1) {
          frame = requestAnimationFrame(animate);
        } else {
          setCount(target); // ensure exact final value
        }
      };

      frame = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [started, target, duration, startDelay]);

  return { count, ref };
}