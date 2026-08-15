import React from 'react';
import { Heart, ShieldCheck, PhoneCall, Mail, MapPin, ExternalLink } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface FooterProps {
  onOpenReport: () => void;
  onOpenEmergency: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenReport,
  onOpenEmergency,
  onNavigateSection,
}) => {
  const handleNav = (id: string) => {
    playClickSound();
    onNavigateSection(id);
  };

  return (
    <footer className="bg-[#352018] text-[#fbf6f0] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t-4 border-[#b87d55]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#b87d55] flex items-center justify-center text-white shadow">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <circle cx="12" cy="15" r="4" />
                  <circle cx="7" cy="10.5" r="2" />
                  <circle cx="17" cy="10.5" r="2" />
                  <circle cx="9" cy="7" r="2" />
                  <circle cx="15" cy="7" r="2" />
                </svg>
              </div>
              <span className="font-fredoka text-3xl font-bold tracking-tight text-white">
                PawGuard
              </span>
            </div>

            <p className="text-sm text-[#e5cfbd] leading-relaxed max-w-sm">
              Protect Dogs, They Have Feelings Too. A compassionate community platform dedicated to preventing dog abuse, bullying, severe neglect, and unnecessary killing worldwide.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#d7b89c]">
              <span>Made with love & care for all canines.</span>
              <Heart className="w-4 h-4 text-[#d94141] fill-[#d94141]" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-fredoka text-base font-bold text-white uppercase tracking-wider text-[#f5d7b7]">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-[#e5cfbd]">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  About Mission
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rescue')} className="hover:text-white transition-colors">
                  Rescue Radar Map
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('adopt')} className="hover:text-white transition-colors">
                  Adoption Listings
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('lost-found')} className="hover:text-white transition-colors">
                  Lost & Injured Dogs
                </button>
              </li>
            </ul>
          </div>

          {/* Learn & Community */}
          <div className="space-y-3">
            <h4 className="font-fredoka text-base font-bold text-white uppercase tracking-wider text-[#f5d7b7]">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-[#e5cfbd]">
              <li>
                <button onClick={() => handleNav('learn')} className="hover:text-white transition-colors">
                  Canine Body Language
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('learn')} className="hover:text-white transition-colors">
                  Cruelty Prevention Quiz
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('community')} className="hover:text-white transition-colors">
                  Volunteer Guild
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('support')} className="hover:text-white transition-colors">
                  Emergency Medical Fund
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency SOS Column */}
          <div className="space-y-3">
            <h4 className="font-fredoka text-base font-bold text-white uppercase tracking-wider text-[#f5d7b7]">
              Emergency Help
            </h4>
            <div className="space-y-2.5 text-xs text-[#e5cfbd]">
              <p>Witnessing cruelty right now?</p>
              <button
                onClick={onOpenEmergency}
                className="w-full bg-[#d94141] hover:bg-[#b82e2e] text-white font-fredoka font-semibold py-2.5 px-4 rounded-xl shadow text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>24/7 Hotline Desk</span>
              </button>
              <button
                onClick={onOpenReport}
                className="w-full bg-[#b87d55] hover:bg-[#a36c45] text-white font-fredoka font-semibold py-2.5 px-4 rounded-xl shadow text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Report Abuse Online</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#d7b89c]">
          <p>© 2026 PawGuard. Protect Dogs, They Have Feelings Too. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy & Anonymous Reporting</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Animal Welfare Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">No-Kill Manifesto</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
