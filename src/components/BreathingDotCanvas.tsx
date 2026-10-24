import React, { useEffect, useRef } from 'react';

export const BreathingDotCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let isMouseActive = false;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      isMouseActive = true;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    handleResize();

    const gravityRadius = 240;
    const maxGravitationalPull = 10;
    const startTime = performance.now();

    const render = (currentTime: number) => {
      if (document.hidden) {
        if (!reduceMotion) animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsed = currentTime - startTime;
      const dotSpacing = width > 1600 ? 38 : width < 640 ? 28 : 32;

      if (isMouseActive) {
        mouseX += (targetMouseX - mouseX) * 0.08;
        mouseY += (targetMouseY - mouseY) * 0.08;
      } else {
        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;
      }

      ctx.clearRect(0, 0, width, height);

      // 鼠标引力光晕：流光天蓝与柔和青紫
      if (mouseX > -100 && mouseX < width + 100 && mouseY > -100 && mouseY < height + 100) {
        const fieldGlow = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          gravityRadius * 1.2
        );
        fieldGlow.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
        fieldGlow.addColorStop(0.5, 'rgba(99, 102, 241, 0.06)');
        fieldGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = fieldGlow;
        ctx.fillRect(
          mouseX - gravityRadius * 1.2,
          mouseY - gravityRadius * 1.2,
          gravityRadius * 2.4,
          gravityRadius * 2.4
        );
      }

      const cols = Math.ceil(width / dotSpacing) + 1;
      const rows = Math.ceil(height / dotSpacing) + 1;
      const t = elapsed * 0.0015;

      for (let i = 0; i < cols; i++) {
        const baseX = i * dotSpacing;
        for (let j = 0; j < rows; j++) {
          const baseY = j * dotSpacing;

          const dx = mouseX - baseX;
          const dy = mouseY - baseY;
          const distSq = dx * dx + dy * dy;

          let renderX = baseX;
          let renderY = baseY;
          let gravityInfluence = 0;

          if (distSq < gravityRadius * gravityRadius) {
            const dist = Math.sqrt(distSq);
            const normDist = dist / gravityRadius;
            const curve = 1 - normDist;
            gravityInfluence = curve * curve * (3 - 2 * curve);

            if (dist > 0.1) {
              const pullAmount = maxGravitationalPull * gravityInfluence;
              renderX = baseX + (dx / dist) * pullAmount;
              renderY = baseY + (dy / dist) * pullAmount;
            }
          }

          // 双频平滑呼吸波
          const wave1 = Math.sin(t + baseX * 0.006 + baseY * 0.006);
          const wave2 = Math.cos(t * 0.65 - baseX * 0.004 + baseY * 0.005);
          const breath = (wave1 + wave2) * 0.5;

          const baseRadius = 1.35;
          const breathRadius = baseRadius + breath * 0.25;
          const finalRadius = Math.max(0.6, breathRadius + gravityInfluence * 0.9);

          // 点阵色相：更清晰的质感灰蓝 -> 激活态灵动天蓝
          const r = Math.round(155 + (25 - 155) * gravityInfluence);
          const g = Math.round(175 + (85 - 175) * gravityInfluence);
          const b = Math.round(205 + (225 - 205) * gravityInfluence);

          // 基础透明度提升，使默认状态下点阵清晰可见，交互时自然不突兀
          const ambientAlpha = 0.50 + breath * 0.12;
          const finalAlpha = Math.min(0.95, ambientAlpha + gravityInfluence * 0.42);

          if (gravityInfluence > 0.25) {
            ctx.beginPath();
            ctx.arc(renderX, renderY, finalRadius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(14, 165, 233, ${(gravityInfluence * 0.16).toFixed(3)})`;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(renderX, renderY, finalRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      if (!reduceMotion) animationFrameId = requestAnimationFrame(render);
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      render(startTime);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-white">
      {/* 呼吸引力点阵画布（已去除方格，仅保留更清晰纯净的质感点阵） */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};
