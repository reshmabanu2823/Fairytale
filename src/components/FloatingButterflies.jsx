import React from 'react';

export default function FloatingButterflies() {
  return (
    <div className="butterfly-container" aria-hidden="true">
      
      {/* SVG Defs for Vintage Moth & Butterfly Gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="vintageGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d8b0b4" />
            <stop offset="50%" stopColor="#c69d52" />
            <stop offset="100%" stopColor="#6b7c67" />
          </linearGradient>
          <linearGradient id="vintageGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c69d52" />
            <stop offset="60%" stopColor="#8f9e8b" />
            <stop offset="100%" stopColor="#5c4738" />
          </linearGradient>
          <linearGradient id="vintageGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e4c3c6" />
            <stop offset="50%" stopColor="#d8b0b4" />
            <stop offset="100%" stopColor="#c69d52" />
          </linearGradient>
        </defs>
      </svg>

      {/* Butterfly 1: Vintage Muted Rose & Gold (Large) */}
      <div className="butterfly-flight-1">
        <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
          <g className="wing-left">
            <path
              d="M 50,50 C 20,10 0,25 5,55 C 8,75 35,70 50,50 Z"
              fill="url(#vintageGrad1)"
              stroke="#4a3a2c"
              strokeWidth="1.8"
            />
            <circle cx="25" cy="35" r="3.5" fill="#f6f1e8" opacity="0.8" />
          </g>
          <g className="wing-right">
            <path
              d="M 50,50 C 80,10 100,25 95,55 C 92,75 65,70 50,50 Z"
              fill="url(#vintageGrad1)"
              stroke="#4a3a2c"
              strokeWidth="1.8"
            />
            <circle cx="75" cy="35" r="3.5" fill="#f6f1e8" opacity="0.8" />
          </g>
          <path d="M 50,30 L 50,70" stroke="#36291e" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 50,30 Q 42,20 38,18" stroke="#c69d52" strokeWidth="1.5" fill="none" />
          <path d="M 50,30 Q 58,20 62,18" stroke="#c69d52" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Butterfly 2: Vintage Sage & Sepia (Medium) */}
      <div className="butterfly-flight-2">
        <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
          <g className="wing-left">
            <path
              d="M 50,50 C 20,10 0,25 5,55 C 8,75 35,70 50,50 Z"
              fill="url(#vintageGrad2)"
              stroke="#4a3a2c"
              strokeWidth="1.8"
            />
          </g>
          <g className="wing-right">
            <path
              d="M 50,50 C 80,10 100,25 95,55 C 92,75 65,70 50,50 Z"
              fill="url(#vintageGrad2)"
              stroke="#4a3a2c"
              strokeWidth="1.8"
            />
          </g>
          <path d="M 50,32 L 50,68" stroke="#2b1f17" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 50,32 Q 43,22 40,20" stroke="#8f9e8b" strokeWidth="1.5" fill="none" />
          <path d="M 50,32 Q 57,22 60,20" stroke="#8f9e8b" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Butterfly 3: Vintage Blush & Gold (Delicate) */}
      <div className="butterfly-flight-3">
        <svg width="38" height="38" viewBox="0 0 100 100" fill="none">
          <g className="wing-left">
            <path
              d="M 50,50 C 20,10 0,25 5,55 C 8,75 35,70 50,50 Z"
              fill="url(#vintageGrad3)"
              stroke="#4a3a2c"
              strokeWidth="1.8"
            />
          </g>
          <g className="wing-right">
            <path
              d="M 50,50 C 80,10 100,25 95,55 C 92,75 65,70 50,50 Z"
              fill="url(#vintageGrad3)"
              stroke="#4a3a2c"
              strokeWidth="1.8"
            />
          </g>
          <path d="M 50,30 L 50,70" stroke="#36291e" strokeWidth="3" strokeLinecap="round" />
          <path d="M 50,30 Q 42,18 37,16" stroke="#c69d52" strokeWidth="1.5" fill="none" />
          <path d="M 50,30 Q 58,18 63,16" stroke="#c69d52" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

    </div>
  );
}
