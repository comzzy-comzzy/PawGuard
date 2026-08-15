import React, { useState } from 'react';
import { LostFoundDog } from '../types';
import { Search, MapPin, Printer, PlusCircle, ArrowLeft, CheckCircle, FileText, X } from 'lucide-react';
import { playClickSound, playAlertSound } from '../utils/audio';

interface LostAndFoundSectionProps {
  items: LostFoundDog[];
  onAddItem: (item: LostFoundDog) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const LostAndFoundSection: React.FC<LostAndFoundSectionProps> = ({ items, onAddItem, onNavigateSection }) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'post'>('browse');
  const [filterType, setFilterType] = useState<string>('all');
  const [posterDog, setPosterDog] = useState<LostFoundDog | null>(null);

  // Form states
  const [status, setStatus] = useState<LostFoundDog['status']>('lost');
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [reward, setReward] = useState('');
  const [details, setDetails] = useState('');
  const [postSubmitted, setPostSubmitted] = useState(false);

  const filteredItems = items.filter((item) => {
    if (filterType === 'all') return true;
    return item.status === filterType;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playAlertSound();

    const newItem: LostFoundDog = {
      id: `LF-${Math.floor(100 + Math.random() * 900)}`,
      status,
      dogName: dogName || 'Unnamed Dog',
      breed: breed || 'Mixed Breed',
      color: color || 'Brown & White',
      lastSeenLocation: location || 'Reported Area',
      date: 'Just now',
      photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
      contactName: contactName || 'Reporter',
      contactPhone: contactPhone || 'Contact details provided',
      reward: reward ? `$${reward} Reward` : undefined,
      details,
      hasMicrochip: false
    };

    onAddItem(newItem);
    setPostSubmitted(true);
  };

  const resetForm = () => {
    setDogName('');
    setBreed('');
    setColor('');
    setLocation('');
    setContactName('');
    setContactPhone('');
    setReward('');
    setDetails('');
    setPostSubmitted(false);
    setActiveTab('browse');
  };

  const getStatusBadge = (s: LostFoundDog['status']) => {
    switch (s) {
      case 'lost':
        return <span className="bg-[#fee2e2] text-[#991b1b] border border-[#fca5a5] text-[10px] font-fredoka font-bold px-2.5 py-0.5 rounded-full">Missing Pet</span>;
      case 'found':
        return <span className="bg-[#dcfce7] text-[#166534] border border-[#86efac] text-[10px] font-fredoka font-bold px-2.5 py-0.5 rounded-full">Found / Sheltered</span>;
      case 'injured_stray':
        return <span className="bg-[#ffedd5] text-[#9a3412] border border-[#fdba74] text-[10px] font-fredoka font-bold px-2.5 py-0.5 rounded-full">Injured Stray</span>;
    }
  };

  return (
    <section id="lost-found" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#fbf6f0]">
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

            <span className="text-xs font-fredoka font-semibold uppercase tracking-wider text-[#ea8e24] bg-[#ffedd5] px-3.5 py-1 rounded-full border border-[#fdba74]">
              Reunification Board
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ebd7c3] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-fredoka font-bold text-[#b87d55] uppercase tracking-wider">
              <Search className="w-4 h-4 text-[#4a2e1b]" />
              <span>Reunification & Stray Noticeboard</span>
            </div>
            <h1 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26160d]">
              Lost, Found & Injured Dogs
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#6b4c38] max-w-2xl">
              Post notices for missing pets, report found dogs, or alert community rescuers about injured strays requiring urgent care.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('browse');
              }}
              className={`font-fredoka text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all ${
                activeTab === 'browse'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3]'
              }`}
            >
              Browse Notices ({items.length})
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('post');
              }}
              className={`flex items-center gap-1.5 font-fredoka text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all ${
                activeTab === 'post'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3]'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Notice</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Browse Notices */}
        {activeTab === 'browse' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Notices' },
                { id: 'lost', label: 'Missing Pets' },
                { id: 'found', label: 'Found Dogs' },
                { id: 'injured_stray', label: 'Injured Strays' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    playClickSound();
                    setFilterType(f.id);
                  }}
                  className={`font-fredoka text-xs px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                    filterType === f.id
                      ? 'bg-[#4a2e1b] text-white font-bold'
                      : 'bg-white text-[#6b442b] border border-[#ebd7c3] hover:bg-[#faefe4]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Items Grid */}
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 sm:p-14 border-2 border-[#ebd7c3] text-center max-w-2xl mx-auto space-y-5 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-[#faefe4] text-[#4a2e1b] flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-[#b87d55]" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-fredoka text-2xl font-bold text-[#26160d]">
                    No Lost or Injured Dog Notices Currently
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#6b4c38] max-w-md mx-auto leading-relaxed">
                    If your pet is missing or you found an abandoned or injured dog, create a notice below to alert the community.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('post')}
                    className="bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow"
                  >
                    Post a Notice
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl overflow-hidden border border-[#ebd7c3] shadow-sm p-6 space-y-4 flex flex-col justify-between hover:shadow-md transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                          {item.dogName}
                        </h3>
                        {getStatusBadge(item.status)}
                      </div>
                      <p className="text-xs text-[#8a5b3a] font-semibold">{item.breed} • {item.color}</p>
                      <p className="text-xs text-[#5e4537] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#b87d55]" />
                        <span>{item.lastSeenLocation}</span>
                      </p>
                      <p className="text-xs text-[#5e4537] bg-[#faefe4] p-3 rounded-xl">
                        {item.details}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#f4ece1] flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#4a2e1b]">Contact: {item.contactPhone}</span>

                      {item.status === 'lost' && (
                        <button
                          onClick={() => setPosterDog(item)}
                          className="p-2 rounded-full bg-[#4a2e1b] text-white hover:bg-[#352018] transition-colors"
                          title="Print Flyer"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Embedded Post Notice Form */}
        {activeTab === 'post' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-[#4a2e1b] shadow-xl p-6 sm:p-10 space-y-6 animate-fadeIn">
            <div className="border-b border-[#ebd7c3] pb-4 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-fredoka text-2xl font-bold text-[#26160d] flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#4a2e1b]" />
                  <span>Create Missing or Found Dog Notice</span>
                </h3>
                <button
                  onClick={() => setActiveTab('browse')}
                  className="text-xs font-fredoka font-bold text-[#8a5b3a] hover:underline"
                >
                  ← Back to Notices
                </button>
              </div>
              <p className="text-xs text-[#6b4c38]">
                Publish a missing pet, found dog, or injured stray to help alert nearby responders.
              </p>
            </div>

            {postSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#3aa866]/20 text-[#3aa866] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h4 className="font-fredoka text-2xl font-bold text-[#26160d]">Notice Published!</h4>
                <p className="text-xs sm:text-sm text-[#6b4c38] max-w-md mx-auto">
                  Your notice has been added to the community reunification board.
                </p>
                <button
                  onClick={resetForm}
                  className="bg-[#4a2e1b] text-white font-fredoka text-xs sm:text-sm px-7 py-3 rounded-full shadow"
                >
                  Return to Noticeboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Notice Classification *</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as LostFoundDog['status'])}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  >
                    <option value="lost">Missing Pet (I lost my dog)</option>
                    <option value="found">Found Dog (Safe with me)</option>
                    <option value="injured_stray">Injured Stray (Needs medical care)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Dog's Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Cooper"
                      value={dogName}
                      onChange={(e) => setDogName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Breed & Color</label>
                    <input
                      type="text"
                      placeholder="e.g. Golden, Brown"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Last Seen Location / Street *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Area, street name, district, or landmark"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Contact Phone or Info *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your phone number or email"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Reward (Optional)</label>
                    <input
                      type="text"
                      placeholder="Optional reward amount"
                      value={reward}
                      onChange={(e) => setReward(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Details & Identifying Features</label>
                  <textarea
                    rows={3}
                    placeholder="Collar color, unique markings, behavioral traits, microchip info..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
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
                    Publish Notice
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Printable Poster Modal */}
        {posterDog && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 space-y-6 relative border-4 border-[#d94141]">
              
              <button
                onClick={() => setPosterDog(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black p-1"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Poster Content */}
              <div className="text-center space-y-3">
                <div className="bg-[#d94141] text-white font-fredoka text-3xl font-extrabold py-2 px-4 rounded-xl uppercase tracking-wider inline-block">
                  MISSING DOG
                </div>
                <h3 className="font-fredoka text-2xl font-bold text-[#26160d]">
                  PLEASE HELP FIND {posterDog.dogName?.toUpperCase()}
                </h3>

                <div className="text-left text-xs space-y-1 bg-[#faefe4] p-4 rounded-xl text-[#352018]">
                  <p><strong>Breed / Color:</strong> {posterDog.breed} ({posterDog.color})</p>
                  <p><strong>Last Seen:</strong> {posterDog.lastSeenLocation}</p>
                  <p><strong>Notes:</strong> {posterDog.details}</p>
                </div>

                <div className="bg-[#352018] text-white p-3 rounded-xl">
                  <div className="text-xs uppercase font-fredoka text-[#f5d7b7]">If Seen, Please Contact:</div>
                  <div className="text-lg font-mono font-bold">{posterDog.contactPhone}</div>
                  <div className="text-[11px] text-white/80">{posterDog.contactName}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold py-3 rounded-full shadow flex items-center justify-center gap-2 text-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Flyer (PDF)</span>
                </button>
                <button
                  onClick={() => setPosterDog(null)}
                  className="px-6 py-3 rounded-full bg-[#faefe4] text-[#4a2e1b] font-fredoka text-sm"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
