import React, { useState } from 'react';
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
import { INITIAL_RESCUE_CASES, ADOPTABLE_DOGS, LOST_FOUND_DOGS } from './data/mockData';
import { RescueCase, LostFoundDog } from './types';

export function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [cases, setCases] = useState<RescueCase[]>(INITIAL_RESCUE_CASES);
  const [dogs] = useState(ADOPTABLE_DOGS);
  const [lostFoundItems, setLostFoundItems] = useState<LostFoundDog[]>(LOST_FOUND_DOGS);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  const handleAddCase = (newCase: RescueCase) => {
    setCases([newCase, ...cases]);
  };

  const handleUpdateCase = (updatedCase: RescueCase) => {
    setCases(cases.map(c => c.id === updatedCase.id ? updatedCase : c));
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
      {/* Navigation matching PNG */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Pixel-Perfect Hero Section matching PNG with moving animated dogs */}
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

        {/* Location-Based Rescue Radar Map & Tracking */}
        <RescueMapSection
          cases={cases}
          onOpenReport={() => setIsReportOpen(true)}
          onUpdateCase={handleUpdateCase}
        />

        {/* Adoption Listings */}
        <AdoptionSection dogs={dogs} />

        {/* Lost, Abandoned & Injured Dogs Noticeboard */}
        <LostAndFoundSection
          items={lostFoundItems}
          onAddItem={handleAddLostFound}
        />

        {/* Learn & Educate: Body Language, Cruelty Laws & Quiz */}
        <LearnSection />

        {/* Community & Volunteer Guild */}
        <CommunitySection />

        {/* Support Us & Emergency Vet Fund */}
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
