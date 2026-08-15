import React from 'react';
import { Megaphone, MapPin, Home, BookOpen, Users, Heart } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface QuickFeaturesRowProps {
  onSelectFeature: (featureId: string) => void;
}

export const QuickFeaturesRow: React.FC<QuickFeaturesRowProps> = ({ onSelectFeature }) => {
  const features = [
    {
      id: 'report',
      icon: Megaphone,
      title: 'Report Abuse',
      description: 'Report dogs being abused, bullied or in danger.',
      highlightColor: '#d94141',
      badge: 'Urgent'
    },
    {
      id: 'rescue',
      icon: MapPin,
      title: 'Find & Rescue',
      description: 'Help rescue dogs near you and track reported cases.',
      highlightColor: '#ea8e24',
      badge: 'Live Map'
    },
    {
      id: 'adopt',
      icon: Home,
      title: 'Adoption',
      description: 'Find loving dogs waiting for a forever home.',
      highlightColor: '#3aa866',
      badge: 'Available'
    },
    {
      id: 'learn',
      icon: BookOpen,
      title: 'Learn & Educate',
      description: 'Learn how to care, protect and treat dogs humanely.',
      highlightColor: '#3d97ca',
      badge: 'Guides'
    },
    {
      id: 'community',
      icon: Users,
      title: 'Community',
      description: 'Join a community of dog lovers and volunteers.',
      highlightColor: '#8a4ea8',
      badge: 'Network'
    },
    {
      id: 'support',
      icon: Heart,
      title: 'Support Us',
      description: 'Donate or support shelters and rescue initiatives.',
      highlightColor: '#b87d55',
      badge: 'Medical Fund'
    },
  ];

  const handleCardClick = (id: string) => {
    playClickSound();
    onSelectFeature(id);
  };

  return (
    <section className="bg-[#fbf6f0] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#eedccb]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* 6 Feature Cards Grid matching PNG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                className="group relative bg-white hover:bg-[#fff9f3] rounded-3xl p-6 text-center border border-[#e8d5c4] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between min-h-[220px] focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]/20"
              >
                {/* Top Badge */}
                <div className="w-full flex justify-end">
                  <span className="text-[10px] font-fredoka uppercase tracking-wider font-semibold text-[#8a5b3a] bg-[#faefe4] px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>

                {/* Circular Peach Icon Badge matching PNG */}
                <div className="w-16 h-16 rounded-full bg-[#fbe9dd] group-hover:bg-[#f8dfc7] group-hover:scale-110 flex items-center justify-center text-[#5c3a21] transition-all duration-300 my-2 shadow-inner">
                  <IconComponent className="w-8 h-8 text-[#5c3a21] stroke-[2.2]" />
                </div>

                {/* Card Title matching PNG */}
                <div className="space-y-1.5 mt-1">
                  <h3 className="font-fredoka text-lg font-bold text-[#352018] group-hover:text-[#4a2e1b] transition-colors">
                    {item.title}
                  </h3>

                  {/* Card Description matching PNG */}
                  <p className="font-sans text-xs text-[#6e513e] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Arrow hint on hover */}
                <div className="mt-3 text-[11px] font-fredoka font-semibold text-[#b87d55] opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore →
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Ribbon / Banner matching PNG exactly */}
        <div className="relative bg-[#faefe4] border border-[#e5cfbd] rounded-2xl sm:rounded-full py-4 px-6 sm:px-10 shadow-sm flex items-center justify-between gap-4 text-center">
          
          {/* Left Paw Icon */}
          <div className="hidden sm:flex items-center justify-center text-[#4a2e1b]">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current transform -rotate-12">
              <circle cx="12" cy="15" r="4" />
              <circle cx="7" cy="10.5" r="2" />
              <circle cx="17" cy="10.5" r="2" />
              <circle cx="9" cy="7" r="2" />
              <circle cx="15" cy="7" r="2" />
            </svg>
          </div>

          {/* Center Copy matching PNG */}
          <div className="flex-1 space-y-0.5">
            <p className="font-sans text-sm sm:text-base text-[#4a2e1b] font-medium">
              Every dog deserves love, care and protection.
            </p>
            <p className="font-fredoka text-base sm:text-lg md:text-xl font-bold text-[#2b1b13] flex items-center justify-center gap-1.5">
              <span>Be their voice. Be their hope.</span>
              <Heart className="w-5 h-5 fill-[#8a5b3a] text-[#8a5b3a] inline-block" />
            </p>
          </div>

          {/* Right Paw Icon */}
          <div className="hidden sm:flex items-center justify-center text-[#4a2e1b]">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current transform rotate-12">
              <circle cx="12" cy="15" r="4" />
              <circle cx="7" cy="10.5" r="2" />
              <circle cx="17" cy="10.5" r="2" />
              <circle cx="9" cy="7" r="2" />
              <circle cx="15" cy="7" r="2" />
            </svg>
          </div>

        </div>

      </div>
    </section>
  );
};
