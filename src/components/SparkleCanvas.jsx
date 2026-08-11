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

    // Background floating stars
    const starCount = Math.floor((width * height) / 12000);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));

    // Mouse trail particles
    let mouseParticles = [];

    const handleMouseMove = (e) => {
      // Add 2-3 sparkle particles on mouse movement
      for (let i = 0; i < 2; i++) {
        mouseParticles.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? '#f5d77f' : '#c8963e',
          alpha: 1,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          life: 1,
          decay: Math.random() * 0.03 + 0.015,
        });
      }
      if (mouseParticles.length > 60) {
        mouseParticles.splice(0, mouseParticles.length - 60);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render background stars
      stars.forEach((star) => {
        star.alpha += star.speed * star.direction;
        if (star.alpha >= 0.95 || star.alpha <= 0.15) {
          star.direction *= -1;
        }

        ctx.fillStyle = `rgba(247, 215, 116, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render mouse particles
      for (let i = mouseParticles.length - 1; i >= 0; i--) {
        const p = mouseParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          mouseParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#f5d77f';
        ctx.shadowBlur = 8;
        
        // Draw 4-point sparkle star
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
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
