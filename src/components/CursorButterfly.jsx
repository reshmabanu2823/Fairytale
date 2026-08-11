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

    // Positions & Lerp State
    let targetX = width / 2;
    let targetY = height / 3;

    let currentX = width / 2;
    let currentY = height / 3;
    let currentAngle = 0;

    let lastMouseMoveTime = Date.now();
    let isMobileTouch = false;

    // Detect mobile touch
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

    // Sparkle trail particles emitted by the curious butterfly
    let trailParticles = [];

    const animate = () => {
      const now = Date.now();
      const timeSec = now / 1000;
      const isIdle = now - lastMouseMoveTime > 2200;

      let effectiveTargetX = targetX;
      let effectiveTargetY = targetY;

      if (isMobileTouch) {
        // Autonomous mobile wander path across the viewport
        effectiveTargetX = width / 2 + Math.sin(timeSec * 0.4) * (width * 0.38);
        effectiveTargetY = height / 2 + Math.cos(timeSec * 0.6) * (height * 0.32);
      } else if (isIdle) {
        // Gentle figure-8 float near the last known cursor position
        effectiveTargetX = targetX + Math.sin(timeSec * 1.6) * 45;
        effectiveTargetY = targetY + Math.sin(timeSec * 3.2) * 25;
      }

      // Per-frame subtle organic flutter wobble
      const wobbleX = Math.sin(timeSec * 4.5) * 14;
      const wobbleY = Math.cos(timeSec * 3.8) * 12;

      const destX = effectiveTargetX + wobbleX;
      const destY = effectiveTargetY + wobbleY;

      // Lazy follow Lerp
      const dx = destX - currentX;
      const dy = destY - currentY;

      const newX = currentX + dx * 0.055;
      const newY = currentY + dy * 0.055;

      // Calculate movement velocity vector for flight banking angle
      const vx = newX - currentX;
      const vy = newY - currentY;

      if (Math.abs(vx) > 0.08 || Math.abs(vy) > 0.08) {
        let targetAngle = Math.atan2(vy, vx) * (180 / Math.PI) + 90; // Upright butterfly orientation
        let angleDiff = targetAngle - currentAngle;

        while (angleDiff < -180) angleDiff += 360;
        while (angleDiff > 180) angleDiff -= 360;

        currentAngle += angleDiff * 0.085;
      }

      currentX = newX;
      currentY = newY;

      // Apply GPU-accelerated transform to the butterfly element
      butterfly.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${currentAngle}deg)`;

      // Emit sparkle particles when butterfly is moving
      const speed = Math.hypot(vx, vy);
      if (speed > 0.4 && Math.random() > 0.35) {
        trailParticles.push({
          x: currentX + (Math.random() - 0.5) * 8,
          y: currentY + (Math.random() - 0.5) * 8,
          size: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? '#ec4899' : '#fbbf24',
          alpha: 1,
          vx: (Math.random() - 0.5) * 1.2 - vx * 0.2,
          vy: (Math.random() - 0.5) * 1.2 - vy * 0.2,
          decay: Math.random() * 0.035 + 0.02,
        });
      }

      if (trailParticles.length > 50) {
        trailParticles.splice(0, trailParticles.length - 50);
      }

      // Render Trail Canvas
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
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 8;
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
      {/* Sparkle Trail Canvas */}
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

      {/* Curious Cursor-Following Butterfly */}
      <div
        ref={butterflyRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '52px',
          height: '52px',
          pointerEvents: 'none',
          zIndex: 40,
          willChange: 'transform',
          filter: 'drop-shadow(0 0 14px rgba(236, 72, 153, 0.85))',
        }}
      >
        <svg width="52" height="52" viewBox="0 0 100 100" fill="none">
          <defs>
            <linearGradient id="cursorButterflyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e02575" />
              <stop offset="45%" stopColor="#ec4899" />
              <stop offset="75%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>

          {/* Left Wing (Animated Flap) */}
          <g className="wing-left">
            <path
              d="M 50,50 C 15,5 0,22 5,58 C 8,80 35,72 50,50 Z"
              fill="url(#cursorButterflyGrad)"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.8"
            />
            <circle cx="24" cy="34" r="4.5" fill="#ffffff" opacity="0.85" />
          </g>

          {/* Right Wing (Animated Flap) */}
          <g className="wing-right">
            <path
              d="M 50,50 C 85,5 100,22 95,58 C 92,80 65,72 50,50 Z"
              fill="url(#cursorButterflyGrad)"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.8"
            />
            <circle cx="76" cy="34" r="4.5" fill="#ffffff" opacity="0.85" />
          </g>

          {/* Butterfly Body & Antennae */}
          <path d="M 50,28 L 50,72" stroke="#1c0628" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 50,28 Q 40,16 35,14" stroke="#fbbf24" strokeWidth="1.8" fill="none" />
          <path d="M 50,28 Q 60,16 65,14" stroke="#fbbf24" strokeWidth="1.8" fill="none" />
          <circle cx="35" cy="14" r="2" fill="#fbbf24" />
          <circle cx="65" cy="14" r="2" fill="#fbbf24" />
        </svg>
      </div>
    </>
  );
}
