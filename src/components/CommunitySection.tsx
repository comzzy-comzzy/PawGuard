import React, { useState } from 'react';
import { Users, UserPlus, Shield, CheckCircle } from 'lucide-react';
import { playClickSound, playHeartPop } from '../utils/audio';

export const CommunitySection: React.FC = () => {
  const [showGuildModal, setShowGuildModal] = useState(false);
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

  return (
    <section id="community" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbf6f0] border-b border-[#eedccb]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ebd7c3] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-fredoka font-bold text-[#b87d55] uppercase tracking-wider">
              <Users className="w-4 h-4 text-[#4a2e1b]" />
              <span>PawGuard Volunteer Guild & Community</span>
            </div>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26160d]">
              Volunteer to Protect & Rescue Dogs
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6b4c38] max-w-2xl">
              Join a dedicated network of volunteers helping to respond to abuse reports, transport injured animals to clinics, and provide emergency foster care.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playClickSound();
                setShowGuildModal(true);
                setGuildJoined(false);
              }}
              className="flex items-center gap-2 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm px-6 py-3 rounded-full shadow hover:shadow-md transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Join as Volunteer</span>
            </button>
          </div>
        </div>

        {/* Volunteer Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-3xl p-6 border-2 border-[#ebd7c3] space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center font-bold">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                Rescue & Transport Drivers
              </h3>
              <p className="text-xs sm:text-sm text-[#6e513e] leading-relaxed">
                Provide urgent transportation for reported dogs in distress, moving them safely from danger sites to veterinary hospitals or safe shelters.
              </p>
            </div>

            <button
              onClick={() => {
                setVRole('Rescue Driver & Transport');
                setShowGuildModal(true);
              }}
              className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka text-xs font-semibold py-2.5 rounded-full transition-colors"
            >
              Enroll as Driver
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-[#ebd7c3] space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                Emergency Foster Homes
              </h3>
              <p className="text-xs sm:text-sm text-[#6e513e] leading-relaxed">
                Open your home temporarily for traumatized or recovering dogs while permanent adoption arrangements are prepared.
              </p>
            </div>

            <button
              onClick={() => {
                setVRole('Emergency Foster Home');
                setShowGuildModal(true);
              }}
              className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka text-xs font-semibold py-2.5 rounded-full transition-colors"
            >
              Enroll as Foster
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-[#ebd7c3] space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center font-bold">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                Field Spotters & Advocates
              </h3>
              <p className="text-xs sm:text-sm text-[#6e513e] leading-relaxed">
                Help verify welfare reports in your neighborhood, document conditions safely, and promote humane treatment in local communities.
              </p>
            </div>

            <button
              onClick={() => {
                setVRole('Field Spotter & Evidence');
                setShowGuildModal(true);
              }}
              className="w-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka text-xs font-semibold py-2.5 rounded-full transition-colors"
            >
              Enroll as Spotter
            </button>
          </div>

        </div>

        {/* Volunteer Signup Modal */}
        {showGuildModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#fbf6f0] border-2 border-[#4a2e1b] rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 space-y-5 relative">
              
              {guildJoined ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#3aa866]/20 text-[#3aa866] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="font-fredoka text-2xl font-bold text-[#26160d]">
                    Volunteer Application Received
                  </h3>
                  <p className="text-xs text-[#5e4537] max-w-sm mx-auto">
                    Thank you for stepping up to protect dogs in need. Your enrollment has been recorded.
                  </p>
                  <button
                    onClick={() => setShowGuildModal(false)}
                    className="bg-[#4a2e1b] text-white font-fredoka text-xs px-6 py-3 rounded-full"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGuildSubmit} className="space-y-4 text-xs">
                  <div className="border-b border-[#ebd7c3] pb-3">
                    <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                      Volunteer Sign-Up Form
                    </h3>
                    <p className="text-[#8a5b3a]">Connect with our team to help animals in your area.</p>
                  </div>

                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Taylor"
                      value={vName}
                      onChange={(e) => setVName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Preferred Volunteer Role</label>
                      <select
                        value={vRole}
                        onChange={(e) => setVRole(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                      >
                        <option>Rescue Driver & Transport</option>
                        <option>Emergency Foster Home</option>
                        <option>Field Spotter & Evidence</option>
                        <option>General Support Volunteer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">City / District *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. City or Area"
                        value={vLocation}
                        onChange={(e) => setVLocation(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Contact Phone or Email *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your phone number or email"
                      value={vPhone}
                      onChange={(e) => setVPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Availability & Experience</label>
                    <textarea
                      rows={2}
                      placeholder="Tell us about your schedule or vehicle availability..."
                      value={vNotes}
                      onChange={(e) => setVNotes(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                    ></textarea>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowGuildModal(false)}
                      className="w-1/3 bg-[#faefe4] text-[#4a2e1b] font-fredoka py-3 rounded-full"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold py-3 rounded-full shadow"
                    >
                      Submit Volunteer Registration
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
