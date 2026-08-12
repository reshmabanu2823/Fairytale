import React, { useEffect, useRef } from 'react';

export default function CursorButterfly() {
  const butterflyRef = useRef(null);
  const trailCanvasRef = useRef(null);

  useEffect(() => {
    const butterfly = butterflyRef.current;
    const canvas = trailCanvasRef.current;
    if (!butterfly || !canvas) return;

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

    let targetX = width / 2;
    let targetY = height / 3;

    let currentX = width / 2;
    let currentY = height / 3;
    let currentAngle = 0;

    let lastMouseMoveTime = Date.now();
    let isMobileTouch = false;

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      isMobileTouch = true;
    }

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      lastMouseMoveTime = Date.now();
      isMobileTouch = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
        lastMouseMoveTime = Date.now();
        isMobileTouch = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    let trailParticles = [];

    const animate = () => {
      const now = Date.now();
      const timeSec = now / 1000;
      const isIdle = now - lastMouseMoveTime > 2200;

      let effectiveTargetX = targetX;
      let effectiveTargetY = targetY;

      if (isMobileTouch) {
        effectiveTargetX = width / 2 + Math.sin(timeSec * 0.4) * (width * 0.38);
        effectiveTargetY = height / 2 + Math.cos(timeSec * 0.6) * (height * 0.32);
      } else if (isIdle) {
        effectiveTargetX = targetX + Math.sin(timeSec * 1.6) * 45;
        effectiveTargetY = targetY + Math.sin(timeSec * 3.2) * 25;
      }

      const wobbleX = Math.sin(timeSec * 4.5) * 14;
      const wobbleY = Math.cos(timeSec * 3.8) * 12;

      const destX = effectiveTargetX + wobbleX;
      const destY = effectiveTargetY + wobbleY;

      const dx = destX - currentX;
      const dy = destY - currentY;

      const newX = currentX + dx * 0.055;
      const newY = currentY + dy * 0.055;

      const vx = newX - currentX;
      const vy = newY - currentY;

      if (Math.abs(vx) > 0.08 || Math.abs(vy) > 0.08) {
        let targetAngle = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
        let angleDiff = targetAngle - currentAngle;

        while (angleDiff < -180) angleDiff += 360;
        while (angleDiff > 180) angleDiff -= 360;

        currentAngle += angleDiff * 0.085;
      }

      currentX = newX;
      currentY = newY;

      butterfly.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${currentAngle}deg)`;

      const speed = Math.hypot(vx, vy);
      if (speed > 0.4 && Math.random() > 0.35) {
        trailParticles.push({
          x: currentX + (Math.random() - 0.5) * 8,
          y: currentY + (Math.random() - 0.5) * 8,
          size: Math.random() * 2.8 + 1,
          color: Math.random() > 0.5 ? 'rgba(198, 157, 82, ' : 'rgba(216, 176, 180, ',
          alpha: 0.85,
          vx: (Math.random() - 0.5) * 1.2 - vx * 0.2,
          vy: (Math.random() - 0.5) * 1.2 - vy * 0.2,
          decay: Math.random() * 0.035 + 0.02,
        });
      }

      if (trailParticles.length > 50) {
        trailParticles.splice(0, trailParticles.length - 50);
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const p = trailParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          trailParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={trailCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 38,
        }}
      />

      <div
        ref={butterflyRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '48px',
          height: '48px',
          pointerEvents: 'none',
          zIndex: 40,
          willChange: 'transform',
          filter: 'drop-shadow(3px 6px 10px rgba(45, 30, 20, 0.35))',
        }}
      >
        <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
          <defs>
            <linearGradient id="cursorVintageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d8b0b4" />
              <stop offset="45%" stopColor="#c69d52" />
              <stop offset="75%" stopColor="#8f9e8b" />
              <stop offset="100%" stopColor="#5c4738" />
            </linearGradient>
          </defs>

          <g className="wing-left">
            <path
              d="M 50,50 C 15,5 0,22 5,58 C 8,80 35,72 50,50 Z"
              fill="url(#cursorVintageGrad)"
              stroke="#3c2e24"
              strokeWidth="2"
            />
            <circle cx="24" cy="34" r="4" fill="#f6f1e8" opacity="0.85" />
          </g>

          <g className="wing-right">
            <path
              d="M 50,50 C 85,5 100,22 95,58 C 92,80 65,72 50,50 Z"
              fill="url(#cursorVintageGrad)"
              stroke="#3c2e24"
              strokeWidth="2"
            />
            <circle cx="76" cy="34" r="4" fill="#f6f1e8" opacity="0.85" />
          </g>

          <path d="M 50,28 L 50,72" stroke="#2b1f17" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 50,28 Q 40,16 35,14" stroke="#c69d52" strokeWidth="1.8" fill="none" />
          <path d="M 50,28 Q 60,16 65,14" stroke="#c69d52" strokeWidth="1.8" fill="none" />
          <circle cx="35" cy="14" r="2" fill="#c69d52" />
          <circle cx="65" cy="14" r="2" fill="#c69d52" />
        </svg>
      </div>
    </>
  );
}
