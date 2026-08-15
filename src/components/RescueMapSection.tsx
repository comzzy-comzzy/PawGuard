import React, { useState } from 'react';
import { RescueCase } from '../types';
import { ShieldAlert, MapPin, Clock, Navigation, Radio, Share2, AlertCircle, MessageCircle, Mail } from 'lucide-react';
import { playClickSound } from '../utils/audio';
import { CONTACT_INFO } from '../data/mockData';

interface RescueMapSectionProps {
  cases: RescueCase[];
  onOpenReport: () => void;
  onUpdateCase: (updatedCase: RescueCase) => void;
}

export const RescueMapSection: React.FC<RescueMapSectionProps> = ({
  cases,
  onOpenReport,
}) => {
  const [selectedCase, setSelectedCase] = useState<RescueCase | null>(cases[0] || null);
  const [filterUrgency, setFilterUrgency] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCases = cases.filter((c) => {
    const matchUrgency = filterUrgency === 'all' || c.urgency === filterUrgency;
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchUrgency && matchSearch;
  });

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
        return <span className="bg-[#f3f4f6] text-[#374151] text-[11px] font-fredoka font-medium px-2.5 py-1 rounded-full">Reported</span>;
      case 'volunteer_en_route':
        return <span className="bg-[#dbeafe] text-[#1e40af] text-[11px] font-fredoka font-medium px-2.5 py-1 rounded-full">Responder Assigned</span>;
      case 'at_vet':
        return <span className="bg-[#fef3c7] text-[#92400e] text-[11px] font-fredoka font-medium px-2.5 py-1 rounded-full">Under Medical Care</span>;
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
              <span>Location-Based Rescue Reports</span>
            </div>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26160d]">
              Find & Rescue Dogs in Danger
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6b4c38] max-w-2xl">
              Track reported dog abuse cases, review locations where animals require rescue, and communicate directly with our dispatch desk on WhatsApp or Email.
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
              placeholder="Search reports by location, type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-[#faf4ed] border border-[#ebd7c3] text-[#352018] focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
            />
            <MapPin className="w-4 h-4 text-[#8a5b3a] absolute left-3 top-2.5" />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Reports' },
              { id: 'critical', label: 'Critical' },
              { id: 'high', label: 'High Urgency' },
              { id: 'moderate', label: 'In Progress' },
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

        {/* Main Section */}
        {filteredCases.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-16 border-2 border-[#ebd7c3] text-center max-w-2xl mx-auto space-y-5 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8 text-[#b87d55]" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-fredoka text-2xl font-bold text-[#26160d]">
                No Rescue Cases Logged Yet
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#6b4c38] max-w-md mx-auto leading-relaxed">
                If you know of any dog being abused, harassed, starved, abandoned, or in life-threatening danger, submit a report or contact us directly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onOpenReport}
                className="w-full sm:w-auto bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow"
              >
                Submit a Report
              </button>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebd59] text-white font-fredoka font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message WhatsApp ({CONTACT_INFO.phone})</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Cases Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {filteredCases.map((c) => {
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
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-[#faefe4] border border-[#ebd7c3]">
                        <img
                          src={c.photoUrl}
                          alt={c.title}
                          className="w-full h-full object-cover"
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
                          {getStatusBadge(c.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Case Inspector (7 cols) */}
            <div className="lg:col-span-7">
              {selectedCase ? (
                <div className="bg-white rounded-3xl border-2 border-[#4a2e1b] shadow-xl p-6 sm:p-8 space-y-6">
                  
                  {/* Case Top Bar */}
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

                    <button
                      onClick={() => {
                        playClickSound();
                        navigator.clipboard?.writeText(window.location.href);
                        alert('Report link copied.');
                      }}
                      className="flex items-center gap-1.5 text-xs font-fredoka font-semibold text-[#4a2e1b] bg-[#faefe4] hover:bg-[#ebd7c3] px-3.5 py-2 rounded-full border border-[#ebd7c3] transition-colors self-start sm:self-auto"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <h4 className="font-fredoka text-sm font-bold text-[#352018]">
                      Report Details & Location:
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5e4537] leading-relaxed bg-[#fbf6f0] p-4 rounded-2xl border border-[#ebd7c3]">
                      {selectedCase.description}
                    </p>
                    <p className="text-xs text-[#6b4c38] font-medium">
                      <strong>Address:</strong> {selectedCase.location}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={CONTACT_INFO.getWhatsappReportUrl(selectedCase.id, selectedCase.type, selectedCase.location, selectedCase.description)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#1ebd59] text-white font-fredoka font-semibold text-xs sm:text-sm p-3.5 rounded-full shadow flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Message WhatsApp Dispatch</span>
                    </a>

                    <a
                      href={CONTACT_INFO.getEmailReportUrl(selectedCase.id, selectedCase.type, selectedCase.location, selectedCase.description)}
                      className="bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-xs sm:text-sm p-3.5 rounded-full shadow flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email Report Details</span>
                    </a>
                  </div>

                </div>
              ) : null}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
