import React, { useState } from 'react';
import { Heart, ShieldCheck, CheckCircle2, Gift, Stethoscope, Utensils, Home } from 'lucide-react';
import { playHeartPop } from '../utils/audio';

export const SupportSection: React.FC = () => {
  const [customAmount, setCustomAmount] = useState('50');
  const [donated, setDonated] = useState(false);
  const [totalRaised, setTotalRaised] = useState(16450);
  const goalAmount = 25000;

  const tiers = [
    { amount: '15', label: 'Emergency Food Kit', desc: 'Provides 2 weeks of nutritious recovery food for a rescued dog', icon: Utensils },
    { amount: '35', label: 'Vaccines & Deworming', desc: 'Full medical checkup, microchip, and vaccinations for a stray', icon: ShieldCheck },
    { amount: '75', label: 'Emergency Vet Triage', desc: 'Wound care, IV fluids, pain medication, and trauma treatment', icon: Stethoscope },
    { amount: '150', label: 'Surgery & Rehabilitation', desc: 'Surgical fracture treatment and 1 month foster shelter support', icon: Home },
  ];

  const handleDonate = (amount: string) => {
    const num = parseInt(amount, 10) || 50;
    playHeartPop();
    setTotalRaised(prev => prev + num);
    setDonated(true);
    setTimeout(() => setDonated(false), 5000);
  };

  const progressPercent = Math.min(100, Math.round((totalRaised / goalAmount) * 100));

  return (
    <section id="support" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#faefe4] border-b border-[#eedccb]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#fbe9dd] text-[#8a5b3a] border border-[#e5cfbd] text-xs font-fredoka font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-[#d94141]" />
            <span>Emergency Medical Fund</span>
          </div>

          <h2 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold text-[#26160d]">
            Support Dog Rescues & Emergency Vet Care
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#6b4c38]">
            Contributions go directly to medical surgeries, transport crates, emergency shelter food, and legal animal protection advocacy.
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#ebd7c3] shadow-md max-w-3xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-fredoka font-semibold uppercase text-[#8a5b3a]">
                Emergency Veterinary Medical Drive
              </div>
              <div className="font-fredoka text-2xl sm:text-3xl font-bold text-[#26160d]">
                ${totalRaised.toLocaleString()}{' '}
                <span className="text-sm font-normal text-[#7e5c46]">
                  raised of ${goalAmount.toLocaleString()} goal
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="bg-[#dcfce7] text-[#166534] font-fredoka font-bold text-xs px-3 py-1 rounded-full border border-[#86efac]">
                {progressPercent}% Funded
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-[#faefe4] rounded-full overflow-hidden border border-[#ebd7c3]">
            <div
              className="h-full bg-gradient-to-r from-[#b87d55] to-[#3aa866] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-[#8a6853]">
            <span>48 Rescued Dogs Treated This Month</span>
            <span>Target: Mobile Clinic Medical Supplies</span>
          </div>
        </div>

        {/* Donation Message */}
        {donated && (
          <div className="max-w-md mx-auto bg-[#dcfce7] border border-[#86efac] text-[#166534] p-4 rounded-2xl text-xs font-fredoka font-semibold text-center flex items-center justify-center gap-2 shadow">
            <CheckCircle2 className="w-5 h-5 text-[#3aa866]" />
            <span>Thank you for your support. Your contribution directly funds animal medical care.</span>
          </div>
        )}

        {/* Impact Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, idx) => {
            const IconComponent = tier.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border-2 border-[#ebd7c3] hover:border-[#4a2e1b] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4 text-center group"
              >
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#faefe4] group-hover:bg-[#f8dfc7] text-[#4a2e1b] flex items-center justify-center mx-auto transition-colors">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <div className="font-fredoka text-3xl font-extrabold text-[#26160d]">
                    ${tier.amount}
                  </div>

                  <h3 className="font-fredoka text-base font-bold text-[#352018]">
                    {tier.label}
                  </h3>

                  <p className="text-xs text-[#6e513e] leading-relaxed">
                    {tier.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleDonate(tier.amount)}
                  className="w-full bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-xs py-3 rounded-full shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Donate ${tier.amount}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Amount Form */}
        <div className="max-w-md mx-auto bg-white rounded-3xl p-6 border border-[#ebd7c3] shadow-sm text-center space-y-4">
          <div className="font-fredoka text-sm font-bold text-[#352018]">
            Or Enter a Custom Contribution
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-3 text-[#4a2e1b] font-bold">$</span>
              <input
                type="number"
                min="5"
                placeholder="50"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-[#ebd7c3] font-fredoka text-base text-[#352018] focus:ring-2 focus:ring-[#4a2e1b] focus:outline-none"
              />
            </div>
            <button
              onClick={() => handleDonate(customAmount)}
              className="bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka text-sm px-6 py-2.5 rounded-xl shadow transition-all"
            >
              Donate Now
            </button>
          </div>
          <p className="text-[11px] text-[#8a6853]">
            Secure donation simulation for animal medical care.
          </p>
        </div>

      </div>
    </section>
  );
};
