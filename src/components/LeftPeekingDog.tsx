import React, { useState, useEffect } from 'react';

export const LeftPeekingDog: React.FC = () => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Periodic natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 220);
    }, 4000 + Math.random() * 2500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div 
      className="absolute -left-12 sm:-left-16 md:-left-20 lg:-left-24 top-1/2 -translate-y-1/2 z-20 select-none pointer-events-none"
      style={{ width: 'clamp(140px, 22vw, 240px)' }}
    >
      {/* Main Vector Dog Illustration matching PNG exactly */}
      <div className="transform transition-transform duration-500">
        <svg 
          viewBox="0 0 280 320" 
          className="w-full h-auto drop-shadow-md overflow-visible animate-dog-left"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="dog-body-left">
            {/* Fluffy Ear Left (behind) */}
            <path
              d="M75 145 C40 130, 25 180, 45 225 C60 255, 95 240, 90 200 Z"
              fill="#EAC49D"
              stroke="#2E1B13"
              strokeWidth="5"
              strokeLinejoin="round"
              className="animate-ear-wiggle"
            />
            {/* Inner ear shadow */}
            <path d="M52 170 C40 195, 55 225, 75 220" stroke="#DDA87B" strokeWidth="6" strokeLinecap="round" />

            {/* Main Fluffy Head Cloud Silhouette */}
            <path
              d="M80 185 
                 C50 170, 50 120, 85 105
                 C75 70, 115 50, 145 68
                 C175 48, 220 70, 210 110
                 C245 125, 245 175, 215 195
                 C240 230, 205 270, 165 260
                 C130 275, 80 255, 80 185 Z"
              fill="#F5D7B7"
              stroke="#2E1B13"
              strokeWidth="5"
              strokeLinejoin="round"
              className="animate-head-breathe"
            />

            {/* Fluffy Head Texture / Fur Highlights */}
            <ellipse cx="145" cy="155" rx="65" ry="60" fill="#F8DFCA" />
            <path d="M110 85 C125 75, 140 75, 155 85" stroke="#E3B38B" strokeWidth="4" strokeLinecap="round" />
            <path d="M85 125 C75 138, 75 152, 85 165" stroke="#E3B38B" strokeWidth="4" strokeLinecap="round" />
            <path d="M205 125 C215 138, 215 152, 205 165" stroke="#E3B38B" strokeWidth="4" strokeLinecap="round" />

            {/* Rosy Flushed Cheeks */}
            <ellipse cx="102" cy="195" rx="16" ry="10" fill="#F7A898" opacity="0.65" />
            <ellipse cx="188" cy="195" rx="16" ry="10" fill="#F7A898" opacity="0.65" />

            {/* Eyes */}
            {!isBlinking ? (
              <g className="dog-eyes">
                {/* Left Eye */}
                <ellipse cx="118" cy="168" rx="8.5" ry="10" fill="#2E1B13" />
                <circle cx="115" cy="164" r="3.2" fill="#FFFFFF" />
                <circle cx="121" cy="172" r="1.4" fill="#FFFFFF" />

                {/* Right Eye */}
                <ellipse cx="172" cy="168" rx="8.5" ry="10" fill="#2E1B13" />
                <circle cx="169" cy="164" r="3.2" fill="#FFFFFF" />
                <circle cx="175" cy="172" r="1.4" fill="#FFFFFF" />
              </g>
            ) : (
              /* Blinking closed eyes */
              <g>
                <path d="M109 170 Q118 178 127 170" stroke="#2E1B13" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M163 170 Q172 178 181 170" stroke="#2E1B13" strokeWidth="4" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Cute Little Nose */}
            <path
              d="M140 182 C140 178, 150 178, 150 182 C150 188, 140 188, 140 182 Z"
              fill="#2E1B13"
            />
            <ellipse cx="145" cy="183" rx="6" ry="4" fill="#2E1B13" />
            <ellipse cx="143.5" cy="181.5" rx="1.8" ry="1.2" fill="#FFFFFF" opacity="0.8" />

            {/* Sweet Smiling Mouth */}
            <path
              d="M138 190 Q145 196 152 190"
              stroke="#2E1B13"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Fluffy Ear Right (foreground) */}
            <path
              d="M205 145 C240 130, 255 180, 235 225 C220 255, 185 240, 190 200 Z"
              fill="#EAC49D"
              stroke="#2E1B13"
              strokeWidth="5"
              strokeLinejoin="round"
              className="animate-ear-wiggle-delayed"
            />
            {/* Inner ear shadow right */}
            <path d="M228 170 C240 195, 225 225, 205 220" stroke="#DDA87B" strokeWidth="6" strokeLinecap="round" />

            {/* Paws Resting on Edge of White Card */}
            {/* Left Top Paw */}
            <g className="animate-paw-tap">
              <ellipse 
                cx="88" 
                cy="140" 
                rx="24" 
                ry="26" 
                fill="#F5D7B7" 
                stroke="#2E1B13" 
                strokeWidth="5" 
                transform="rotate(-15 88 140)"
              />
              <ellipse cx="88" cy="140" rx="18" ry="20" fill="#F8DFCA" transform="rotate(-15 88 140)" />
              <path d="M78 132 C78 138, 80 144, 82 148" stroke="#2E1B13" strokeWidth="3" strokeLinecap="round" />
              <path d="M92 130 C94 137, 95 143, 95 148" stroke="#2E1B13" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Left Bottom Paw */}
            <g className="animate-paw-tap-delayed">
              <ellipse 
                cx="92" 
                cy="235" 
                rx="22" 
                ry="24" 
                fill="#F5D7B7" 
                stroke="#2E1B13" 
                strokeWidth="5" 
                transform="rotate(10 92 235)"
              />
              <ellipse cx="92" cy="235" rx="16" ry="18" fill="#F8DFCA" transform="rotate(10 92 235)" />
              <path d="M84 230 C84 236, 86 242, 88 246" stroke="#2E1B13" strokeWidth="3" strokeLinecap="round" />
              <path d="M96 230 C97 236, 98 242, 98 246" stroke="#2E1B13" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
