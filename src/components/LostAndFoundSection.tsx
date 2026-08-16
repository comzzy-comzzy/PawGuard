import React, { useState } from 'react';
import { LostFoundDog } from '../types';
import { Search, MapPin, Printer, PlusCircle, ArrowLeft, CheckCircle, FileText, X, Camera, Phone, Tag } from 'lucide-react';
import { playClickSound, playAlertSound } from '../utils/audio';

interface LostAndFoundSectionProps {
  items: LostFoundDog[];
  onAddItem: (item: LostFoundDog) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const LostAndFoundSection: React.FC<LostAndFoundSectionProps> = ({ items, onAddItem, onNavigateSection }) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'post'>('browse');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
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
  const [hasMicrochip, setHasMicrochip] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [postSubmitted, setPostSubmitted] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchType = filterType === 'all' || item.status === filterType;
    const matchSearch =
      !searchQuery ||
      (item.dogName && item.dogName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastSeenLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.color.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playAlertSound();

    const newItem: LostFoundDog = {
      id: `LF-${Math.floor(100 + Math.random() * 900)}`,
      status,
      caseStatus: 'open',
      dogName: dogName || (status === 'lost' ? 'Missing Dog' : 'Found Dog'),
      breed: breed || 'Mixed Breed',
      color: color || 'Brown & White',
      lastSeenLocation: location || 'Reported Area',
      date: new Date().toISOString(),
      photoUrl: photoPreview || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
      contactName: contactName || 'Reporter',
      contactPhone: contactPhone || 'Contact provided',
      reward: reward ? `$${reward} Reward` : undefined,
      details: details || 'No additional details provided.',
      hasMicrochip,
      submittedAt: new Date().toISOString(),
      createdAt: Date.now(),
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
    setHasMicrochip(false);
    setPhotoPreview(null);
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
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#faefe4] text-[#8a5b3a] border border-[#ebd7c3] text-xs font-fredoka font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Search className="w-3.5 h-3.5 text-[#ea8e24]" />
            <span>Community Lost & Found Radar</span>
          </div>

          <h1 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold text-[#26160d]">
            Help Reconnect Lost Dogs with Loving Families
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#6b4c38]">
            Browse active lost, found, and injured stray reports, or create an instant notice to alert local volunteers and neighbors.
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
              Noticeboard ({items.length})
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('post');
              }}
              className={`flex items-center gap-1.5 font-fredoka text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all ${
                activeTab === 'post'
                  ? 'bg-[#4a2e1b] text-white shadow font-semibold'
                  : 'bg-white text-[#4a2e1b] border border-[#ebd7c3]'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Missing / Found Dog</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Noticeboard Browse */}
        {activeTab === 'browse' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#ebd7c3] shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
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
                    className={`font-fredoka text-xs px-4 py-2 rounded-full transition-all ${
                      filterType === f.id
                        ? 'bg-[#4a2e1b] text-white font-semibold shadow-sm'
                        : 'bg-[#faefe4] text-[#4a2e1b] hover:bg-[#ebd7c3]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search by breed, color, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full border border-[#ebd7c3] bg-[#fbf6f0] text-xs focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                />
                <Search className="w-4 h-4 text-[#8a5b3a] absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Grid of Listings */}
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border-2 border-[#ebd7c3] text-center max-w-xl mx-auto space-y-4">
                <p className="font-fredoka text-lg text-[#352018]">No matching pet notices found.</p>
                <button
                  onClick={() => {
                    setFilterType('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-fredoka font-bold text-[#b87d55] underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl overflow-hidden border-2 border-[#ebd7c3] hover:border-[#4a2e1b] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-52 relative overflow-hidden bg-[#faefe4]">
                        <img
                          src={item.photoUrl}
                          alt={item.dogName || item.breed}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          {getStatusBadge(item.status)}
                        </div>
                        {item.reward && (
                          <div className="absolute top-3 right-3 bg-[#f59e0b] text-white text-[10px] font-fredoka font-bold px-2.5 py-0.5 rounded-full shadow">
                            {item.reward}
                          </div>
                        )}
                        {item.caseStatus === 'reunited' && (
                          <div className="absolute bottom-3 left-3 bg-[#166534] text-white text-[10px] font-fredoka font-bold px-3 py-1 rounded-full shadow">
                            Reunited Safe ❤️
                          </div>
                        )}
                      </div>

                      <div className="p-5 sm:p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                            {item.dogName || 'Unnamed Dog'}
                          </h3>
                          <span className="text-[11px] font-semibold text-[#8a5b3a]">
                            {item.date}
                          </span>
                        </div>

                        <div className="text-xs text-[#6b4c38] space-y-1">
                          <p><strong>Breed:</strong> {item.breed} ({item.color})</p>
                          <p className="flex items-center gap-1 text-[#8a5b3a]">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#ea8e24]" />
                            <span>{item.lastSeenLocation}</span>
                          </p>
                        </div>

                        <p className="text-xs text-[#5e4537] bg-[#fbf6f0] p-3 rounded-xl border border-[#ebd7c3]/60 line-clamp-2 leading-relaxed">
                          {item.details}
                        </p>

                        <div className="bg-[#faefe4] p-3 rounded-xl text-xs space-y-1 text-[#352018]">
                          <div className="text-[11px] font-fredoka font-bold text-[#8a5b3a] uppercase">Contact:</div>
                          <div className="font-semibold">{item.contactName}</div>
                          <div className="font-mono text-[11px]">{item.contactPhone}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 pt-0 flex gap-2">
                      <button
                        onClick={() => {
                          playClickSound();
                          setPosterDog(item);
                        }}
                        className="flex-1 bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] text-xs font-fredoka font-semibold py-2.5 rounded-full transition-all flex items-center justify-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Flyer</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Embedded Create Notice Form */}
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
                Publish a missing pet, found dog, or injured stray to alert local responders and Admin Desk.
              </p>
            </div>

            {postSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#3aa866]/20 text-[#3aa866] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h4 className="font-fredoka text-2xl font-bold text-[#26160d]">Notice Published to Admin & Public!</h4>
                <p className="text-xs sm:text-sm text-[#6b4c38] max-w-md mx-auto">
                  Your report has been logged into the Admin Dashboard and published on the live reunification radar.
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
                    <option value="found">Found Dog (Safe with me / At shelter)</option>
                    <option value="injured_stray">Injured Stray (Spotted needing medical care)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Breed / Mix *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Golden Retriever"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Color / Markings</label>
                    <input
                      type="text"
                      placeholder="e.g. Honey Gold"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Last Seen Location / Street *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oak Ridge Park, Near Lake Trail or 5th Avenue"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amanda Miller"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 789-0123"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Reward (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 250"
                      value={reward}
                      onChange={(e) => setReward(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#ebd7c3] bg-[#fbf6f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
                    />
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Pet Photo (Optional)</label>
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka font-semibold px-4 py-2.5 rounded-xl border border-[#ebd7c3] flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      <span>Upload Dog Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {photoPreview && (
                      <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#4a2e1b]">
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasMicrochip}
                      onChange={(e) => setHasMicrochip(e.target.checked)}
                      className="rounded text-[#4a2e1b] focus:ring-[#4a2e1b] w-4 h-4"
                    />
                    <span className="font-semibold text-xs text-[#352018]">Dog is microchipped</span>
                  </label>
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
                    Publish Notice to Admin
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
                  {posterDog.status === 'lost' ? 'MISSING DOG' : 'FOUND DOG'}
                </div>
                <h3 className="font-fredoka text-2xl font-bold text-[#26160d]">
                  {posterDog.status === 'lost' ? `PLEASE HELP FIND ${posterDog.dogName?.toUpperCase()}` : `FOUND: ${posterDog.breed.toUpperCase()}`}
                </h3>

                <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-[#4a2e1b]">
                  <img src={posterDog.photoUrl} alt="Pet" className="w-full h-full object-cover" />
                </div>

                <div className="text-left text-xs space-y-1 bg-[#faefe4] p-4 rounded-xl text-[#352018]">
                  <p><strong>Breed / Color:</strong> {posterDog.breed} ({posterDog.color})</p>
                  <p><strong>Last Seen:</strong> {posterDog.lastSeenLocation}</p>
                  <p><strong>Notes:</strong> {posterDog.details}</p>
                  {posterDog.reward && <p className="text-[#d94141] font-bold"><strong>Reward:</strong> {posterDog.reward}</p>}
                </div>

                <div className="bg-[#352018] text-white p-3 rounded-xl">
                  <div className="text-xs uppercase font-fredoka text-[#f5d7b7]">If Seen, Please Contact Immediately:</div>
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
