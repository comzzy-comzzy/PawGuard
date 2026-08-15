import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuickFeaturesRow } from './components/QuickFeaturesRow';
import { AboutSection } from './components/AboutSection';
import { RescueMapSection } from './components/RescueMapSection';
import { AdoptionSection } from './components/AdoptionSection';
import { LostAndFoundSection } from './components/LostAndFoundSection';
import { LearnSection } from './components/LearnSection';
import { CommunitySection } from './components/CommunitySection';
import { SupportSection } from './components/SupportSection';
import { Footer } from './components/Footer';
import { AbuseReportModal } from './components/AbuseReportModal';
import { EmergencyHotlineModal } from './components/EmergencyHotlineModal';
import { RescueCase, AdoptableDog, LostFoundDog } from './types';

export function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Real user state saved in localStorage (starts clean without fake mock data)
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

  const [isReportOpen, setIsReportOpen] = useState(false);
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

  const handleSelectFeature = (featureId: string) => {
    setActiveSection(featureId);
    if (featureId === 'report') {
      setIsReportOpen(true);
    } else {
      const element = document.getElementById(featureId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf6f0] text-[#352018]">
      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section matching PNG with moving animated dogs */}
        <section id="home">
          <HeroSection
            onOpenReport={() => setIsReportOpen(true)}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
            onNavigateSection={handleSelectFeature}
          />
        </section>

        {/* 6 Feature Cards Row matching PNG */}
        <QuickFeaturesRow onSelectFeature={handleSelectFeature} />

        {/* About & Mission Section */}
        <AboutSection />

        {/* Location-Based Rescue Reports */}
        <RescueMapSection
          cases={cases}
          onOpenReport={() => setIsReportOpen(true)}
          onUpdateCase={handleUpdateCase}
        />

        {/* Adoption Listings */}
        <AdoptionSection dogs={dogs} onAddDog={handleAddDog} />

        {/* Lost, Abandoned & Injured Dogs Noticeboard */}
        <LostAndFoundSection
          items={lostFoundItems}
          onAddItem={handleAddLostFound}
        />

        {/* Learn & Educate: Preventing Cruelty & Humane Care */}
        <LearnSection />

        {/* Volunteer Guild & Community */}
        <CommunitySection />

        {/* Support Us */}
        <SupportSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenReport={() => setIsReportOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onNavigateSection={handleSelectFeature}
      />

      {/* Modals */}
      <AbuseReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onAddCase={handleAddCase}
      />

      <EmergencyHotlineModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onOpenReport={() => {
          setIsEmergencyOpen(false);
          setIsReportOpen(true);
        }}
      />
    </div>
  );
}

export default App;
