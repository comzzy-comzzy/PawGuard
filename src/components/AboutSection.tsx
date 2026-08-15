import React from 'react';
import { ShieldCheck, Heart, Eye, Users, Sparkles, ArrowLeft } from 'lucide-react';

interface AboutSectionProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateSection }) => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Zero Tolerance for Cruelty',
      desc: 'We actively combat physical abuse, dog fighting, cruel confinement, intentional poisoning, and extreme chaining.',
      color: '#d94141'
    },
    {
      icon: Heart,
      title: 'Dogs Have Feelings Too',
      desc: 'Canine neurobiology proves dogs experience fear, sorrow, loyalty, and joy. They feel physical and emotional pain just as humans do.',
      color: '#b87d55'
    },
    {
      icon: Eye,
      title: 'Rapid Location Dispatch',
      desc: 'Our real-time reporting radar connects eyewitness evidence directly with nearby volunteer rescuers and humane officers.',
      color: '#3d97ca'
    },
    {
      icon: Users,
      title: 'Community-Powered Rescue',
      desc: 'Building a united network of emergency foster homes, volunteer drivers, shelter teams, and compassionate advocates.',
      color: '#3aa866'
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#fbf6f0]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Breadcrumb */}
        {onNavigateSection && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigateSection('home')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-fredoka font-bold text-[#8a5b3a] hover:text-[#4a2e1b] bg-[#faefe4] hover:bg-[#f2e2d2] px-4 py-2 rounded-full border border-[#ebd7c3] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home Overview</span>
            </button>

            <span className="text-xs font-fredoka font-semibold uppercase tracking-wider text-[#8a5b3a] bg-[#faefe4] px-3.5 py-1 rounded-full border border-[#ebd7c3]">
              About Mission
            </span>
          </div>
        )}

        {/* Top Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-[#faebd7] text-[#8a5b3a] border border-[#e5cfbd] text-xs font-fredoka font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Mission</span>
            </div>

            <h1 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold text-[#26160d] leading-tight">
              PawGuard — Protect Dogs, They Have Feelings Too.
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#5e4537] leading-relaxed">
              Every day, dogs suffer in silence — tied on heavy chains without shelter, starved in back alleys, abandoned in extreme weather, or subjected to cruelty and unnecessary killing.
            </p>

            <p className="font-sans text-sm sm:text-base text-[#5e4537] leading-relaxed">
              PawGuard was founded on one clear premise: <strong>Dogs are sentient companions deserving of dignity, safety, and respect.</strong> When they are silenced by neglect, we become their voice. When they are injured, we coordinate their rescue.
            </p>

            <div className="p-4 rounded-2xl bg-[#faefe4] border border-[#ebd7c3] text-xs font-medium text-[#4a2e1b] flex items-start gap-3">
              <Heart className="w-5 h-5 fill-[#8a5b3a] text-[#8a5b3a] flex-shrink-0 mt-0.5" />
              <div>
                <strong>The PawGuard Promise:</strong> No report is ignored. Every dog in peril deserves swift rescue, medical triage, and a caring forever family.
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              {/* Photo Frame */}
              <div className="rounded-3xl overflow-hidden border-4 border-[#352018] shadow-2xl bg-[#faefe4]">
                <img
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=80"
                  alt="Rescued Dogs Running Freely"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white border-2 border-[#4a2e1b] rounded-2xl p-4 shadow-xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#3aa866] text-white font-fredoka font-bold flex items-center justify-center text-xl">
                  100%
                </div>
                <div>
                  <div className="font-fredoka text-sm font-bold text-[#352018]">Humane Rescue Advocacy</div>
                  <div className="text-[11px] text-[#7e5c46]">Compassion & Rehabilitation First</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#ebd7c3] shadow-sm space-y-3"
              >
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: p.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-fredoka text-lg font-bold text-[#26160d]">
                  {p.title}
                </h3>

                <p className="text-xs text-[#6e513e] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
