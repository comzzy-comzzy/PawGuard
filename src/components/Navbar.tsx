import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Heart, ShieldAlert, PhoneCall } from 'lucide-react';
import { toggleSound, isSoundEnabled, playClickSound } from '../utils/audio';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenReport: () => void;
  onOpenEmergency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenReport,
  onOpenEmergency,
}) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'report', label: 'Report' },
    { id: 'rescue', label: 'Rescue' },
    { id: 'adopt', label: 'Adopt' },
    { id: 'lost-found', label: 'Lost & Found' },
    { id: 'learn', label: 'Learn' },
    { id: 'community', label: 'Community' },
    { id: 'support', label: 'Support Us' },
  ];

  const handleNavClick = (id: string) => {
    playClickSound();
    setActiveSection(id);
    setMobileMenuOpen(false);

    if (id === 'report') {
      onOpenReport();
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) {
      playClickSound();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf6f0]/95 backdrop-blur-md border-b border-[#ebdcca]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo matching PNG */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          {/* Paw Icon SVG */}
          <div className="w-10 h-10 rounded-2xl bg-[#4a2e1b] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <circle cx="12" cy="15" r="4.5" />
              <circle cx="6.5" cy="10" r="2.2" />
              <circle cx="17.5" cy="10" r="2.2" />
              <circle cx="9" cy="6" r="2.2" />
              <circle cx="15" cy="6" r="2.2" />
            </svg>
          </div>
          <div>
            <span className="font-fredoka text-2xl sm:text-3xl font-bold tracking-tight text-[#352018] group-hover:text-[#4a2e1b] transition-colors">
              PawGuard
            </span>
          </div>
        </button>

        {/* Center Navigation items matching PNG exactly */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-fredoka text-sm xl:text-base font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#4a2e1b] text-white shadow-sm font-semibold scale-105'
                    : 'text-[#352018] hover:text-[#4a2e1b] hover:bg-[#faefe4]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Audio toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2.5 rounded-full text-[#4a2e1b] bg-[#faefe4] hover:bg-[#f2e2d2] border border-[#e5cfbd] transition-colors"
            title={soundOn ? 'Sound effects enabled (Click to mute)' : 'Sound effects muted (Click to unmute)'}
            aria-label="Toggle Sound"
          >
            {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 opacity-60" />}
          </button>

          {/* Quick Hotline dropdown trigger */}
          <button
            onClick={onOpenEmergency}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-[#faebd7] text-[#9c4221] hover:bg-[#f6dfc4] border border-[#e7caa8] transition-all"
            title="24/7 Dog Rescue Hotline"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>24/7 Hotline</span>
          </button>

          {/* "Get Help 🤍" button matching PNG exactly */}
          <button
            onClick={() => {
              playClickSound();
              onOpenEmergency();
            }}
            className="flex items-center gap-2 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-medium text-sm sm:text-base px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <span>Get Help</span>
            <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#352018] hover:bg-[#faefe4] focus:outline-none"
            aria-label="Open Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf6f0] border-b border-[#ebdcca] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left font-fredoka text-base px-4 py-3 rounded-xl transition-colors flex items-center justify-between ${
                activeSection === item.id
                  ? 'bg-[#4a2e1b] text-white font-semibold'
                  : 'text-[#352018] hover:bg-[#faefe4]'
              }`}
            >
              <span>{item.label}</span>
              {activeSection === item.id && <span className="text-xs">🐾 Active</span>}
            </button>
          ))}
          
          <div className="pt-3 border-t border-[#ebdcca] flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReport();
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-[#b87d55] text-white py-3 rounded-xl font-fredoka font-semibold shadow"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Report Abuse</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergency();
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-[#4a2e1b] text-white py-3 rounded-xl font-fredoka font-semibold shadow"
            >
              <PhoneCall className="w-4 h-4" />
              <span>SOS Helpline</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
