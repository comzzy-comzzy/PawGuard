import React, { useState } from 'react';
import { Heart, ShieldCheck, Stethoscope, Utensils, Home, Copy, Check, X, Coins, Gift } from 'lucide-react';
import { playHeartPop, playClickSound } from '../utils/audio';
import { DONATION_WALLETS } from '../data/mockData';

export const SupportSection: React.FC = () => {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const supportCategories = [
    { label: 'Emergency Nutrition Kits', desc: 'Sponsor recovery food and vitamins for starved or rescued dogs', icon: Utensils },
    { label: 'Vaccines & Preventive Care', desc: 'Fund core vaccinations, deworming, and microchipping for rescued strays', icon: ShieldCheck },
    { label: 'Veterinary Trauma & Surgery', desc: 'Direct support for wound suturing, emergency orthopedic surgery, and pain relief', icon: Stethoscope },
    { label: 'Shelter & Foster Supplies', desc: 'Provide transport crates, warm blankets, and safe shelter accommodations', icon: Home },
  ];

  const handleOpenDonation = (category?: string) => {
    playHeartPop();
    if (category) setSelectedCategory(category);
    setShowDonationModal(true);
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

  return (
    <section id="support" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#faefe4] border-b border-[#eedccb]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#fbe9dd] text-[#8a5b3a] border border-[#e5cfbd] text-xs font-fredoka font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-[#d94141]" />
            <span>Support & Medical Initiatives</span>
          </div>

          <h2 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold text-[#26160d]">
            Support Dog Rescues & Emergency Care
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#6b4c38]">
            Every penny counts. Your contributions directly fund veterinary medical surgeries, rescue transport, food, and shelter for dogs in danger.
          </p>

          <div className="pt-2">
            <button
              onClick={() => handleOpenDonation()}
              className="bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <Coins className="w-4 h-4 text-[#f5d7b7]" />
              <span>Donate (Crypto Address)</span>
            </button>
          </div>
        </div>

        {/* Support Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  onClick={() => handleOpenDonation(cat.label)}
                  className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka font-semibold text-xs py-2.5 rounded-full transition-colors flex items-center justify-center gap-1.5"
                >
                  <Gift className="w-3.5 h-3.5 text-[#b87d55]" />
                  <span>Donate to this Cause</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Donation Modal */}
        {showDonationModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="bg-[#fbf6f0] border-2 border-[#4a2e1b] rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden relative">
              
              {/* Modal Header */}
              <div className="bg-[#4a2e1b] text-white px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#fbe9dd] text-[#4a2e1b] flex items-center justify-center font-bold shadow">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-fredoka text-xl font-bold tracking-tight">
                      Support PawGuard Rescues
                    </h3>
                    <p className="text-xs text-[#f5d7b7]">
                      {selectedCategory ? `Designated for: ${selectedCategory}` : 'Direct Crypto Support'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowDonationModal(false);
                    setSelectedCategory(null);
                  }}
                  className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
                
                {/* Heartwarming Banner */}
                <div className="bg-[#faefe4] border border-[#ebd7c3] p-4 rounded-2xl text-center space-y-1">
                  <div className="font-fredoka text-base font-bold text-[#26160d]">
                    Every Penny Counts
                  </div>
                  <p className="text-xs text-[#6b4c38] leading-relaxed">
                    100% of donations go towards immediate emergency veterinary medical care, food supplies, and safe rescue transport for dogs suffering from abuse and abandonment.
                  </p>
                </div>

                {/* Wallets List */}
                <div className="space-y-3.5">
                  {cryptoList.map((c) => (
                    <div
                      key={c.key}
                      className="bg-white p-4 rounded-2xl border-2 border-[#ebd7c3] space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${c.iconColor}`}>
                            {c.symbol.slice(0, 1)}
                          </span>
                          <span className="font-fredoka text-sm font-bold text-[#26160d]">
                            {c.name} ({c.symbol})
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-[#8a5b3a] bg-[#faefe4] px-2.5 py-0.5 rounded-full">
                          {c.network}
                        </span>
                      </div>

                      {/* Address Bar */}
                      <div className="flex items-center gap-2 bg-[#fbf6f0] p-2.5 rounded-xl border border-[#ebd7c3]">
                        <span className="font-mono text-xs text-[#352018] break-all flex-1 select-all font-semibold">
                          {c.address}
                        </span>
                        <button
                          onClick={() => handleCopy(c.key, c.address)}
                          className="p-2 rounded-lg bg-[#4a2e1b] hover:bg-[#352018] text-white flex-shrink-0 transition-colors"
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
                    onClick={() => setShowDonationModal(false)}
                    className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka font-semibold text-xs sm:text-sm py-3 rounded-full border border-[#ebd7c3] transition-colors"
                  >
                    Close
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
