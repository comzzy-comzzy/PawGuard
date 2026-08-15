import React, { useState } from 'react';
import { VOLUNTEERS } from '../data/mockData';
import { Users, UserPlus, Heart, MessageSquare, Send, Award, CheckCircle, Shield } from 'lucide-react';
import { playClickSound, playHeartPop } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  badge?: string;
  hasLiked?: boolean;
}

export const CommunitySection: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 'p1',
      author: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      time: '25m ago',
      content: 'Just arrived at District 4 to check on Teddy the chained puppy. Animal control officer accompanied us. Teddy is unchained, wrapped in a fleece blanket and having his first warm meal in months! 🐶❤️',
      likes: 42,
      badge: 'Rescue Responder'
    },
    {
      id: 'p2',
      author: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      time: '2h ago',
      content: 'Mama hound and all 5 puppies are stable at St. Francis Clinic! Blood tests look great. Huge thank you to everyone who reported the coordinates so quickly.',
      likes: 68,
      badge: 'Shelter Lead'
    },
    {
      id: 'p3',
      author: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      time: '5h ago',
      content: 'Reminder for everyone in the North Valley area: temperatures are dropping below freezing tonight. If you see any dog left outside without insulated shelter, please submit an immediate PawGuard report.',
      likes: 89,
      badge: 'Community Scout'
    }
  ]);

  const [newPostText, setNewPostText] = useState('');
  const [showGuildModal, setShowGuildModal] = useState(false);
  const [guildJoined, setGuildJoined] = useState(false);

  // Volunteer sign-up form
  const [vName, setVName] = useState('');
  const [vRole, setVRole] = useState('Rescue Driver & Transport');
  const [vLocation, setVLocation] = useState('');
  const [vPhone, setVPhone] = useState('');

  const handleLike = (postId: string) => {
    playHeartPop();
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: p.hasLiked ? p.likes - 1 : p.likes + 1,
          hasLiked: !p.hasLiked
        };
      }
      return p;
    }));
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    playClickSound();

    const newPost: CommunityPost = {
      id: `p-${Date.now()}`,
      author: 'You (PawGuard Advocate)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      time: 'Just now',
      content: newPostText,
      likes: 1,
      badge: 'Advocate'
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleGuildSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playHeartPop();
    setGuildJoined(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#b87d55', '#3aa866', '#4a2e1b']
    });
  };

  return (
    <section id="community" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#fbf6f0] border-b border-[#eedccb]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ebd7c3] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-fredoka font-bold text-[#b87d55] uppercase tracking-wider">
              <Users className="w-4 h-4 text-[#4a2e1b]" />
              <span>PawGuard Volunteer Guild & Network</span>
            </div>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-bold text-[#26160d]">
              Join a Compassionate Community
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6b4c38] max-w-2xl">
              Connect with animal defenders, emergency transport drivers, volunteer fosters, and veterinary responders united to end dog cruelty.
            </p>
          </div>

          <button
            onClick={() => {
              playClickSound();
              setShowGuildModal(true);
              setGuildJoined(false);
            }}
            className="flex items-center gap-2 bg-[#4a2e1b] hover:bg-[#352018] text-white font-fredoka font-semibold text-sm px-6 py-3 rounded-full shadow hover:shadow-md transition-all self-start md:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Join as Volunteer</span>
          </button>
        </div>

        {/* Community Layout: Left Feed + Right Volunteer Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Feed (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Create Post Card */}
            <form onSubmit={handlePostSubmit} className="bg-white rounded-3xl p-5 border border-[#ebd7c3] shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#faefe4] text-[#4a2e1b] font-bold font-fredoka flex items-center justify-center border border-[#ebd7c3]">
                  🐾
                </div>
                <input
                  type="text"
                  placeholder="Share a rescue update, patrol tip, or dog welfare thought..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#ebd7c3] bg-[#faf4ed] text-xs sm:text-sm text-[#352018] focus:ring-2 focus:ring-[#4a2e1b] focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={!newPostText.trim()}
                  className="bg-[#4a2e1b] hover:bg-[#352018] disabled:opacity-50 text-white font-fredoka text-xs px-5 py-2 rounded-full shadow flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Update</span>
                </button>
              </div>
            </form>

            {/* Posts Stream */}
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl p-6 border border-[#ebd7c3] shadow-sm space-y-3.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover border border-[#4a2e1b]/20"
                      />
                      <div>
                        <div className="font-fredoka text-sm font-bold text-[#26160d] flex items-center gap-2">
                          <span>{post.author}</span>
                          {post.badge && (
                            <span className="text-[10px] font-fredoka bg-[#faefe4] text-[#8a5b3a] px-2 py-0.5 rounded-full">
                              {post.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#8a6853]">{post.time}</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4a2e1b] leading-relaxed">
                    {post.content}
                  </p>

                  <div className="pt-2 border-t border-[#f4ece1] flex items-center justify-between">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-fredoka px-3 py-1.5 rounded-full transition-all ${
                        post.hasLiked
                          ? 'bg-[#fee2e2] text-[#991b1b]'
                          : 'bg-[#faefe4] text-[#6b442b] hover:bg-[#ebd7c3]'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${post.hasLiked ? 'fill-[#991b1b]' : ''}`} />
                      <span>{post.likes} Paws of Support</span>
                    </button>

                    <button
                      onClick={() => alert('Reply feature connected to volunteer dispatch.')}
                      className="flex items-center gap-1 text-xs text-[#8a6853] hover:text-[#352018]"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Volunteer Leaderboard & Impact (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Top Volunteers */}
            <div className="bg-white rounded-3xl p-6 border-2 border-[#ebd7c3] shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#f4ece1] pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#f59e0b]" />
                  <h3 className="font-fredoka text-lg font-bold text-[#26160d]">
                    Top Rescue Responders
                  </h3>
                </div>
                <span className="text-xs text-[#8a5b3a] font-semibold">This Month</span>
              </div>

              <div className="space-y-3">
                {VOLUNTEERS.map((v, idx) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#fbf6f0] border border-[#ebd7c3]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-fredoka text-xs font-bold text-[#8a5b3a] w-4">
                        #{idx + 1}
                      </span>
                      <img
                        src={v.avatarUrl}
                        alt={v.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-fredoka text-xs sm:text-sm font-bold text-[#352018]">
                          {v.name}
                        </div>
                        <div className="text-[11px] text-[#7e5c46]">{v.role}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-fredoka text-xs font-bold text-[#4a2e1b] bg-[#faefe4] px-2 py-0.5 rounded-full border border-[#ebd7c3]">
                        {v.rescuesAssisted} Rescues
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Volunteer Roles Card */}
            <div className="bg-[#faefe4] rounded-3xl p-6 border border-[#ebd7c3] space-y-3">
              <h4 className="font-fredoka text-base font-bold text-[#352018] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#4a2e1b]" />
                <span>Ways You Can Help Today</span>
              </h4>
              <ul className="text-xs text-[#5e4537] space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a2e1b]"></span>
                  <span><strong>Emergency Transport:</strong> Drive rescued dogs from danger zones to vet clinics.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a2e1b]"></span>
                  <span><strong>Foster Sanctuary:</strong> Host traumatized dogs for 2–4 weeks during recovery.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a2e1b]"></span>
                  <span><strong>Field Spotter:</strong> Verify anonymous abuse reports and gather safe evidence.</span>
                </li>
              </ul>
            </div>

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
                    Welcome to the PawGuard Guild!
                  </h3>
                  <p className="text-xs text-[#5e4537] max-w-sm mx-auto">
                    You have been enrolled as a volunteer responder for <strong>{vLocation || 'your district'}</strong>. Dispatch alerts will ping your contact phone.
                  </p>
                  <button
                    onClick={() => setShowGuildModal(false)}
                    className="bg-[#4a2e1b] text-white font-fredoka text-xs px-6 py-3 rounded-full"
                  >
                    Done & Return
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGuildSubmit} className="space-y-4 text-xs">
                  <div className="border-b border-[#ebd7c3] pb-3">
                    <h3 className="font-fredoka text-xl font-bold text-[#26160d]">
                      Volunteer Sign-Up Form
                    </h3>
                    <p className="text-[#8a6853]">Be the hands and heart that rescue dogs in peril.</p>
                  </div>

                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Your Full Name</label>
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
                      <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Preferred Role</label>
                      <select
                        value={vRole}
                        onChange={(e) => setVRole(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                      >
                        <option>Rescue Driver & Transport</option>
                        <option>Emergency Foster Home</option>
                        <option>Field Spotter & Evidence</option>
                        <option>Vet Tech / Medical Care</option>
                        <option>Social Media Dispatcher</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">City / District</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Metro Core & East End"
                        value={vLocation}
                        onChange={(e) => setVLocation(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-fredoka text-xs font-bold text-[#352018] mb-1">Mobile Phone for Alerts</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={vPhone}
                      onChange={(e) => setVPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#ebd7c3] bg-white"
                    />
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
                      className="w-2/3 bg-[#4a2e1b] text-white font-fredoka font-semibold py-3 rounded-full shadow hover:bg-[#352018]"
                    >
                      Enroll as Rescue Volunteer
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
