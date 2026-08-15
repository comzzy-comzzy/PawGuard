import React from 'react';
import { LeftPeekingDog } from './LeftPeekingDog';
import { RightBowtieDog } from './RightBowtieDog';
import { Heart } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface HeroSectionProps {
  onOpenReport: () => void;
  onOpenEmergency: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReport,
  onOpenEmergency,
}) => {
  return (
    <section className="relative terracotta-tile-grid py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden transition-all">
      <div className="max-w-4xl mx-auto relative">
        
        {/* Main White Hero Card Container matching PNG */}
        <div className="hero-card-container relative px-6 sm:px-12 md:px-16 py-12 sm:py-16 md:py-20 text-center z-10">
          
          {/* Animated Left Peeking Dog */}
          <LeftPeekingDog />

          {/* Animated Right Bowtie Puppy Dog */}
          <RightBowtieDog />

          {/* Main Headline matching PNG */}
          <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-[#26160d] tracking-tight leading-[1.1] mb-4 sm:mb-6">
            Save the Dogs.
          </h1>

          {/* Subheading line 1 matching PNG */}
          <p className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-[#2b1b13] mb-1 sm:mb-2 tracking-tight">
            Stop abuse, bullying, harassment and killing.
          </p>

          {/* Subheading line 2 matching PNG with vector heart */}
          <p className="font-sans text-base sm:text-lg md:text-xl font-bold text-[#402416] mb-5 sm:mb-7 flex items-center justify-center gap-2">
            <span>Dogs have feelings too.</span>
            <Heart className="w-5 h-5 fill-[#8a5b3a] text-[#8a5b3a] inline-block" />
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

        </div>

      </div>
    </section>
  );
};
