import React, { useState } from 'react';
import { LostFoundDog } from '../types';
import { Search, MapPin, Phone, Printer, PlusCircle, X } from 'lucide-react';
import { playClickSound, playAlertSound } from '../utils/audio';

interface LostAndFoundSectionProps {
  items: LostFoundDog[];
  onAddItem: (item: LostFoundDog) => void;
}

export const LostAndFoundSection: React.FC<LostAndFoundSectionProps> = ({ items, onAddItem }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [showReportModal, setShowReportModal] = useState(false);
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
    setShowReportModal(false);

    // Reset form
    setDogName('');
    setBreed('');
    setColor('');
    setLocation('');
    setContactName('');
    setContactPhone('');
    setReward('');
    setDetails('');
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
    <section id="lost-found" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbf6f0] border-b border-[#eedccb]">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ebd7c3] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-fredoka font-bold text-[#b87d55] uppercase tracking-wider">
              <Search className="w-4 h-4 text-[#4a2e1b]" />
              <span>Reunification & Rescue Noticeboard</span>
            </div>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26160d]">
              Lost, Abandoned & Injured Dogs
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6b4c38] max-w-2xl">
              Post notices for missing pets, report found strays, or alert our network about injured dogs needing urgent assistance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playClickSound();
                setShowReportModal(true);
              }}
              className="flex items-center gap-2 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm px-6 py-3 rounded-full shadow hover:shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Missing or Found Dog</span>
            </button>
          </div>
        </div>

        {/* Noticeboard Display */}
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
                onClick={() => setShowReportModal(true)}
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
                className="bg-white rounded-3xl overflow-hidden border border-[#ebd7c3] shadow-sm p-6 space-y-4 flex flex-col justify-between"
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
                      className="p-2 rounded-full bg-[#4a2e1b] text-white"
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

        {/* Post Notice Modal */}
        {showReportModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-[#fbf6f0] border-2 border-[#4a2e1b] rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 space-y-5 relative">
              <div className="flex items-center justify-between border-b border-[#ebd7c3] pb-3">
                <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                  Create Dog Notice
                </h3>
                <button onClick={() => setShowReportModal(false)}>
                  <X className="w-6 h-6 text-[#4a2e1b]" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Notice Type</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as LostFoundDog['status'])}
                    className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white font-medium"
                  >
                    <option value="lost">Missing Pet (I lost my dog)</option>
                    <option value="found">Found Dog (Safe with me)</option>
                    <option value="injured_stray">Injured Stray (Needs medical attention)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Dog's Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Cooper"
                      value={dogName}
                      onChange={(e) => setDogName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Breed & Color</label>
                    <input
                      type="text"
                      placeholder="e.g. Golden, Brown"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Last Seen Location / Street *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Area, street name, district"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Contact Phone or Info *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your phone number or email"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Reward (Optional)</label>
                    <input
                      type="text"
                      placeholder="Optional reward amount"
                      value={reward}
                      onChange={(e) => setReward(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Details & Identifying Features</label>
                  <textarea
                    rows={2}
                    placeholder="Collar color, unique markings, behavioral traits..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm py-3 rounded-full shadow transition-all mt-2"
                >
                  Publish Notice
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
