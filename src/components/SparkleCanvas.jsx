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

    // Glowing Bokeh Light Orbs (Glam Fairycore Atmosphere)
    const orbCount = 14;
    const orbColors = [
      'rgba(236, 72, 153, ',  // Pink
      'rgba(224, 37, 117, ',   // Magenta
      'rgba(192, 132, 252, ',  // Lilac
      'rgba(251, 191, 36, ',   // Champagne Gold
    ];

    const orbs = Array.from({ length: orbCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 120 + 60,
      colorBase: orbColors[Math.floor(Math.random() * orbColors.length)],
      alpha: Math.random() * 0.12 + 0.05,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    // Sparkle Particles & Mouse Trail
    const starCount = Math.floor((width * height) / 10000);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.008,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: Math.random() > 0.4 ? '#f472b6' : '#fbbf24',
    }));

    let mouseParticles = [];

    const handleMouseMove = (e) => {
      for (let i = 0; i < 2; i++) {
        mouseParticles.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          size: Math.random() * 3.5 + 1.2,
          color: Math.random() > 0.5 ? '#ec4899' : '#fbbf24',
          alpha: 1,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8 - 0.4,
          decay: Math.random() * 0.03 + 0.015,
        });
      }
      if (mouseParticles.length > 70) {
        mouseParticles.splice(0, mouseParticles.length - 70);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Soft Bokeh Orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -100) orb.x = width + 100;
        if (orb.x > width + 100) orb.x = -100;
        if (orb.y < -100) orb.y = height + 100;
        if (orb.y > height + 100) orb.y = -100;

        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        gradient.addColorStop(0, `${orb.colorBase}${orb.alpha})`);
        gradient.addColorStop(1, `${orb.colorBase}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Floating Star Dust
      stars.forEach((star) => {
        star.alpha += star.speed * star.direction;
        if (star.alpha >= 0.95 || star.alpha <= 0.15) {
          star.direction *= -1;
        }

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Cursor Sparkle Dust
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
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 10;

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
