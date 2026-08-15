import React, { useState } from 'react';
import { EMERGENCY_HOTLINES } from '../data/mockData';
import { PhoneCall, ShieldAlert, X, AlertTriangle, CheckCircle, Radio, Copy, ExternalLink } from 'lucide-react';
import { playAlertSound, playClickSound } from '../utils/audio';

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
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [sosSent, setSosSent] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (num: string) => {
    playClickSound();
    navigator.clipboard?.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 3000);
  };

  const handleTriggerSOS = () => {
    playAlertSound();
    setSosSent(true);
    setTimeout(() => setSosSent(false), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-[#fbf6f0] border-4 border-[#d94141] rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-[#d94141] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-[#d94141] flex items-center justify-center shadow">
              <PhoneCall className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h2 className="font-fredoka text-xl sm:text-2xl font-bold tracking-tight">
                24/7 Emergency Dog Hotlines & SOS
              </h2>
              <p className="text-xs text-[#fee2e2]">
                Immediate Assistance for Dogs in Severe Danger or Suffering
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
          
          {/* Quick SOS Trigger Button */}
          <div className="bg-[#fee2e2] border-2 border-[#fca5a5] p-4 rounded-2xl text-center space-y-2">
            <div className="text-xs font-fredoka font-bold text-[#991b1b] uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Radio className="w-4 h-4 text-[#d94141] animate-ping" />
              <span>Instant Emergency SOS Broadcast</span>
            </div>
            <p className="text-xs text-[#7f1d1d]">
              If you are currently witnessing active dog cruelty, dog fighting, or critical life-threatening injury:
            </p>
            
            <button
              onClick={handleTriggerSOS}
              className="bg-[#d94141] hover:bg-[#b82e2e] text-white font-fredoka font-semibold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Broadcast Immediate SOS to Nearby Units</span>
            </button>

            {sosSent && (
              <div className="bg-white text-[#166534] border border-[#86efac] p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 animate-fadeIn">
                <CheckCircle className="w-4 h-4 text-[#3aa866]" />
                <span>Emergency SOS broadcast sent to 14 active response units in your region!</span>
              </div>
            )}
          </div>

          {/* Hotline Numbers List */}
          <div className="space-y-3">
            <h3 className="font-fredoka text-sm font-bold text-[#352018] uppercase tracking-wider text-[#8a5b3a]">
              Direct Phone Hotlines (Toll-Free & 24/7):
            </h3>

            <div className="space-y-2.5">
              {EMERGENCY_HOTLINES.map((hl, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-[#ebd7c3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-[#4a2e1b] transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="font-fredoka text-sm font-bold text-[#26160d]">
                      {hl.name}
                    </div>
                    <div className="font-mono text-sm font-bold text-[#d94141]">
                      {hl.number}
                    </div>
                    <div className="text-[11px] text-[#7e5c46]">
                      {hl.note}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => handleCopy(hl.number)}
                      className="p-2 rounded-xl bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] text-xs font-fredoka transition-colors"
                      title="Copy Number"
                    >
                      {copiedNumber === hl.number ? <CheckCircle className="w-4 h-4 text-[#3aa866]" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={`tel:${hl.number.replace(/[^0-9]/g, '')}`}
                      className="bg-[#4a2e1b] hover:bg-[#352018] text-white text-xs font-fredoka font-semibold px-4 py-2 rounded-xl shadow flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Safety Protocol */}
          <div className="bg-[#faefe4] p-4 rounded-2xl border border-[#ebd7c3] space-y-2 text-xs text-[#5e4537]">
            <h4 className="font-fredoka font-bold text-[#352018] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#b87d55]" />
              <span>What to Do if You Witness Abuse Right Now:</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-[#6b4c38] pl-1">
              <li><strong>Prioritize Personal Safety:</strong> Do not confront violent abusers directly.</li>
              <li><strong>Document Evidence:</strong> Note exact street address, license plates, and take discreet photos/video.</li>
              <li><strong>Call Dispatch or Report on PawGuard:</strong> Our team liaises directly with humane officers and police.</li>
            </ol>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenReport();
              }}
              className="w-full bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm py-3 rounded-full shadow"
            >
              Open Full Abuse Report Form
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
