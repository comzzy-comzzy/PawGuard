import React, { useState } from 'react';
import { AdoptableDog } from '../types';
import { Home, Heart, PlusCircle, X } from 'lucide-react';
import { playClickSound, playHeartPop } from '../utils/audio';

interface AdoptionSectionProps {
  dogs: AdoptableDog[];
  onAddDog?: (dog: AdoptableDog) => void;
}

export const AdoptionSection: React.FC<AdoptionSectionProps> = ({ dogs, onAddDog }) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showListDogModal, setShowListDogModal] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantContact, setApplicantContact] = useState('');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // List Dog State
  const [newDogName, setNewDogName] = useState('');
  const [newDogBreed, setNewDogBreed] = useState('');
  const [newDogAge, setNewDogAge] = useState('');
  const [newDogStory, setNewDogStory] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHeartPop();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setShowInquiryModal(false);
      setApplicantName('');
      setApplicantContact('');
      setInquiryNotes('');
    }, 2500);
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
    setShowListDogModal(false);
    setNewDogName('');
    setNewDogBreed('');
    setNewDogAge('');
    setNewDogStory('');
  };

  return (
    <section id="adopt" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#faefe4] border-b border-[#eedccb]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#faebd7] text-[#8a5b3a] border border-[#e5cfbd] text-xs font-fredoka font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Home className="w-3.5 h-3.5" />
            <span>Adoption & Rescue Network</span>
          </div>
          
          <h2 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold text-[#26160d]">
            Adoption & Rescue Listings
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#6b4c38]">
            Connect rescued, abandoned, and rehabilitated dogs with compassionate individuals and foster families.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                playClickSound();
                setShowInquiryModal(true);
              }}
              className="bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow"
            >
              Inquire to Adopt or Foster
            </button>

            <button
              onClick={() => {
                playClickSound();
                setShowListDogModal(true);
              }}
              className="bg-white hover:bg-[#faefe4] text-[#4a2e1b] border border-[#ebd7c3] font-fredoka font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-sm"
            >
              List a Rescued Dog
            </button>
          </div>
        </div>

        {/* Listings Display */}
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

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowInquiryModal(true)}
                className="bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow"
              >
                Submit Adoption Inquiry
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dogs.map((dog) => (
              <div
                key={dog.id}
                className="bg-white rounded-3xl overflow-hidden border-2 border-[#ebd7c3] shadow-sm p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h3 className="font-fredoka text-2xl font-bold text-[#26160d]">
                    {dog.name}
                  </h3>
                  <p className="text-xs text-[#8a5b3a] font-semibold">{dog.breed} • {dog.age}</p>
                  <p className="text-xs text-[#5e4537] bg-[#faefe4] p-3 rounded-xl">
                    {dog.story}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f4ece1]">
                  <button
                    onClick={() => setShowInquiryModal(true)}
                    className="w-full bg-[#4a2e1b] text-white text-xs font-fredoka font-semibold py-2.5 rounded-full shadow"
                  >
                    Inquire About {dog.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inquiry Modal */}
        {showInquiryModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#fbf6f0] border-2 border-[#4a2e1b] rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 space-y-4 relative">
              <div className="flex items-center justify-between border-b border-[#ebd7c3] pb-3">
                <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                  Adoption & Foster Inquiry
                </h3>
                <button onClick={() => setShowInquiryModal(false)}>
                  <X className="w-6 h-6 text-[#4a2e1b]" />
                </button>
              </div>

              {inquirySubmitted ? (
                <div className="text-center py-6 space-y-2">
                  <Heart className="w-10 h-10 text-[#3aa866] mx-auto" />
                  <h4 className="font-fredoka text-lg font-bold text-[#26160d]">Inquiry Recorded</h4>
                  <p className="text-xs text-[#6b4c38]">Thank you for your interest in adopting or fostering.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Contact Info (Phone / Email) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your phone number or email"
                      value={applicantContact}
                      onChange={(e) => setApplicantContact(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Adoption Preferences & Home Environment</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your home, previous pet experience, or preferred dog size..."
                      value={inquiryNotes}
                      onChange={(e) => setInquiryNotes(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold py-3 rounded-full shadow"
                    >
                      Submit Adoption Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* List Dog Modal */}
        {showListDogModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#fbf6f0] border-2 border-[#4a2e1b] rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 space-y-4 relative">
              <div className="flex items-center justify-between border-b border-[#ebd7c3] pb-3">
                <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                  List Rescued Dog for Adoption
                </h3>
                <button onClick={() => setShowListDogModal(false)}>
                  <X className="w-6 h-6 text-[#4a2e1b]" />
                </button>
              </div>

              <form onSubmit={handleListDogSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Dog's Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lucky"
                    value={newDogName}
                    onChange={(e) => setNewDogName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Breed / Mix</label>
                    <input
                      type="text"
                      placeholder="e.g. Mixed breed"
                      value={newDogBreed}
                      onChange={(e) => setNewDogBreed(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Estimated Age</label>
                    <input
                      type="text"
                      placeholder="e.g. 1 year"
                      value={newDogAge}
                      onChange={(e) => setNewDogAge(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Rescue Story & Care Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Where was the dog found, current health, behavior..."
                    value={newDogStory}
                    onChange={(e) => setNewDogStory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold py-3 rounded-full shadow"
                >
                  Publish Adoption Listing
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
