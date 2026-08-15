import React, { useState } from 'react';
import { Heart, ShieldCheck, Stethoscope, Utensils, Home, Copy, Check, Coins, Gift, ArrowLeft, Sparkles } from 'lucide-react';
import { playHeartPop, playClickSound } from '../utils/audio';
import { DONATION_WALLETS } from '../data/mockData';

interface SupportSectionProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const SupportSection: React.FC<SupportSectionProps> = ({ onNavigateSection }) => {
  const [activeTab, setActiveTab] = useState<'causes' | 'wallets'>('causes');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const supportCategories = [
    {
      id: 'nutrition',
      label: 'Emergency Nutrition Kits',
      desc: 'Sponsor recovery food and vitamins for starved or rescued dogs',
      icon: Utensils,
      statement: '100% of donations to this initiative fund specialized recovery food, electrolytes, clinical recovery paste, and therapeutic refeeding kits for starved and emaciated dogs.'
    },
    {
      id: 'vaccines',
      label: 'Vaccines & Preventive Care',
      desc: 'Fund core vaccinations, deworming, and microchipping for rescued strays',
      icon: ShieldCheck,
      statement: '100% of donations to this initiative fund essential core vaccinations, deworming treatments, tick and flea preventatives, and microchipping for rescued dogs.'
    },
    {
      id: 'surgery',
      label: 'Veterinary Trauma & Surgery',
      desc: 'Direct support for wound suturing, emergency orthopedic surgery, and pain relief',
      icon: Stethoscope,
      statement: '100% of donations to this initiative fund emergency surgeries, fracture plating, wound suturing, anesthesia, and intensive surgical triage for injured and abused dogs.'
    },
    {
      id: 'shelter',
      label: 'Shelter & Foster Supplies',
      desc: 'Provide transport crates, warm blankets, and safe shelter accommodations',
      icon: Home,
      statement: '100% of donations to this initiative provide safe transport crates, warm orthopedic blankets, recovery pens, and essential care supplies for dogs in foster shelters.'
    },
  ];

  const getCauseContent = (category: string | null) => {
    switch (category) {
      case 'Emergency Nutrition Kits':
        return {
          title: 'Emergency Nutrition & Starvation Recovery',
          badge: 'Emergency Nutrition Kits',
          statement: '100% of donations to this initiative fund specialized recovery food, electrolytes, clinical recovery paste, and therapeutic refeeding kits for starved and emaciated dogs.',
        };
      case 'Vaccines & Preventive Care':
        return {
          title: 'Vaccines & Preventive Healthcare',
          badge: 'Vaccines & Preventive Care',
          statement: '100% of donations to this initiative fund essential core vaccinations, deworming treatments, tick and flea preventatives, and microchipping for rescued dogs.',
        };
      case 'Veterinary Trauma & Surgery':
        return {
          title: 'Veterinary Trauma & Emergency Surgery',
          badge: 'Veterinary Trauma & Surgery',
          statement: '100% of donations to this initiative fund emergency surgeries, fracture plating, wound suturing, anesthesia, and intensive surgical triage for injured and abused dogs.',
        };
      case 'Shelter & Foster Supplies':
        return {
          title: 'Shelter & Foster Accommodation Supplies',
          badge: 'Shelter & Foster Supplies',
          statement: '100% of donations to this initiative provide safe transport crates, warm orthopedic blankets, recovery pens, and essential care supplies for dogs in foster shelters.',
        };
      default:
        return {
          title: 'PawGuard Rescue & Medical Support',
          badge: 'General Medical Support',
          statement: '100% of contributions directly support emergency rescue operations, life-saving veterinary treatment, and urgent care for dogs in critical distress.',
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
      network: 'Bitcoin Network',
      address: DONATION_WALLETS.btc,
      key: 'btc',
      iconColor: 'bg-[#f7931a] text-white',
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      network: 'Ethereum (ERC-20)',
      address: DONATION_WALLETS.eth,
      key: 'eth',
      iconColor: 'bg-[#627eea] text-white',
    },
    {
      name: 'BNB Chain',
      symbol: 'BNB',
      network: 'BNB Smart Chain (BEP-20)',
      address: DONATION_WALLETS.bnb,
      key: 'bnb',
      iconColor: 'bg-[#f3ba2f] text-black',
    },
  ];

  const currentCause = getCauseContent(selectedCategory);

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
              Medical & Rescue Fund
            </span>
          </div>
        )}

        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-white text-[#8a5b3a] border border-[#e5cfbd] text-xs font-fredoka font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            <Heart className="w-3.5 h-3.5 text-[#d94141]" />
            <span>Support & Medical Initiatives</span>
          </div>

          <h1 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold text-[#26160d]">
            Support Dog Rescues & Emergency Care
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#6b4c38]">
            Every penny counts. Choose a specific rescue initiative below to direct your contribution to the cause that matters most to you.
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
              Rescue Causes
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
              <span>Donate Crypto</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Causes Grid */}
        {activeTab === 'causes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
            {supportCategories.map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border-2 border-[#ebd7c3] hover:border-[#4a2e1b] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-center group"
                >
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#faefe4] group-hover:bg-[#f8dfc7] text-[#4a2e1b] flex items-center justify-center mx-auto transition-colors">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    <h3 className="font-fredoka text-base font-bold text-[#352018]">
                      {cat.label}
                    </h3>

                    <p className="text-xs text-[#6e513e] leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenWalletsForCause(cat.label)}
                    className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka font-semibold text-xs py-3 rounded-full transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Gift className="w-3.5 h-3.5 text-[#b87d55]" />
                    <span>Donate to this Cause →</span>
                  </button>
                </div>
              );
            })}
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
                  ← Back to Causes
                </button>
              </div>
              <p className="text-xs font-semibold text-[#8a5b3a]">
                Designated Cause: {currentCause.badge}
              </p>
            </div>

            {/* Quick Cause Switcher Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pb-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-[11px] font-fredoka px-3 py-1 rounded-full transition-all ${
                  selectedCategory === null
                    ? 'bg-[#4a2e1b] text-white font-bold'
                    : 'bg-[#faefe4] text-[#6b442b] hover:bg-[#ebd7c3]'
                }`}
              >
                All Medical
              </button>
              {supportCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.label)}
                  className={`text-[11px] font-fredoka px-3 py-1 rounded-full transition-all ${
                    selectedCategory === c.label
                      ? 'bg-[#4a2e1b] text-white font-bold'
                      : 'bg-[#faefe4] text-[#6b442b] hover:bg-[#ebd7c3]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Cause-Specific Tailored Statement Banner */}
            <div className="bg-[#faefe4] border border-[#ebd7c3] p-5 rounded-2xl space-y-1.5">
              <div className="font-fredoka text-base font-bold text-[#26160d] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#d94141]" />
                <span>{currentCause.title}</span>
              </div>
              <p className="text-xs text-[#6b4c38] leading-relaxed">
                {currentCause.statement}
              </p>
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
                      <span className="font-fredoka text-sm font-bold text-[#26160d]">
                        {c.name} ({c.symbol})
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-[#8a5b3a] bg-white px-3 py-0.5 rounded-full border border-[#ebd7c3]">
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
                Return to Rescue Causes
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
