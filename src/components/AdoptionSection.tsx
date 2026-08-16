import React, { useState } from 'react';
import { AdoptableDog, AdoptionInquiry } from '../types';
import { Home, Heart, PlusCircle, ArrowLeft, CheckCircle, Sparkles, UserCheck, Phone, Mail, ShieldCheck } from 'lucide-react';
import { playClickSound, playHeartPop } from '../utils/audio';

interface AdoptionSectionProps {
  dogs: AdoptableDog[];
  onAddDog?: (dog: AdoptableDog) => void;
  onAddInquiry?: (inquiry: AdoptionInquiry) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const AdoptionSection: React.FC<AdoptionSectionProps> = ({
  dogs,
  onAddDog,
  onAddInquiry,
  onNavigateSection,
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'inquire' | 'list'>('browse');
  
  // Inquiry Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [targetDogName, setTargetDogName] = useState('');
  const [housingType, setHousingType] = useState<AdoptionInquiry['housingType']>('House with Fenced Yard');
  const [hasOtherPets, setHasOtherPets] = useState(false);
  const [hasChildren, setHasChildren] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState<AdoptionInquiry['experienceLevel']>('Experienced Dog Parent');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // List Dog State
  const [newDogName, setNewDogName] = useState('');
  const [newDogBreed, setNewDogBreed] = useState('');
  const [newDogAge, setNewDogAge] = useState('');
  const [newDogSize, setNewDogSize] = useState<AdoptableDog['size']>('Medium');
  const [newDogGender, setNewDogGender] = useState<AdoptableDog['gender']>('Male');
  const [newDogStory, setNewDogStory] = useState('');
  const [listerName, setListerName] = useState('');
  const [listerPhone, setListerPhone] = useState('');
  const [dogListedSuccess, setDogListedSuccess] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHeartPop();

    const newInquiry: AdoptionInquiry = {
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      applicantName,
      applicantEmail,
      applicantPhone,
      dogName: targetDogName || 'General Adoption Interest',
      housingType,
      hasOtherPets,
      hasChildren,
      experienceLevel,
      notes: inquiryNotes || 'Ready to provide a loving home.',
      submittedAt: new Date().toISOString(),
      createdAt: Date.now(),
      status: 'pending',
    };

    if (onAddInquiry) {
      onAddInquiry(newInquiry);
    }
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
        gender: newDogGender,
        size: newDogSize,
        photoUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&auto=format&fit=crop&q=80',
        personality: ['Gentle', 'Needs Home', 'Loving'],
        story: newDogStory || 'Rescued dog looking for a compassionate family.',
        healthStatus: 'Vetted & Clean Bill of Health',
        isVaccinated: true,
        isNeutered: false,
        goodWithKids: true,
        goodWithDogs: true,
        goodWithCats: false,
        rescueDate: new Date().toISOString(),
        status: 'available',
        submittedBy: listerName || 'Community Member',
        contactPhone: listerPhone || undefined,
      };
      onAddDog(newDog);
    }
    setDogListedSuccess(true);
  };

  const resetForms = () => {
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setInquiryNotes('');
    setTargetDogName('');
    setInquirySubmitted(false);
    setNewDogName('');
    setNewDogBreed('');
    setNewDogAge('');
    setNewDogStory('');
    setListerName('');
    setListerPhone('');
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
            Give a Rescued Dog a Second Chance
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#6b4c38]">
            Every rescued dog deserves warmth, safety, and a dedicated family. Browse available dogs or submit an adoption/foster application.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('browse');
              }}
              className={`font-fredoka text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all ${
                activeTab === 'browse'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3]'
              }`}
            >
              Browse Dogs ({dogs.length})
            </button>

            <button
              onClick={() => {
                playClickSound();
                setTargetDogName('');
                setActiveTab('inquire');
              }}
              className={`font-fredoka text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all ${
                activeTab === 'inquire'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3]'
              }`}
            >
              Apply to Adopt / Foster
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('list');
              }}
              className={`font-fredoka text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all ${
                activeTab === 'list'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3]'
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
                    className="bg-white rounded-3xl overflow-hidden border-2 border-[#ebd7c3] shadow-sm hover:border-[#4a2e1b] hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-56 relative overflow-hidden bg-[#faefe4]">
                        <img
                          src={dog.photoUrl}
                          alt={dog.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-[#4a2e1b]/80 backdrop-blur-md text-white text-[10px] font-fredoka font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {dog.gender} • {dog.size}
                        </div>
                        <div className="absolute top-3 right-3 bg-[#dcfce7] border border-[#86efac] text-[#166534] text-[10px] font-fredoka font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {dog.status === 'adopted' ? 'Adopted ❤️' : 'Available'}
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-fredoka text-2xl font-bold text-[#26160d]">
                            {dog.name}
                          </h3>
                          <span className="text-xs font-semibold text-[#8a5b3a] bg-[#faefe4] px-2.5 py-1 rounded-lg">
                            {dog.age}
                          </span>
                        </div>

                        <p className="text-xs font-semibold text-[#7e5c46]">
                          {dog.breed}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {dog.personality?.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-fredoka font-semibold bg-[#faefe4] text-[#4a2e1b] px-2.5 py-0.5 rounded-full border border-[#ebd7c3]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p className="text-xs text-[#5e4537] bg-[#fbf6f0] p-3.5 rounded-2xl leading-relaxed border border-[#ebd7c3]/60 line-clamp-3">
                          {dog.story}
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#6b4c38] pt-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#3aa866]">✓</span> Vaccinated
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#3aa866]">✓</span> Good w/ Kids
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        onClick={() => {
                          setTargetDogName(dog.name);
                          setActiveTab('inquire');
                        }}
                        className="w-full bg-[#4a2e1b] hover:bg-[#352018] text-white text-xs sm:text-sm font-fredoka font-semibold py-3 rounded-full shadow transition-all flex items-center justify-center gap-1.5 group-hover:shadow-md"
                      >
                        <Heart className="w-4 h-4 text-[#f5d7b7] fill-[#f5d7b7]" />
                        <span>Apply to Adopt {dog.name}</span>
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
                  <span>Adoption & Foster Application Form</span>
                </h3>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="text-xs font-fredoka font-bold text-[#8a5b3a] hover:underline"
                >
                  ← Back to Dogs
                </button>
              </div>
              <p className="text-xs text-[#6b4c38]">
                {targetDogName ? `Inquiring specifically for: ${targetDogName}` : 'Express your interest in adopting or providing emergency foster care.'}
              </p>
            </div>

            {inquirySubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#3aa866]/20 text-[#3aa866] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h4 className="font-fredoka text-2xl font-bold text-[#26160d]">Application Submitted to Admin!</h4>
                <p className="text-xs sm:text-sm text-[#6b4c38] max-w-md mx-auto">
                  Thank you for opening your heart to a dog in need. Your full application has been received by our Admin Desk and will be reviewed promptly.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={resetForms}
                    className="bg-[#4a2e1b] text-white font-fredoka text-xs sm:text-sm px-7 py-3 rounded-full shadow"
                  >
                    Return to Listings
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Target Dog Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Barnaby, Luna, or General Adoption"
                    value={targetDogName}
                    onChange={(e) => setTargetDogName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samantha Brooks"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 312-7744"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. samantha.brooks@example.com"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Housing & Yard Type</label>
                    <select
                      value={housingType}
                      onChange={(e) => setHousingType(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    >
                      <option value="House with Fenced Yard">House with Fenced Yard</option>
                      <option value="Apartment / Condo">Apartment / Condo</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Farm / Acreage">Farm / Acreage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Dog Care Experience</label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    >
                      <option value="First-time Owner">First-time Owner</option>
                      <option value="Experienced Dog Parent">Experienced Dog Parent</option>
                      <option value="Professional Trainer/Foster">Professional Trainer/Foster</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-6 py-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasOtherPets}
                      onChange={(e) => setHasOtherPets(e.target.checked)}
                      className="rounded text-[#4a2e1b] focus:ring-[#4a2e1b] w-4 h-4"
                    />
                    <span className="font-semibold text-xs text-[#352018]">Have other pets in home</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasChildren}
                      onChange={(e) => setHasChildren(e.target.checked)}
                      className="rounded text-[#4a2e1b] focus:ring-[#4a2e1b] w-4 h-4"
                    />
                    <span className="font-semibold text-xs text-[#352018]">Children in household</span>
                  </label>
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Why would you like to adopt this pet? *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your household routine, exercise plan, and why you feel you are a great match..."
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
                    Submit Application to Admin
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
                  The listing is now active on the public adoption directory and logged into the Admin Dashboard.
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Gender</label>
                    <select
                      value={newDogGender}
                      onChange={(e) => setNewDogGender(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Your Name / Foster Parent</label>
                    <input
                      type="text"
                      placeholder="e.g. Clara Oswald"
                      value={listerName}
                      onChange={(e) => setListerName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 (555) 441-3329"
                      value={listerPhone}
                      onChange={(e) => setListerPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Rescue Story & Personality Notes *</label>
                  <textarea
                    rows={3}
                    required
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
