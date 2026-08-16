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
import { AdminDashboard } from './components/AdminDashboard';
import {
  RescueCase,
  AdoptableDog,
  LostFoundDog,
  AdoptionInquiry,
  VolunteerApplication,
  DonationRecord,
  EmergencyAlert,
  AdminActivityLog,
} from './types';
import { playDispatchPing } from './utils/audio';
import { ShieldCheck, Globe, X, ArrowRight, Bell } from 'lucide-react';

const getInitialSection = (): string => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (path === 'admin') return 'admin';
  if (['about', 'report', 'rescue', 'adopt', 'lost-found', 'learn', 'community', 'support'].includes(path)) {
    return path;
  }
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash === 'admin') return 'admin';
  if (['about', 'report', 'rescue', 'adopt', 'lost-found', 'learn', 'community', 'support'].includes(hash)) {
    return hash;
  }
  return 'home';
};

export function App() {
  const [activeSection, setActiveSection] = useState<string>(getInitialSection);
  const [liveToast, setLiveToast] = useState<{
    id: string;
    title: string;
    description: string;
    type: string;
  } | null>(null);

  // 1. Rescue / Abuse Cases
  const [cases, setCases] = useState<RescueCase[]>(() => {
    try {
      const saved = localStorage.getItem('pawguard_cases');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2. Adoptable Dogs
  const [dogs, setDogs] = useState<AdoptableDog[]>(() => {
    try {
      const saved = localStorage.getItem('pawguard_dogs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Lost & Found Items
  const [lostFoundItems, setLostFoundItems] = useState<LostFoundDog[]>(() => {
    try {
      const saved = localStorage.getItem('pawguard_lostfound');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 4. Adoption Inquiries & Applications
  const [adoptionInquiries, setAdoptionInquiries] = useState<AdoptionInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('pawguard_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 5. Volunteer Applications
  const [volunteerApplications, setVolunteerApplications] = useState<VolunteerApplication[]>(() => {
    try {
      const saved = localStorage.getItem('pawguard_volunteers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 6. Donation Records & Pledges
  const [donationRecords, setDonationRecords] = useState<DonationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('pawguard_donations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 7. Emergency SOS Alerts
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>(() => {
    try {
      const saved = localStorage.getItem('pawguard_emergency');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 8. Admin Activity Logs
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem('pawguard_logs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // Sync route on popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (path === 'admin') {
        setActiveSection('admin');
      } else if (path && ['about', 'report', 'rescue', 'adopt', 'lost-found', 'learn', 'community', 'support'].includes(path)) {
        setActiveSection(path);
      } else {
        setActiveSection('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync to localStorage
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

  useEffect(() => {
    try {
      localStorage.setItem('pawguard_inquiries', JSON.stringify(adoptionInquiries));
    } catch (e) {
      console.error(e);
    }
  }, [adoptionInquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('pawguard_volunteers', JSON.stringify(volunteerApplications));
    } catch (e) {
      console.error(e);
    }
  }, [volunteerApplications]);

  useEffect(() => {
    try {
      localStorage.setItem('pawguard_donations', JSON.stringify(donationRecords));
    } catch (e) {
      console.error(e);
    }
  }, [donationRecords]);

  useEffect(() => {
    try {
      localStorage.setItem('pawguard_emergency', JSON.stringify(emergencyAlerts));
    } catch (e) {
      console.error(e);
    }
  }, [emergencyAlerts]);

  useEffect(() => {
    try {
      localStorage.setItem('pawguard_logs', JSON.stringify(activityLogs));
    } catch (e) {
      console.error(e);
    }
  }, [activityLogs]);

  const logActivity = (action: string, targetId: string, type: AdminActivityLog['type'], details: string) => {
    const newLog: AdminActivityLog = {
      id: `LOG-${Date.now()}`,
      action,
      targetId,
      timestamp: 'Just now',
      type,
      details,
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  const triggerLiveAlert = (title: string, description: string, type: string) => {
    playDispatchPing();
    setLiveToast({
      id: `toast-${Date.now()}`,
      title,
      description,
      type,
    });
    setTimeout(() => {
      setLiveToast(null);
    }, 6000);
  };

  // Case handlers
  const handleAddCase = (newCase: RescueCase) => {
    setCases([newCase, ...cases]);
    logActivity('Incident Report Received', newCase.id, 'rescue_case', `${newCase.reporter}: ${newCase.title}`);
    triggerLiveAlert(`Abuse Report Received (${newCase.id})`, `${newCase.title} at ${newCase.location}`, 'case');
  };

  const handleUpdateCase = (updatedCase: RescueCase) => {
    setCases(cases.map((c) => (c.id === updatedCase.id ? updatedCase : c)));
    logActivity('Case Status Updated', updatedCase.id, 'rescue_case', `Status changed to ${updatedCase.status}`);
  };

  const handleDeleteCase = (id: string) => {
    setCases(cases.filter((c) => c.id !== id));
    logActivity('Case Removed', id, 'rescue_case', `Case ${id} deleted from dispatch.`);
  };

  // Dog Catalog handlers
  const handleAddDog = (newDog: AdoptableDog) => {
    setDogs([newDog, ...dogs]);
    logActivity('Adoptable Dog Added', newDog.id, 'dog', `${newDog.name} added to public catalog.`);
    triggerLiveAlert(`Dog Listed (${newDog.name})`, `${newDog.breed} is now live on adoption directory`, 'dog');
  };

  const handleUpdateDog = (updatedDog: AdoptableDog) => {
    setDogs(dogs.map((d) => (d.id === updatedDog.id ? updatedDog : d)));
    logActivity('Dog Details Updated', updatedDog.id, 'dog', `${updatedDog.name} profile updated.`);
  };

  const handleDeleteDog = (id: string) => {
    setDogs(dogs.filter((d) => d.id !== id));
    logActivity('Dog Removed', id, 'dog', `Dog ${id} removed from catalog.`);
  };

  // Lost & Found handlers
  const handleAddLostFound = (newItem: LostFoundDog) => {
    setLostFoundItems([newItem, ...lostFoundItems]);
    logActivity('Lost/Found Notice Published', newItem.id, 'lost_found', `${newItem.status.toUpperCase()}: ${newItem.dogName || newItem.breed}`);
    triggerLiveAlert(`Lost & Found Notice (${newItem.id})`, `${newItem.dogName || 'Dog'} at ${newItem.lastSeenLocation}`, 'lostfound');
  };

  const handleUpdateLostFound = (updatedItem: LostFoundDog) => {
    setLostFoundItems(lostFoundItems.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
    logActivity('Lost/Found Notice Updated', updatedItem.id, 'lost_found', `Case status updated.`);
  };

  const handleDeleteLostFound = (id: string) => {
    setLostFoundItems(lostFoundItems.filter((i) => i.id !== id));
    logActivity('Lost/Found Notice Removed', id, 'lost_found', `Notice ${id} deleted.`);
  };

  // Adoption Inquiries handlers
  const handleAddAdoptionInquiry = (newInq: AdoptionInquiry) => {
    setAdoptionInquiries([newInq, ...adoptionInquiries]);
    logActivity('Adoption Application Received', newInq.id, 'adoption_inquiry', `${newInq.applicantName} applied for ${newInq.dogName}`);
    triggerLiveAlert(`Adoption Application (${newInq.id})`, `${newInq.applicantName} applied to adopt ${newInq.dogName}`, 'inquiry');
  };

  const handleUpdateAdoptionInquiry = (updatedInq: AdoptionInquiry) => {
    setAdoptionInquiries((prev) => {
      const exists = prev.some((i) => i.id === updatedInq.id);
      if (exists) {
        return prev.map((i) => (i.id === updatedInq.id ? updatedInq : i));
      }
      return [updatedInq, ...prev];
    });
    logActivity('Adoption Inquiry Updated', updatedInq.id, 'adoption_inquiry', `Status: ${updatedInq.status}`);
  };

  const handleDeleteAdoptionInquiry = (id: string) => {
    setAdoptionInquiries(adoptionInquiries.filter((i) => i.id !== id));
    logActivity('Adoption Inquiry Removed', id, 'adoption_inquiry', `Application ${id} removed.`);
  };

  // Volunteer Applications handlers
  const handleAddVolunteer = (newVol: VolunteerApplication) => {
    setVolunteerApplications([newVol, ...volunteerApplications]);
    logActivity('Volunteer Registration Received', newVol.id, 'volunteer', `${newVol.name} registered for ${newVol.role}`);
    triggerLiveAlert(`Volunteer Application (${newVol.id})`, `${newVol.name} joined as ${newVol.role}`, 'volunteer');
  };

  const handleUpdateVolunteer = (updatedVol: VolunteerApplication) => {
    setVolunteerApplications((prev) => {
      const exists = prev.some((v) => v.id === updatedVol.id);
      if (exists) {
        return prev.map((v) => (v.id === updatedVol.id ? updatedVol : v));
      }
      return [updatedVol, ...prev];
    });
    logActivity('Volunteer Application Updated', updatedVol.id, 'volunteer', `Status: ${updatedVol.status}`);
  };

  const handleDeleteVolunteer = (id: string) => {
    setVolunteerApplications(volunteerApplications.filter((v) => v.id !== id));
    logActivity('Volunteer Removed', id, 'volunteer', `Volunteer ${id} removed.`);
  };

  // Donation handlers
  const handleAddDonation = (newDon: DonationRecord) => {
    setDonationRecords([newDon, ...donationRecords]);
    logActivity('Donation Pledge Recorded', newDon.id, 'donation', `${newDon.donorName}: ${newDon.amount} for ${newDon.targetCause}`);
    triggerLiveAlert(`Donation Pledge (${newDon.id})`, `${newDon.donorName} pledged ${newDon.amount} (${newDon.currency})`, 'donation');
  };

  const handleUpdateDonation = (updatedDon: DonationRecord) => {
    setDonationRecords((prev) => {
      const exists = prev.some((d) => d.id === updatedDon.id);
      if (exists) {
        return prev.map((d) => (d.id === updatedDon.id ? updatedDon : d));
      }
      return [updatedDon, ...prev];
    });
    logActivity('Donation Ledger Updated', updatedDon.id, 'donation', `Status: ${updatedDon.status}`);
  };

  const handleDeleteDonation = (id: string) => {
    setDonationRecords(donationRecords.filter((d) => d.id !== id));
    logActivity('Donation Removed', id, 'donation', `Record ${id} removed.`);
  };

  // Emergency SOS handlers
  const handleAddEmergencyAlert = (newAlert: EmergencyAlert) => {
    setEmergencyAlerts([newAlert, ...emergencyAlerts]);
    logActivity('Emergency SOS Transmitted', newAlert.id, 'emergency_alert', `${newAlert.callerName}: ${newAlert.emergencyType} at ${newAlert.location}`);
    triggerLiveAlert(`Emergency Alert (${newAlert.id})`, `${newAlert.emergencyType} reported at ${newAlert.location}`, 'emergency');
  };

  const handleUpdateEmergencyAlert = (updatedAlert: EmergencyAlert) => {
    setEmergencyAlerts((prev) => {
      const exists = prev.some((e) => e.id === updatedAlert.id);
      if (exists) {
        return prev.map((e) => (e.id === updatedAlert.id ? updatedAlert : e));
      }
      return [updatedAlert, ...prev];
    });
    logActivity('SOS Alert Updated', updatedAlert.id, 'emergency_alert', `Status: ${updatedAlert.status}`);
  };

  const handleDeleteEmergencyAlert = (id: string) => {
    setEmergencyAlerts(emergencyAlerts.filter((e) => e.id !== id));
    logActivity('SOS Alert Cleared', id, 'emergency_alert', `Alert ${id} removed.`);
  };

  const totalSubmissionsCount =
    cases.length +
    adoptionInquiries.length +
    lostFoundItems.length +
    volunteerApplications.length +
    donationRecords.length +
    emergencyAlerts.length;

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const newPath = sectionId === 'home' ? '/' : `/${sectionId}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ section: sectionId }, '', newPath);
    }
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

      {/* Floating Alert Notification Toast (Admin Only) */}
      {liveToast && activeSection === 'admin' && (
        <div className="fixed top-24 right-4 z-50 bg-[#352018] text-white p-4 rounded-2xl shadow-2xl border border-[#b87d55] max-w-sm w-full animate-fadeIn">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#ea8e24] text-white flex items-center justify-center font-bold flex-shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="font-fredoka text-sm font-bold text-[#f5d7b7]">{liveToast.title}</h4>
                <p className="text-xs text-white/90 leading-relaxed">{liveToast.description}</p>
              </div>
            </div>
            <button onClick={() => setLiveToast(null)} className="text-white/60 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Page Views (Embedded by Section) */}
      <main className="flex-1">
        
        {/* Admin Dashboard */}
        {activeSection === 'admin' && (
          <div className="animate-fadeIn">
            <AdminDashboard
              cases={cases}
              dogs={dogs}
              lostFoundItems={lostFoundItems}
              adoptionInquiries={adoptionInquiries}
              volunteerApplications={volunteerApplications}
              donationRecords={donationRecords}
              emergencyAlerts={emergencyAlerts}
              activityLogs={activityLogs}
              onUpdateCase={handleUpdateCase}
              onDeleteCase={handleDeleteCase}
              onAddCase={handleAddCase}
              onUpdateDog={handleUpdateDog}
              onDeleteDog={handleDeleteDog}
              onAddDog={handleAddDog}
              onUpdateLostFound={handleUpdateLostFound}
              onDeleteLostFound={handleDeleteLostFound}
              onUpdateAdoptionInquiry={handleUpdateAdoptionInquiry}
              onDeleteAdoptionInquiry={handleDeleteAdoptionInquiry}
              onUpdateVolunteer={handleUpdateVolunteer}
              onDeleteVolunteer={handleDeleteVolunteer}
              onUpdateDonation={handleUpdateDonation}
              onDeleteDonation={handleDeleteDonation}
              onUpdateEmergencyAlert={handleUpdateEmergencyAlert}
              onDeleteEmergencyAlert={handleDeleteEmergencyAlert}
              onNavigateSection={handleNavigate}
            />
          </div>
        )}

        {/* Public Homepage */}
        {activeSection === 'home' && (
          <div className="animate-fadeIn">
            <HeroSection
              onOpenReport={() => handleNavigate('report')}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
              onNavigateSection={handleNavigate}
            />
            <QuickFeaturesRow onSelectFeature={handleNavigate} />
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
              onAddInquiry={handleAddAdoptionInquiry}
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

        {/* Dedicated Embedded Volunteer Guild Page */}
        {activeSection === 'community' && (
          <div className="animate-fadeIn">
            <CommunitySection
              onAddVolunteer={handleAddVolunteer}
              onNavigateSection={handleNavigate}
            />
          </div>
        )}

        {/* Dedicated Embedded Support Us Page */}
        {activeSection === 'support' && (
          <div className="animate-fadeIn">
            <SupportSection
              onAddDonation={handleAddDonation}
              onNavigateSection={handleNavigate}
            />
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

      {/* Emergency Hotline Modal */}
      <EmergencyHotlineModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onOpenReport={() => {
          setIsEmergencyOpen(false);
          handleNavigate('report');
        }}
        onAddEmergencyAlert={handleAddEmergencyAlert}
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
