import React from 'react';

export default function FloatingButterflies() {
  return (
    <div className="butterfly-container" aria-hidden="true">
      
      {/* SVG Defs for Butterfly Wing Gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="butterflyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e02575" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <linearGradient id="butterflyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="60%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="butterflyGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#e02575" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
      </svg>

      {/* Butterfly 1: Glam Pink & Gold (Large) */}
      <div className="butterfly-flight-1">
        <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
          {/* Sparkle Trail Dots */}
          <circle cx="10" cy="50" r="2" fill="#fbbf24" opacity="0.8" />
          <circle cx="5" cy="55" r="1.5" fill="#ec4899" opacity="0.6" />
          
          {/* Left Wing */}
          <g className="wing-left">
            <path
              d="M 50,50 C 20,10 0,25 5,55 C 8,75 35,70 50,50 Z"
              fill="url(#butterflyGrad1)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
            />
            <circle cx="25" cy="35" r="4" fill="#ffffff" opacity="0.7" />
          </g>

          {/* Right Wing */}
          <g className="wing-right">
            <path
              d="M 50,50 C 80,10 100,25 95,55 C 92,75 65,70 50,50 Z"
              fill="url(#butterflyGrad1)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
            />
            <circle cx="75" cy="35" r="4" fill="#ffffff" opacity="0.7" />
          </g>

          {/* Butterfly Body & Antennae */}
          <path d="M 50,30 L 50,70" stroke="#2a0820" strokeWidth="3" strokeLinecap="round" />
          <path d="M 50,30 Q 42,20 38,18" stroke="#fbbf24" strokeWidth="1.5" fill="none" />
          <path d="M 50,30 Q 58,20 62,18" stroke="#fbbf24" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Butterfly 2: Gold & Lilac (Medium) */}
      <div className="butterfly-flight-2">
        <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
          {/* Sparkle Trail */}
          <circle cx="12" cy="52" r="1.8" fill="#ec4899" opacity="0.8" />

          {/* Left Wing */}
          <g className="wing-left">
            <path
              d="M 50,50 C 20,10 0,25 5,55 C 8,75 35,70 50,50 Z"
              fill="url(#butterflyGrad2)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
            />
          </g>

          {/* Right Wing */}
          <g className="wing-right">
            <path
              d="M 50,50 C 80,10 100,25 95,55 C 92,75 65,70 50,50 Z"
              fill="url(#butterflyGrad2)"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
            />
          </g>

          {/* Body */}
          <path d="M 50,32 L 50,68" stroke="#120524" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 50,32 Q 43,22 40,20" stroke="#ec4899" strokeWidth="1.2" fill="none" />
          <path d="M 50,32 Q 57,22 60,20" stroke="#ec4899" strokeWidth="1.2" fill="none" />
        </svg>
      </div>

      {/* Butterfly 3: Lilac & Magenta (Delicate) */}
      <div className="butterfly-flight-3">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
          {/* Sparkle Trail */}
          <circle cx="8" cy="48" r="1.6" fill="#fbbf24" opacity="0.9" />

          {/* Left Wing */}
          <g className="wing-left">
            <path
              d="M 50,50 C 20,10 0,25 5,55 C 8,75 35,70 50,50 Z"
              fill="url(#butterflyGrad3)"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.5"
            />
          </g>

          {/* Right Wing */}
          <g className="wing-right">
            <path
              d="M 50,50 C 80,10 100,25 95,55 C 92,75 65,70 50,50 Z"
              fill="url(#butterflyGrad3)"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.5"
            />
          </g>

          {/* Body */}
          <path d="M 50,30 L 50,70" stroke="#2a0820" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 50,30 Q 42,18 37,16" stroke="#fbbf24" strokeWidth="1.5" fill="none" />
          <path d="M 50,30 Q 58,18 63,16" stroke="#fbbf24" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

    </div>
  );
}
