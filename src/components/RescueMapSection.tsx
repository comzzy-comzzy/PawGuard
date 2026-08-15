import React, { useState } from 'react';
import { RescueCase } from '../types';
import { ShieldAlert, MapPin, Clock, CheckCircle, Navigation, Radio, Share2, HeartHandshake, AlertCircle } from 'lucide-react';
import { playClickSound, playAlertSound } from '../utils/audio';

interface RescueMapSectionProps {
  cases: RescueCase[];
  onOpenReport: () => void;
  onUpdateCase: (updatedCase: RescueCase) => void;
}

export const RescueMapSection: React.FC<RescueMapSectionProps> = ({
  cases,
  onOpenReport,
  onUpdateCase,
}) => {
  const [selectedCase, setSelectedCase] = useState<RescueCase>(cases[0] || null);
  const [filterUrgency, setFilterUrgency] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [volunteerAccepted, setVolunteerAccepted] = useState<string | null>(null);

  const filteredCases = cases.filter((c) => {
    const matchUrgency = filterUrgency === 'all' || c.urgency === filterUrgency;
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchUrgency && matchSearch;
  });

  const handleVolunteer = (caseItem: RescueCase) => {
    playAlertSound();
    const updated: RescueCase = {
      ...caseItem,
      status: 'volunteer_en_route',
      assignedVolunteer: 'You (Volunteer Responder)',
      updates: [
        { time: 'Just now', text: 'You signed up to assist with this rescue mission. Dispatch instructions sent to your phone.', author: 'PawGuard HQ' },
        ...caseItem.updates,
      ],
    };
    onUpdateCase(updated);
    setSelectedCase(updated);
    setVolunteerAccepted(caseItem.id);

    setTimeout(() => setVolunteerAccepted(null), 4500);
  };

  const getUrgencyBadge = (urgency: RescueCase['urgency']) => {
    switch (urgency) {
      case 'critical':
        return <span className="bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5] text-[10px] font-fredoka font-bold px-2.5 py-0.5 rounded-full">Critical Danger</span>;
      case 'high':
        return <span className="bg-[#ffedd5] text-[#9a3412] border border-[#fdba74] text-[10px] font-fredoka font-bold px-2.5 py-0.5 rounded-full">High Urgency</span>;
      case 'moderate':
        return <span className="bg-[#dcfce7] text-[#166534] border border-[#86efac] text-[10px] font-fredoka font-bold px-2.5 py-0.5 rounded-full">In Progress</span>;
    }
  };

  const getStatusBadge = (status: RescueCase['status']) => {
    switch (status) {
      case 'reported':
        return <span className="bg-[#f3f4f6] text-[#374151] text-[11px] font-fredoka font-medium px-2.5 py-1 rounded-full">Searching Volunteers</span>;
      case 'volunteer_en_route':
        return <span className="bg-[#dbeafe] text-[#1e40af] text-[11px] font-fredoka font-medium px-2.5 py-1 rounded-full">Responder En Route</span>;
      case 'at_vet':
        return <span className="bg-[#fef3c7] text-[#92400e] text-[11px] font-fredoka font-medium px-2.5 py-1 rounded-full">Under Vet Care</span>;
      case 'rescued_safe':
        return <span className="bg-[#dcfce7] text-[#166534] text-[11px] font-fredoka font-medium px-2.5 py-1 rounded-full">Safe & Sheltered</span>;
      default:
        return null;
    }
  };

  return (
    <section id="rescue" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbf6f0] border-b border-[#eedccb]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e8d5c4] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-fredoka font-bold text-[#b87d55] uppercase tracking-wider">
              <Radio className="w-4 h-4 text-[#d94141]" />
              <span>Real-Time GPS Rescue Radar</span>
            </div>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26160d]">
              Find & Rescue Dogs in Danger
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6b4c38] max-w-2xl">
              Track reported dog abuse incidents, locate injured strays needing transport, and dispatch help to emergency cases near you.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playClickSound();
                onOpenReport();
              }}
              className="flex items-center gap-2 bg-[#d94141] hover:bg-[#b82e2e] text-white font-fredoka font-semibold text-sm px-6 py-3 rounded-full shadow hover:shadow-lg transition-all"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Report Dog in Danger</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-3 rounded-2xl border border-[#ebd7c3] shadow-sm">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by neighborhood, breed or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-[#faf4ed] border border-[#ebd7c3] text-[#352018] focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
            />
            <MapPin className="w-4 h-4 text-[#8a5b3a] absolute left-3 top-2.5" />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Cases' },
              { id: 'critical', label: 'Critical' },
              { id: 'high', label: 'High Urgency' },
              { id: 'moderate', label: 'Active' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  playClickSound();
                  setFilterUrgency(f.id);
                }}
                className={`font-fredoka text-xs px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  filterUrgency === f.id
                    ? 'bg-[#4a2e1b] text-white font-bold'
                    : 'bg-[#faefe4] text-[#6b442b] hover:bg-[#ebd7c3]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Cases List + Interactive Live Radar Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Cases Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4 max-h-[700px] overflow-y-auto pr-1">
            {filteredCases.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-[#ebd7c3] text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-[#b87d55] mx-auto opacity-70" />
                <p className="font-fredoka text-base font-bold text-[#352018]">No cases match this filter</p>
                <p className="text-xs text-[#7e5c46]">Try changing the urgency filter or clear your search term.</p>
              </div>
            ) : (
              filteredCases.map((c) => {
                const isSelected = selectedCase?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      playClickSound();
                      setSelectedCase(c);
                    }}
                    className={`cursor-pointer rounded-3xl p-5 border-2 transition-all duration-200 bg-white hover:shadow-md ${
                      isSelected
                        ? 'border-[#4a2e1b] shadow-lg ring-2 ring-[#4a2e1b]/10'
                        : 'border-[#ebd7c3] hover:border-[#b87d55]'
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-[#faefe4] border border-[#ebd7c3]">
                        <img
                          src={c.photoUrl}
                          alt={c.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[11px] font-mono font-bold text-[#8a5b3a]">{c.id}</span>
                          {getUrgencyBadge(c.urgency)}
                        </div>

                        <h4 className="font-fredoka text-sm font-bold text-[#352018] truncate">
                          {c.title}
                        </h4>

                        <div className="flex items-center gap-1.5 text-xs text-[#6e513e] truncate">
                          <MapPin className="w-3.5 h-3.5 text-[#b87d55] flex-shrink-0" />
                          <span className="truncate">{c.location}</span>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-[#f4ece1] text-[11px]">
                          <span className="text-[#8a6853] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {c.reportedAt}
                          </span>
                          <span className="font-semibold text-[#4a2e1b] bg-[#faefe4] px-2 py-0.5 rounded-md">
                            {c.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Live Rescue Inspector & Radar View (7 cols) */}
          <div className="lg:col-span-7">
            {selectedCase ? (
              <div className="bg-white rounded-3xl border-2 border-[#4a2e1b] shadow-xl p-6 sm:p-8 space-y-6">
                
                {/* Radar Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ebd7c3] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#8a5b3a] bg-[#faefe4] px-2 py-0.5 rounded border border-[#ebd7c3]">
                        {selectedCase.id}
                      </span>
                      {getUrgencyBadge(selectedCase.urgency)}
                      {getStatusBadge(selectedCase.status)}
                    </div>
                    <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-[#26160d]">
                      {selectedCase.title}
                    </h3>
                  </div>

                  {/* Share button */}
                  <button
                    onClick={() => {
                      playClickSound();
                      navigator.clipboard?.writeText(window.location.href);
                      alert('Rescue alert link copied to clipboard.');
                    }}
                    className="flex items-center gap-1.5 text-xs font-fredoka font-semibold text-[#4a2e1b] bg-[#faefe4] hover:bg-[#ebd7c3] px-3.5 py-2 rounded-full border border-[#ebd7c3] transition-colors self-start sm:self-auto"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Case</span>
                  </button>
                </div>

                {/* Radar Map Pin Display */}
                <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden terracotta-tile-grid border border-[#4a2e1b] shadow-inner flex items-center justify-center text-center p-4">
                  <div className="absolute inset-0 bg-black/20"></div>

                  <div className="relative z-10 space-y-2">
                    <div className="w-14 h-14 rounded-full bg-[#352018] border-2 border-white shadow-xl flex items-center justify-center text-white mx-auto">
                      <MapPin className="w-7 h-7 text-[#f5d7b7]" />
                    </div>
                    <div className="bg-[#352018]/90 text-white px-4 py-1.5 rounded-full text-xs font-fredoka shadow inline-block border border-white/20">
                      {selectedCase.location} ({selectedCase.distance})
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-2 bg-black/70 text-white/80 text-[10px] font-mono px-2 py-0.5 rounded">
                    GPS: {selectedCase.coordinates[0].toFixed(4)}, {selectedCase.coordinates[1].toFixed(4)}
                  </div>
                </div>

                {/* Case Description & Details */}
                <div className="space-y-2">
                  <h4 className="font-fredoka text-sm font-bold text-[#352018]">
                    Incident Report & Animal Condition:
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5e4537] leading-relaxed bg-[#fbf6f0] p-4 rounded-2xl border border-[#ebd7c3]">
                    {selectedCase.description}
                  </p>
                </div>

                {/* Reporter & Assigned Volunteer Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#faefe4] p-4 rounded-2xl border border-[#ebd7c3]">
                  <div>
                    <span className="text-[#8a5b3a] block font-semibold">Reported By:</span>
                    <span className="font-bold text-[#352018]">{selectedCase.reporter}</span>
                  </div>
                  <div>
                    <span className="text-[#8a5b3a] block font-semibold">Assigned Responder:</span>
                    <span className="font-bold text-[#352018]">
                      {selectedCase.assignedVolunteer || 'No volunteer assigned yet'}
                    </span>
                  </div>
                </div>

                {/* Timeline updates */}
                <div className="space-y-2">
                  <h4 className="font-fredoka text-xs font-bold uppercase tracking-wider text-[#8a5b3a]">
                    Mission Log:
                  </h4>
                  <div className="space-y-1.5">
                    {selectedCase.updates.map((u, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#5e4537] bg-white p-2.5 rounded-xl border border-[#ebd7c3]">
                        <span className="font-mono text-[10px] text-[#b87d55] font-bold mt-0.5 whitespace-nowrap">{u.time}</span>
                        <div className="flex-1">
                          <span className="font-semibold text-[#352018] mr-1.5">{u.author}:</span>
                          <span>{u.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Success message after volunteering */}
                {volunteerAccepted === selectedCase.id && (
                  <div className="bg-[#dcfce7] border border-[#86efac] text-[#166534] p-3.5 rounded-2xl text-xs font-fredoka font-semibold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle className="w-5 h-5 text-[#3aa866]" />
                    <span>You are assigned to this rescue mission. Dispatch coordinates have been transmitted.</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => handleVolunteer(selectedCase)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#3aa866] hover:bg-[#2e8a52] text-white font-fredoka font-semibold text-sm sm:text-base py-3.5 rounded-full shadow hover:shadow-lg transition-all"
                  >
                    <HeartHandshake className="w-5 h-5" />
                    <span>Volunteer for This Rescue</span>
                  </button>

                  <a
                    href={`https://maps.google.com/?q=${selectedCase.coordinates[0]},${selectedCase.coordinates[1]}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm px-6 py-3.5 rounded-full shadow transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </a>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 border border-[#ebd7c3] text-center text-[#7e5c46]">
                Select a rescue case from the left to inspect real-time radar data.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
