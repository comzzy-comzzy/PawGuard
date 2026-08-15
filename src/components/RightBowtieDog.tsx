import React, { useState, useEffect } from 'react';
import { playPuppyBark, playHeartPop } from '../utils/audio';

interface RightDogProps {
  onPet?: () => void;
}

export const RightBowtieDog: React.FC<RightDogProps> = ({ onPet }) => {
  const [isWinking, setIsWinking] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
  const [speechText, setSpeechText] = useState('Protect us, we love you! 💙');
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Auto-winking & looking around
  useEffect(() => {
    const winkInterval = setInterval(() => {
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 240);
    }, 4200 + Math.random() * 2500);
    return () => clearInterval(winkInterval);
  }, []);

  // Periodic cute thoughts
  useEffect(() => {
    const speechPhrases = [
      'Protect us, we love you! 💙',
      'Look at my shiny bowtie! ✨',
      'Adopt, don’t shop! 🏡',
      'Report any puppy in danger! 🚨',
      'Be our voice today! 🐾'
    ];

    const speechTimer = setInterval(() => {
      const randomPhrase = speechPhrases[Math.floor(Math.random() * speechPhrases.length)];
      setSpeechText(randomPhrase);
      setShowSpeech(true);
      setTimeout(() => setShowSpeech(false), 4500);
    }, 16000);

    return () => clearInterval(speechTimer);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    playPuppyBark();
    playHeartPop();
    setIsBouncing(true);
    if (onPet) onPet();

    // Spawn floating heart
    const newHeart = { id: Date.now(), x: e.nativeEvent.offsetX || 90, y: (e.nativeEvent.offsetY || 90) - 20 };
    setHearts(prev => [...prev.slice(-5), newHeart]);

    setSpeechText('Yip! Thank you for protecting us! 🐶💖');
    setShowSpeech(true);

    setTimeout(() => setIsBouncing(false), 1600);
    setTimeout(() => setShowSpeech(false), 4000);
  };

  return (
    <div 
      className="absolute -right-8 sm:-right-12 md:-right-16 lg:-right-20 -bottom-10 sm:-bottom-12 md:-bottom-16 lg:-bottom-20 z-20 cursor-pointer select-none group"
      onClick={handleClick}
      title="Click to pet Oliver & hear him bark!"
      style={{ width: 'clamp(150px, 24vw, 260px)' }}
    >
      {/* Speech bubble */}
      {showSpeech && (
        <div className="absolute -top-14 right-1/2 translate-x-1/2 bg-[#352018] text-white text-xs font-fredoka py-1.5 px-3 rounded-2xl shadow-xl whitespace-nowrap animate-bounce z-30 pointer-events-none border border-[#3d97ca]/40 flex items-center gap-1.5">
          <span>{speechText}</span>
          <div className="absolute -bottom-1.5 right-1/2 translate-x-1/2 w-3 h-3 bg-[#352018] rotate-45 border-r border-b border-[#3d97ca]/40"></div>
        </div>
      )}

      {/* Floating hearts */}
      {hearts.map(h => (
        <div
          key={h.id}
          className="absolute text-xl animate-float-heart pointer-events-none z-30"
          style={{ left: `${h.x}px`, top: `${h.y}px` }}
        >
          💙
        </div>
      ))}

      {/* Main Vector Dog Illustration matching PNG exactly */}
      <div className={`transition-transform duration-500 ease-out transform ${
        isBouncing ? 'scale-110 -rotate-3' : 'group-hover:scale-105 group-hover:rotate-2'
      }`}>
        <svg 
          viewBox="0 0 300 320" 
          className="w-full h-auto drop-shadow-md overflow-visible animate-subtle-breathe"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="dog-body-right">
            {/* Fluffy Wagging Tail in Background */}
            <path
              d="M230 180 Q270 140 250 110 Q225 125 220 160"
              fill="#F5D7B7"
              stroke="#2E1B13"
              strokeWidth="5"
              strokeLinecap="round"
              className="animate-tail-wag origin-bottom-left"
            />

            {/* Left Ear */}
            <path
              d="M95 130 C60 115, 45 160, 65 205 C80 235, 115 220, 110 180 Z"
              fill="#EAC49D"
              stroke="#2E1B13"
              strokeWidth="5"
              strokeLinejoin="round"
              className="animate-ear-wiggle"
            />
            <path d="M72 155 C60 178, 75 208, 95 200" stroke="#DDA87B" strokeWidth="6" strokeLinecap="round" />

            {/* Right Ear */}
            <path
              d="M225 130 C260 115, 275 160, 255 205 C240 235, 205 220, 210 180 Z"
              fill="#EAC49D"
              stroke="#2E1B13"
              strokeWidth="5"
              strokeLinejoin="round"
              className="animate-ear-wiggle-delayed"
            />
            <path d="M248 155 C260 178, 245 208, 225 200" stroke="#DDA87B" strokeWidth="6" strokeLinecap="round" />

            {/* Fluffy Head Base Contour */}
            <path
              d="M100 170 
                 C70 155, 70 105, 105 90
                 C95 55, 135 35, 160 55
                 C185 35, 230 55, 220 95
                 C255 110, 255 160, 225 180
                 C245 215, 210 255, 175 245
                 C140 260, 90 240, 100 170 Z"
              fill="#F5D7B7"
              stroke="#2E1B13"
              strokeWidth="5"
              strokeLinejoin="round"
            />

            {/* Head Highlights & Texture */}
            <ellipse cx="160" cy="140" rx="65" ry="58" fill="#F8DFCA" />
            <path d="M130 70 C145 60, 165 60, 180 70" stroke="#E3B38B" strokeWidth="4" strokeLinecap="round" />
            <path d="M105 110 C95 125, 95 140, 105 155" stroke="#E3B38B" strokeWidth="4" strokeLinecap="round" />
            <path d="M215 110 C225 125, 225 140, 215 155" stroke="#E3B38B" strokeWidth="4" strokeLinecap="round" />

            {/* Rosy Cheeks */}
            <ellipse cx="120" cy="180" rx="16" ry="10" fill="#F7A898" opacity="0.65" />
            <ellipse cx="205" cy="180" rx="16" ry="10" fill="#F7A898" opacity="0.65" />

            {/* Eyes */}
            {/* Left Eye */}
            <ellipse cx="136" cy="152" rx="8.5" ry="10" fill="#2E1B13" />
            <circle cx="133" cy="148" r="3.2" fill="#FFFFFF" />
            <circle cx="139" cy="156" r="1.4" fill="#FFFFFF" />

            {/* Right Eye (winks or looks) */}
            {!isWinking ? (
              <g>
                <ellipse cx="188" cy="152" rx="8.5" ry="10" fill="#2E1B13" />
                <circle cx="185" cy="148" r="3.2" fill="#FFFFFF" />
                <circle cx="191" cy="156" r="1.4" fill="#FFFFFF" />
              </g>
            ) : (
              <path d="M178 154 Q188 162 198 154" stroke="#2E1B13" strokeWidth="4" strokeLinecap="round" fill="none" />
            )}

            {/* Nose */}
            <ellipse cx="162" cy="168" rx="6.5" ry="4.5" fill="#2E1B13" />
            <ellipse cx="160.5" cy="166.5" rx="2" ry="1.2" fill="#FFFFFF" opacity="0.8" />

            {/* Sweet Smiling Mouth & Tiny Tongue */}
            <path
              d="M155 174 Q162 180 169 174"
              stroke="#2E1B13"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Tiny pink tongue */}
            <path
              d="M159 178 C159 184, 165 184, 165 178 Z"
              fill="#F78C8C"
              stroke="#2E1B13"
              strokeWidth="1.5"
            />

            {/* Cute Sky-Blue Bowtie matching PNG */}
            <g className="bowtie animate-bowtie-sway">
              {/* Left Loop */}
              <path
                d="M162 215 C145 200, 115 195, 125 218 C115 240, 145 235, 162 220 Z"
                fill="#3D97CA"
                stroke="#2E1B13"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Left Bow highlight / crease */}
              <path d="M136 210 Q148 215 155 217" stroke="#68B4DF" strokeWidth="3" strokeLinecap="round" />

              {/* Right Loop */}
              <path
                d="M162 215 C179 200, 209 195, 199 218 C209 240, 179 235, 162 220 Z"
                fill="#3D97CA"
                stroke="#2E1B13"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Right Bow highlight */}
              <path d="M188 210 Q176 215 169 217" stroke="#68B4DF" strokeWidth="3" strokeLinecap="round" />

              {/* Center Knot */}
              <ellipse 
                cx="162" 
                cy="217" 
                rx="8" 
                ry="7" 
                fill="#2A7AA8" 
                stroke="#2E1B13" 
                strokeWidth="4" 
              />
              <circle cx="160" cy="215" r="2" fill="#88CAEE" />
            </g>

            {/* Paws Resting on Bottom Border of Card */}
            {/* Left Paw */}
            <g className="animate-paw-tap">
              <ellipse 
                cx="110" 
                cy="245" 
                rx="22" 
                ry="24" 
                fill="#F5D7B7" 
                stroke="#2E1B13" 
                strokeWidth="5" 
                transform="rotate(-5 110 245)"
              />
              <ellipse cx="110" cy="245" rx="16" ry="18" fill="#F8DFCA" transform="rotate(-5 110 245)" />
              <path d="M103 240 C103 246, 105 252, 107 256" stroke="#2E1B13" strokeWidth="3" strokeLinecap="round" />
              <path d="M115 240 C116 246, 117 252, 117 256" stroke="#2E1B13" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Right Paw */}
            <g className="animate-paw-tap-delayed">
              <ellipse 
                cx="215" 
                cy="245" 
                rx="22" 
                ry="24" 
                fill="#F5D7B7" 
                stroke="#2E1B13" 
                strokeWidth="5" 
                transform="rotate(5 215 245)"
              />
              <ellipse cx="215" cy="245" rx="16" ry="18" fill="#F8DFCA" transform="rotate(5 215 245)" />
              <path d="M208 240 C208 246, 210 252, 212 256" stroke="#2E1B13" strokeWidth="3" strokeLinecap="round" />
              <path d="M220 240 C221 246, 222 252, 222 256" stroke="#2E1B13" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>

      {/* Interactive Badge */}
      <div className="text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="inline-block bg-[#352018]/85 text-[#fbf6f0] text-[10px] px-2 py-0.5 rounded-full font-fredoka shadow">
          Oliver 🎀 (Click to Pet)
        </span>
      </div>
    </div>
  );
};
