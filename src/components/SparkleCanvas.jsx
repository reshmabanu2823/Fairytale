import React, { useEffect, useRef } from 'react';

export default function SparkleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Sun-dappled Forest Light Motes & Botanical Pollen
    const motesCount = Math.floor((width * height) / 14000);
    const motes = Array.from({ length: motesCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      alpha: Math.random() * 0.4 + 0.1,
      speedY: Math.random() * -0.2 - 0.05,
      speedX: (Math.random() - 0.5) * 0.2,
      color: Math.random() > 0.4 ? 'rgba(198, 157, 82, ' : 'rgba(228, 195, 198, ',
    }));

    // Soft Mouse Dust Trail
    let dustParticles = [];

    const handleMouseMove = (e) => {
      for (let i = 0; i < 2; i++) {
        dustParticles.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: Math.random() * 2.5 + 0.8,
          color: Math.random() > 0.5 ? 'rgba(198, 157, 82, ' : 'rgba(117, 133, 113, ',
          alpha: 0.8,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.2,
          decay: Math.random() * 0.02 + 0.015,
        });
      }
      if (dustParticles.length > 50) {
        dustParticles.splice(0, dustParticles.length - 50);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Floating Sun-dappled Light Motes
      motes.forEach((mote) => {
        mote.y += mote.speedY;
        mote.x += mote.speedX;

        if (mote.y < -10) mote.y = height + 10;
        if (mote.x < -10) mote.x = width + 10;
        if (mote.x > width + 10) mote.x = -10;

        ctx.fillStyle = `${mote.color}${mote.alpha})`;
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Mouse Dust Trail
      for (let i = dustParticles.length - 1; i >= 0; i--) {
        const p = dustParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          dustParticles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
