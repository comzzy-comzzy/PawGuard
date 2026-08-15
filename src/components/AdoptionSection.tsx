import React, { useState } from 'react';
import { AdoptableDog } from '../types';
import { Heart, Home, Check, ShieldCheck, X, Calendar, User, Phone, Mail, Award, Users } from 'lucide-react';
import { playClickSound, playHeartPop } from '../utils/audio';

interface AdoptionSectionProps {
  dogs: AdoptableDog[];
}

export const AdoptionSection: React.FC<AdoptionSectionProps> = ({ dogs }) => {
  const [selectedDog, setSelectedDog] = useState<AdoptableDog | null>(null);
  const [filterSize, setFilterSize] = useState<string>('all');
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [sponsorSuccess, setSponsorSuccess] = useState<string | null>(null);

  // Adoption application form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [housingType, setHousingType] = useState('House with Fenced Yard');
  const [hasOtherPets, setHasOtherPets] = useState('Yes');
  const [meetDate, setMeetDate] = useState('');

  const filteredDogs = dogs.filter((d) => {
    if (filterSize === 'all') return true;
    return d.size.toLowerCase() === filterSize.toLowerCase();
  });

  const handleOpenAdoptModal = (dog: AdoptableDog) => {
    playClickSound();
    setSelectedDog(dog);
    setApplicationSuccess(false);
  };

  const handleSponsor = (dog: AdoptableDog, e: React.MouseEvent) => {
    e.stopPropagation();
    playHeartPop();
    setSponsorSuccess(dog.name);
    setTimeout(() => setSponsorSuccess(null), 4000);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHeartPop();
    setApplicationSuccess(true);
  };

  return (
    <section id="adopt" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#faefe4] border-b border-[#eedccb]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#faebd7] text-[#8a5b3a] border border-[#e5cfbd] text-xs font-fredoka font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Home className="w-3.5 h-3.5" />
            <span>Loving Forever Homes</span>
          </div>
          
          <h2 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold text-[#26160d]">
            Meet Rescued Dogs Ready for Adoption
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#6b4c38]">
            Every one of these courageous dogs survived abuse, neglect, or abandonment. They are rehabilitated, vetted, and ready for a responsible forever home.
          </p>

          {/* Size Filter */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Pups' },
              { id: 'small', label: 'Small Size' },
              { id: 'medium', label: 'Medium Size' },
              { id: 'large', label: 'Large Size' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  playClickSound();
                  setFilterSize(f.id);
                }}
                className={`font-fredoka text-xs sm:text-sm px-4 py-2 rounded-full transition-all ${
                  filterSize === f.id
                    ? 'bg-[#4a2e1b] text-white font-bold shadow'
                    : 'bg-white text-[#6b442b] hover:bg-[#faefe4] border border-[#ebd7c3]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sponsor Toast */}
        {sponsorSuccess && (
          <div className="max-w-md mx-auto bg-[#dcfce7] border border-[#86efac] text-[#166534] p-3.5 rounded-2xl text-xs font-fredoka font-semibold text-center flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-[#d94141] fill-[#d94141]" />
            <span>You virtually sponsored {sponsorSuccess}. Thank you for supporting medical and food care.</span>
          </div>
        )}

        {/* Dogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDogs.map((dog) => (
            <div
              key={dog.id}
              className="bg-white rounded-3xl overflow-hidden border-2 border-[#ebd7c3] hover:border-[#4a2e1b] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden bg-[#faefe4]">
                <img
                  src={dog.photoUrl}
                  alt={dog.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Breed Tag */}
                <div className="absolute top-3 left-3 bg-[#352018]/85 backdrop-blur-md text-white text-xs font-fredoka px-3 py-1 rounded-full">
                  {dog.breed}
                </div>

                {/* Gender & Age */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#352018] text-xs font-fredoka font-semibold px-2.5 py-1 rounded-full border border-black/10">
                  {dog.gender} • {dog.age}
                </div>

                {/* Rescue Story excerpt */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                  <div className="text-xs font-medium line-clamp-1 italic text-[#f8dfc7]">
                    "{dog.story}"
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-fredoka text-2xl font-bold text-[#26160d]">
                      {dog.name}
                    </h3>
                    <span className="text-xs font-fredoka font-semibold text-[#8a5b3a] bg-[#faefe4] px-2.5 py-1 rounded-full">
                      {dog.size} Size
                    </span>
                  </div>

                  {/* Personality Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {dog.personality.map((trait, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-fredoka bg-[#fbe9dd] text-[#6b442b] px-2.5 py-0.5 rounded-full"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  {/* Health Checkpoints */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5e4537] pt-2 border-t border-[#f4ece1]">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#3aa866]" />
                      <span>{dog.isVaccinated ? 'Vaccinated' : 'Pending Shots'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#3aa866]" />
                      <span>{dog.isNeutered ? 'Spayed / Neutered' : 'Intact'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#3d97ca]" />
                      <span>{dog.goodWithKids ? 'Good with Kids' : 'Adults Preferred'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#3aa866]" />
                      <span>{dog.goodWithDogs ? 'Dog Friendly' : 'Single Dog Home'}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 pt-3 border-t border-[#f4ece1]">
                  <button
                    onClick={() => handleOpenAdoptModal(dog)}
                    className="flex-1 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm py-2.5 rounded-full shadow hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Home className="w-4 h-4" />
                    <span>Adopt {dog.name}</span>
                  </button>

                  <button
                    onClick={(e) => handleSponsor(dog, e)}
                    className="p-2.5 rounded-full bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] border border-[#ebd7c3] transition-colors"
                    title={`Virtually Sponsor ${dog.name}`}
                  >
                    <Heart className="w-4 h-4 text-[#d94141]" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Adopt Application Modal */}
        {selectedDog && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="bg-[#fbf6f0] border-2 border-[#4a2e1b] rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden relative">
              
              {/* Header */}
              <div className="bg-[#4a2e1b] text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Home className="w-5 h-5 text-[#f5d7b7]" />
                  <h3 className="font-fredoka text-lg sm:text-xl font-bold">
                    Adoption Application for {selectedDog.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDog(null)}
                  className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-5">
                
                {applicationSuccess ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#3aa866]/20 text-[#3aa866] flex items-center justify-center mx-auto">
                      <Award className="w-10 h-10" />
                    </div>
                    <h4 className="font-fredoka text-2xl font-bold text-[#26160d]">
                      Application Sent for {selectedDog.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5e4537] max-w-md mx-auto leading-relaxed">
                      Our adoption coordinator will review your application and contact you at <strong>{applicantPhone || applicantEmail}</strong> within 24 hours to schedule the meet-and-greet.
                    </p>
                    <button
                      onClick={() => setSelectedDog(null)}
                      className="bg-[#4a2e1b] text-white font-fredoka text-sm px-6 py-3 rounded-full shadow"
                    >
                      Close & Return to Gallery
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplicationSubmit} className="space-y-4">
                    
                    {/* Selected Dog Summary */}
                    <div className="flex items-center gap-3 bg-[#faefe4] p-3 rounded-2xl border border-[#ebd7c3]">
                      <img
                        src={selectedDog.photoUrl}
                        alt={selectedDog.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div>
                        <div className="font-fredoka text-sm font-bold text-[#352018]">
                          {selectedDog.name} ({selectedDog.breed})
                        </div>
                        <div className="text-xs text-[#7e5c46]">
                          {selectedDog.healthStatus}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block font-fredoka text-xs font-bold text-[#352018]">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Morgan"
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#ebd7c3] text-xs bg-white focus:ring-2 focus:ring-[#4a2e1b] focus:outline-none"
                        />
                        <User className="w-4 h-4 text-[#8a5b3a] absolute left-3 top-3" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            placeholder="+1 (555) 000-0000"
                            value={applicantPhone}
                            onChange={(e) => setApplicantPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#ebd7c3] text-xs bg-white focus:ring-2 focus:ring-[#4a2e1b] focus:outline-none"
                          />
                          <Phone className="w-4 h-4 text-[#8a5b3a] absolute left-3 top-3" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="alex@example.com"
                            value={applicantEmail}
                            onChange={(e) => setApplicantEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#ebd7c3] text-xs bg-white focus:ring-2 focus:ring-[#4a2e1b] focus:outline-none"
                          />
                          <Mail className="w-4 h-4 text-[#8a5b3a] absolute left-3 top-3" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">
                          Housing Arrangement
                        </label>
                        <select
                          value={housingType}
                          onChange={(e) => setHousingType(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-[#ebd7c3] text-xs bg-white focus:ring-2 focus:ring-[#4a2e1b] focus:outline-none"
                        >
                          <option>House with Fenced Yard</option>
                          <option>Apartment / Condo (Pet Friendly)</option>
                          <option>Townhouse with Patio</option>
                          <option>Farm / Acreage</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">
                          Do you have other pets?
                        </label>
                        <select
                          value={hasOtherPets}
                          onChange={(e) => setHasOtherPets(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-[#ebd7c3] text-xs bg-white focus:ring-2 focus:ring-[#4a2e1b] focus:outline-none"
                        >
                          <option>Yes, dog(s)</option>
                          <option>Yes, cat(s)</option>
                          <option>Yes, multiple pets</option>
                          <option>No, first pet</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#b87d55]" />
                        <span>Preferred Meet-and-Greet Date</span>
                      </label>
                      <input
                        type="date"
                        value={meetDate}
                        onChange={(e) => setMeetDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#ebd7c3] text-xs bg-white focus:ring-2 focus:ring-[#4a2e1b] focus:outline-none"
                      />
                    </div>

                    <p className="text-[11px] text-[#7e5c46] italic">
                      PawGuard Adoption Policy: All adoptions include veterinary health check, microchip registration, and 30-day post-adoption behavioral support.
                    </p>

                    <button
                      type="submit"
                      className="w-full bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm py-3.5 rounded-full shadow hover:shadow-lg transition-all"
                    >
                      Submit Adoption Application
                    </button>

                  </form>
                )}

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
