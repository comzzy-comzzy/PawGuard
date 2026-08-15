import React, { useState } from 'react';
import { X, ShieldAlert, MapPin, Camera, AlertTriangle, CheckCircle, Navigation, Lock, Send, Info } from 'lucide-react';
import { playAlertSound, playClickSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { RescueCase } from '../types';

interface AbuseReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCase: (newCase: RescueCase) => void;
}

export const AbuseReportModal: React.FC<AbuseReportModalProps> = ({
  isOpen,
  onClose,
  onAddCase,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [abuseType, setAbuseType] = useState<RescueCase['type']>('Abuse/Violence');
  const [urgency, setUrgency] = useState<RescueCase['urgency']>('critical');
  const [location, setLocation] = useState('');
  const [landmark, setLandmark] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogCondition, setDogCondition] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [evidencePreview, setEvidencePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  if (!isOpen) return null;

  const abuseTypes: Array<{ type: RescueCase['type']; label: string; desc: string; icon: string }> = [
    { type: 'Abuse/Violence', label: 'Physical Abuse / Violence', desc: 'Direct beating, kicking, torture, or intentional physical violence', icon: '🚨' },
    { type: 'Severe Chaining', label: 'Continuous Chaining / Tethering', desc: 'Chained 24/7 on short tether without room to move or adequate shelter', icon: '⛓️' },
    { type: 'Neglect/Starvation', label: 'Starvation & Severe Neglect', desc: 'Visible ribs/spine, denial of clean water, severe untreated mange or sickness', icon: '💔' },
    { type: 'Abandoned', label: 'Abandonment / Desertion', desc: 'Left in empty house, dumped in box, or abandoned in woods/alleyway', icon: '📦' },
    { type: 'Injured/Road Trauma', label: 'Injured / Hit & Run Stray', desc: 'Dog struck by vehicle, fractures, severe lacerations needing emergency vet care', icon: '🩹' },
    { type: 'Dog Fighting', label: 'Dog Fighting / Baiting / Culling', desc: 'Suspected dog fighting ring, illegal cullers, or abusive baiting operations', icon: '⚔️' },
  ];

  const handleUseGPS = () => {
    setGpsLoading(true);
    playClickSound();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLoading(false);
          setLocation(`GPS: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} (Near Current Location)`);
        },
        () => {
          setGpsLoading(false);
          setLocation('Near Central Ave & 5th St, Metro District');
        }
      );
    } else {
      setTimeout(() => {
        setGpsLoading(false);
        setLocation('742 Evergreen Terrace, North District');
      }, 600);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEvidencePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playAlertSound();

    setTimeout(() => {
      const generatedId = `PG-RESCUE-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedCaseId(generatedId);
      setIsSubmitting(false);
      setStep(3);

      const newCase: RescueCase = {
        id: generatedId,
        title: `${abuseType}: ${dogBreed || 'Reported Dog'} in urgent danger`,
        type: abuseType,
        urgency: urgency,
        status: 'reported',
        location: location || 'Location Reported via Emergency SOS',
        coordinates: [40.7128 + (Math.random() - 0.5) * 0.05, -74.0060 + (Math.random() - 0.5) * 0.05],
        distance: '0.8 km away',
        reportedAt: 'Just now',
        description: `${dogCondition} | Landmark: ${landmark || 'Not specified'}`,
        dogName: 'Reported Pup',
        dogBreed: dogBreed || 'Canine',
        photoUrl: evidencePreview || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
        reporter: isAnonymous ? 'Anonymous Good Samaritan' : (reporterName || 'Concerned Citizen'),
        updates: [
          { time: 'Just now', text: 'Report submitted with evidence. Automated emergency dispatch broadcasted to 12 nearby volunteers.', author: 'Dispatch System' }
        ]
      };

      onAddCase(newCase);

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#b87d55', '#4a2e1b', '#3d97ca', '#3aa866']
      });
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setLocation('');
    setLandmark('');
    setDogBreed('');
    setDogCondition('');
    setEvidencePreview(null);
    setSubmittedCaseId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-[#fbf6f0] border-2 border-[#4a2e1b] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative">
        
        {/* Modal Header */}
        <div className="bg-[#4a2e1b] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d94141] flex items-center justify-center text-white shadow">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="font-fredoka text-xl sm:text-2xl font-bold tracking-tight">
                Report Dog Abuse or Danger
              </h2>
              <p className="text-xs text-[#f5d7b7]">
                Official PawGuard Emergency Cruelty & Rescue Dispatch
              </p>
            </div>
          </div>
          
          <button
            onClick={handleReset}
            className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 3 && (
          <div className="px-6 pt-4 pb-2 bg-[#faefe4] border-b border-[#ebd7c3] flex items-center justify-between text-xs font-fredoka font-semibold text-[#6b442b]">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#4a2e1b] font-bold' : 'opacity-50'}`}>
              <span className="w-5 h-5 rounded-full bg-[#4a2e1b] text-white flex items-center justify-center text-[10px]">1</span>
              <span>Incident & Location</span>
            </div>
            <div className="w-8 h-[2px] bg-[#ebd7c3]"></div>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#4a2e1b] font-bold' : 'opacity-50'}`}>
              <span className="w-5 h-5 rounded-full bg-[#4a2e1b] text-white flex items-center justify-center text-[10px]">2</span>
              <span>Evidence & Witness</span>
            </div>
            <div className="w-8 h-[2px] bg-[#ebd7c3]"></div>
            <div className="opacity-50 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#8a5b3a] text-white flex items-center justify-center text-[10px]">3</span>
              <span>Dispatch Confirmation</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {step === 1 && (
            <div className="space-y-6">
              
              {/* Urgency Level Selector */}
              <div>
                <label className="block font-fredoka text-sm font-bold text-[#352018] mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#d94141]" />
                  <span>Severity & Urgency Level</span>
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'critical', label: 'Critical Danger', desc: 'Active violence / Life threat', color: 'border-[#d94141] bg-[#fee2e2] text-[#991b1b]' },
                    { id: 'high', label: 'High Urgency', desc: 'Severe injury / Starvation', color: 'border-[#ea8e24] bg-[#ffedd5] text-[#9a3412]' },
                    { id: 'moderate', label: 'Needs Rescue', desc: 'Welfare check / Abandoned', color: 'border-[#3aa866] bg-[#dcfce7] text-[#166534]' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setUrgency(lvl.id as RescueCase['urgency']);
                      }}
                      className={`p-3 rounded-2xl border-2 text-left transition-all ${
                        urgency === lvl.id ? `${lvl.color} shadow-md scale-[1.02]` : 'border-[#ebd7c3] bg-white opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="font-fredoka text-xs font-bold">{lvl.label}</div>
                      <div className="text-[10px] mt-0.5 opacity-90">{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Abuse Category */}
              <div>
                <label className="block font-fredoka text-sm font-bold text-[#352018] mb-2">
                  Select Incident Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {abuseTypes.map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setAbuseType(item.type);
                      }}
                      className={`p-3 rounded-2xl border-2 text-left flex items-start gap-3 transition-all ${
                        abuseType === item.type
                          ? 'border-[#4a2e1b] bg-[#faefe4] shadow-sm font-semibold'
                          : 'border-[#ebd7c3] bg-white hover:bg-[#faf4ed]'
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-fredoka text-xs sm:text-sm text-[#352018]">{item.label}</div>
                        <div className="text-[11px] text-[#6b4c38] leading-tight mt-0.5">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-fredoka text-sm font-bold text-[#352018] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#b87d55]" />
                    <span>Exact Location / Street Address *</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleUseGPS}
                    disabled={gpsLoading}
                    className="text-xs font-fredoka font-semibold text-[#4a2e1b] hover:text-[#26160d] flex items-center gap-1 bg-[#faefe4] px-2.5 py-1 rounded-full border border-[#e5cfbd]"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>{gpsLoading ? 'Locating...' : 'Use Current GPS'}</span>
                  </button>
                </div>
                
                <input
                  type="text"
                  required
                  placeholder="e.g. 742 Evergreen Terrace, near construction gate"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#ebd7c3] bg-white text-[#352018] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                />

                <input
                  type="text"
                  placeholder="Landmarks / Access instructions (e.g. chained behind red shed in backyard)"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ebd7c3] bg-white text-[#352018] text-xs focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                />
              </div>

              {/* Continue to Step 2 Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!location.trim()) {
                      alert('Please provide a location so rescuers can find the dog.');
                      return;
                    }
                    playClickSound();
                    setStep(2);
                  }}
                  className="w-full bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-base py-3.5 rounded-2xl shadow hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue to Evidence & Witness Details →</span>
                </button>
              </div>

            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Dog description */}
              <div>
                <label className="block font-fredoka text-sm font-bold text-[#352018] mb-1.5">
                  Dog Appearance & Condition Description *
                </label>
                <input
                  type="text"
                  placeholder="Estimated breed / size / color (e.g. Small white poodle puppy or Medium brown hound)"
                  value={dogBreed}
                  onChange={(e) => setDogBreed(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ebd7c3] bg-white text-[#352018] text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Describe what you witnessed (e.g. Dog has been crying for hours, no water, perpetrator struck the dog with a stick, open wound on left leg...)"
                  value={dogCondition}
                  onChange={(e) => setDogCondition(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#ebd7c3] bg-white text-[#352018] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                ></textarea>
              </div>

              {/* Evidence Upload Simulator */}
              <div>
                <label className="block font-fredoka text-sm font-bold text-[#352018] mb-1.5 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#4a2e1b]" />
                  <span>Attach Photo or Video Evidence (Crucial for Law Enforcement)</span>
                </label>
                
                <div className="border-2 border-dashed border-[#d5bba4] rounded-2xl p-4 bg-[#faefe4]/60 text-center hover:bg-[#faefe4] transition-colors relative">
                  {evidencePreview ? (
                    <div className="relative inline-block">
                      <img
                        src={evidencePreview}
                        alt="Uploaded Evidence"
                        className="h-32 object-cover rounded-xl shadow border border-[#4a2e1b]"
                      />
                      <button
                        type="button"
                        onClick={() => setEvidencePreview(null)}
                        className="absolute -top-2 -right-2 bg-[#d94141] text-white rounded-full p-1 shadow"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-4">
                      <Camera className="w-8 h-8 text-[#8a5b3a] mx-auto mb-1.5" />
                      <span className="font-fredoka text-sm text-[#4a2e1b] font-semibold block">
                        Click to upload photo or take picture
                      </span>
                      <span className="text-xs text-[#7e5c46]">
                        Supports JPG, PNG, MP4 up to 50MB (Timestamp auto-recorded)
                      </span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Reporter Information & Anonymous Option */}
              <div className="p-4 rounded-2xl bg-white border border-[#ebd7c3] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#4a2e1b]" />
                    <span className="font-fredoka text-sm font-bold text-[#352018]">
                      Reporter Identity Protection
                    </span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#4a2e1b]">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded text-[#4a2e1b] focus:ring-[#4a2e1b] w-4 h-4"
                    />
                    <span>Submit Anonymously</span>
                  </label>
                </div>

                {!isAnonymous ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-[#ebd7c3] text-xs focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                    <input
                      type="tel"
                      placeholder="Your Phone (for rescue verification)"
                      value={reporterPhone}
                      onChange={(e) => setReporterPhone(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-[#ebd7c3] text-xs focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                ) : (
                  <p className="text-xs text-[#7e5c46] italic flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#b87d55]" />
                    Your contact info is completely hidden. The report will be dispatched with anonymous protection.
                  </p>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka font-semibold text-sm py-3.5 rounded-2xl transition-all"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 bg-[#d94141] hover:bg-[#b82e2e] text-white font-fredoka font-semibold text-base py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Dispatching Emergency Alert...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Emergency Report Now</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-6">
              
              <div className="w-20 h-20 rounded-full bg-[#3aa866]/20 text-[#3aa866] flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-12 h-12 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-fredoka font-semibold uppercase tracking-wider text-[#3aa866] bg-[#dcfce7] px-3 py-1 rounded-full border border-[#bbf7d0]">
                  Emergency Alert Broadcasted
                </span>
                <h3 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26160d]">
                  Rescue Ticket Generated!
                </h3>
                <p className="text-sm font-semibold text-[#8a5b3a]">
                  Case ID: <span className="text-[#4a2e1b] font-mono text-base font-bold bg-white px-2 py-0.5 rounded border border-[#ebd7c3]">{submittedCaseId}</span>
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#ebd7c3] text-left text-xs text-[#5e4537] space-y-2.5 max-w-lg mx-auto shadow-inner">
                <div className="flex items-center gap-2 text-[#3aa866] font-bold text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#3aa866] animate-ping"></div>
                  <span>14 Registered Volunteers & Shelters Alerted</span>
                </div>
                <p>📍 <strong>Target Location:</strong> {location}</p>
                <p>🚨 <strong>Severity:</strong> {urgency.toUpperCase()} - {abuseType}</p>
                <p>🛡️ <strong>Status:</strong> Immediate volunteer assignment in progress. Our dispatch center has alerted field rescue units.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm px-6 py-3.5 rounded-full shadow transition-all flex-1"
                >
                  Done & View Rescue Radar
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
