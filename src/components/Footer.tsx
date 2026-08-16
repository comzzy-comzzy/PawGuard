import React from 'react';
import { playClickSound } from '../utils/audio';

interface FooterProps {
  onOpenReport: () => void;
  onOpenEmergency: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
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

            <p className="text-sm text-[#e5cfbd] leading-relaxed max-w-md">
              PawGuard — Protect Dogs, They Have Feelings Too. A community platform dedicated to preventing dog abuse, bullying, abandonment, and cruelty through fast reporting, rapid rescue dispatch, and loving adoptions.
            </p>
          </div>

          {/* Quick Platform Navigation */}
          <div className="space-y-3">
            <h4 className="font-fredoka text-base font-bold text-white uppercase tracking-wider text-[#f5d7b7]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#e5cfbd]">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  About Our Mission
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('report')} className="hover:text-white transition-colors">
                  Report Dog Abuse
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rescue')} className="hover:text-white transition-colors">
                  Find & Rescue Board
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('adopt')} className="hover:text-white transition-colors">
                  Adoption Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Community */}
          <div className="space-y-3">
            <h4 className="font-fredoka text-base font-bold text-white uppercase tracking-wider text-[#f5d7b7]">
              Community & Care
            </h4>
            <ul className="space-y-2 text-sm text-[#e5cfbd]">
              <li>
                <button onClick={() => handleNav('lost-found')} className="hover:text-white transition-colors">
                  Lost & Found Pet Notices
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('learn')} className="hover:text-white transition-colors">
                  Humane Education Guides
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('community')} className="hover:text-white transition-colors">
                  Volunteer Rescue Guild
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('support')} className="hover:text-white transition-colors">
                  Medical Support Wallets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="text-[#ea8e24] hover:text-[#f5d7b7] font-bold transition-colors flex items-center gap-1.5">
                  <span>🛡️ Admin Dispatch Desk</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#d7b89c]">
          <p>© 2026 PawGuard. Protect Dogs, They Have Feelings Too. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white">Privacy & Protection</span>
            <span>•</span>
            <span className="hover:text-white">Animal Welfare Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
