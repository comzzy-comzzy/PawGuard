import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, X, AlertTriangle, MessageCircle, Mail, ExternalLink, Siren, CheckCircle, Radio } from 'lucide-react';
import { CONTACT_INFO } from '../data/mockData';
import { EmergencyAlert } from '../types';
import { playAlertSound, playHeartPop, playClickSound } from '../utils/audio';

interface EmergencyHotlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReport: () => void;
  onAddEmergencyAlert?: (alert: EmergencyAlert) => void;
}

export const EmergencyHotlineModal: React.FC<EmergencyHotlineModalProps> = ({
  isOpen,
  onClose,
  onOpenReport,
  onAddEmergencyAlert,
}) => {
  const [activeTab, setActiveTab] = useState<'channels' | 'sos'>('channels');
  const [callerName, setCallerName] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [location, setLocation] = useState('');
  const [emergencyType, setEmergencyType] = useState<EmergencyAlert['emergencyType']>('Cruelty / Abuse in Progress');
  const [urgency, setUrgency] = useState<EmergencyAlert['urgency']>('Critical Emergency');
  const [notes, setNotes] = useState('');
  const [sosSent, setSosSent] = useState(false);

  if (!isOpen) return null;

  const handleSosSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playAlertSound();

    const newAlert: EmergencyAlert = {
      id: `SOS-${Math.floor(100 + Math.random() * 900)}`,
      callerName: callerName || 'Caller in Distress',
      phone: callerPhone,
      location: location || 'Incident scene',
      urgency,
      emergencyType,
      notes: notes || 'Immediate response requested.',
      submittedAt: new Date().toISOString(),
      status: 'active',
    };

    if (onAddEmergencyAlert) {
      onAddEmergencyAlert(newAlert);
    }
    setSosSent(true);
  };

  const resetSosForm = () => {
    setCallerName('');
    setCallerPhone('');
    setLocation('');
    setNotes('');
    setSosSent(false);
    setActiveTab('channels');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-[#fbf6f0] border-4 border-[#d94141] rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-[#d94141] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-[#d94141] flex items-center justify-center shadow">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-fredoka text-xl sm:text-2xl font-bold tracking-tight">
                Emergency Dog Help & Dispatch Desk
              </h2>
              <p className="text-xs text-[#fee2e2]">
                Direct Contact & Live SOS for Dogs in Danger, Abuse or Distress
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#faefe4] border-b border-[#ebd7c3] px-6 pt-3 gap-2">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('channels');
            }}
            className={`font-fredoka text-xs sm:text-sm px-4 py-2 rounded-t-xl transition-all ${
              activeTab === 'channels'
                ? 'bg-white text-[#4a2e1b] font-bold border-t-2 border-x-2 border-[#ebd7c3]'
                : 'text-[#6b4c38] hover:text-[#26160d]'
            }`}
          >
            Direct Channels
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('sos');
            }}
            className={`font-fredoka text-xs sm:text-sm px-4 py-2 rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'sos'
                ? 'bg-white text-[#d94141] font-bold border-t-2 border-x-2 border-[#ebd7c3]'
                : 'text-[#d94141] hover:text-[#991b1b]'
            }`}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Instant SOS Dispatch Alert</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {activeTab === 'channels' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Main Direct Channels */}
              <div className="space-y-3">
                <h3 className="font-fredoka text-xs font-bold uppercase tracking-wider text-[#8a5b3a]">
                  Direct Contact Channels:
                </h3>

                {/* WhatsApp Card */}
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#25D366]/40 hover:border-[#25D366] flex items-center justify-between gap-4 shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-6 h-6 text-[#128C7E]" />
                    </div>
                    <div>
                      <div className="font-fredoka text-base font-bold text-[#26160d]">
                        WhatsApp Emergency Desk
                      </div>
                      <div className="text-xs text-[#7e5c46]">
                        Click to open chat and send instant location or photos
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#25D366] text-white font-fredoka text-xs font-semibold px-4 py-2 rounded-xl shadow flex items-center gap-1 group-hover:bg-[#20ba59] transition-colors">
                    <span>Chat</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href={CONTACT_INFO.emailUrl}
                  className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#b87d55]/40 hover:border-[#4a2e1b] flex items-center justify-between gap-4 shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-6 h-6 text-[#4a2e1b]" />
                    </div>
                    <div>
                      <div className="font-fredoka text-base font-bold text-[#26160d]">
                        Email Support Desk
                      </div>
                      <div className="text-xs text-[#7e5c46]">
                        Click to send formal report or evidence files
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#4a2e1b] text-white font-fredoka text-xs font-semibold px-4 py-2 rounded-xl shadow flex items-center gap-1 group-hover:bg-[#352018] transition-colors">
                    <span>Email</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              </div>

              {/* Guidance */}
              <div className="bg-[#faefe4] p-4 rounded-2xl border border-[#ebd7c3] space-y-1 text-xs text-[#5e4537]">
                <h4 className="font-fredoka font-bold text-[#352018] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#b87d55]" />
                  <span>What to Do if You Witness Abuse:</span>
                </h4>
                <p className="text-[#6b4c38] leading-relaxed">
                  Do not put yourself in danger. Note the exact address, visual landmarks, take photos safely, and submit a report online or through our SOS dispatcher.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onOpenReport();
                  }}
                  className="w-full bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-xs sm:text-sm py-3 rounded-full shadow flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Full Abuse Report Form</span>
                </button>

                <button
                  onClick={() => setActiveTab('sos')}
                  className="w-full bg-[#d94141] hover:bg-[#b91c1c] text-white font-fredoka font-semibold text-xs sm:text-sm py-3 rounded-full shadow flex items-center justify-center gap-2"
                >
                  <Siren className="w-4 h-4" />
                  <span>Send SOS Alert to Admin</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'sos' && (
            <div className="space-y-4 animate-fadeIn">
              {sosSent ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#dcfce7] text-[#166534] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  <h4 className="font-fredoka text-2xl font-bold text-[#26160d]">
                    SOS Alert Dispatched to Admin!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5e4537] max-w-sm mx-auto">
                    Your urgent alert has popped up on the live PawGuard Admin Dashboard. An emergency triage responder will call or dispatch immediately.
                  </p>
                  <button
                    onClick={resetSosForm}
                    className="bg-[#4a2e1b] text-white font-fredoka text-xs sm:text-sm px-7 py-3 rounded-full shadow"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSosSubmit} className="space-y-3.5 text-xs">
                  <div className="bg-[#fee2e2] text-[#991b1b] p-3 rounded-xl border border-[#fca5a5] flex items-center gap-2 font-medium">
                    <Siren className="w-5 h-5 flex-shrink-0 animate-bounce" />
                    <span>This form sends an immediate high-priority alert to the Admin Dashboard.</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Hannah Wright"
                        value={callerName}
                        onChange={(e) => setCallerName(e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d94141]"
                      />
                    </div>
                    <div>
                      <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Phone Number for Callback *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +1 (555) 876-5432"
                        value={callerPhone}
                        onChange={(e) => setCallerPhone(e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d94141]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Incident Location / Landmark *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Old Factory Yard, 8th Avenue near bridge"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d94141]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Emergency Type</label>
                      <select
                        value={emergencyType}
                        onChange={(e) => setEmergencyType(e.target.value as any)}
                        className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d94141]"
                      >
                        <option value="Cruelty / Abuse in Progress">Cruelty / Abuse in Progress</option>
                        <option value="Severe Injury / Hit & Run">Severe Injury / Hit & Run</option>
                        <option value="Starvation / Trapped Dog">Starvation / Trapped Dog</option>
                        <option value="Other Emergency">Other Urgent Emergency</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Urgency Level</label>
                      <select
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value as any)}
                        className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-white text-sm font-bold text-[#d94141] focus:outline-none focus:ring-2 focus:ring-[#d94141]"
                      >
                        <option value="Critical Emergency">🚨 Critical Emergency (Immediate Danger)</option>
                        <option value="High Urgency">⚠️ High Urgency (Needs Today)</option>
                        <option value="Callback Request">📞 Callback Request</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">What is happening right now? *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Briefly describe the dog's condition, immediate danger, number of animals..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d94141]"
                    ></textarea>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('channels')}
                      className="w-1/3 bg-[#faefe4] text-[#4a2e1b] font-fredoka font-semibold py-3.5 rounded-full"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-[#d94141] hover:bg-[#b91c1c] text-white font-fredoka font-bold text-sm py-3.5 rounded-full shadow flex items-center justify-center gap-2"
                    >
                      <Siren className="w-4 h-4" />
                      <span>Transmit SOS to Admin Desk</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
