import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickFeaturesRow } from './components/QuickFeaturesRow';
import { AboutSection } from './components/AboutSection';
import { ReportAbuseSection } from './components/ReportAbuseSection';
import { RescueMapSection } from './components/RescueMapSection';
import { AdoptionSection } from './components/AdoptionSection';
import { LostAndFoundSection } from './components/LostAndFoundSection';
import { LearnSection } from './components/LearnSection';
import { CommunitySection } from './components/CommunitySection';
import { SupportSection } from './components/SupportSection';
import { Footer } from './components/Footer';
import { EmergencyHotlineModal } from './components/EmergencyHotlineModal';
import { PickyChatBox } from './components/PickyChatBox';
import { RescueCase, AdoptableDog, LostFoundDog } from './types';

export function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Real user state saved in localStorage
  const [cases, setCases] = useState<RescueCase[]>(() => {
    try {
      const saved = localStorage.getItem('pawguard_cases');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [dogs, setDogs] = useState<AdoptableDog[]>(() => {
    try {
      const saved = localStorage.getItem('pawguard_dogs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lostFoundItems, setLostFoundItems] = useState<LostFoundDog[]>(() => {
    try {
      const saved = localStorage.getItem('pawguard_lostfound');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('pawguard_cases', JSON.stringify(cases));
    } catch (e) {
      console.error(e);
    }
  }, [cases]);

  useEffect(() => {
    try {
      localStorage.setItem('pawguard_dogs', JSON.stringify(dogs));
    } catch (e) {
      console.error(e);
    }
  }, [dogs]);

  useEffect(() => {
    try {
      localStorage.setItem('pawguard_lostfound', JSON.stringify(lostFoundItems));
    } catch (e) {
      console.error(e);
    }
  }, [lostFoundItems]);

  const handleAddCase = (newCase: RescueCase) => {
    setCases([newCase, ...cases]);
  };

  const handleUpdateCase = (updatedCase: RescueCase) => {
    setCases(cases.map(c => c.id === updatedCase.id ? updatedCase : c));
  };

  const handleAddDog = (newDog: AdoptableDog) => {
    setDogs([newDog, ...dogs]);
  };

  const handleAddLostFound = (newItem: LostFoundDog) => {
    setLostFoundItems([newItem, ...lostFoundItems]);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf6f0] text-[#352018]">
      {/* Top Sticky Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={handleNavigate}
        onOpenReport={() => handleNavigate('report')}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Main Page Views (Embedded by Section to Avoid Clutter/Flooding) */}
      <main className="flex-1">
        {activeSection === 'home' && (
          <div className="animate-fadeIn">
            {/* Hero Section matching PNG with moving animated dogs */}
            <HeroSection
              onOpenReport={() => handleNavigate('report')}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
              onNavigateSection={handleNavigate}
            />

            {/* 6 Feature Cards Row matching PNG */}
            <QuickFeaturesRow onSelectFeature={handleNavigate} />

            {/* About & Mission Highlight */}
            <AboutSection onNavigateSection={handleNavigate} />
          </div>
        )}

        {/* Dedicated Embedded Report Abuse Page */}
        {activeSection === 'report' && (
          <div className="animate-fadeIn">
            <ReportAbuseSection
              onAddCase={handleAddCase}
              onNavigateSection={handleNavigate}
            />
          </div>
        )}

        {/* Dedicated Embedded Find & Rescue Page */}
        {activeSection === 'rescue' && (
          <div className="animate-fadeIn">
            <RescueMapSection
              cases={cases}
              onOpenReport={() => handleNavigate('report')}
              onUpdateCase={handleUpdateCase}
              onNavigateSection={handleNavigate}
            />
          </div>
        )}

        {/* Dedicated Embedded Adoption Page */}
        {activeSection === 'adopt' && (
          <div className="animate-fadeIn">
            <AdoptionSection
              dogs={dogs}
              onAddDog={handleAddDog}
              onNavigateSection={handleNavigate}
            />
          </div>
        )}

        {/* Dedicated Embedded Lost & Found Page */}
        {activeSection === 'lost-found' && (
          <div className="animate-fadeIn">
            <LostAndFoundSection
              items={lostFoundItems}
              onAddItem={handleAddLostFound}
              onNavigateSection={handleNavigate}
            />
          </div>
        )}

        {/* Dedicated Embedded Learn & Educate Page */}
        {activeSection === 'learn' && (
          <div className="animate-fadeIn">
            <LearnSection onNavigateSection={handleNavigate} />
          </div>
        )}

        {/* Dedicated Embedded Volunteer Guild & Community Page */}
        {activeSection === 'community' && (
          <div className="animate-fadeIn">
            <CommunitySection onNavigateSection={handleNavigate} />
          </div>
        )}

        {/* Dedicated Embedded Support Us Page */}
        {activeSection === 'support' && (
          <div className="animate-fadeIn">
            <SupportSection onNavigateSection={handleNavigate} />
          </div>
        )}

        {/* Dedicated Embedded About Page */}
        {activeSection === 'about' && (
          <div className="animate-fadeIn">
            <AboutSection onNavigateSection={handleNavigate} />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onOpenReport={() => handleNavigate('report')}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onNavigateSection={handleNavigate}
      />

      {/* Emergency Hotline Modal (Get Help button quick overlay) */}
      <EmergencyHotlineModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onOpenReport={() => {
          setIsEmergencyOpen(false);
          handleNavigate('report');
        }}
      />

      {/* Picky - AI Puppy Chat Box Assistant */}
      <PickyChatBox
        onNavigateSection={handleNavigate}
        onAddCase={handleAddCase}
      />
    </div>
  );
}

export default App;
