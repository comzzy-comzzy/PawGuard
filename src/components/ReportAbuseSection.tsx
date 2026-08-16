import React, { useState } from 'react';
import { ShieldAlert, MapPin, Camera, AlertTriangle, CheckCircle, Navigation, Lock, Send, Info, Link as ChainIcon, AlertCircle, Package, HeartPulse, Flame, X, ArrowLeft } from 'lucide-react';
import { playAlertSound, playClickSound, playHeartPop } from '../utils/audio';
import { RescueCase } from '../types';

interface ReportAbuseSectionProps {
  onAddCase: (newCase: RescueCase) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const ReportAbuseSection: React.FC<ReportAbuseSectionProps> = ({
  onAddCase,
  onNavigateSection,
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
  const [submittedCase, setSubmittedCase] = useState<RescueCase | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  const abuseTypes: Array<{ type: RescueCase['type']; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }> = [
    { type: 'Abuse/Violence', label: 'Physical Abuse / Violence', desc: 'Direct beating, kicking, torture, or intentional physical harm', icon: ShieldAlert },
    { type: 'Severe Chaining', label: 'Continuous Chaining / Tethering', desc: 'Chained 24/7 on short tether without shelter or room to move', icon: ChainIcon },
    { type: 'Neglect/Starvation', label: 'Starvation & Severe Neglect', desc: 'Visible emaciation, denial of clean water, untreated wounds or sickness', icon: AlertCircle },
    { type: 'Abandoned', label: 'Abandonment / Desertion', desc: 'Left in empty house, dumped in box, or abandoned in woods or roadside', icon: Package },
    { type: 'Injured/Road Trauma', label: 'Injured / Hit & Run Stray', desc: 'Dog struck by vehicle, fractures, lacerations needing emergency care', icon: HeartPulse },
    { type: 'Dog Fighting', label: 'Dog Fighting / Bullying / Culling', desc: 'Suspected fighting ring, cruel harassment, or unlawful killing', icon: Flame },
  ];

  const handleUseGPS = () => {
    setGpsLoading(true);
    playClickSound();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLoading(false);
          setLocation(`GPS: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} (Current Location)`);
        },
        () => {
          setGpsLoading(false);
          setLocation('Location specified by reporter');
        }
      );
    } else {
      setTimeout(() => {
        setGpsLoading(false);
        setLocation('Location specified by reporter');
      }, 500);
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
      const newCase: RescueCase = {
        id: generatedId,
        title: `${abuseType}: ${dogBreed || 'Reported Dog'}`,
        type: abuseType,
        urgency: urgency,
        status: 'reported',
        location: location || 'Location details provided in report',
        landmark: landmark,
        coordinates: [40.7128 + (Math.random() - 0.5) * 0.05, -74.0060 + (Math.random() - 0.5) * 0.05],
        distance: 'Local Area',
        reportedAt: new Date().toISOString(),
        description: `${dogCondition}${landmark ? ` | Landmark: ${landmark}` : ''}`,
        dogName: 'Reported Dog',
        dogBreed: dogBreed || 'Dog in Need',
        photoUrl: evidencePreview || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
        reporter: isAnonymous ? 'Anonymous Reporter' : (reporterName || 'Community Member'),
        reporterPhone: isAnonymous ? undefined : reporterPhone,
        isAnonymous: isAnonymous,
        updates: [
          { time: new Date().toISOString(), text: `Report submitted by ${isAnonymous ? 'Anonymous Reporter' : (reporterName || 'Community Member')}. Ready for dispatch and verification.`, author: 'Dispatch System' }
        ]
      };

      setSubmittedCase(newCase);
      setIsSubmitting(false);
      setStep(3);
      onAddCase(newCase);
      playHeartPop();
    }, 800);
  };

  const handleReset = () => {
    setStep(1);
    setLocation('');
    setLandmark('');
    setDogBreed('');
    setDogCondition('');
    setEvidencePreview(null);
    setSubmittedCase(null);
  };

  return (
    <section id="report" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#fbf6f0]">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Back Navigation & Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigateSection('home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-fredoka font-bold text-[#8a5b3a] hover:text-[#4a2e1b] bg-[#faefe4] hover:bg-[#f2e2d2] px-4 py-2 rounded-full border border-[#ebd7c3] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home Overview</span>
          </button>

          <span className="text-xs font-fredoka font-semibold uppercase tracking-wider text-[#d94141] bg-[#fee2e2] px-3.5 py-1 rounded-full border border-[#fca5a5]">
            Abuse Incident Dispatch
          </span>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5] text-xs font-fredoka font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Official Cruelty & Rescue Dispatch</span>
          </div>

          <h1 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold text-[#26160d]">
            Report Dog Abuse or Danger
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#6b4c38] leading-relaxed">
            Report dogs being subjected to physical violence, continuous chaining, starvation, neglect, abandonment, or life-threatening distress.
          </p>
        </div>

        {/* Main Embedded Report Form */}
        <div className="bg-white border-2 border-[#4a2e1b] rounded-3xl shadow-xl overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-[#4a2e1b] text-white px-6 sm:px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#d94141] flex items-center justify-center text-white shadow">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-fredoka text-xl sm:text-2xl font-bold tracking-tight">
                  Incident Report Portal
                </h2>
                <p className="text-xs text-[#f5d7b7]">
                  Confidential & Direct Rescue Dispatch
                </p>
              </div>
            </div>

            {step !== 3 && (
              <span className="text-xs font-fredoka font-semibold bg-white/10 px-3 py-1 rounded-full text-[#fbf6f0]">
                Step {step} of 2
              </span>
            )}
          </div>

          {/* Step Progress Bar */}
          {step !== 3 && (
            <div className="px-6 sm:px-8 pt-4 pb-3 bg-[#faefe4] border-b border-[#ebd7c3] flex items-center justify-between text-xs font-fredoka font-semibold text-[#6b4c38]">
              <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#4a2e1b] font-bold' : 'opacity-50'}`}>
                <span className="w-5 h-5 rounded-full bg-[#4a2e1b] text-white flex items-center justify-center text-[10px]">1</span>
                <span>Incident & Location</span>
              </div>
              <div className="w-8 sm:w-20 h-[2px] bg-[#ebd7c3]"></div>
              <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#4a2e1b] font-bold' : 'opacity-50'}`}>
                <span className="w-5 h-5 rounded-full bg-[#4a2e1b] text-white flex items-center justify-center text-[10px]">2</span>
                <span>Evidence & Details</span>
              </div>
              <div className="w-8 sm:w-20 h-[2px] bg-[#ebd7c3]"></div>
              <div className="opacity-50 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#8a5b3a] text-white flex items-center justify-center text-[10px]">3</span>
                <span>Confirmation</span>
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            
            {step === 1 && (
              <div className="space-y-6">
                
                {/* Urgency Level Selector */}
                <div>
                  <label className="block font-fredoka text-sm font-bold text-[#352018] mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-[#d94141]" />
                    <span>Severity & Urgency Level</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'critical', label: 'Critical Danger', desc: 'Active violence or life threat', color: 'border-[#d94141] bg-[#fee2e2] text-[#991b1b]' },
                      { id: 'high', label: 'High Urgency', desc: 'Severe injury or starvation', color: 'border-[#ea8e24] bg-[#ffedd5] text-[#9a3412]' },
                      { id: 'moderate', label: 'Needs Rescue', desc: 'Welfare check or abandoned', color: 'border-[#3aa866] bg-[#dcfce7] text-[#166534]' },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setUrgency(lvl.id as RescueCase['urgency']);
                        }}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                          urgency === lvl.id ? `${lvl.color} shadow-md scale-[1.02]` : 'border-[#ebd7c3] bg-white opacity-75 hover:opacity-100'
                        }`}
                      >
                        <div className="font-fredoka text-xs sm:text-sm font-bold">{lvl.label}</div>
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
                    {abuseTypes.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <button
                          key={item.type}
                          type="button"
                          onClick={() => {
                            playClickSound();
                            setAbuseType(item.type);
                          }}
                          className={`p-3.5 rounded-2xl border-2 text-left flex items-start gap-3 transition-all ${
                            abuseType === item.type
                              ? 'border-[#4a2e1b] bg-[#faefe4] shadow-sm font-semibold'
                              : 'border-[#ebd7c3] bg-white hover:bg-[#faf4ed]'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-xl bg-[#fbe9dd] text-[#4a2e1b] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-fredoka text-xs sm:text-sm text-[#352018]">{item.label}</div>
                            <div className="text-[11px] text-[#6b4c38] leading-tight mt-0.5">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location Input */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-fredoka text-sm font-bold text-[#352018] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#b87d55]" />
                      <span>Exact Location or Street Address *</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleUseGPS}
                      disabled={gpsLoading}
                      className="text-xs font-fredoka font-semibold text-[#4a2e1b] hover:text-[#26160d] flex items-center gap-1 bg-[#faefe4] px-3 py-1 rounded-full border border-[#e5cfbd]"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>{gpsLoading ? 'Locating...' : 'Use Current GPS'}</span>
                    </button>
                  </div>
                  
                  <input
                    type="text"
                    required
                    placeholder="e.g. Street name, city, district, or building number"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#ebd7c3] bg-white text-[#352018] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  />

                  <input
                    type="text"
                    placeholder="Landmarks or access instructions (e.g. behind shop, near blue gate)"
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
                        alert('Please provide a location so responders can find the dog.');
                        return;
                      }
                      playClickSound();
                      setStep(2);
                    }}
                    className="w-full bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-base py-3.5 rounded-2xl shadow hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Continue to Evidence & Details</span>
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
                    placeholder="Estimated breed, color, or size (e.g. Brown Shepherd mix, Medium)"
                    value={dogBreed}
                    onChange={(e) => setDogBreed(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ebd7c3] bg-white text-[#352018] text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  />
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe the situation (e.g. Dog tied without water, visible injury, perpetrator actions...)"
                    value={dogCondition}
                    onChange={(e) => setDogCondition(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ebd7c3] bg-white text-[#352018] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  ></textarea>
                </div>

                {/* Evidence Upload Simulator */}
                <div>
                  <label className="block font-fredoka text-sm font-bold text-[#352018] mb-1.5 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-[#4a2e1b]" />
                    <span>Attach Photo or Video Evidence</span>
                  </label>
                  
                  <div className="border-2 border-dashed border-[#d5bba4] rounded-2xl p-4 bg-[#faefe4]/60 text-center hover:bg-[#faefe4] transition-colors relative">
                    {evidencePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={evidencePreview}
                          alt="Uploaded Evidence"
                          className="h-36 object-cover rounded-xl shadow border border-[#4a2e1b]"
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
                          Click to attach photo or evidence
                        </span>
                        <span className="text-xs text-[#7e5c46]">
                          Supports JPG, PNG, MP4
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
                <div className="p-4 rounded-2xl bg-[#faefe4] border border-[#ebd7c3] space-y-3">
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
                        placeholder="Your Name (Optional)"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-[#ebd7c3] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                      />
                      <input
                        type="text"
                        placeholder="Your Phone or Email (Optional)"
                        value={reporterPhone}
                        onChange={(e) => setReporterPhone(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-[#ebd7c3] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-[#7e5c46] italic flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-[#b87d55]" />
                      Your contact information will be completely hidden on the public platform.
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
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 bg-[#d94141] hover:bg-[#b82e2e] text-white font-fredoka font-semibold text-base py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Report...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Incident Report</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

            {step === 3 && submittedCase && (
              <div className="text-center py-6 space-y-6">
                
                <div className="w-20 h-20 rounded-full bg-[#3aa866]/20 text-[#3aa866] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 stroke-[2.5]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-fredoka font-semibold uppercase tracking-wider text-[#3aa866] bg-[#dcfce7] px-3 py-1 rounded-full border border-[#bbf7d0]">
                    Report Logged Successfully
                  </span>
                  <h3 className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26160d]">
                    Case #{submittedCase.id}
                  </h3>
                  <p className="text-sm text-[#7e5c46]">
                    Your report has been logged and published to the Find & Rescue dispatch board.
                  </p>
                </div>

                <div className="bg-[#faefe4] p-5 rounded-2xl border border-[#ebd7c3] text-left text-xs text-[#5e4537] space-y-2 shadow-sm max-w-md mx-auto">
                  <p><strong>Incident:</strong> {submittedCase.type}</p>
                  <p><strong>Location:</strong> {submittedCase.location}</p>
                  <p><strong>Urgency:</strong> {submittedCase.urgency.toUpperCase()}</p>
                  <p><strong>Status:</strong> Awaiting Responder Dispatch</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigateSection('rescue')}
                    className="bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm px-6 py-3 rounded-full shadow"
                  >
                    View on Find & Rescue Board
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka font-semibold text-sm px-6 py-3 rounded-full border border-[#ebd7c3]"
                  >
                    Report Another Incident
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Safety Protocol Note (Clean guidance without contact spam) */}
        <div className="bg-[#faefe4] p-5 rounded-3xl border border-[#ebd7c3] space-y-2 text-xs text-[#5e4537]">
          <h4 className="font-fredoka font-bold text-[#352018] text-sm flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#b87d55]" />
            <span>Safety Guidelines When Reporting Cruelty:</span>
          </h4>
          <ol className="list-decimal list-inside space-y-1.5 text-[#6b4c38] pl-1">
            <li><strong>Prioritize Safety:</strong> Do not put yourself in danger or confront aggressive perpetrators alone.</li>
            <li><strong>Document Safely:</strong> Record the exact address, visual landmarks, and take photo or video evidence safely.</li>
            <li><strong>Report Accurately:</strong> Fill out the incident form above with clear location and condition details to mobilize responders.</li>
          </ol>
        </div>

      </div>
    </section>
  );
};
