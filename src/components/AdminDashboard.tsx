import React, { useState, useMemo } from 'react';
import {
  RescueCase,
  AdoptableDog,
  LostFoundDog,
  AdoptionInquiry,
  VolunteerApplication,
  DonationRecord,
  EmergencyAlert,
  AdminActivityLog,
} from '../types';
import {
  ShieldAlert,
  Heart,
  Search,
  Users,
  Coins,
  Radio,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  MessageCircle,
  PlusCircle,
  Trash2,
  Printer,
  Download,
  ChevronRight,
  Filter,
  Check,
  X,
  Eye,
  Activity,
  Siren,
  Dog,
  Sparkles,
} from 'lucide-react';
import {
  playClickSound,
  playHeartPop,
  playAlertSound,
  playDispatchPing,
  playSuccessChime,
} from '../utils/audio';

interface AdminDashboardProps {
  cases: RescueCase[];
  dogs: AdoptableDog[];
  lostFoundItems: LostFoundDog[];
  adoptionInquiries: AdoptionInquiry[];
  volunteerApplications: VolunteerApplication[];
  donationRecords: DonationRecord[];
  emergencyAlerts: EmergencyAlert[];
  activityLogs: AdminActivityLog[];

  // Update handlers
  onUpdateCase: (c: RescueCase) => void;
  onDeleteCase: (id: string) => void;
  onAddCase: (c: RescueCase) => void;

  onUpdateDog: (d: AdoptableDog) => void;
  onDeleteDog: (id: string) => void;
  onAddDog: (d: AdoptableDog) => void;

  onUpdateLostFound: (item: LostFoundDog) => void;
  onDeleteLostFound: (id: string) => void;

  onUpdateAdoptionInquiry: (inq: AdoptionInquiry) => void;
  onDeleteAdoptionInquiry: (id: string) => void;

  onUpdateVolunteer: (vol: VolunteerApplication) => void;
  onDeleteVolunteer: (id: string) => void;

  onUpdateDonation: (don: DonationRecord) => void;
  onDeleteDonation: (id: string) => void;

  onUpdateEmergencyAlert: (alert: EmergencyAlert) => void;
  onDeleteEmergencyAlert: (id: string) => void;

  onNavigateSection: (sectionId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  cases,
  dogs,
  lostFoundItems,
  adoptionInquiries,
  volunteerApplications,
  donationRecords,
  emergencyAlerts,
  activityLogs,
  onUpdateCase,
  onDeleteCase,
  onAddCase,
  onUpdateDog,
  onDeleteDog,
  onAddDog,
  onUpdateLostFound,
  onDeleteLostFound,
  onUpdateAdoptionInquiry,
  onDeleteAdoptionInquiry,
  onUpdateVolunteer,
  onDeleteVolunteer,
  onUpdateDonation,
  onDeleteDonation,
  onUpdateEmergencyAlert,
  onDeleteEmergencyAlert,
  onNavigateSection,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'cases' | 'inquiries' | 'lostfound' | 'volunteers' | 'donations' | 'emergency' | 'dogs' | 'logs'
  >('overview');

  const [searchQuery, setSearchQuery] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Dossier detail modal state
  const [selectedDossier, setSelectedDossier] = useState<{
    type: 'case' | 'inquiry' | 'lostfound' | 'volunteer' | 'donation' | 'emergency' | 'dog';
    data: any;
  } | null>(null);

  // New dog modal
  const [isAddDogModalOpen, setIsAddDogModalOpen] = useState(false);
  const [newTimelineNote, setNewTimelineNote] = useState('');
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Toast / feedback message
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  // Counts & KPIs
  const totalSubmissions =
    cases.length +
    adoptionInquiries.length +
    lostFoundItems.length +
    volunteerApplications.length +
    donationRecords.length +
    emergencyAlerts.length;

  const criticalCasesCount = cases.filter((c) => c.urgency === 'critical').length;
  const pendingInquiriesCount = adoptionInquiries.filter((i) => i.status === 'pending').length;
  const pendingVolunteersCount = volunteerApplications.filter((v) => v.status === 'pending').length;
  const activeEmergenciesCount = emergencyAlerts.filter((e) => e.status === 'active').length;

  // Global search filtering across cases
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchUrgency = urgencyFilter === 'all' || c.urgency === urgencyFilter;
      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchQuery =
        !searchQuery ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.dogBreed && c.dogBreed.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchUrgency && matchStatus && matchQuery;
    });
  }, [cases, urgencyFilter, statusFilter, searchQuery]);

  // Global search filtering across inquiries
  const filteredInquiries = useMemo(() => {
    return adoptionInquiries.filter((inq) => {
      const matchQuery =
        !searchQuery ||
        inq.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.dogName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.applicantEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.applicantPhone.includes(searchQuery);
      return matchQuery;
    });
  }, [adoptionInquiries, searchQuery]);

  // Export all submissions to JSON
  const handleExportJSON = () => {
    playClickSound();
    const data = {
      exportedAt: new Date().toISOString(),
      cases,
      adoptionInquiries,
      lostFoundItems,
      volunteerApplications,
      donationRecords,
      emergencyAlerts,
      dogs,
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonStr);
    downloadAnchor.setAttribute('download', `PawGuard_Submissions_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Submissions data export downloaded successfully.');
  };

  // Status changer for cases
  const handleStatusChange = (caseItem: RescueCase, newStatus: RescueCase['status']) => {
    playClickSound();
    const statusLabels: Record<string, string> = {
      reported: 'Reported',
      dispatching: 'Dispatching Response',
      volunteer_en_route: 'Volunteer En Route',
      at_vet: 'Under Vet Care',
      rescued_safe: 'Rescued & Safe ❤️',
    };
    const updated: RescueCase = {
      ...caseItem,
      status: newStatus,
      updates: [
        {
          time: 'Just now',
          text: `Status updated to: ${statusLabels[newStatus]}`,
          author: 'Admin Dispatcher',
        },
        ...caseItem.updates,
      ],
    };
    onUpdateCase(updated);
    if (selectedDossier && selectedDossier.data.id === caseItem.id) {
      setSelectedDossier({ type: 'case', data: updated });
    }
    if (newStatus === 'rescued_safe') {
      playSuccessChime();
    }
    showToast(`Case ${caseItem.id} status updated to ${statusLabels[newStatus]}`);
  };

  // Add timeline note to case
  const handleAddTimelineNote = (caseItem: RescueCase) => {
    if (!newTimelineNote.trim()) return;
    playClickSound();
    const updated: RescueCase = {
      ...caseItem,
      updates: [
        {
          time: 'Just now',
          text: newTimelineNote.trim(),
          author: 'Admin Dispatcher',
        },
        ...caseItem.updates,
      ],
    };
    onUpdateCase(updated);
    if (selectedDossier && selectedDossier.data.id === caseItem.id) {
      setSelectedDossier({ type: 'case', data: updated });
    }
    setNewTimelineNote('');
    showToast('Timeline note recorded.');
  };

  // Save internal admin notes
  const handleSaveAdminNote = (item: any, type: string) => {
    playClickSound();
    const updatedItem = { ...item, adminNotes: adminNoteInput };
    if (type === 'case') onUpdateCase(updatedItem);
    else if (type === 'inquiry') onUpdateAdoptionInquiry(updatedItem);
    else if (type === 'lostfound') onUpdateLostFound(updatedItem);
    else if (type === 'volunteer') onUpdateVolunteer(updatedItem);
    else if (type === 'donation') onUpdateDonation(updatedItem);
    else if (type === 'emergency') onUpdateEmergencyAlert(updatedItem);

    if (selectedDossier) {
      setSelectedDossier({ ...selectedDossier, data: updatedItem });
    }
    showToast('Internal note saved.');
  };

  // Open dossier helper
  const openDossier = (type: any, data: any) => {
    playClickSound();
    setSelectedDossier({ type, data });
    setAdminNoteInput(data.adminNotes || '');
  };

  return (
    <div className="min-h-screen bg-[#f7f0e7] text-[#352018] font-sans pb-24">
      {/* Toast Banner */}
      {feedbackToast && (
        <div className="fixed top-24 right-4 z-50 bg-[#4a2e1b] text-white px-5 py-3.5 rounded-2xl shadow-2xl border-2 border-[#b87d55] flex items-center gap-3 animate-fadeIn">
          <Sparkles className="w-5 h-5 text-[#f5d7b7] animate-pulse" />
          <span className="font-fredoka text-sm font-semibold">{feedbackToast}</span>
        </div>
      )}

      {/* Admin Top Command Header */}
      <div className="bg-[#4a2e1b] text-white border-b-4 border-[#352018] sticky top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title & Live Status */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#fbf6f0] text-[#4a2e1b] flex items-center justify-center font-bold text-xl shadow">
                🛡️
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="font-fredoka text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    PawGuard Admin Dispatch Desk
                  </h1>
                  <span className="flex items-center gap-1.5 bg-[#22c55e]/20 text-[#86efac] border border-[#22c55e]/40 text-[11px] font-fredoka font-bold px-3 py-0.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping inline-block"></span>
                    <span>LIVE INTAKE</span>
                  </span>
                </div>
                <p className="text-xs text-[#f5d7b7]/90 font-medium">
                  Central Real-Time Intake Desk for All Details Submitted by Users
                </p>
              </div>
            </div>

            {/* Actions in Header */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Export JSON */}
              <button
                onClick={handleExportJSON}
                className="bg-[#6b442b] hover:bg-[#57351f] text-[#fbf6f0] text-xs sm:text-sm font-fredoka font-medium px-3.5 py-2.5 rounded-xl border border-[#8a5b3a] transition-all flex items-center gap-1.5"
                title="Download export of all received submissions"
              >
                <Download className="w-4 h-4" />
                <span>Export Submissions</span>
              </button>

              {/* Return to Public Website */}
              <button
                onClick={() => {
                  playClickSound();
                  onNavigateSection('home');
                }}
                className="bg-[#fbf6f0] hover:bg-white text-[#4a2e1b] text-xs sm:text-sm font-fredoka font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center gap-1.5"
              >
                <span>View Website</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI Dashboard Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* Abuse Reports */}
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('cases');
            }}
            className={`p-4 rounded-3xl border-2 text-left transition-all relative overflow-hidden group shadow-sm ${
              activeTab === 'cases'
                ? 'bg-white border-[#d94141] ring-2 ring-[#d94141]'
                : 'bg-white border-[#ebd7c3] hover:border-[#d94141]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-fredoka font-bold uppercase text-[#d94141]">Abuse Reports</span>
              <ShieldAlert className="w-5 h-5 text-[#d94141]" />
            </div>
            <div className="font-fredoka text-3xl font-black text-[#26160d]">{cases.length}</div>
            <div className="text-[11px] text-[#8a5b3a] mt-1 font-semibold">
              {criticalCasesCount} Critical Urgent
            </div>
          </button>

          {/* Adoption Inquiries */}
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('inquiries');
            }}
            className={`p-4 rounded-3xl border-2 text-left transition-all relative overflow-hidden group shadow-sm ${
              activeTab === 'inquiries'
                ? 'bg-white border-[#3aa866] ring-2 ring-[#3aa866]'
                : 'bg-white border-[#ebd7c3] hover:border-[#3aa866]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-fredoka font-bold uppercase text-[#3aa866]">Adoptions</span>
              <Heart className="w-5 h-5 text-[#3aa866]" />
            </div>
            <div className="font-fredoka text-3xl font-black text-[#26160d]">{adoptionInquiries.length}</div>
            <div className="text-[11px] text-[#8a5b3a] mt-1 font-semibold">
              {pendingInquiriesCount} Pending Review
            </div>
          </button>

          {/* Lost & Found */}
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('lostfound');
            }}
            className={`p-4 rounded-3xl border-2 text-left transition-all relative overflow-hidden group shadow-sm ${
              activeTab === 'lostfound'
                ? 'bg-white border-[#ea8e24] ring-2 ring-[#ea8e24]'
                : 'bg-white border-[#ebd7c3] hover:border-[#ea8e24]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-fredoka font-bold uppercase text-[#ea8e24]">Lost & Found</span>
              <Search className="w-5 h-5 text-[#ea8e24]" />
            </div>
            <div className="font-fredoka text-3xl font-black text-[#26160d]">{lostFoundItems.length}</div>
            <div className="text-[11px] text-[#8a5b3a] mt-1 font-semibold">
              {lostFoundItems.filter((i) => i.status === 'lost').length} Missing Pets
            </div>
          </button>

          {/* Volunteers */}
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('volunteers');
            }}
            className={`p-4 rounded-3xl border-2 text-left transition-all relative overflow-hidden group shadow-sm ${
              activeTab === 'volunteers'
                ? 'bg-white border-[#8a4ea8] ring-2 ring-[#8a4ea8]'
                : 'bg-white border-[#ebd7c3] hover:border-[#8a4ea8]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-fredoka font-bold uppercase text-[#8a4ea8]">Volunteers</span>
              <Users className="w-5 h-5 text-[#8a4ea8]" />
            </div>
            <div className="font-fredoka text-3xl font-black text-[#26160d]">{volunteerApplications.length}</div>
            <div className="text-[11px] text-[#8a5b3a] mt-1 font-semibold">
              {pendingVolunteersCount} Awaiting Review
            </div>
          </button>

          {/* Donations & Pledges */}
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('donations');
            }}
            className={`p-4 rounded-3xl border-2 text-left transition-all relative overflow-hidden group shadow-sm ${
              activeTab === 'donations'
                ? 'bg-white border-[#b87d55] ring-2 ring-[#b87d55]'
                : 'bg-white border-[#ebd7c3] hover:border-[#b87d55]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-fredoka font-bold uppercase text-[#b87d55]">Donations</span>
              <Coins className="w-5 h-5 text-[#b87d55]" />
            </div>
            <div className="font-fredoka text-3xl font-black text-[#26160d]">{donationRecords.length}</div>
            <div className="text-[11px] text-[#8a5b3a] mt-1 font-semibold">
              USD + Crypto Records
            </div>
          </button>

          {/* Emergency SOS */}
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('emergency');
            }}
            className={`p-4 rounded-3xl border-2 text-left transition-all relative overflow-hidden group shadow-sm ${
              activeTab === 'emergency'
                ? 'bg-white border-[#d94141] ring-2 ring-[#d94141]'
                : 'bg-white border-[#ebd7c3] hover:border-[#d94141]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-fredoka font-bold uppercase text-[#d94141] flex items-center gap-1">
                <Siren className="w-3.5 h-3.5 animate-bounce" />
                <span>SOS Alert</span>
              </span>
              <Radio className="w-5 h-5 text-[#d94141]" />
            </div>
            <div className="font-fredoka text-3xl font-black text-[#d94141]">{emergencyAlerts.length}</div>
            <div className="text-[11px] text-[#991b1b] mt-1 font-semibold">
              {activeEmergenciesCount} Active Dispatch
            </div>
          </button>

        </div>

        {/* Global Tab Navigation Bar */}
        <div className="bg-white p-2.5 rounded-3xl border-2 border-[#ebd7c3] shadow-sm flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {[
              { id: 'overview', label: '📊 Command Center', count: totalSubmissions },
              { id: 'cases', label: '🚨 Abuse Reports', count: cases.length },
              { id: 'inquiries', label: '🐾 Adoption Apps', count: adoptionInquiries.length },
              { id: 'lostfound', label: '🔍 Lost & Found', count: lostFoundItems.length },
              { id: 'volunteers', label: '🤝 Volunteers', count: volunteerApplications.length },
              { id: 'donations', label: '💖 Donation Ledger', count: donationRecords.length },
              { id: 'emergency', label: '⚡ SOS Hotline', count: emergencyAlerts.length },
              { id: 'dogs', label: '🐕 Dog Catalog', count: dogs.length },
              { id: 'logs', label: '📜 Activity Log', count: activityLogs.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playClickSound();
                  setActiveTab(tab.id as any);
                }}
                className={`font-fredoka text-xs sm:text-sm px-3.5 py-2 rounded-2xl transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-[#4a2e1b] text-white font-bold shadow-md'
                    : 'text-[#5e4537] hover:bg-[#faefe4] font-medium'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-[#faefe4] text-[#8a5b3a]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search all submissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-[#ebd7c3] bg-[#fbf6f0] text-xs focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
            />
            <Search className="w-4 h-4 text-[#8a5b3a] absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-xs text-gray-400 hover:text-black"
              >
                ×
              </button>
            )}
          </div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* TAB: COMMAND CENTER OVERVIEW */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Urgent Incident Alert Stream */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#ebd7c3] shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-[#ebd7c3] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#fee2e2] text-[#d94141] flex items-center justify-center font-bold">
                    🚨
                  </div>
                  <div>
                    <h2 className="font-fredoka text-xl font-bold text-[#26160d]">
                      Critical Incident & Dispatch Stream
                    </h2>
                    <p className="text-xs text-[#8a5b3a]">
                      Cases requiring immediate rescue responder dispatch or medical attention
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('cases')}
                  className="text-xs font-fredoka font-bold text-[#4a2e1b] hover:underline"
                >
                  View All ({cases.length}) →
                </button>
              </div>

              {cases.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center mx-auto text-xl">
                    🛡️
                  </div>
                  <h3 className="font-fredoka text-lg font-bold text-[#26160d]">No Submissions Yet</h3>
                  <p className="text-xs text-[#8a5b3a] max-w-sm mx-auto">
                    When a user submits an abuse report, emergency hotline alert, or case through the website, it will appear here in real-time.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cases.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => openDossier('case', item)}
                      className="bg-[#fbf6f0] p-4 sm:p-5 rounded-2xl border border-[#ebd7c3] hover:border-[#d94141] shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 items-start group"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0 border border-[#ebd7c3]">
                        <img src={item.photoUrl} alt="Report" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-[#8a5b3a]">{item.id}</span>
                          <span className="bg-[#fee2e2] text-[#991b1b] text-[10px] font-fredoka font-bold px-2.5 py-0.5 rounded-full border border-[#fca5a5]">
                            {item.urgency.toUpperCase()}
                          </span>
                        </div>

                        <h3 className="font-fredoka text-sm font-bold text-[#26160d] line-clamp-1">
                          {item.title}
                        </h3>

                        <p className="text-xs text-[#6b4c38] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#d94141] flex-shrink-0" />
                          <span className="line-clamp-1">{item.location}</span>
                        </p>

                        <div className="flex items-center justify-between text-[11px] text-[#8a5b3a] pt-1">
                          <span>Reporter: {item.reporter}</span>
                          <span className="text-[#4a2e1b] font-bold group-hover:underline">Open Dossier →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Two Column: Recent Adoption Apps & Recent Volunteer Signups */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recent Adoption Applications */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#ebd7c3] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebd7c3] pb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#3aa866]" />
                    <h3 className="font-fredoka text-lg font-bold text-[#26160d]">
                      Recent Adoption Inquiries
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs font-fredoka font-bold text-[#4a2e1b] hover:underline"
                  >
                    View All ({adoptionInquiries.length}) →
                  </button>
                </div>

                {adoptionInquiries.length === 0 ? (
                  <div className="text-center py-8 text-xs text-[#8a5b3a]">
                    No user adoption inquiries submitted yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {adoptionInquiries.slice(0, 3).map((inq) => (
                      <div
                        key={inq.id}
                        onClick={() => openDossier('inquiry', inq)}
                        className="bg-[#fbf6f0] p-3.5 rounded-2xl border border-[#ebd7c3] hover:border-[#3aa866] transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-fredoka text-sm font-bold text-[#26160d]">
                            {inq.applicantName} → <span className="text-[#3aa866]">{inq.dogName}</span>
                          </div>
                          <div className="text-xs text-[#6b4c38]">
                            {inq.applicantPhone} • {inq.housingType}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-fredoka font-bold px-2.5 py-1 rounded-full uppercase ${
                            inq.status === 'approved'
                              ? 'bg-[#dcfce7] text-[#166534]'
                              : inq.status === 'pending'
                              ? 'bg-[#ffedd5] text-[#9a3412]'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Volunteer Guild Submissions */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#ebd7c3] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#ebd7c3] pb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#8a4ea8]" />
                    <h3 className="font-fredoka text-lg font-bold text-[#26160d]">
                      Recent Volunteer Applications
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('volunteers')}
                    className="text-xs font-fredoka font-bold text-[#4a2e1b] hover:underline"
                  >
                    View All ({volunteerApplications.length}) →
                  </button>
                </div>

                {volunteerApplications.length === 0 ? (
                  <div className="text-center py-8 text-xs text-[#8a5b3a]">
                    No volunteer applications submitted yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {volunteerApplications.slice(0, 3).map((vol) => (
                      <div
                        key={vol.id}
                        onClick={() => openDossier('volunteer', vol)}
                        className="bg-[#fbf6f0] p-3.5 rounded-2xl border border-[#ebd7c3] hover:border-[#8a4ea8] transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-fredoka text-sm font-bold text-[#26160d]">
                            {vol.name} • <span className="text-[#8a4ea8]">{vol.role}</span>
                          </div>
                          <div className="text-xs text-[#6b4c38]">
                            {vol.location} • {vol.availability}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-fredoka font-bold px-2.5 py-1 rounded-full uppercase ${
                            vol.status === 'approved'
                              ? 'bg-[#dcfce7] text-[#166534]'
                              : 'bg-[#f3e8ff] text-[#6b21a8]'
                          }`}
                        >
                          {vol.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB: ABUSE & RESCUE DISPATCHES */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'cases' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Sub-header with Filter controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border-2 border-[#ebd7c3]">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-[#d94141]" />
                <div>
                  <h2 className="font-fredoka text-xl font-bold text-[#26160d]">
                    Cruelty & Abuse Reports ({filteredCases.length})
                  </h2>
                  <p className="text-xs text-[#8a5b3a]">
                    All abuse incidents, starvation reports, and trauma rescues logged by users
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={urgencyFilter}
                  onChange={(e) => setUrgencyFilter(e.target.value)}
                  className="bg-[#fbf6f0] border border-[#ebd7c3] rounded-xl text-xs font-semibold px-3 py-2 text-[#4a2e1b]"
                >
                  <option value="all">All Urgencies</option>
                  <option value="critical">🚨 Critical</option>
                  <option value="high">⚠️ High</option>
                  <option value="moderate">Moderate</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#fbf6f0] border border-[#ebd7c3] rounded-xl text-xs font-semibold px-3 py-2 text-[#4a2e1b]"
                >
                  <option value="all">All Statuses</option>
                  <option value="reported">Reported</option>
                  <option value="dispatching">Dispatching</option>
                  <option value="volunteer_en_route">En Route</option>
                  <option value="at_vet">At Vet</option>
                  <option value="rescued_safe">Rescued Safe</option>
                </select>
              </div>
            </div>

            {/* Cases Grid */}
            {filteredCases.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#ebd7c3] space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#fee2e2] text-[#d94141] flex items-center justify-center mx-auto text-xl">
                  🚨
                </div>
                <h3 className="font-fredoka text-lg font-bold text-[#26160d]">No Abuse Reports in Queue</h3>
                <p className="text-xs text-[#8a5b3a] max-w-sm mx-auto">
                  When a user reports an incident through the "Report Abuse" section, all information including photos, GPS, and contact info will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCases.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl overflow-hidden border-2 border-[#ebd7c3] hover:border-[#4a2e1b] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview & Badges */}
                      <div className="h-48 relative overflow-hidden bg-[#faefe4]">
                        <img
                          src={item.photoUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span
                            className={`text-[10px] font-fredoka font-bold uppercase px-2.5 py-0.5 rounded-full shadow ${
                              item.urgency === 'critical'
                                ? 'bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5]'
                                : item.urgency === 'high'
                                ? 'bg-[#ffedd5] text-[#9a3412] border border-[#fdba74]'
                                : 'bg-[#dcfce7] text-[#166534] border border-[#86efac]'
                            }`}
                          >
                            {item.urgency}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="bg-[#352018]/80 text-white font-mono text-[10px] px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                            {item.id}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#8a5b3a]">{item.type}</span>
                          <span className="text-[11px] text-gray-500">{item.reportedAt}</span>
                        </div>

                        <h3 className="font-fredoka text-lg font-bold text-[#26160d] line-clamp-1">
                          {item.title}
                        </h3>

                        <p className="text-xs text-[#6b4c38] flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#ea8e24] flex-shrink-0" />
                          <span className="line-clamp-1">{item.location}</span>
                        </p>

                        <p className="text-xs text-[#5e4537] bg-[#fbf6f0] p-3 rounded-xl border border-[#ebd7c3]/60 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Reporter & Responder info */}
                        <div className="bg-[#faefe4] p-3 rounded-xl text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[#8a5b3a] font-semibold">Reporter:</span>
                            <span className="font-bold text-[#26160d]">
                              {item.reporter} {item.isAnonymous && '(Anon)'}
                            </span>
                          </div>
                          {item.reporterPhone && (
                            <div className="flex items-center justify-between font-mono text-[11px]">
                              <span className="text-[#8a5b3a]">Phone:</span>
                              <span className="text-[#4a2e1b] font-bold">{item.reporterPhone}</span>
                            </div>
                          )}
                          {item.assignedVolunteer && (
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-[#8a5b3a]">Responder:</span>
                              <span className="text-[#3aa866] font-bold">{item.assignedVolunteer}</span>
                            </div>
                          )}
                        </div>

                        {/* Status update select */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-fredoka font-bold uppercase text-[#8a5b3a]">
                            Dispatch Status:
                          </label>
                          <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item, e.target.value as any)}
                            className="w-full bg-[#fbf6f0] border border-[#ebd7c3] font-fredoka font-semibold text-xs rounded-xl p-2 focus:ring-2 focus:ring-[#4a2e1b]"
                          >
                            <option value="reported">1. Reported (Needs Triage)</option>
                            <option value="dispatching">2. Dispatching Responder</option>
                            <option value="volunteer_en_route">3. Volunteer En Route</option>
                            <option value="at_vet">4. Under Medical / Vet Care</option>
                            <option value="rescued_safe">5. Rescued Safe & Sheltered ❤️</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-5 sm:p-6 pt-0 flex gap-2">
                      <button
                        onClick={() => openDossier('case', item)}
                        className="flex-1 bg-[#4a2e1b] hover:bg-[#352018] text-white text-xs font-fredoka font-semibold py-2.5 rounded-full shadow flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Full Details</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete report ${item.id}?`)) {
                            onDeleteCase(item.id);
                            showToast(`Case ${item.id} deleted.`);
                          }
                        }}
                        className="p-2.5 rounded-full bg-[#fee2e2] text-[#991b1b] hover:bg-[#fca5a5] transition-colors"
                        title="Delete report"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB: ADOPTION INQUIRIES */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between bg-white p-4 rounded-3xl border-2 border-[#ebd7c3]">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-[#3aa866]" />
                <div>
                  <h2 className="font-fredoka text-xl font-bold text-[#26160d]">
                    Adoption & Foster Applications ({filteredInquiries.length})
                  </h2>
                  <p className="text-xs text-[#8a5b3a]">
                    Applications submitted by potential adopters for rescued dogs
                  </p>
                </div>
              </div>
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#ebd7c3] space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#dcfce7] text-[#166534] flex items-center justify-center mx-auto text-xl">
                  🐾
                </div>
                <h3 className="font-fredoka text-lg font-bold text-[#26160d]">No Adoption Applications Yet</h3>
                <p className="text-xs text-[#8a5b3a] max-w-sm mx-auto">
                  When a user submits an adoption or foster application from the adoption page, their complete housing and experience details will be listed here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-white rounded-3xl p-6 border-2 border-[#ebd7c3] hover:border-[#3aa866] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#8a5b3a]">{inq.id}</span>
                        <span
                          className={`text-[10px] font-fredoka font-bold px-3 py-0.5 rounded-full uppercase ${
                            inq.status === 'approved'
                              ? 'bg-[#dcfce7] text-[#166534] border border-[#86efac]'
                              : inq.status === 'pending'
                              ? 'bg-[#ffedd5] text-[#9a3412] border border-[#fdba74]'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                          {inq.applicantName}
                        </h3>
                        <p className="text-xs font-semibold text-[#3aa866]">
                          Applied For: {inq.dogName}
                        </p>
                      </div>

                      <div className="bg-[#fbf6f0] p-3 rounded-2xl text-xs space-y-1.5 border border-[#ebd7c3]/60">
                        <div className="flex items-center justify-between">
                          <span className="text-[#8a5b3a]">Phone:</span>
                          <span className="font-mono font-semibold">{inq.applicantPhone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#8a5b3a]">Email:</span>
                          <span className="font-semibold text-[11px]">{inq.applicantEmail}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#8a5b3a]">Housing:</span>
                          <span className="font-semibold text-[11px]">{inq.housingType}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#8a5b3a]">Experience:</span>
                          <span className="font-semibold">{inq.experienceLevel}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#5e4537] bg-[#faefe4] p-3 rounded-xl line-clamp-3 leading-relaxed">
                        "{inq.notes}"
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#f4ece1]">
                      <div className="flex gap-2">
                        <a
                          href={`https://wa.me/${inq.applicantPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.applicantName)},%20this%20is%20PawGuard%20regarding%20your%20adoption%20application%20for%20${encodeURIComponent(inq.dogName)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-fredoka font-semibold py-2 rounded-xl flex items-center justify-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`mailto:${inq.applicantEmail}?subject=PawGuard%20Adoption%20Application%20Update%20for%20${encodeURIComponent(inq.dogName)}`}
                          className="flex-1 bg-[#4a2e1b] hover:bg-[#352018] text-white text-xs font-fredoka font-semibold py-2 rounded-xl flex items-center justify-center gap-1"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email</span>
                        </a>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const updated = { ...inq, status: inq.status === 'approved' ? 'pending' : 'approved' };
                            onUpdateAdoptionInquiry(updated as any);
                            if (updated.status === 'approved') playSuccessChime();
                            showToast(`Application ${inq.id} marked as ${updated.status}.`);
                          }}
                          className={`flex-1 text-xs font-fredoka font-semibold py-2 rounded-xl border ${
                            inq.status === 'approved'
                              ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]'
                              : 'bg-[#faefe4] text-[#4a2e1b] border-[#ebd7c3] hover:bg-[#dcfce7]'
                          }`}
                        >
                          {inq.status === 'approved' ? '✓ Approved' : 'Approve App'}
                        </button>

                        <button
                          onClick={() => openDossier('inquiry', inq)}
                          className="px-3 bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] text-xs font-fredoka font-semibold rounded-xl"
                          title="Full Details"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB: LOST & FOUND RADAR */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'lostfound' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between bg-white p-4 rounded-3xl border-2 border-[#ebd7c3]">
              <div className="flex items-center gap-3">
                <Search className="w-6 h-6 text-[#ea8e24]" />
                <div>
                  <h2 className="font-fredoka text-xl font-bold text-[#26160d]">
                    Lost & Found Pet Notices ({lostFoundItems.length})
                  </h2>
                  <p className="text-xs text-[#8a5b3a]">
                    Community missing pet notifications and shelter intake logs
                  </p>
                </div>
              </div>
            </div>

            {lostFoundItems.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#ebd7c3] space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#ffedd5] text-[#9a3412] flex items-center justify-center mx-auto text-xl">
                  🔍
                </div>
                <h3 className="font-fredoka text-lg font-bold text-[#26160d]">No Lost or Found Notices Yet</h3>
                <p className="text-xs text-[#8a5b3a] max-w-sm mx-auto">
                  When a community member posts a lost dog, found pet, or injured stray notice, it will be listed here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lostFoundItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl overflow-hidden border-2 border-[#ebd7c3] hover:border-[#4a2e1b] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-48 relative overflow-hidden bg-[#faefe4]">
                        <img src={item.photoUrl} alt={item.dogName} className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3">
                          <span
                            className={`text-[10px] font-fredoka font-bold px-2.5 py-0.5 rounded-full uppercase ${
                              item.status === 'lost'
                                ? 'bg-[#fee2e2] text-[#991b1b]'
                                : item.status === 'found'
                                ? 'bg-[#dcfce7] text-[#166534]'
                                : 'bg-[#ffedd5] text-[#9a3412]'
                            }`}
                          >
                            {item.status === 'lost' ? 'Missing Pet' : item.status === 'found' ? 'Found Dog' : 'Injured Stray'}
                          </span>
                        </div>
                        {item.caseStatus === 'reunited' && (
                          <div className="absolute top-3 right-3 bg-[#166534] text-white text-[10px] font-fredoka font-bold px-2.5 py-0.5 rounded-full">
                            Reunited ❤️
                          </div>
                        )}
                      </div>

                      <div className="p-5 sm:p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                            {item.dogName || 'Unnamed Pet'}
                          </h3>
                          <span className="text-xs font-mono text-[#8a5b3a]">{item.id}</span>
                        </div>

                        <div className="text-xs text-[#6b4c38] space-y-1">
                          <p><strong>Breed / Color:</strong> {item.breed} ({item.color})</p>
                          <p><strong>Last Seen:</strong> {item.lastSeenLocation}</p>
                          <p><strong>Contact:</strong> {item.contactName} ({item.contactPhone})</p>
                          {item.reward && <p className="text-[#d94141] font-bold"><strong>Reward:</strong> {item.reward}</p>}
                        </div>

                        <p className="text-xs text-[#5e4537] bg-[#fbf6f0] p-3 rounded-xl border border-[#ebd7c3]/60 line-clamp-2">
                          {item.details}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 pt-0 flex gap-2">
                      <button
                        onClick={() => {
                          const newCaseStatus = item.caseStatus === 'reunited' ? 'open' : 'reunited';
                          onUpdateLostFound({ ...item, caseStatus: newCaseStatus });
                          if (newCaseStatus === 'reunited') playSuccessChime();
                          showToast(`Status updated to: ${newCaseStatus}`);
                        }}
                        className="flex-1 bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] text-xs font-fredoka font-semibold py-2.5 rounded-xl transition-all"
                      >
                        {item.caseStatus === 'reunited' ? 'Reopen Case' : 'Mark Reunited ❤️'}
                      </button>

                      <button
                        onClick={() => openDossier('lostfound', item)}
                        className="px-4 bg-[#4a2e1b] text-white text-xs font-fredoka font-semibold rounded-xl"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB: VOLUNTEER GUILD APPLICANTS */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'volunteers' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between bg-white p-4 rounded-3xl border-2 border-[#ebd7c3]">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#8a4ea8]" />
                <div>
                  <h2 className="font-fredoka text-xl font-bold text-[#26160d]">
                    Volunteer Guild Applicants ({volunteerApplications.length})
                  </h2>
                  <p className="text-xs text-[#8a5b3a]">
                    Community members offering transport, foster homes, and veterinary assistance
                  </p>
                </div>
              </div>
            </div>

            {volunteerApplications.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#ebd7c3] space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#f3e8ff] text-[#6b21a8] flex items-center justify-center mx-auto text-xl">
                  🤝
                </div>
                <h3 className="font-fredoka text-lg font-bold text-[#26160d]">No Volunteer Applications Yet</h3>
                <p className="text-xs text-[#8a5b3a] max-w-sm mx-auto">
                  When a user signs up to volunteer as a rescue driver, emergency foster, or field spotter, their full details will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {volunteerApplications.map((vol) => (
                  <div
                    key={vol.id}
                    className="bg-white rounded-3xl p-6 border-2 border-[#ebd7c3] hover:border-[#8a4ea8] shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#8a5b3a]">{vol.id}</span>
                        <span
                          className={`text-[10px] font-fredoka font-bold px-3 py-0.5 rounded-full uppercase ${
                            vol.status === 'approved'
                              ? 'bg-[#dcfce7] text-[#166534] border border-[#86efac]'
                              : 'bg-[#f3e8ff] text-[#6b21a8] border border-[#e9d5ff]'
                          }`}
                        >
                          {vol.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                          {vol.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#8a4ea8]">
                          Role: {vol.role}
                        </p>
                      </div>

                      <div className="bg-[#fbf6f0] p-3 rounded-2xl text-xs space-y-1.5 border border-[#ebd7c3]/60">
                        <div className="flex items-center justify-between">
                          <span className="text-[#8a5b3a]">Phone:</span>
                          <span className="font-mono font-semibold">{vol.phone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#8a5b3a]">Location:</span>
                          <span className="font-semibold">{vol.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#8a5b3a]">Availability:</span>
                          <span className="font-semibold">{vol.availability}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#8a5b3a]">Vehicle Access:</span>
                          <span className="font-bold text-[#3aa866]">{vol.hasVehicle ? '✓ Yes (Equipped)' : 'No'}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#5e4537] bg-[#faefe4] p-3 rounded-xl leading-relaxed">
                        "{vol.experience}"
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#f4ece1]">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const updated = { ...vol, status: vol.status === 'approved' ? 'pending' : 'approved' };
                            onUpdateVolunteer(updated as any);
                            if (updated.status === 'approved') playSuccessChime();
                            showToast(`Volunteer ${vol.name} marked as ${updated.status}.`);
                          }}
                          className={`flex-1 text-xs font-fredoka font-semibold py-2 rounded-xl border ${
                            vol.status === 'approved'
                              ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]'
                              : 'bg-[#faefe4] text-[#4a2e1b] border-[#ebd7c3] hover:bg-[#dcfce7]'
                          }`}
                        >
                          {vol.status === 'approved' ? '✓ Approved Member' : 'Approve Volunteer'}
                        </button>

                        <button
                          onClick={() => openDossier('volunteer', vol)}
                          className="px-4 bg-[#4a2e1b] text-white text-xs font-fredoka font-semibold rounded-xl"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB: DONATION & MEDICAL FUNDS */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'donations' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between bg-white p-4 rounded-3xl border-2 border-[#ebd7c3]">
              <div className="flex items-center gap-3">
                <Coins className="w-6 h-6 text-[#b87d55]" />
                <div>
                  <h2 className="font-fredoka text-xl font-bold text-[#26160d]">
                    Medical Support & Donation Ledger ({donationRecords.length})
                  </h2>
                  <p className="text-xs text-[#8a5b3a]">
                    Contributions and incoming pledge confirmations submitted by donors
                  </p>
                </div>
              </div>
            </div>

            {donationRecords.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#ebd7c3] space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#faefe4] text-[#b87d55] flex items-center justify-center mx-auto text-xl">
                  💖
                </div>
                <h3 className="font-fredoka text-lg font-bold text-[#26160d]">No Donation Records Yet</h3>
                <p className="text-xs text-[#8a5b3a] max-w-sm mx-auto">
                  When a supporter pledges or records a donation transaction on the Support Us page, the record will be tracked in this ledger.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donationRecords.map((don) => (
                  <div
                    key={don.id}
                    className="bg-white rounded-3xl p-6 border-2 border-[#ebd7c3] hover:border-[#b87d55] shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#8a5b3a]">{don.id}</span>
                        <span
                          className={`text-[10px] font-fredoka font-bold px-3 py-0.5 rounded-full uppercase ${
                            don.status === 'verified'
                              ? 'bg-[#dcfce7] text-[#166534] border border-[#86efac]'
                              : 'bg-[#ffedd5] text-[#9a3412] border border-[#fdba74]'
                          }`}
                        >
                          {don.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-fredoka text-2xl font-bold text-[#26160d]">
                          {don.amount} {typeof don.amount === 'number' ? don.currency : ''}
                        </h3>
                        <p className="text-xs font-semibold text-[#8a5b3a]">
                          Target: {don.targetCause}
                        </p>
                      </div>

                      <div className="bg-[#fbf6f0] p-3 rounded-2xl text-xs space-y-1.5 border border-[#ebd7c3]/60">
                        <div className="flex items-center justify-between">
                          <span className="text-[#8a5b3a]">Donor:</span>
                          <span className="font-semibold">{don.donorName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#8a5b3a]">Email:</span>
                          <span className="font-semibold text-[11px]">{don.donorEmail}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#8a5b3a]">Method:</span>
                          <span className="font-semibold">{don.paymentMethod}</span>
                        </div>
                        {don.txHashOrReceipt && (
                          <div className="space-y-0.5 pt-1">
                            <span className="text-[#8a5b3a] text-[10px]">Tx Reference:</span>
                            <p className="font-mono text-[10px] bg-white p-1 rounded border border-[#ebd7c3] break-all select-all">
                              {don.txHashOrReceipt}
                            </p>
                          </div>
                        )}
                      </div>

                      {don.donorNote && (
                        <p className="text-xs text-[#5e4537] bg-[#faefe4] p-3 rounded-xl leading-relaxed">
                          "{don.donorNote}"
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#f4ece1]">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const updated = { ...don, status: don.status === 'verified' ? 'pending_verification' : 'verified' };
                            onUpdateDonation(updated as any);
                            if (updated.status === 'verified') playSuccessChime();
                            showToast(`Donation ${don.id} marked as ${updated.status}.`);
                          }}
                          className={`flex-1 text-xs font-fredoka font-semibold py-2 rounded-xl border ${
                            don.status === 'verified'
                              ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]'
                              : 'bg-[#faefe4] text-[#4a2e1b] border-[#ebd7c3] hover:bg-[#dcfce7]'
                          }`}
                        >
                          {don.status === 'verified' ? '✓ Verified on Ledger' : 'Verify Donation'}
                        </button>

                        <button
                          onClick={() => openDossier('donation', don)}
                          className="px-4 bg-[#4a2e1b] text-white text-xs font-fredoka font-semibold rounded-xl"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB: EMERGENCY SOS & HOTLINE */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'emergency' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between bg-white p-4 rounded-3xl border-2 border-[#d94141]">
              <div className="flex items-center gap-3">
                <Siren className="w-6 h-6 text-[#d94141] animate-bounce" />
                <div>
                  <h2 className="font-fredoka text-xl font-bold text-[#d94141]">
                    Emergency SOS Alerts ({emergencyAlerts.length})
                  </h2>
                  <p className="text-xs text-[#8a5b3a]">
                    Direct emergency dispatch alerts received from online users and hotline desk
                  </p>
                </div>
              </div>
            </div>

            {emergencyAlerts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#d94141]/40 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#fee2e2] text-[#d94141] flex items-center justify-center mx-auto text-xl">
                  ⚡
                </div>
                <h3 className="font-fredoka text-lg font-bold text-[#26160d]">No Active Emergency SOS Alerts</h3>
                <p className="text-xs text-[#8a5b3a] max-w-sm mx-auto">
                  When a user in distress submits an SOS callback request through the Emergency Help modal, it will immediately sound an alarm and appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {emergencyAlerts.map((sos) => (
                  <div
                    key={sos.id}
                    className="bg-white rounded-3xl p-6 border-2 border-[#d94141] shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#d94141] flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#d94141] animate-ping"></span>
                          {sos.id}
                        </span>
                        <span className="bg-[#fee2e2] text-[#991b1b] text-xs font-fredoka font-bold px-3 py-0.5 rounded-full border border-[#fca5a5]">
                          {sos.urgency}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                          {sos.emergencyType}
                        </h3>
                        <p className="text-xs font-semibold text-[#8a5b3a] flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#d94141]" />
                          <span>{sos.location}</span>
                        </p>
                      </div>

                      <div className="bg-[#faefe4] p-4 rounded-2xl space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#8a5b3a] font-semibold">Caller:</span>
                          <span className="font-bold text-[#26160d]">{sos.callerName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#8a5b3a] font-semibold">Callback Phone:</span>
                          <span className="font-mono font-bold text-base text-[#d94141]">{sos.phone}</span>
                        </div>
                      </div>

                      <div className="bg-[#fee2e2]/50 p-3.5 rounded-2xl border border-[#fca5a5] text-xs text-[#7f1d1d] leading-relaxed">
                        <strong>Situation Notes:</strong> {sos.notes}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex gap-2">
                        <a
                          href={`tel:${sos.phone}`}
                          className="flex-1 bg-[#d94141] hover:bg-[#b91c1c] text-white text-xs font-fredoka font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 shadow"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Call Back Now</span>
                        </a>

                        <a
                          href={`https://wa.me/${sos.phone.replace(/[^0-9]/g, '')}?text=PawGuard%20Emergency%20Response%20Desk%20responding%20to%20your%20SOS%20alert.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-fredoka font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 shadow"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const updated = { ...sos, status: sos.status === 'resolved' ? 'active' : 'resolved' };
                            onUpdateEmergencyAlert(updated as any);
                            if (updated.status === 'resolved') playSuccessChime();
                            showToast(`SOS ${sos.id} marked as ${updated.status}.`);
                          }}
                          className="flex-1 bg-[#fbf6f0] hover:bg-[#ebd7c3] text-[#4a2e1b] text-xs font-fredoka font-semibold py-2 rounded-xl border border-[#ebd7c3]"
                        >
                          {sos.status === 'resolved' ? 'Reopen SOS' : '✓ Mark Resolved'}
                        </button>

                        <button
                          onClick={() => openDossier('emergency', sos)}
                          className="px-4 bg-[#4a2e1b] text-white text-xs font-fredoka font-semibold rounded-xl"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB: DOG CATALOG DATABASE */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'dogs' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between bg-white p-4 rounded-3xl border-2 border-[#ebd7c3]">
              <div className="flex items-center gap-3">
                <Dog className="w-6 h-6 text-[#4a2e1b]" />
                <div>
                  <h2 className="font-fredoka text-xl font-bold text-[#26160d]">
                    Adoptable Dog Database ({dogs.length})
                  </h2>
                  <p className="text-xs text-[#8a5b3a]">
                    Manage the public adoption catalog and rehoming listings
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAddDogModalOpen(true)}
                className="bg-[#4a2e1b] hover:bg-[#352018] text-white text-xs font-fredoka font-semibold px-4 py-2.5 rounded-2xl shadow flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Dog</span>
              </button>
            </div>

            {dogs.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#ebd7c3] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center mx-auto text-xl">
                  🐕
                </div>
                <h3 className="font-fredoka text-lg font-bold text-[#26160d]">No Dogs Listed in Database Yet</h3>
                <p className="text-xs text-[#8a5b3a] max-w-sm mx-auto">
                  Click "Add New Dog" above or submit a pet through the "List a Rescued Dog" public form to add dogs to the adoption directory.
                </p>
                <button
                  onClick={() => setIsAddDogModalOpen(true)}
                  className="bg-[#4a2e1b] text-white font-fredoka text-xs px-5 py-2.5 rounded-full"
                >
                  + Add First Dog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dogs.map((dog) => (
                  <div
                    key={dog.id}
                    className="bg-white rounded-3xl overflow-hidden border-2 border-[#ebd7c3] hover:border-[#4a2e1b] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-48 relative overflow-hidden bg-[#faefe4]">
                        <img src={dog.photoUrl} alt={dog.name} className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3 bg-[#4a2e1b]/80 backdrop-blur-md text-white text-[10px] font-fredoka font-bold px-2.5 py-0.5 rounded-full">
                          {dog.gender} • {dog.age}
                        </div>
                        <div className="absolute top-3 right-3">
                          <span
                            className={`text-[10px] font-fredoka font-bold px-2.5 py-0.5 rounded-full ${
                              dog.status === 'adopted'
                                ? 'bg-[#166534] text-white'
                                : 'bg-[#dcfce7] text-[#166534]'
                            }`}
                          >
                            {dog.status === 'adopted' ? 'Adopted ❤️' : 'Available'}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                          {dog.name}
                        </h3>
                        <p className="text-xs text-[#8a5b3a] font-semibold">{dog.breed}</p>
                        <p className="text-xs text-[#5e4537] line-clamp-3 bg-[#fbf6f0] p-2.5 rounded-xl">
                          {dog.story}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex gap-2">
                      <button
                        onClick={() => {
                          const newStatus = dog.status === 'adopted' ? 'available' : 'adopted';
                          onUpdateDog({ ...dog, status: newStatus });
                          if (newStatus === 'adopted') playSuccessChime();
                          showToast(`${dog.name} status updated to: ${newStatus}`);
                        }}
                        className="flex-1 bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] text-xs font-fredoka font-semibold py-2 rounded-xl"
                      >
                        {dog.status === 'adopted' ? 'Make Available' : 'Mark Adopted ❤️'}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Remove ${dog.name} from catalog?`)) {
                            onDeleteDog(dog.id);
                            showToast(`${dog.name} removed.`);
                          }
                        }}
                        className="p-2 rounded-xl bg-[#fee2e2] text-[#991b1b] hover:bg-[#fca5a5]"
                        title="Delete dog"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB: AUDIT & ACTIVITY LOG */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#ebd7c3] shadow-sm space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#ebd7c3] pb-4">
              <div className="flex items-center gap-2.5">
                <Activity className="w-6 h-6 text-[#4a2e1b]" />
                <div>
                  <h2 className="font-fredoka text-xl font-bold text-[#26160d]">
                    Live Audit & Real-Time Activity Log
                  </h2>
                  <p className="text-xs text-[#8a5b3a]">
                    Chronological audit trail of incoming user submissions and administrative actions
                  </p>
                </div>
              </div>
            </div>

            {activityLogs.length === 0 ? (
              <div className="text-center py-10 text-xs text-[#8a5b3a]">
                No logged activity yet. Submissions by users will be recorded here automatically.
              </div>
            ) : (
              <div className="space-y-3">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-[#fbf6f0] p-4 rounded-2xl border border-[#ebd7c3] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center font-bold">
                        📝
                      </div>
                      <div>
                        <div className="font-fredoka text-sm font-bold text-[#26160d]">
                          {log.action}
                        </div>
                        <div className="text-xs text-[#6b4c38]">{log.details}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xs text-[#8a5b3a] bg-white px-2.5 py-1 rounded-lg border border-[#ebd7c3]">
                        {log.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ==================================================== */}
      {/* FULL SUBMISSION DOSSIER MODAL */}
      {/* ==================================================== */}
      {selectedDossier && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#fbf6f0] rounded-3xl max-w-2xl w-full border-4 border-[#4a2e1b] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
            
            {/* Dossier Header */}
            <div className="bg-[#4a2e1b] text-white p-5 sm:p-6 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white text-[#4a2e1b] flex items-center justify-center font-bold text-lg">
                  📋
                </div>
                <div>
                  <h3 className="font-fredoka text-xl font-bold tracking-tight">
                    Submission Dossier: {selectedDossier.data.id || selectedDossier.data.name}
                  </h3>
                  <p className="text-xs text-[#f5d7b7]">
                    Full user submission payload & administrative dispatch controls
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDossier(null)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Dossier Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
              
              {/* Photo & Main Meta */}
              {selectedDossier.data.photoUrl && (
                <div className="h-64 rounded-2xl overflow-hidden border-2 border-[#ebd7c3] relative bg-[#faefe4]">
                  <img
                    src={selectedDossier.data.photoUrl}
                    alt="Evidence"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#4a2e1b]/80 backdrop-blur-md text-white text-xs font-fredoka px-3 py-1 rounded-full">
                    User Uploaded Attachment
                  </div>
                </div>
              )}

              {/* Title & Core Fields */}
              <div className="space-y-2">
                <h4 className="font-fredoka text-2xl font-bold text-[#26160d]">
                  {selectedDossier.data.title || selectedDossier.data.applicantName || selectedDossier.data.dogName || selectedDossier.data.callerName || selectedDossier.data.name}
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedDossier.data.urgency && (
                    <span className="bg-[#fee2e2] text-[#991b1b] font-fredoka font-bold px-3 py-1 rounded-full">
                      Urgency: {selectedDossier.data.urgency}
                    </span>
                  )}
                  {selectedDossier.data.status && (
                    <span className="bg-[#dcfce7] text-[#166534] font-fredoka font-bold px-3 py-1 rounded-full">
                      Status: {selectedDossier.data.status}
                    </span>
                  )}
                  {selectedDossier.data.reportedAt && (
                    <span className="bg-white border border-[#ebd7c3] text-[#8a5b3a] font-mono px-3 py-1 rounded-full">
                      Submitted: {selectedDossier.data.reportedAt}
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Card with 1-Click WhatsApp & Call */}
              {(selectedDossier.data.reporterPhone || selectedDossier.data.applicantPhone || selectedDossier.data.contactPhone || selectedDossier.data.phone) && (
                <div className="bg-white p-5 rounded-2xl border border-[#ebd7c3] space-y-3">
                  <div className="text-xs font-fredoka font-bold uppercase text-[#8a5b3a]">
                    Contact Communications Desk:
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-fredoka text-base font-bold text-[#26160d]">
                        {selectedDossier.data.reporter || selectedDossier.data.applicantName || selectedDossier.data.contactName || selectedDossier.data.callerName || selectedDossier.data.name}
                      </div>
                      <div className="font-mono text-xs text-[#8a5b3a]">
                        {selectedDossier.data.reporterPhone || selectedDossier.data.applicantPhone || selectedDossier.data.contactPhone || selectedDossier.data.phone}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={`tel:${selectedDossier.data.reporterPhone || selectedDossier.data.applicantPhone || selectedDossier.data.contactPhone || selectedDossier.data.phone}`}
                        className="bg-[#4a2e1b] hover:bg-[#352018] text-white text-xs font-fredoka font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>

                      <a
                        href={`https://wa.me/${(selectedDossier.data.reporterPhone || selectedDossier.data.applicantPhone || selectedDossier.data.contactPhone || selectedDossier.data.phone || '').replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-fredoka font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Location & GPS */}
              {(selectedDossier.data.location || selectedDossier.data.lastSeenLocation) && (
                <div className="bg-white p-4 rounded-2xl border border-[#ebd7c3] space-y-1 text-xs">
                  <div className="font-fredoka font-bold text-[#8a5b3a] uppercase">Incident Location:</div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-[#26160d]">
                    <MapPin className="w-4 h-4 text-[#ea8e24]" />
                    <span>{selectedDossier.data.location || selectedDossier.data.lastSeenLocation}</span>
                  </div>
                  {selectedDossier.data.landmark && (
                    <p className="text-[#6b4c38]">Landmark: {selectedDossier.data.landmark}</p>
                  )}
                  {selectedDossier.data.coordinates && (
                    <a
                      href={`https://www.google.com/maps?q=${selectedDossier.data.coordinates[0]},${selectedDossier.data.coordinates[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#b87d55] font-bold underline pt-1"
                    >
                      <span>Open in Google Maps ({selectedDossier.data.coordinates[0]}, {selectedDossier.data.coordinates[1]})</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

              {/* Description / Story / Notes */}
              {(selectedDossier.data.description || selectedDossier.data.notes || selectedDossier.data.details || selectedDossier.data.story || selectedDossier.data.experience) && (
                <div className="bg-white p-4 rounded-2xl border border-[#ebd7c3] space-y-1.5 text-xs">
                  <div className="font-fredoka font-bold text-[#8a5b3a] uppercase">Submitted Details & Narrative:</div>
                  <p className="text-sm text-[#5e4537] leading-relaxed whitespace-pre-line">
                    {selectedDossier.data.description || selectedDossier.data.notes || selectedDossier.data.details || selectedDossier.data.story || selectedDossier.data.experience}
                  </p>
                </div>
              )}

              {/* Timeline Updates Log (for Rescue Cases) */}
              {selectedDossier.data.updates && (
                <div className="bg-white p-5 rounded-2xl border border-[#ebd7c3] space-y-4">
                  <div className="font-fredoka font-bold text-[#26160d] text-sm uppercase">
                    Incident Dispatch Timeline & Updates:
                  </div>

                  <div className="space-y-3">
                    {selectedDossier.data.updates.map((up: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 text-xs">
                        <div className="w-2 h-2 rounded-full bg-[#4a2e1b] mt-1.5 flex-shrink-0"></div>
                        <div className="flex-1 bg-[#fbf6f0] p-3 rounded-xl border border-[#ebd7c3]/60">
                          <div className="flex items-center justify-between text-[10px] text-[#8a5b3a] font-bold mb-1">
                            <span>{up.author}</span>
                            <span>{up.time}</span>
                          </div>
                          <p className="text-[#352018]">{up.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add update input */}
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Add responder dispatch update..."
                      value={newTimelineNote}
                      onChange={(e) => setNewTimelineNote(e.target.value)}
                      className="flex-1 p-2.5 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-xs focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                    <button
                      onClick={() => handleAddTimelineNote(selectedDossier.data)}
                      className="bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka text-xs font-semibold px-4 py-2.5 rounded-xl"
                    >
                      Post Note
                    </button>
                  </div>
                </div>
              )}

              {/* Internal Admin Notes Box */}
              <div className="bg-[#faefe4] p-5 rounded-2xl border border-[#ebd7c3] space-y-3 text-xs">
                <div className="font-fredoka font-bold text-[#352018] text-sm uppercase">
                  Private Internal Admin Notes:
                </div>
                <textarea
                  rows={3}
                  placeholder="Record internal team observations, vet clinic coordinates, or volunteer notes..."
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-white text-xs focus:ring-2 focus:ring-[#4a2e1b]"
                ></textarea>
                <button
                  onClick={() => handleSaveAdminNote(selectedDossier.data, selectedDossier.type)}
                  className="bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka text-xs font-semibold px-5 py-2.5 rounded-xl"
                >
                  Save Internal Note
                </button>
              </div>

            </div>

            {/* Dossier Footer */}
            <div className="bg-white p-4 border-t border-[#ebd7c3] flex items-center justify-between flex-shrink-0">
              <button
                onClick={() => window.print()}
                className="bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Dossier</span>
              </button>

              <button
                onClick={() => setSelectedDossier(null)}
                className="bg-[#4a2e1b] text-white font-fredoka text-xs font-semibold px-6 py-2.5 rounded-xl shadow"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* ADD DOG MODAL */}
      {/* ==================================================== */}
      {isAddDogModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border-4 border-[#4a2e1b] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#ebd7c3] pb-3">
              <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                Add Adoptable Dog to Database
              </h3>
              <button onClick={() => setIsAddDogModalOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const newDog: AdoptableDog = {
                  id: `ADOPT-${Date.now()}`,
                  name: (form.elements.namedItem('name') as HTMLInputElement).value,
                  breed: (form.elements.namedItem('breed') as HTMLInputElement).value,
                  age: (form.elements.namedItem('age') as HTMLInputElement).value,
                  gender: (form.elements.namedItem('gender') as HTMLSelectElement).value as any,
                  size: 'Medium',
                  photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
                  personality: ['Gentle', 'Vaccinated', 'Friendly'],
                  story: (form.elements.namedItem('story') as HTMLTextAreaElement).value,
                  healthStatus: 'Vetted and Healthy',
                  isVaccinated: true,
                  isNeutered: true,
                  goodWithKids: true,
                  goodWithDogs: true,
                  goodWithCats: true,
                  rescueDate: 'Recent',
                  status: 'available',
                };
                onAddDog(newDog);
                setIsAddDogModalOpen(false);
                playSuccessChime();
                showToast(`Dog ${newDog.name} added to catalog.`);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-fredoka font-bold text-[#352018] mb-1">Dog Name *</label>
                <input name="name" required placeholder="e.g. Toby" className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-fredoka font-bold text-[#352018] mb-1">Breed *</label>
                  <input name="breed" required placeholder="e.g. Labrador Mix" className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm" />
                </div>
                <div>
                  <label className="block font-fredoka font-bold text-[#352018] mb-1">Age *</label>
                  <input name="age" required placeholder="e.g. 2 Years" className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm" />
                </div>
              </div>

              <div>
                <label className="block font-fredoka font-bold text-[#352018] mb-1">Gender</label>
                <select name="gender" className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm font-semibold">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block font-fredoka font-bold text-[#352018] mb-1">Rescue Story & Personality *</label>
                <textarea name="story" required rows={3} placeholder="Background, rescue notes, behavior..." className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm"></textarea>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddDogModalOpen(false)}
                  className="w-1/3 bg-[#faefe4] text-[#4a2e1b] font-fredoka font-semibold py-3 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold py-3 rounded-full shadow"
                >
                  Publish Dog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
