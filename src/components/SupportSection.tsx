import React, { useState } from 'react';
import { Heart, ShieldCheck, Stethoscope, Utensils, Home, Copy, Check, Coins, Gift, ArrowLeft, Sparkles, CheckCircle, DollarSign, FileCheck } from 'lucide-react';
import { playHeartPop, playClickSound } from '../utils/audio';
import { DONATION_WALLETS } from '../data/mockData';
import { DonationRecord } from '../types';

interface SupportSectionProps {
  onAddDonation?: (donation: DonationRecord) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const SupportSection: React.FC<SupportSectionProps> = ({ onAddDonation, onNavigateSection }) => {
  const [activeTab, setActiveTab] = useState<'causes' | 'wallets' | 'record'>('causes');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Donation form state
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [amount, setAmount] = useState('50');
  const [currency, setCurrency] = useState<DonationRecord['currency']>('USD');
  const [targetCause, setTargetCause] = useState('Emergency Nutrition Kits');
  const [paymentMethod, setPaymentMethod] = useState<DonationRecord['paymentMethod']>('Crypto Transfer');
  const [txHashOrReceipt, setTxHashOrReceipt] = useState('');
  const [donorNote, setDonorNote] = useState('');
  const [donationRecorded, setDonationRecorded] = useState(false);

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
    setTargetCause(category);
    setActiveTab('wallets');
  };

  const handleOpenRecordForCause = (category: string) => {
    playHeartPop();
    setTargetCause(category);
    setActiveTab('record');
  };

  const handleCopy = (key: string, text: string) => {
    playClickSound();
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHeartPop();

    const newDonation: DonationRecord = {
      id: `DON-${Math.floor(100 + Math.random() * 900)}`,
      donorName: donorName || 'Anonymous Supporter',
      donorEmail: donorEmail || 'Supporter Email',
      amount: amount || '50',
      currency,
      targetCause,
      paymentMethod,
      txHashOrReceipt: txHashOrReceipt || 'Direct Pledge / Transfer',
      donorNote: donorNote || 'Supporting dog rescue and care.',
      submittedAt: new Date().toISOString(),
      createdAt: Date.now(),
      status: 'pending_verification',
    };

    if (onAddDonation) {
      onAddDonation(newDonation);
    }
    setDonationRecorded(true);
  };

  const resetDonationForm = () => {
    setDonorName('');
    setDonorEmail('');
    setAmount('50');
    setTxHashOrReceipt('');
    setDonorNote('');
    setDonationRecorded(false);
    setActiveTab('causes');
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

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
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

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('record');
              }}
              className={`flex items-center gap-1.5 font-fredoka text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all ${
                activeTab === 'record'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3]'
              }`}
            >
              <FileCheck className="w-4 h-4 text-[#3aa866]" />
              <span>Record / Pledge Donation</span>
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

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => handleOpenWalletsForCause(cat.label)}
                      className="w-full bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-xs py-3 rounded-full transition-colors flex items-center justify-center gap-1.5 shadow"
                    >
                      <Coins className="w-3.5 h-3.5 text-[#f5d7b7]" />
                      <span>Donate Crypto Wallets →</span>
                    </button>
                    <button
                      onClick={() => handleOpenRecordForCause(cat.label)}
                      className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka font-semibold text-xs py-2.5 rounded-full transition-colors"
                    >
                      Pledge / Confirm Support
                    </button>
                  </div>
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

            {/* Transparency Note */}
            <div className="bg-[#faefe4] p-4 rounded-2xl border border-[#ebd7c3] text-xs text-[#5e4537] space-y-1">
              <p className="font-bold text-[#352018] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3aa866]" />
                Direct Medical & Shelter Transparency:
              </p>
              <p className="text-[#6b4c38]">
                {currentCause.statement}
              </p>
            </div>

            {/* Wallets List */}
            <div className="space-y-4">
              {cryptoList.map((item) => (
                <div
                  key={item.key}
                  className="bg-[#fbf6f0] p-4 sm:p-5 rounded-2xl border border-[#ebd7c3] space-y-2 hover:border-[#4a2e1b] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl ${item.iconColor} font-fredoka font-bold flex items-center justify-center text-xs shadow-sm`}>
                        {item.symbol.substring(0, 3)}
                      </div>
                      <div>
                        <div className="font-fredoka text-sm font-bold text-[#26160d]">
                          {item.name} ({item.symbol})
                        </div>
                        <div className="text-[11px] text-[#8a5b3a]">{item.network}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(item.key, item.address)}
                      className={`flex items-center gap-1.5 text-xs font-fredoka font-semibold px-4 py-2 rounded-xl transition-all shadow-sm ${
                        copiedKey === item.key
                          ? 'bg-[#3aa866] text-white'
                          : 'bg-[#4a2e1b] hover:bg-[#352018] text-white'
                      }`}
                    >
                      {copiedKey === item.key ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-[#ebd7c3] font-mono text-[11px] text-[#4a2e1b] break-all select-all">
                    {item.address}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('record')}
                className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka font-semibold text-xs sm:text-sm py-3 rounded-full transition-all flex items-center justify-center gap-1.5"
              >
                <FileCheck className="w-4 h-4 text-[#3aa866]" />
                <span>Made a Transfer? Submit Confirmation to Admin →</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Record / Pledge Donation Form */}
        {activeTab === 'record' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-[#4a2e1b] shadow-xl p-6 sm:p-10 space-y-6 animate-fadeIn">
            <div className="border-b border-[#ebd7c3] pb-4 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-fredoka text-2xl font-bold text-[#26160d] flex items-center gap-2">
                  <FileCheck className="w-6 h-6 text-[#3aa866]" />
                  <span>Submit Donation Confirmation & Pledge</span>
                </h3>
                <button
                  onClick={() => setActiveTab('causes')}
                  className="text-xs font-fredoka font-bold text-[#8a5b3a] hover:underline"
                >
                  ← Back to Causes
                </button>
              </div>
              <p className="text-xs text-[#6b4c38]">
                Record your donation so our admin desk can verify your contribution and send a receipt.
              </p>
            </div>

            {donationRecorded ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#3aa866]/20 text-[#3aa866] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h4 className="font-fredoka text-2xl font-bold text-[#26160d]">
                  Donation Received by Admin!
                </h4>
                <p className="text-xs sm:text-sm text-[#5e4537] max-w-sm mx-auto">
                  Thank you for your generosity! Your donation record has been routed to the Admin Dashboard for verification and ledger updates.
                </p>
                <button
                  onClick={resetDonationForm}
                  className="bg-[#4a2e1b] text-white font-fredoka text-xs sm:text-sm px-7 py-3 rounded-full shadow"
                >
                  Return to Causes
                </button>
              </div>
            ) : (
              <form onSubmit={handleDonationSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Donor Name / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Emily Thornwood or Anonymous"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. donor@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Contribution Amount *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 50 or 0.05"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="BTC">BTC (Bitcoin)</option>
                      <option value="ETH">ETH (Ethereum)</option>
                      <option value="BNB">BNB (Binance)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Designated Rescue Cause</label>
                    <select
                      value={targetCause}
                      onChange={(e) => setTargetCause(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    >
                      <option value="Emergency Nutrition Kits">Emergency Nutrition Kits</option>
                      <option value="Vaccines & Preventive Care">Vaccines & Preventive Care</option>
                      <option value="Veterinary Trauma & Surgery">Veterinary Trauma & Surgery</option>
                      <option value="Shelter & Foster Supplies">Shelter & Foster Supplies</option>
                      <option value="General Rescue Fund">General Rescue Fund</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    >
                      <option value="Crypto Transfer">Crypto Transfer (BTC/ETH/BNB)</option>
                      <option value="Credit Card / Online">Credit Card / Online</option>
                      <option value="Bank Wire">Bank Wire</option>
                      <option value="Direct Supply Donation">Direct Supply Donation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Transaction Hash / Receipt ID / Reference</label>
                  <input
                    type="text"
                    placeholder="e.g. 0x3a8f... or receipt number"
                    value={txHashOrReceipt}
                    onChange={(e) => setTxHashOrReceipt(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  />
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Message or Dedication Note</label>
                  <textarea
                    rows={2}
                    placeholder="Leave an encouraging note for the rescue team or in honor of a beloved pet..."
                    value={donorNote}
                    onChange={(e) => setDonorNote(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('causes')}
                    className="w-1/3 bg-[#faefe4] text-[#4a2e1b] font-fredoka font-semibold py-3.5 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm py-3.5 rounded-full shadow"
                  >
                    Confirm & Send to Admin
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
