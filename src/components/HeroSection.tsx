import React, { useState } from 'react';
import { LeftPeekingDog } from './LeftPeekingDog';
import { RightBowtieDog } from './RightBowtieDog';
import { playClickSound, playTreatSound, playPuppyBark, playHeartPop } from '../utils/audio';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  onOpenReport: () => void;
  onOpenEmergency: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReport,
  onOpenEmergency,
  onNavigateSection,
}) => {
  const [petCount, setPetCount] = useState(1482);
  const [treatGiven, setTreatGiven] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handlePetDog = () => {
    setPetCount(prev => prev + 1);
  };

  const handleGiveTreat = () => {
    playTreatSound();
    playPuppyBark();
    setTreatGiven(true);
    setLastAction('Teddy and Oliver are happily munching biscuits! 🦴✨');

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#b87d55', '#faebd7', '#3d97ca', '#eac49d']
    });

    setTimeout(() => {
      setTreatGiven(false);
    }, 3500);
  };

  const handleThrowBall = () => {
    playHeartPop();
    playPuppyBark();
    setLastAction('🎾 You threw a tennis ball! The puppies caught it with joy!');

    setTimeout(() => setLastAction(null), 4000);
  };

  const handleShowerLove = () => {
    playHeartPop();
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#e25c80', '#b87d55', '#3d97ca', '#f5d7b7']
    });
    setLastAction('💖 You sent love to 12,000+ rescued dogs across our community!');
    setTimeout(() => setLastAction(null), 4000);
  };

  return (
    <section className="relative terracotta-tile-grid py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden transition-all">
      
      {/* Background ambient lighting accents */}
      <div className="absolute inset-0 bg-radial-gradient from-white/10 via-transparent to-black/10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative">
        
        {/* Main White Hero Card Container matching PNG */}
        <div className="hero-card-container relative px-6 sm:px-12 md:px-16 py-12 sm:py-16 md:py-20 text-center z-10">
          
          {/* Animated Left Peeking Dog */}
          <LeftPeekingDog onPet={handlePetDog} />

          {/* Animated Right Bowtie Puppy Dog */}
          <RightBowtieDog onPet={handlePetDog} />

          {/* Main Headline matching PNG */}
          <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-[#26160d] tracking-tight leading-[1.1] mb-4 sm:mb-6">
            Save the Dogs.
          </h1>

          {/* Subheading line 1 matching PNG */}
          <p className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-[#2b1b13] mb-1 sm:mb-2 tracking-tight">
            Stop abuse, bullying, harassment and killing.
          </p>

          {/* Subheading line 2 matching PNG with brown heart */}
          <p className="font-sans text-base sm:text-lg md:text-xl font-bold text-[#402416] mb-5 sm:mb-7 flex items-center justify-center gap-2">
            <span>Dogs have feelings too.</span>
            <span className="text-xl sm:text-2xl inline-block transform hover:scale-125 transition-transform cursor-pointer">🤎</span>
          </p>

          {/* Descriptive body paragraph matching PNG */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#5e4537] max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal">
            PawGuard is a platform to protect dogs, report abuse, rescue those in need, and build a kinder world for them.
          </p>

          {/* Action Buttons matching PNG exactly */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 max-w-md mx-auto relative z-30">
            
            {/* Report Abuse Button (Dark brown with shield-paw icon) */}
            <button
              onClick={() => {
                playClickSound();
                onOpenReport();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#4a2e1b] hover:bg-[#321c0e] text-white font-fredoka font-semibold text-base sm:text-lg px-8 py-3.5 rounded-full shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all group"
            >
              {/* Shield with paw icon */}
              <div className="w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.5 7.5a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm3 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm-4.2 3.2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5.4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM12 16.5c-1.8 0-3-1.2-3-2.5h6c0 1.3-1.2 2.5-3 2.5z" />
                </svg>
              </div>
              <span>Report Abuse</span>
            </button>

            {/* Get Help Now Button (White bg, dark brown border & text with paw icon) */}
            <button
              onClick={() => {
                playClickSound();
                onOpenEmergency();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-[#faefe4] text-[#4a2e1b] border-2 border-[#4a2e1b] font-fredoka font-semibold text-base sm:text-lg px-8 py-3.5 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              {/* Paw Icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <circle cx="12" cy="15" r="4" />
                <circle cx="7" cy="10.5" r="2" />
                <circle cx="17" cy="10.5" r="2" />
                <circle cx="9" cy="7" r="2" />
                <circle cx="15" cy="7" r="2" />
              </svg>
              <span>Get Help Now</span>
            </button>
          </div>

          {/* Wholesome pup companion interaction strip */}
          <div className="mt-8 pt-6 border-t border-[#f2e2d2] flex flex-wrap items-center justify-center gap-2.5 text-xs text-[#6b4c38] font-medium">
            <span className="text-[#8d674c] hidden sm:inline">Interactive Pup Care:</span>
            
            <button
              onClick={handleGiveTreat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] transition-all hover:scale-105"
            >
              <span>🦴 Give Biscuit</span>
            </button>

            <button
              onClick={handleThrowBall}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] transition-all hover:scale-105"
            >
              <span>🎾 Play Ball</span>
            </button>

            <button
              onClick={handleShowerLove}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] transition-all hover:scale-105"
            >
              <span>💖 Shower Love</span>
            </button>

            <span className="ml-1 text-[11px] bg-[#faebd7] text-[#6b442b] px-2.5 py-1 rounded-full border border-[#ecd5bf]">
              🐾 {petCount.toLocaleString()} Paws Petted Today
            </span>
          </div>

          {/* Interactive alert toast note */}
          {lastAction && (
            <div className="mt-3 text-xs font-semibold text-[#4a2e1b] bg-[#faebd7] py-1.5 px-4 rounded-xl inline-block border border-[#e8ceb5] animate-fadeIn">
              {lastAction}
            </div>
          )}
        </div>

        {/* Live Rescue Ticker Banner */}
        <div className="mt-6 bg-[#352018]/90 text-white rounded-2xl px-5 py-3 shadow-lg backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3aa866] animate-ping inline-block"></span>
            <span className="font-fredoka font-semibold text-[#f8dfc7]">LIVE RESCUE RADAR:</span>
            <span className="text-[#fbf6f0]">4 Active Rescue Units on Patrol</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-white/80">Case #PG-8942: Volunteer Marcus Vance en route</span>
            <button
              onClick={() => onNavigateSection('rescue')}
              className="text-[#f5d7b7] underline hover:text-white font-semibold"
            >
              View Map →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
