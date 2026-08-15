import React, { useState } from 'react';
import { Heart, ShieldCheck, Stethoscope, Utensils, Home, Copy, Check, Coins, Gift, ArrowLeft, Activity, Pill, Sparkles, Syringe } from 'lucide-react';
import { playHeartPop, playClickSound } from '../utils/audio';
import { DONATION_WALLETS } from '../data/mockData';

interface SupportSectionProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const SupportSection: React.FC<SupportSectionProps> = ({ onNavigateSection }) => {
  const [activeTab, setActiveTab] = useState<'causes' | 'wallets'>('causes');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const medicalCauses = [
    {
      id: 'surgery',
      label: 'Trauma & Orthopedic Surgery',
      tagline: 'Emergency Operating Theater Fund',
      desc: 'Funds surgical anesthesia, fracture plating, bone pinning, and deep wound debridement for dogs surviving hit-and-runs or severe beatings.',
      impact: 'Covers emergency surgical fees, sterile operating room consumables, and orthopedic pins.',
      icon: Stethoscope,
      badge: 'Critical Surgeries'
    },
    {
      id: 'icu',
      label: 'Intensive Clinical & Infection Care',
      tagline: '24/7 Veterinary Hospitalization',
      desc: 'Directly supports continuous IV fluid therapy, parvovirus/distemper antivirals, blood transfusions, and intensive ICU oxygen monitoring.',
      impact: 'Sponsors emergency diagnostic blood panels, catheterization, and round-the-clock hospital care.',
      icon: Activity,
      badge: 'Emergency ICU'
    },
    {
      id: 'nutrition',
      label: 'Clinical Malnutrition & Refeeding',
      tagline: 'Starvation Recovery Protocols',
      desc: 'Provides specialized gastrointestinal clinical paste, electrolyte stabilizers, recovery broths, and high-potency vitamin injectables for emaciated rescues.',
      impact: 'Supplies therapeutic clinical food rations, liver support supplements, and gut flora restorative medicine.',
      icon: Utensils,
      badge: 'Nutritional Triage'
    },
    {
      id: 'postop',
      label: 'Post-Op Foster & Medical Supplies',
      tagline: 'Rehabilitation & Wound Care',
      desc: 'Equips medical foster homes with sterile gauze, antimicrobial wound spray, orthopedic thermal bedding, recovery collars, and mobility harnesses.',
      impact: 'Provides daily bandage changes, topical antiseptics, physical rehabilitation aids, and safe recovery crates.',
      icon: Home,
      badge: 'Recovery Supplies'
    },
  ];

  const getCauseDetails = (label: string | null) => {
    switch (label) {
      case 'Trauma & Orthopedic Surgery':
        return {
          title: 'Sponsoring Emergency Orthopedic & Trauma Surgery',
          statement: 'Your contribution is designated for life-saving operating theater procedures, anesthesia monitoring, fracture repair, and intensive pain relief.',
          allocation: 'Operating room consumables, surgeon triage, surgical plates, and anesthesia.'
        };
      case 'Intensive Clinical & Infection Care':
        return {
          title: 'Sponsoring Veterinary ICU & Infection Treatments',
          statement: 'Your contribution directly funds emergency blood tests, IV drip therapy, antiviral treatments for infectious diseases, and 24/7 clinic hospitalization.',
          allocation: 'IV catheters, electrolytes, broad-spectrum antibiotics, and diagnostic blood panels.'
        };
      case 'Clinical Malnutrition & Refeeding':
        return {
          title: 'Sponsoring Clinical Starvation & Organ Recovery',
          statement: 'Your contribution funds specialized clinical veterinary formulas, organ-protective supplements, and careful refeeding protocols for severely emaciated dogs.',
          allocation: 'Therapeutic recovery paste, vitamin complexes, liver protectants, and digestive enzymes.'
        };
      case 'Post-Op Foster & Medical Supplies':
        return {
          title: 'Sponsoring Post-Surgical Rehabilitation & Wound Care',
          statement: 'Your contribution delivers essential sterile dressings, orthopedic thermal bedding, and post-op wound medications to volunteer medical foster homes.',
          allocation: 'Sterile bandages, antiseptic sprays, mobility harnesses, and recovery equipment.'
        };
      default:
        return {
          title: 'Sponsoring Comprehensive Veterinary Medical Aid',
          statement: 'Your contribution provides immediate emergency medical triage, specialized surgery, prescription pharmaceuticals, and clinical recovery for dogs in peril.',
          allocation: 'Emergency veterinary surgeries, clinical diagnostics, pain management, and medical supplies.'
        };
    }
  };

  const handleOpenWalletsForCause = (category: string) => {
    playHeartPop();
    setSelectedCategory(category);
    setActiveTab('wallets');
  };

  const handleCopy = (key: string, text: string) => {
    playClickSound();
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const cryptoList = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      designation: 'Surgical Operations & Hospitalization Fund',
      network: 'Bitcoin Network',
      address: DONATION_WALLETS.btc,
      key: 'btc',
      iconColor: 'bg-[#f7931a] text-white',
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      designation: 'ICU Medical Diagnostics & Blood Panels',
      network: 'Ethereum (ERC-20)',
      address: DONATION_WALLETS.eth,
      key: 'eth',
      iconColor: 'bg-[#627eea] text-white',
    },
    {
      name: 'BNB Chain',
      symbol: 'BNB',
      designation: 'Emergency Pharmaceuticals & Wound Supplies',
      network: 'BNB Smart Chain (BEP-20)',
      address: DONATION_WALLETS.bnb,
      key: 'bnb',
      iconColor: 'bg-[#f3ba2f] text-black',
    },
  ];

  const currentCauseInfo = getCauseDetails(selectedCategory);

  return (
    <section id="support" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#faefe4]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Breadcrumb */}
        {onNavigateSection && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigateSection('home')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-fredoka font-bold text-[#8a5b3a] hover:text-[#4a2e1b] bg-white hover:bg-[#fbf6f0] px-4 py-2 rounded-full border border-[#ebd7c3] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home Overview</span>
            </button>

            <span className="text-xs font-fredoka font-semibold uppercase tracking-wider text-[#b87d55] bg-white px-3.5 py-1 rounded-full border border-[#e5cfbd]">
              Veterinary Medical Support
            </span>
          </div>
        )}

        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-white text-[#8a5b3a] border border-[#e5cfbd] text-xs font-fredoka font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            <Stethoscope className="w-3.5 h-3.5 text-[#d94141]" />
            <span>Veterinary Medical Fund</span>
          </div>

          <h1 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold text-[#26160d]">
            Fund Emergency Veterinary Medical Care
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#6b4c38] leading-relaxed">
            Rescued dogs often arrive with acute trauma, untreated fractures, severe starvation, or life-threatening infections. Your sponsorship directly finances surgeries, prescription medications, and intensive clinical hospitalization.
          </p>

          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('causes');
              }}
              className={`font-fredoka text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all ${
                activeTab === 'causes'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3]'
              }`}
            >
              Medical Initiatives
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('wallets');
              }}
              className={`flex items-center gap-1.5 font-fredoka text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all ${
                activeTab === 'wallets'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3]'
              }`}
            >
              <Coins className="w-4 h-4 text-[#f5d7b7]" />
              <span>Medical Support Wallets</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Medical Causes Grid */}
        {activeTab === 'causes' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Medical Impact Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {medicalCauses.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="bg-white rounded-3xl p-6 border-2 border-[#ebd7c3] hover:border-[#4a2e1b] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-[#faefe4] group-hover:bg-[#f8dfc7] text-[#4a2e1b] flex items-center justify-center transition-colors">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-fredoka font-bold uppercase tracking-wider text-[#8a5b3a] bg-[#faefe4] px-2.5 py-1 rounded-full">
                          {cat.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-fredoka text-base font-bold text-[#352018]">
                          {cat.label}
                        </h3>
                        <p className="text-[11px] font-medium text-[#8a5b3a]">{cat.tagline}</p>
                      </div>

                      <p className="text-xs text-[#6e513e] leading-relaxed">
                        {cat.desc}
                      </p>

                      <div className="bg-[#fbf6f0] p-3 rounded-xl border border-[#ebd7c3] text-[11px] text-[#5e4537]">
                        <strong className="text-[#352018]">Direct Impact:</strong> {cat.impact}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenWalletsForCause(cat.label)}
                      className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka font-semibold text-xs py-3 rounded-full transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Gift className="w-3.5 h-3.5 text-[#b87d55]" />
                      <span>Sponsor this Treatment →</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Medical Breakdown Summary Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#ebd7c3] shadow-sm">
              <h3 className="font-fredoka text-xl font-bold text-[#26160d] mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#d94141]" />
                <span>How Veterinary Contributions Are Utilized:</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#faefe4] border border-[#ebd7c3] space-y-1.5">
                  <div className="font-fredoka font-bold text-[#352018] flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-[#d94141]" />
                    <span>Emergency Surgery</span>
                  </div>
                  <p className="text-[#6b4c38]">Orthopedic pinning, hernia repair, laparotomy, and trauma wound suturing.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faefe4] border border-[#ebd7c3] space-y-1.5">
                  <div className="font-fredoka font-bold text-[#352018] flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-[#3aa866]" />
                    <span>Pharmaceuticals</span>
                  </div>
                  <p className="text-[#6b4c38]">Analgesic pain control, broad-spectrum antibiotics, and anti-inflammatory therapy.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faefe4] border border-[#ebd7c3] space-y-1.5">
                  <div className="font-fredoka font-bold text-[#352018] flex items-center gap-1.5">
                    <Syringe className="w-4 h-4 text-[#3d97ca]" />
                    <span>Diagnostic Panels</span>
                  </div>
                  <p className="text-[#6b4c38]">X-rays, blood biochemistry, parvovirus/distemper testing, and ultrasound.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#faefe4] border border-[#ebd7c3] space-y-1.5">
                  <div className="font-fredoka font-bold text-[#352018] flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-[#8a4ea8]" />
                    <span>Clinical ICU Care</span>
                  </div>
                  <p className="text-[#6b4c38]">Oxygen therapy, IV catheterization, specialized recovery diets, and daily medical monitoring.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Embedded Crypto Donation Wallets */}
        {activeTab === 'wallets' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-[#4a2e1b] shadow-xl p-6 sm:p-10 space-y-6 animate-fadeIn">
            
            {/* Header of Wallets */}
            <div className="border-b border-[#ebd7c3] pb-4 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-fredoka text-2xl font-bold text-[#26160d] flex items-center gap-2">
                  <Coins className="w-6 h-6 text-[#b87d55]" />
                  <span>PawGuard Medical Support Wallets</span>
                </h3>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setActiveTab('causes');
                  }}
                  className="text-xs font-fredoka font-bold text-[#8a5b3a] hover:underline"
                >
                  ← Back to Medical Initiatives
                </button>
              </div>
              <p className="text-xs font-semibold text-[#8a5b3a]">
                {currentCauseInfo.title}
              </p>
            </div>

            {/* Targeted Medical Description Banner */}
            <div className="bg-[#faefe4] border border-[#ebd7c3] p-5 rounded-2xl space-y-2">
              <div className="font-fredoka text-base font-bold text-[#26160d] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#d94141]" />
                <span>Dedicated Medical Treatment Allocation</span>
              </div>
              <p className="text-xs text-[#5e4537] leading-relaxed">
                {currentCauseInfo.statement}
              </p>
              <div className="text-[11px] text-[#8a5b3a] pt-1 border-t border-[#ebd7c3]/80">
                <strong>Medical Priority:</strong> {currentCauseInfo.allocation}
              </div>
            </div>

            {/* Wallets List */}
            <div className="space-y-4">
              {cryptoList.map((c) => (
                <div
                  key={c.key}
                  className="bg-[#fbf6f0] p-4 sm:p-5 rounded-2xl border-2 border-[#ebd7c3] space-y-2.5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${c.iconColor}`}>
                        {c.symbol.slice(0, 1)}
                      </span>
                      <div>
                        <span className="font-fredoka text-sm font-bold text-[#26160d]">
                          {c.name} ({c.symbol})
                        </span>
                        <div className="text-[11px] text-[#8a5b3a] font-medium">
                          {c.designation}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-[#8a5b3a] bg-white px-3 py-0.5 rounded-full border border-[#ebd7c3] self-start">
                      {c.network}
                    </span>
                  </div>

                  {/* Address Bar */}
                  <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-[#ebd7c3]">
                    <span className="font-mono text-xs text-[#352018] break-all flex-1 select-all font-semibold">
                      {c.address}
                    </span>
                    <button
                      onClick={() => handleCopy(c.key, c.address)}
                      className="p-2.5 rounded-xl bg-[#4a2e1b] hover:bg-[#352018] text-white flex-shrink-0 transition-colors"
                      title="Copy Address"
                    >
                      {copiedKey === c.key ? (
                        <Check className="w-4 h-4 text-[#86efac]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {copiedKey === c.key && (
                    <p className="text-[11px] font-fredoka font-semibold text-[#166534] animate-fadeIn">
                      {c.name} address copied to clipboard.
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setActiveTab('causes');
                }}
                className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka font-semibold text-xs sm:text-sm py-3.5 rounded-full border border-[#ebd7c3] transition-colors"
              >
                Return to Medical Initiatives
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
