import React, { useState } from 'react';
import { AdoptableDog } from '../types';
import { Home, Heart, PlusCircle, ArrowLeft, CheckCircle, Sparkles, UserCheck } from 'lucide-react';
import { playClickSound, playHeartPop } from '../utils/audio';

interface AdoptionSectionProps {
  dogs: AdoptableDog[];
  onAddDog?: (dog: AdoptableDog) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const AdoptionSection: React.FC<AdoptionSectionProps> = ({ dogs, onAddDog, onNavigateSection }) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'inquire' | 'list'>('browse');
  const [applicantName, setApplicantName] = useState('');
  const [applicantContact, setApplicantContact] = useState('');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [targetDogName, setTargetDogName] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // List Dog State
  const [newDogName, setNewDogName] = useState('');
  const [newDogBreed, setNewDogBreed] = useState('');
  const [newDogAge, setNewDogAge] = useState('');
  const [newDogStory, setNewDogStory] = useState('');
  const [dogListedSuccess, setDogListedSuccess] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHeartPop();
    setInquirySubmitted(true);
  };

  const handleListDogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    if (onAddDog) {
      const newDog: AdoptableDog = {
        id: `ADOPT-${Date.now()}`,
        name: newDogName || 'Rescued Dog',
        breed: newDogBreed || 'Mixed Breed',
        age: newDogAge || 'Unknown',
        gender: 'Male',
        size: 'Medium',
        photoUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&auto=format&fit=crop&q=80',
        personality: ['Gentle', 'Needs Home'],
        story: newDogStory || 'Rescued dog looking for a compassionate family.',
        healthStatus: 'Vetted',
        isVaccinated: true,
        isNeutered: false,
        goodWithKids: true,
        goodWithDogs: true,
        goodWithCats: false,
        rescueDate: 'Recent'
      };
      onAddDog(newDog);
    }
    setDogListedSuccess(true);
  };

  const resetForms = () => {
    setApplicantName('');
    setApplicantContact('');
    setInquiryNotes('');
    setTargetDogName('');
    setInquirySubmitted(false);
    setNewDogName('');
    setNewDogBreed('');
    setNewDogAge('');
    setNewDogStory('');
    setDogListedSuccess(false);
    setActiveTab('browse');
  };

  return (
    <section id="adopt" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#faefe4]">
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

            <span className="text-xs font-fredoka font-semibold uppercase tracking-wider text-[#3aa866] bg-[#dcfce7] px-3.5 py-1 rounded-full border border-[#86efac]">
              Adoption & Foster Desk
            </span>
          </div>
        )}

        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-white text-[#8a5b3a] border border-[#e5cfbd] text-xs font-fredoka font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            <Home className="w-3.5 h-3.5 text-[#3aa866]" />
            <span>Adoption & Foster Network</span>
          </div>
          
          <h1 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold text-[#26160d]">
            Adopt, Foster or List a Rescued Dog
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#6b4c38]">
            Connect rescued, rehabilitated, and sheltered dogs with compassionate forever homes and temporary foster guardians.
          </p>

          {/* Embedded Sub-Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('browse');
              }}
              className={`font-fredoka text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all ${
                activeTab === 'browse'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3] hover:bg-[#fbf6f0]'
              }`}
            >
              Browse Dogs ({dogs.length})
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('inquire');
              }}
              className={`font-fredoka text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all ${
                activeTab === 'inquire'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3] hover:bg-[#fbf6f0]'
              }`}
            >
              Inquire to Adopt / Foster
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('list');
              }}
              className={`font-fredoka text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all ${
                activeTab === 'list'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3] hover:bg-[#fbf6f0]'
              }`}
            >
              + List a Rescued Dog
            </button>
          </div>
        </div>

        {/* Tab 1: Browse Listings */}
        {activeTab === 'browse' && (
          <div className="space-y-8 animate-fadeIn">
            {dogs.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 sm:p-14 border-2 border-[#ebd7c3] text-center max-w-2xl mx-auto space-y-5 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-[#b87d55]" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-fredoka text-2xl font-bold text-[#26160d]">
                    No Adoption Listings Currently Active
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#6b4c38] max-w-md mx-auto leading-relaxed">
                    If you have rescued a dog needing a permanent home or foster placement, or if you would like to open your home to an animal in need, submit an inquiry or listing below.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('inquire')}
                    className="bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow"
                  >
                    Submit Adoption Inquiry
                  </button>
                  <button
                    onClick={() => setActiveTab('list')}
                    className="bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka font-semibold text-xs sm:text-sm px-6 py-3 rounded-full border border-[#ebd7c3]"
                  >
                    List Rescued Dog
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dogs.map((dog) => (
                  <div
                    key={dog.id}
                    className="bg-white rounded-3xl overflow-hidden border-2 border-[#ebd7c3] shadow-sm p-6 space-y-4 flex flex-col justify-between hover:shadow-md transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-fredoka text-2xl font-bold text-[#26160d]">
                          {dog.name}
                        </h3>
                        <span className="text-[10px] font-fredoka font-bold uppercase text-[#3aa866] bg-[#dcfce7] px-2.5 py-0.5 rounded-full border border-[#86efac]">
                          Available
                        </span>
                      </div>
                      <p className="text-xs text-[#8a5b3a] font-semibold">{dog.breed} • {dog.age}</p>
                      <p className="text-xs text-[#5e4537] bg-[#faefe4] p-3.5 rounded-2xl leading-relaxed">
                        {dog.story}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#f4ece1]">
                      <button
                        onClick={() => {
                          setTargetDogName(dog.name);
                          setActiveTab('inquire');
                        }}
                        className="w-full bg-[#4a2e1b] hover:bg-[#352018] text-white text-xs sm:text-sm font-fredoka font-semibold py-3 rounded-full shadow transition-all flex items-center justify-center gap-1.5"
                      >
                        <Heart className="w-3.5 h-3.5 text-[#f5d7b7]" />
                        <span>Inquire About {dog.name}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Embedded Adoption Inquiry Form */}
        {activeTab === 'inquire' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-[#4a2e1b] shadow-xl p-6 sm:p-10 space-y-6 animate-fadeIn">
            <div className="border-b border-[#ebd7c3] pb-4 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-fredoka text-2xl font-bold text-[#26160d] flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-[#3aa866]" />
                  <span>Adoption & Foster Inquiry Form</span>
                </h3>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="text-xs font-fredoka font-bold text-[#8a5b3a] hover:underline"
                >
                  ← Back to Dogs
                </button>
              </div>
              <p className="text-xs text-[#6b4c38]">
                {targetDogName ? `Inquiring specifically for: ${targetDogName}` : 'Express your interest in adopting or providing foster care.'}
              </p>
            </div>

            {inquirySubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#3aa866]/20 text-[#3aa866] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h4 className="font-fredoka text-2xl font-bold text-[#26160d]">Inquiry Recorded!</h4>
                <p className="text-xs sm:text-sm text-[#6b4c38] max-w-md mx-auto">
                  Thank you for opening your heart to a dog in need. Our adoption team will reach out to coordinate next steps.
                </p>
                <button
                  onClick={resetForms}
                  className="bg-[#4a2e1b] text-white font-fredoka text-xs sm:text-sm px-7 py-3 rounded-full shadow"
                >
                  Return to Listings
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  />
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Contact Phone or Email *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your contact phone number or email address"
                    value={applicantContact}
                    onChange={(e) => setApplicantContact(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  />
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Adoption / Foster Preferences & Home Environment</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your household (fenced yard, children, other pets, previous dog care experience)..."
                    value={inquiryNotes}
                    onChange={(e) => setInquiryNotes(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  ></textarea>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('browse')}
                    className="w-1/3 bg-[#faefe4] text-[#4a2e1b] font-fredoka font-semibold py-3.5 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm py-3.5 rounded-full shadow"
                  >
                    Submit Adoption Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 3: Embedded List Dog Form */}
        {activeTab === 'list' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-[#4a2e1b] shadow-xl p-6 sm:p-10 space-y-6 animate-fadeIn">
            <div className="border-b border-[#ebd7c3] pb-4 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-fredoka text-2xl font-bold text-[#26160d] flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#b87d55]" />
                  <span>List a Rescued Dog for Adoption</span>
                </h3>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="text-xs font-fredoka font-bold text-[#8a5b3a] hover:underline"
                >
                  ← Back to Dogs
                </button>
              </div>
              <p className="text-xs text-[#6b4c38]">
                Publish a rescued dog to connect them with potential adopters or foster families.
              </p>
            </div>

            {dogListedSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#3aa866]/20 text-[#3aa866] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h4 className="font-fredoka text-2xl font-bold text-[#26160d]">Dog Listed Successfully!</h4>
                <p className="text-xs sm:text-sm text-[#6b4c38] max-w-md mx-auto">
                  The listing is now active on the public adoption directory.
                </p>
                <button
                  onClick={resetForms}
                  className="bg-[#4a2e1b] text-white font-fredoka text-xs sm:text-sm px-7 py-3 rounded-full shadow"
                >
                  View Listings Directory
                </button>
              </div>
            ) : (
              <form onSubmit={handleListDogSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Dog's Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bella"
                    value={newDogName}
                    onChange={(e) => setNewDogName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Breed / Mix</label>
                    <input
                      type="text"
                      placeholder="e.g. Golden Retriever mix"
                      value={newDogBreed}
                      onChange={(e) => setNewDogBreed(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Estimated Age</label>
                    <input
                      type="text"
                      placeholder="e.g. 2 years old"
                      value={newDogAge}
                      onChange={(e) => setNewDogAge(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Rescue Story & Personality Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Where was the dog rescued, current health status, temperaments, good with other pets..."
                    value={newDogStory}
                    onChange={(e) => setNewDogStory(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  ></textarea>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('browse')}
                    className="w-1/3 bg-[#faefe4] text-[#4a2e1b] font-fredoka font-semibold py-3.5 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm py-3.5 rounded-full shadow"
                  >
                    Publish Adoption Listing
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
