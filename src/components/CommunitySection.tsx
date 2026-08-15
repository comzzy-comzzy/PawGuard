import React, { useState } from 'react';
import { Users, UserPlus, Shield, CheckCircle, ArrowLeft, Heart, Car, Home, Eye } from 'lucide-react';
import { playClickSound, playHeartPop } from '../utils/audio';

interface CommunitySectionProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ onNavigateSection }) => {
  const [activeTab, setActiveTab] = useState<'roles' | 'signup'>('roles');
  const [guildJoined, setGuildJoined] = useState(false);

  // Volunteer sign-up form
  const [vName, setVName] = useState('');
  const [vRole, setVRole] = useState('Rescue Driver & Transport');
  const [vLocation, setVLocation] = useState('');
  const [vPhone, setVPhone] = useState('');
  const [vNotes, setVNotes] = useState('');

  const handleGuildSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHeartPop();
    setGuildJoined(true);
  };

  const resetForm = () => {
    setVName('');
    setVLocation('');
    setVPhone('');
    setVNotes('');
    setGuildJoined(false);
    setActiveTab('roles');
  };

  const selectRoleAndOpen = (role: string) => {
    playClickSound();
    setVRole(role);
    setActiveTab('signup');
  };

  return (
    <section id="community" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#fbf6f0]">
      <div className="max-w-7xl mx-auto space-y-10">
        
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

            <span className="text-xs font-fredoka font-semibold uppercase tracking-wider text-[#8a4ea8] bg-[#f3e8ff] px-3.5 py-1 rounded-full border border-[#e9d5ff]">
              Community Guild
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ebd7c3] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-fredoka font-bold text-[#b87d55] uppercase tracking-wider">
              <Users className="w-4 h-4 text-[#4a2e1b]" />
              <span>PawGuard Volunteer Guild & Community</span>
            </div>
            <h1 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26160d]">
              Volunteer to Protect & Rescue Dogs
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#6b4c38] max-w-2xl">
              Join a dedicated network of volunteers helping to respond to abuse reports, transport injured animals to clinics, and provide emergency foster care.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('roles');
              }}
              className={`font-fredoka text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all ${
                activeTab === 'roles'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3]'
              }`}
            >
              Volunteer Roles
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('signup');
              }}
              className={`flex items-center gap-1.5 font-fredoka text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all ${
                activeTab === 'signup'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3]'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up to Volunteer</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Roles Grid */}
        {activeTab === 'roles' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            
            <div className="bg-white rounded-3xl p-6 border-2 border-[#ebd7c3] space-y-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center font-bold">
                  <Car className="w-7 h-7" />
                </div>
                <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                  Rescue & Transport Drivers
                </h3>
                <p className="text-xs sm:text-sm text-[#6e513e] leading-relaxed">
                  Provide urgent transportation for reported dogs in distress, moving them safely from danger sites to veterinary hospitals or safe shelters.
                </p>
              </div>

              <button
                onClick={() => selectRoleAndOpen('Rescue Driver & Transport')}
                className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka text-xs sm:text-sm font-semibold py-3 rounded-full transition-colors"
              >
                Enroll as Driver →
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 border-2 border-[#ebd7c3] space-y-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center font-bold">
                  <Home className="w-7 h-7" />
                </div>
                <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                  Emergency Foster Guardians
                </h3>
                <p className="text-xs sm:text-sm text-[#6e513e] leading-relaxed">
                  Open your home temporarily for traumatized or recovering dogs while medical care is administered and permanent adoption arrangements are prepared.
                </p>
              </div>

              <button
                onClick={() => selectRoleAndOpen('Emergency Foster Home')}
                className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka text-xs sm:text-sm font-semibold py-3 rounded-full transition-colors"
              >
                Enroll as Foster →
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 border-2 border-[#ebd7c3] space-y-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center font-bold">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                  Field Spotters & Advocates
                </h3>
                <p className="text-xs sm:text-sm text-[#6e513e] leading-relaxed">
                  Help verify welfare reports in your neighborhood, document conditions safely, and promote humane treatment in local communities.
                </p>
              </div>

              <button
                onClick={() => selectRoleAndOpen('Field Spotter & Evidence')}
                className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka text-xs sm:text-sm font-semibold py-3 rounded-full transition-colors"
              >
                Enroll as Spotter →
              </button>
            </div>

          </div>
        )}

        {/* Tab 2: Embedded Volunteer Registration Form */}
        {activeTab === 'signup' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-[#4a2e1b] shadow-xl p-6 sm:p-10 space-y-6 animate-fadeIn">
            <div className="border-b border-[#ebd7c3] pb-4 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-fredoka text-2xl font-bold text-[#26160d] flex items-center gap-2">
                  <UserPlus className="w-6 h-6 text-[#8a4ea8]" />
                  <span>Volunteer Registration Form</span>
                </h3>
                <button
                  onClick={() => setActiveTab('roles')}
                  className="text-xs font-fredoka font-bold text-[#8a5b3a] hover:underline"
                >
                  ← Back to Roles
                </button>
              </div>
              <p className="text-xs text-[#6b4c38]">
                Sign up to join our regional volunteer dispatch and welfare network.
              </p>
            </div>

            {guildJoined ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#3aa866]/20 text-[#3aa866] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h4 className="font-fredoka text-2xl font-bold text-[#26160d]">
                  Volunteer Application Received!
                </h4>
                <p className="text-xs sm:text-sm text-[#5e4537] max-w-sm mx-auto">
                  Thank you for stepping up to protect dogs in need. Your enrollment has been recorded.
                </p>
                <button
                  onClick={resetForm}
                  className="bg-[#4a2e1b] text-white font-fredoka text-xs sm:text-sm px-7 py-3 rounded-full shadow"
                >
                  Return to Guild Roles
                </button>
              </div>
            ) : (
              <form onSubmit={handleGuildSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Taylor"
                    value={vName}
                    onChange={(e) => setVName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Preferred Volunteer Role *</label>
                    <select
                      value={vRole}
                      onChange={(e) => setVRole(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    >
                      <option>Rescue Driver & Transport</option>
                      <option>Emergency Foster Home</option>
                      <option>Field Spotter & Evidence</option>
                      <option>Shelter & Feeding Helper</option>
                      <option>General Support Volunteer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">City / District / Region *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. City or Area"
                      value={vLocation}
                      onChange={(e) => setVLocation(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Contact Phone or Email *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your phone number or email address"
                    value={vPhone}
                    onChange={(e) => setVPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  />
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Availability & Experience Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your schedule, vehicle availability, or previous pet handling experience..."
                    value={vNotes}
                    onChange={(e) => setVNotes(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('roles')}
                    className="w-1/3 bg-[#faefe4] text-[#4a2e1b] font-fredoka font-semibold py-3.5 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm py-3.5 rounded-full shadow"
                  >
                    Submit Volunteer Registration
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
