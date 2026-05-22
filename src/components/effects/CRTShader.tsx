"use client";

import { useEffect, useRef } from "react";

/**
 * CRTShader - Canvas-based CRT effect for Amber-Retro theme
 * Light version: Scanlines + Vignette only
 */
export function CRTShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let animationId: number;

    const drawCRT = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scanlines
      ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
      for (let y = 0; y < canvas.height; y += 2) {
        ctx.fillRect(0, y, canvas.width, 1);
      }

      // Vignette
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.7
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.4)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle amber border glow
      ctx.strokeStyle = "rgba(255, 176, 0, 0.02)";
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(drawCRT);
    };

    drawCRT();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
}

export default CRTShader;
