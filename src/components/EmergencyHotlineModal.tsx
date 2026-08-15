import React from 'react';
import { PhoneCall, ShieldAlert, X, AlertTriangle, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { CONTACT_INFO } from '../data/mockData';

interface EmergencyHotlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReport: () => void;
}

export const EmergencyHotlineModal: React.FC<EmergencyHotlineModalProps> = ({
  isOpen,
  onClose,
  onOpenReport,
}) => {
  if (!isOpen) return null;

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
                Emergency Dog Help & Contact Desk
              </h2>
              <p className="text-xs text-[#fee2e2]">
                Direct Contact for Dogs in Severe Danger, Abuse or Distress
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

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
          
          {/* Main Direct Channels */}
          <div className="space-y-4">
            <h3 className="font-fredoka text-sm font-bold text-[#352018] uppercase tracking-wider text-[#8a5b3a]">
              Direct Contact Channels:
            </h3>

            {/* WhatsApp Card */}
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-5 rounded-2xl border-2 border-[#25D366]/40 hover:border-[#25D366] flex items-center justify-between gap-4 shadow-sm transition-all group"
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
              className="bg-white p-5 rounded-2xl border-2 border-[#b87d55]/40 hover:border-[#4a2e1b] flex items-center justify-between gap-4 shadow-sm transition-all group"
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

          {/* Emergency Guidance Protocol */}
          <div className="bg-[#faefe4] p-4 rounded-2xl border border-[#ebd7c3] space-y-2 text-xs text-[#5e4537]">
            <h4 className="font-fredoka font-bold text-[#352018] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#b87d55]" />
              <span>What to Do if You Witness Abuse:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-[#6b4c38] pl-1">
              <li><strong>Prioritize Safety:</strong> Do not put yourself in danger or confront aggressive abusers alone.</li>
              <li><strong>Note Key Information:</strong> Record the exact address, visual landmarks, and take photo evidence safely.</li>
              <li><strong>Reach Out:</strong> Send details directly via WhatsApp, Email, or use our online report tool.</li>
            </ol>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenReport();
              }}
              className="w-full bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm py-3 rounded-full shadow flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Fill Online Abuse Report Form</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
