import React, { useState } from 'react';
import { Users, UserPlus, Shield, CheckCircle, ArrowLeft, Heart, Car, Home, Eye, Stethoscope, Phone, Mail, Clock } from 'lucide-react';
import { playClickSound, playHeartPop } from '../utils/audio';
import { VolunteerApplication } from '../types';

interface CommunitySectionProps {
  onAddVolunteer?: (vol: VolunteerApplication) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ onAddVolunteer, onNavigateSection }) => {
  const [activeTab, setActiveTab] = useState<'roles' | 'signup'>('roles');
  const [guildJoined, setGuildJoined] = useState(false);

  // Volunteer sign-up form
  const [vName, setVName] = useState('');
  const [vEmail, setVEmail] = useState('');
  const [vPhone, setVPhone] = useState('');
  const [vRole, setVRole] = useState<VolunteerApplication['role']>('Rescue Driver & Transport');
  const [vLocation, setVLocation] = useState('');
  const [vAvailability, setVAvailability] = useState<VolunteerApplication['availability']>('Full Time / Emergency');
  const [hasVehicle, setHasVehicle] = useState(true);
  const [vNotes, setVNotes] = useState('');

  const handleGuildSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHeartPop();

    const newVolunteer: VolunteerApplication = {
      id: `VOL-${Math.floor(100 + Math.random() * 900)}`,
      name: vName,
      email: vEmail || 'Not provided',
      phone: vPhone,
      role: vRole,
      location: vLocation,
      availability: vAvailability,
      hasVehicle,
      experience: vNotes || 'Eager to help dogs in need.',
      submittedAt: new Date().toISOString(),
      createdAt: Date.now(),
      status: 'pending',
    };

    if (onAddVolunteer) {
      onAddVolunteer(newVolunteer);
    }
    setGuildJoined(true);
  };

  const resetForm = () => {
    setVName('');
    setVEmail('');
    setVPhone('');
    setVLocation('');
    setVNotes('');
    setGuildJoined(false);
    setActiveTab('roles');
  };

  const selectRoleAndOpen = (role: VolunteerApplication['role']) => {
    playClickSound();
    setVRole(role);
    setActiveTab('signup');
  };

  const volunteerRolesList = [
    {
      title: 'Rescue Driver & Transport',
      roleKey: 'Rescue Driver & Transport' as VolunteerApplication['role'],
      desc: 'Transport injured, trapped, or abused dogs from incident sites to partner veterinary clinics or foster homes.',
      req: 'Driver License, safe vehicle or crates, emergency availability',
      icon: Car,
      color: 'bg-[#faefe4] text-[#4a2e1b]',
    },
    {
      title: 'Emergency Foster Parent',
      roleKey: 'Emergency Foster' as VolunteerApplication['role'],
      desc: 'Open your home for short or long-term healing for rescued dogs recovering from trauma or awaiting forever adoption.',
      req: 'Safe dog-friendly space, time for feeding, gentle companionship',
      icon: Home,
      color: 'bg-[#dcfce7] text-[#166534]',
    },
    {
      title: 'Field Spotter & Evidence',
      roleKey: 'Field Spotter' as VolunteerApplication['role'],
      desc: 'Conduct safe location checks on suspected cruelty reports, gather GPS landmarks, and monitor vulnerable street dog packs.',
      req: 'Smartphone with camera, keen observation skills, safety mindfulness',
      icon: Eye,
      color: 'bg-[#ffedd5] text-[#9a3412]',
    },
    {
      title: 'Veterinary Triage Assistant',
      roleKey: 'Vet Assistant' as VolunteerApplication['role'],
      desc: 'Assist partner vets with administering oral dewormers, bathing mange cases, feeding recovery formulas, and wound dressing.',
      req: 'Vet tech background, basic animal first aid certification or passion',
      icon: Stethoscope,
      color: 'bg-[#fee2e2] text-[#991b1b]',
    },
  ];

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
              <span>Apply to Volunteer</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Roles Grid */}
        {activeTab === 'roles' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {volunteerRolesList.map((role, idx) => {
                const IconComponent = role.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#ebd7c3] hover:border-[#4a2e1b] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl ${role.color} flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-fredoka font-bold uppercase text-[#8a5b3a] bg-[#faefe4] px-3 py-1 rounded-full">
                          Open Position
                        </span>
                      </div>

                      <div>
                        <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                          {role.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6b4c38] mt-2 leading-relaxed">
                          {role.desc}
                        </p>
                      </div>

                      <div className="bg-[#fbf6f0] p-3 rounded-2xl border border-[#ebd7c3]/60 text-xs text-[#5e4537]">
                        <strong className="text-[#352018]">Requirements:</strong> {role.req}
                      </div>
                    </div>

                    <button
                      onClick={() => selectRoleAndOpen(role.roleKey)}
                      className="w-full bg-[#faefe4] hover:bg-[#4a2e1b] text-[#4a2e1b] hover:text-white font-fredoka font-semibold text-xs sm:text-sm py-3 rounded-full transition-all flex items-center justify-center gap-1.5"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Join as {role.title} →</span>
                    </button>
                  </div>
                );
              })}
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
                  Application Received by Admin Desk!
                </h4>
                <p className="text-xs sm:text-sm text-[#5e4537] max-w-sm mx-auto">
                  Thank you for stepping up to protect dogs in need. Your volunteer registration has been forwarded directly to the Admin Dashboard.
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
                    placeholder="e.g. Carlos Mendez"
                    value={vName}
                    onChange={(e) => setVName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 432-8899"
                      value={vPhone}
                      onChange={(e) => setVPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. carlos.mendez@example.com"
                      value={vEmail}
                      onChange={(e) => setVEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Preferred Volunteer Role *</label>
                    <select
                      value={vRole}
                      onChange={(e) => setVRole(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    >
                      <option value="Rescue Driver & Transport">Rescue Driver & Transport</option>
                      <option value="Emergency Foster">Emergency Foster Home</option>
                      <option value="Field Spotter">Field Spotter & Evidence</option>
                      <option value="Vet Assistant">Veterinary Assistant</option>
                      <option value="Community Advocate">Community Advocate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">City / District / Region *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. North & Downtown Metro"
                      value={vLocation}
                      onChange={(e) => setVLocation(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Availability Schedule</label>
                    <select
                      value={vAvailability}
                      onChange={(e) => setVAvailability(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    >
                      <option value="Full Time / Emergency">Full Time / Emergency Response</option>
                      <option value="Weekends">Weekends Only</option>
                      <option value="Evenings">Evenings / Nights</option>
                      <option value="On-Call">On-Call As Needed</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasVehicle}
                        onChange={(e) => setHasVehicle(e.target.checked)}
                        className="rounded text-[#4a2e1b] focus:ring-[#4a2e1b] w-4 h-4"
                      />
                      <span className="font-semibold text-xs text-[#352018]">I have access to a vehicle for transport</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Experience & Background Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your previous pet care, vehicle type, or skills..."
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
                    Submit Volunteer Application
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
