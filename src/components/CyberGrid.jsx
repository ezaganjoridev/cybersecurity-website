import React, { useEffect, useRef, memo, useCallback } from 'react';

/**
 * Lightweight cyber-grid canvas background.
 * Draws a subtle animated grid with occasional "pulse" dots.
 * Uses requestAnimationFrame and offscreen techniques for performance.
 * Automatically pauses when off-screen via IntersectionObserver.
 */
const CyberGrid = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const visibleRef = useRef(true);
  const dotsRef = useRef([]);
  const useStaticGrid =
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia?.('(max-width: 767px)').matches);

  const GRID = 40;
  const DOT_COUNT = 12;

  const initDots = useCallback((w, h) => {
    dotsRef.current = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      speed: Math.random() * 0.3 + 0.1,
      alpha: Math.random() * 0.4 + 0.1,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));
  }, []);

  useEffect(() => {
    if (useStaticGrid) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let resizeFrame = null;

    const resize = () => {
      if (resizeFrame !== null) return;

      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = null;
        const { clientWidth: w, clientHeight: h } = canvas.parentElement;
        if (!w || !h) return;

        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initDots(w, h);
      });
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const draw = () => {
      if (!visibleRef.current) return;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.05)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x < w; x += GRID) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += GRID) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Animated dots
      dotsRef.current.forEach((dot) => {
        dot.y += dot.speed * dot.dir;
        dot.alpha += (Math.random() - 0.5) * 0.02;
        dot.alpha = Math.max(0.05, Math.min(0.5, dot.alpha));

        if (dot.y > h + 10) dot.y = -10;
        if (dot.y < -10) dot.y = h + 10;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        const isPurple = dot.speed > 0.35;
        ctx.fillStyle = isPurple ? `rgba(168, 85, 247, ${dot.alpha})` : `rgba(34, 197, 94, ${dot.alpha})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    const start = () => {
      if (animRef.current === null) {
        animRef.current = requestAnimationFrame(draw);
      }
    };

    const stop = () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };

    // Intersection observer to pause off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    start();

    return () => {
      stop();
      if (resizeFrame !== null) {
        window.cancelAnimationFrame(resizeFrame);
      }
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [useStaticGrid, initDots]);

  if (useStaticGrid) {
    return (
      <div
        className={`absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:40px_40px] ${className}`}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default memo(CyberGrid);
