import React, { useState, useEffect, useRef } from 'react';
import { X, Send, ArrowRight, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { playClickSound, playPuppyBark } from '../utils/audio';
import { processPickyMessage, PickyConversationContext } from '../utils/pickyAi';
import { RescueCase, AdoptionInquiry, LostFoundDog, VolunteerApplication } from '../types';

interface PickyChatBoxProps {
  onNavigateSection: (sectionId: string) => void;
  onAddCase?: (newCase: RescueCase) => void;
  onUpdateCase?: (updatedCase: RescueCase) => void;
  onAddInquiry?: (newInquiry: AdoptionInquiry) => void;
  onAddLostFound?: (newItem: LostFoundDog) => void;
  onAddVolunteer?: (newVolunteer: VolunteerApplication) => void;
}

interface Message {
  id: string;
  sender: 'picky' | 'user';
  text: string;
  timestamp: string;
  actionLink?: {
    label: string;
    sectionId: string;
  };
  suggestedPrompts?: string[];
}

export const PickyChatBox: React.FC<PickyChatBoxProps> = ({
  onNavigateSection,
  onAddCase,
  onUpdateCase,
  onAddInquiry,
  onAddLostFound,
  onAddVolunteer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [unreadCount, setUnreadCount] = useState(1);

  // Picky conversation context
  const [context, setContext] = useState<PickyConversationContext>({
    activeFlow: null,
    step: 0,
    draftData: {}
  });

  const [activeCasesTracked, setActiveCasesTracked] = useState<Record<string, RescueCase>>({});

  const [messages, setMessages] = useState<Message[]>(() => {
    return [
      {
        id: 'picky-welcome',
        sender: 'picky',
        text: "Hi friend! I'm Picky! 🎀🐶\n\nHow can I help you today? Whether you'd like to report a dog in trouble, find a pet to adopt, post a lost dog, or ask about dog care, I'm right here with you!",
        timestamp: 'Just now',
        suggestedPrompts: [
          'Report a dog in trouble',
          'Adopt or foster a dog',
          'Post a lost or found dog',
          'Volunteer with us',
          'Support medical care'
        ]
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages, isTyping]);

  const handleOpen = () => {
    if (!isOpen) {
      if (soundEnabled) playPuppyBark();
    } else {
      playClickSound();
    }
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    playClickSound();
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    // Process with Picky built-in intake engine
    const { response, newContext } = processPickyMessage(text, context);
    setContext(newContext);

    // Forward completed intakes to central admin dispatch states
    if (response.collectedData && response.collectedData.readyToSubmit) {
      const d = response.collectedData.data;
      const cid = response.collectedData.caseId || `PG-RESCUE-${Math.floor(1000 + Math.random() * 9000)}`;

      // 1. Abuse Case Intake
      if (response.collectedData.type === 'report') {
        const existing = activeCasesTracked[cid];
        const caseToSave: RescueCase = {
          id: cid,
          title: `Reported via Picky: ${d.abuseType || 'Incident'}`,
          type: d.abuseType || 'Abuse/Violence',
          urgency: 'critical',
          status: 'reported',
          location: d.location || existing?.location || 'Location being verified',
          coordinates: [40.7128 + (Math.random() - 0.5) * 0.05, -74.0060 + (Math.random() - 0.5) * 0.05],
          distance: 'Local Area',
          reportedAt: 'Just now',
          description: `${d.description || userText} (Logged via Picky Assistant)`,
          dogName: 'Reported Dog',
          dogBreed: 'Dog in Need of Help',
          photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
          reporter: d.reporter || existing?.reporter || 'Picky Assistant User',
          isAnonymous: d.reporter ? d.reporter.toLowerCase().includes('anon') : false,
          adminNotes: 'Transmitted live via Picky chatbot assistant.',
          updates: [
            { time: 'Just now', text: `Details from Picky: ${userText}`, author: 'Picky Assistant' },
            ...(existing?.updates || [])
          ]
        };

        setActiveCasesTracked((prev) => ({ ...prev, [cid]: caseToSave }));

        if (response.collectedData.isUpdate && onUpdateCase && existing) {
          onUpdateCase(caseToSave);
        } else if (onAddCase) {
          onAddCase(caseToSave);
        }
      }

      // 2. Adoption Inquiry Intake
      if (response.collectedData.type === 'adopt' && onAddInquiry) {
        onAddInquiry({
          id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
          applicantName: d.contact || 'Picky User Application',
          applicantEmail: d.contact || 'Provided via Picky',
          applicantPhone: d.contact || 'Provided via Picky',
          dogName: d.preferredDog || 'Rescue Dog',
          dogId: 'ADOPT-REQ',
          housingType: d.home || 'Residential Home',
          hasOtherPets: true,
          hasChildren: false,
          experienceLevel: 'Loving Dog Guardian',
          notes: `Adoption inquiry submitted via Picky. Desired Pet: ${d.preferredDog || 'N/A'}. Home environment: ${d.home || 'N/A'}. Contact details: ${d.contact || 'N/A'}`,
          submittedAt: 'Just now',
          status: 'pending',
          adminNotes: 'Submitted through Picky conversational intake assistant.'
        });
      }

      // 3. Lost & Found Intake
      if (response.collectedData.type === 'lost' && onAddLostFound) {
        onAddLostFound({
          id: `LF-${Math.floor(1000 + Math.random() * 9000)}`,
          dogName: 'Reported Pet',
          breed: d.petInfo || 'Dog',
          color: 'Described in notes',
          status: 'lost',
          lastSeenLocation: d.lastSeen || 'Local Area',
          lastSeenDate: 'Recently',
          contactName: d.contact || 'Reporter',
          contactPhone: d.contact || 'Provided via Picky',
          photoUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
          details: `Notice submitted via Picky. Pet info: ${d.petInfo || 'N/A'}. Last seen location: ${d.lastSeen || 'N/A'}. Contact: ${d.contact || 'N/A'}`,
          caseStatus: 'open'
        });
      }

      // 4. Volunteer Guild Intake
      if (response.collectedData.type === 'volunteer' && onAddVolunteer) {
        onAddVolunteer({
          id: `VOL-${Math.floor(1000 + Math.random() * 9000)}`,
          name: d.contact || 'Volunteer Applicant',
          email: d.contact || 'Provided via Picky',
          phone: d.contact || 'Provided via Picky',
          role: d.role || 'Rescue Driver & Field Support',
          location: d.location || 'Local Area',
          availability: 'Flexible / On-call',
          hasVehicle: true,
          experience: `Volunteer signup via Picky. Desired role: ${d.role || 'N/A'}. Location: ${d.location || 'N/A'}`,
          submittedAt: 'Just now',
          status: 'pending'
        });
      }
    }

    if (soundEnabled) playPuppyBark();

    const pickyMsg: Message = {
      id: `picky-${Date.now()}`,
      sender: 'picky',
      text: response.reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionLink: response.actionLink,
      suggestedPrompts: response.suggestedPrompts
    };

    setMessages((prev) => [...prev, pickyMsg]);
  };

  const handleResetChat = () => {
    playClickSound();
    setContext({ activeFlow: null, step: 0, draftData: {} });
    setMessages([
      {
        id: `picky-reset-${Date.now()}`,
        sender: 'picky',
        text: "Hi again! What can I help you with right now? 🐾",
        timestamp: 'Just now',
        suggestedPrompts: [
          'Report a dog in trouble',
          'Adopt or foster a dog',
          'Post a lost or found dog',
          'Support medical care'
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Puppy Launcher Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={handleOpen}
          className="relative group bg-[#4a2e1b] hover:bg-[#352018] text-white p-3 sm:p-3.5 rounded-full shadow-2xl border-2 border-[#ea8e24] hover:scale-105 transition-all flex items-center gap-2.5 focus:outline-none"
          title="Chat with Picky"
        >
          {/* Picky SVG Puppy Face with Pink Bow */}
          <div className="w-10 h-10 rounded-full bg-[#fbf6f0] flex items-center justify-center relative overflow-visible border-2 border-[#b87d55] flex-shrink-0">
            {/* Pink Bow */}
            <div className="absolute -top-1.5 -right-1 text-xs">🎀</div>
            {/* Cute Puppy Face */}
            <svg viewBox="0 0 36 36" className="w-7 h-7">
              <ellipse cx="8" cy="12" rx="4" ry="7" fill="#b87d55" transform="rotate(-15 8 12)" />
              <ellipse cx="28" cy="12" rx="4" ry="7" fill="#b87d55" transform="rotate(15 28 12)" />
              <circle cx="18" cy="18" r="12" fill="#e8c4a2" />
              <ellipse cx="18" cy="22" rx="6" ry="5" fill="#fff" />
              <circle cx="13" cy="16" r="2.2" fill="#2d1a10" />
              <circle cx="12.2" cy="15.2" r="0.7" fill="#fff" />
              <circle cx="23" cy="16" r="2.2" fill="#2d1a10" />
              <circle cx="22.2" cy="15.2" r="0.7" fill="#fff" />
              <ellipse cx="18" cy="20.5" rx="2" ry="1.4" fill="#352018" />
              <path d="M 16 23 Q 18 25 20 23" stroke="#352018" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          <div className="hidden sm:flex flex-col items-start pr-1 text-left">
            <span className="font-fredoka text-sm font-bold text-white flex items-center gap-1">
              <span>Ask Picky</span>
            </span>
            <span className="text-[10px] text-[#f5d7b7] font-medium leading-none">
              Rescue Assistant
            </span>
          </div>

          {/* Unread badge */}
          {unreadCount > 0 && !isOpen && (
            <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-[#d94141] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[410px] h-[550px] max-h-[82vh] bg-[#fbf6f0] rounded-3xl shadow-2xl border-4 border-[#4a2e1b] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="bg-[#4a2e1b] text-white px-4 py-3.5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fbf6f0] flex items-center justify-center relative overflow-visible border-2 border-[#b87d55]">
                <div className="absolute -top-1.5 -right-1 text-xs">🎀</div>
                <svg viewBox="0 0 36 36" className="w-7 h-7">
                  <ellipse cx="8" cy="12" rx="4" ry="7" fill="#b87d55" transform="rotate(-15 8 12)" />
                  <ellipse cx="28" cy="12" rx="4" ry="7" fill="#b87d55" transform="rotate(15 28 12)" />
                  <circle cx="18" cy="18" r="12" fill="#e8c4a2" />
                  <ellipse cx="18" cy="22" rx="6" ry="5" fill="#fff" />
                  <circle cx="13" cy="16" r="2.2" fill="#2d1a10" />
                  <circle cx="12.2" cy="15.2" r="0.7" fill="#fff" />
                  <circle cx="23" cy="16" r="2.2" fill="#2d1a10" />
                  <circle cx="22.2" cy="15.2" r="0.7" fill="#fff" />
                  <ellipse cx="18" cy="20.5" rx="2" ry="1.4" fill="#352018" />
                  <path d="M 16 23 Q 18 25 20 23" stroke="#352018" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-fredoka text-base font-bold tracking-wide">Picky</h3>
                  <span className="text-[10px] bg-[#22c55e] text-white px-1.5 py-0.2 rounded-full font-sans font-semibold">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-[#f5d7b7]">PawGuard Rescue Assistant 🎀</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
                title={soundEnabled ? 'Mute puppy sounds' : 'Enable puppy sounds'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-60" />}
              </button>

              <button
                onClick={handleResetChat}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
                title="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#fbf6f0]">
            {messages.map((msg) => {
              const isPicky = msg.sender === 'picky';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isPicky ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      isPicky
                        ? 'bg-white text-[#352018] border border-[#ebd7c3] rounded-tl-sm'
                        : 'bg-[#4a2e1b] text-white rounded-tr-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Action link button if Picky suggests a section */}
                    {msg.actionLink && (
                      <button
                        onClick={() => {
                          playClickSound();
                          onNavigateSection(msg.actionLink!.sectionId);
                          setIsOpen(false);
                        }}
                        className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-fredoka font-bold bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] px-3 py-1.5 rounded-full border border-[#ebd7c3] transition-all"
                      >
                        <span>{msg.actionLink.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <span className="text-[10px] text-[#8a5b3a] px-1 pt-1">{msg.timestamp}</span>

                  {/* Suggested quick prompt chips */}
                  {isPicky && msg.suggestedPrompts && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                      {msg.suggestedPrompts.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(prompt)}
                          className="bg-[#faefe4] hover:bg-[#4a2e1b] text-[#4a2e1b] hover:text-white text-[11px] font-fredoka font-medium px-3 py-1.5 rounded-full border border-[#ebd7c3] transition-all text-left shadow-xs"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#ebd7c3] flex items-center gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask Picky anything or report an incident..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="flex-1 bg-[#fbf6f0] border border-[#ebd7c3] text-[#352018] placeholder:text-[#8a5b3a]/60 text-xs sm:text-sm rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="bg-[#4a2e1b] hover:bg-[#352018] disabled:opacity-40 text-white p-2.5 rounded-2xl transition-all shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
