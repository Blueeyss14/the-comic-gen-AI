import { useEffect, useRef } from "react";

export default function BackgroundComic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    let t = 0;
    let animId: number;

    const LINE_COUNT = 40;

    const draw = () => {
      t += 0.001;

      ctx.fillStyle = "#313A3C";
      ctx.fillRect(0, 0, W, H);

      const bands = [
        {
          color: (a: number) => `rgba(255,255,255,${a})`,
          amp1: 0.22, amp2: 0.10, amp3: 0.05,
          f1: 2.5, f2: 1.5, f3: 4.0,
          t1: 1.0, t2: -0.7, t3: 1.3,
          p1: 2.0, p2: 1.5, p3: 0.8,
          spread: 0.35, alphaMax: 0.28,
        },
        {
          color: (a: number) => `rgba(100,180,255,${a})`,
          amp1: 0.20, amp2: 0.12, amp3: 0.06,
          f1: 2.2, f2: 3.0, f3: 1.3,
          t1: -1.1, t2: 0.6, t3: -0.4,
          p1: 2.5, p2: 1.2, p3: 0.6,
          spread: 0.38, alphaMax: 0.22,
        },
        {
          color: (a: number) => `rgba(160,220,240,${a})`,
          amp1: 0.18, amp2: 0.09, amp3: 0.07,
          f1: 1.8, f2: 2.8, f3: 3.5,
          t1: 0.8, t2: -1.2, t3: 0.5,
          p1: 1.8, p2: 2.0, p3: 1.1,
          spread: 0.32, alphaMax: 0.18,
        },
      ];

      for (const band of bands) {
        for (let i = 0; i < LINE_COUNT; i++) {
          const progress = i / LINE_COUNT;
          const alpha = 0.04 + Math.sin(progress * Math.PI) * band.alphaMax;
          const lineWidth = 0.3 + Math.sin(progress * Math.PI) * 0.9;

          ctx.beginPath();
          ctx.strokeStyle = band.color(alpha);
          ctx.lineWidth = lineWidth;

          const STEPS = 80;
          for (let s = 0; s <= STEPS; s++) {
            const x = (s / STEPS) * W;
            const nx = s / STEPS;
            const y =
              H * 0.5 +
              Math.sin(nx * Math.PI * band.f1 + t * band.t1 + progress * band.p1) * H * band.amp1 +
              Math.sin(nx * Math.PI * band.f2 + t * band.t2 + progress * band.p2) * H * band.amp2 +
              Math.sin(nx * Math.PI * band.f3 + t * band.t3 + progress * band.p3) * H * band.amp3 +
              (progress - 0.5) * H * band.spread;

            if (s === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}