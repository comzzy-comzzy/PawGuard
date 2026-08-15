import React from 'react';
import { Heart, ShieldCheck, Stethoscope, Utensils, Home, MessageCircle, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../data/mockData';

export const SupportSection: React.FC = () => {
  const supportCategories = [
    { label: 'Emergency Nutrition Kits', desc: 'Sponsor recovery food and vitamins for starved or rescued dogs', icon: Utensils },
    { label: 'Vaccines & Preventive Care', desc: 'Fund core vaccinations, deworming, and microchipping for rescued strays', icon: ShieldCheck },
    { label: 'Veterinary Trauma & Surgery', desc: 'Direct support for wound suturing, emergency orthopedic surgery, and pain relief', icon: Stethoscope },
    { label: 'Shelter & Foster Supplies', desc: 'Provide transport crates, warm blankets, and safe shelter accommodations', icon: Home },
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
            Support medical treatments, shelter supplies, and transport resources for dogs rescued from abuse, abandonment, and danger.
          </p>
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

                <a
                  href={`https://wa.me/2348105463507?text=${encodeURIComponent(`Hello, I would like to support PawGuard regarding ${cat.label}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka font-semibold text-xs py-2.5 rounded-full transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#128C7E]" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Direct Contact Banner */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#ebd7c3] shadow-sm text-center space-y-4">
          <div className="space-y-1">
            <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
              Direct Support & Inquiries Desk
            </h3>
            <p className="text-xs sm:text-sm text-[#7e5c46]">
              Contact our team directly to provide medical supplies, sponsor a kennel, or support active rescue operations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebd59] text-white font-fredoka text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {CONTACT_INFO.phone}</span>
            </a>

            <a
              href={CONTACT_INFO.emailUrl}
              className="w-full sm:w-auto bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email: {CONTACT_INFO.email}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
