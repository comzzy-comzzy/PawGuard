import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Settings, ArrowRight, RotateCcw, Volume2, VolumeX, CheckCircle, ShieldCheck, Heart } from 'lucide-react';
import { playClickSound, playPuppyBark, playHeartPop } from '../utils/audio';
import { processPickyMessage, queryZeroGCompute, getZeroGConfig, saveZeroGConfig, ZeroGConfig, PickyConversationContext } from '../utils/pickyAi';

interface PickyChatBoxProps {
  onNavigateSection: (sectionId: string) => void;
  onAddCase?: (newCase: any) => void;
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

export const PickyChatBox: React.FC<PickyChatBoxProps> = ({ onNavigateSection, onAddCase }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const [zeroGConfig, setZeroGConfigState] = useState<ZeroGConfig>(getZeroGConfig());
  const [unreadCount, setUnreadCount] = useState(1);
  
  // Picky conversation context
  const [context, setContext] = useState<PickyConversationContext>({
    activeFlow: null,
    step: 0,
    draftData: {}
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    return [
      {
        id: 'picky-welcome',
        sender: 'picky',
        text: "Woof! 🐾 Hi there! I'm **Picky**, your tiny girl puppy assistant! 🎀🐶\n\nHow may I help you today? Whether you'd like to report dog abuse, find a dog to adopt, post a lost pet, or ask about dog care, I'm right here to guide you every step of the way!",
        timestamp: 'Just now',
        suggestedPrompts: [
          '🚨 Report dog abuse',
          '🏡 Adopt / Foster a dog',
          '🔍 Post lost / found pet',
          '🪙 Support medical fund',
          '🙋‍♀️ Join volunteer guild'
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

  const handleSendMessage = async (textToSend?: string) => {
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
    setIsTyping(true);

    // 1. Check if 0G Compute API is configured
    let aiReplyText: string | null = null;
    if (zeroGConfig.apiKey && zeroGConfig.apiKey.trim().length > 0) {
      const history = messages.slice(-4).map(m => ({
        role: (m.sender === 'picky' ? 'assistant' : 'user') as 'assistant' | 'user',
        content: m.text
      }));
      history.push({ role: 'user', content: text });
      aiReplyText = await queryZeroGCompute(history, zeroGConfig);
    }

    // 2. Process with Picky built-in intake engine
    const { response, newContext } = processPickyMessage(text, context);
    setContext(newContext);

    // If report intake was completed and gave data, add case to live rescue case list if handler available
    if (response.collectedData && response.collectedData.readyToSubmit && onAddCase) {
      const d = response.collectedData.data;
      if (d.location && d.description) {
        onAddCase({
          id: `PG-RESCUE-${Math.floor(1000 + Math.random() * 9000)}`,
          title: `Reported via Picky: ${d.abuseType || 'Incident'}`,
          type: d.abuseType || 'Abuse/Violence',
          urgency: 'critical',
          status: 'reported',
          location: d.location,
          coordinates: [40.7128 + (Math.random() - 0.5) * 0.05, -74.0060 + (Math.random() - 0.5) * 0.05],
          distance: 'Local Area',
          reportedAt: 'Just now',
          description: `${d.description} (Logged with Picky AI Assistant)`,
          dogName: 'Reported Dog',
          dogBreed: 'Reported Dog in Need',
          photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
          reporter: d.reporter || 'Reported with Picky',
          updates: [{ time: 'Just now', text: 'Logged via Picky AI intake. Ready for dispatcher review.', author: 'Picky AI Bot' }]
        });
      }
    }

    setTimeout(() => {
      setIsTyping(false);
      if (soundEnabled) playPuppyBark();

      const pickyMsg: Message = {
        id: `picky-${Date.now()}`,
        sender: 'picky',
        text: aiReplyText || response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLink: response.actionLink,
        suggestedPrompts: response.suggestedPrompts
      };

      setMessages((prev) => [...prev, pickyMsg]);
    }, 600);
  };

  const handleResetChat = () => {
    playClickSound();
    setContext({ activeFlow: null, step: 0, draftData: {} });
    setMessages([
      {
        id: `picky-reset-${Date.now()}`,
        sender: 'picky',
        text: "🐾 *Fresh start!* Woof! What would you like help with right now?",
        timestamp: 'Just now',
        suggestedPrompts: [
          '🚨 Report dog abuse',
          '🏡 Adopt / Foster a dog',
          '🔍 Post lost / found pet',
          '🪙 Support medical fund'
        ]
      }
    ]);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    playHeartPop();
    saveZeroGConfig(zeroGConfig);
    setShowConfig(false);
  };

  return (
    <>
      {/* Floating Puppy Launcher Badge */}
      <div className="fixed bottom-5 right-5 z-50">
        {!isOpen && (
          <button
            onClick={handleOpen}
            className="group relative flex items-center gap-2.5 bg-[#4a2e1b] hover:bg-[#352018] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#f5d7b7] focus:outline-none"
            aria-label="Open Picky AI Chat"
          >
            {/* Animated Puppy Face Avatar */}
            <div className="relative w-10 h-10 rounded-full bg-[#fbf6f0] text-[#4a2e1b] flex items-center justify-center font-bold text-xl shadow-inner group-hover:rotate-6 transition-transform">
              🐶
              {/* Pink Bowtie 🎀 */}
              <span className="absolute -top-1.5 -right-1 text-xs">🎀</span>
            </div>

            {/* Label */}
            <div className="hidden sm:block text-left">
              <div className="font-fredoka text-sm font-bold text-[#fbf6f0] flex items-center gap-1">
                <span>Ask Picky</span>
                <span className="text-[10px] bg-[#d94141] text-white font-fredoka px-1.5 py-0.2 rounded-full">AI</span>
              </div>
              <div className="text-[10px] text-[#f5d7b7] font-medium leading-none">
                Tiny Puppy Assistant 🐾
              </div>
            </div>

            {/* Unread dot */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d94141] text-white text-[11px] font-fredoka font-bold rounded-full flex items-center justify-center animate-bounce shadow">
                1
              </span>
            )}
          </button>
        )}
      </div>

      {/* Floating Chat Modal Box */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[85vh] bg-[#fbf6f0] border-3 border-[#4a2e1b] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-[#4a2e1b] text-white px-5 py-4 flex items-center justify-between shadow-sm relative flex-shrink-0">
            <div className="flex items-center gap-3">
              {/* Puppy Avatar */}
              <div className="relative w-11 h-11 rounded-full bg-[#fbf6f0] text-[#4a2e1b] flex items-center justify-center text-2xl shadow-inner">
                🐶
                <span className="absolute -top-1 -right-1 text-xs">🎀</span>
              </div>

              <div>
                <div className="font-fredoka text-base font-bold text-white flex items-center gap-1.5">
                  <span>Picky</span>
                  <span className="text-[10px] font-fredoka bg-[#d94141] text-white px-1.5 py-0.5 rounded-full">
                    Puppy AI
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#f5d7b7]">
                  <span className="w-2 h-2 rounded-full bg-[#86efac] animate-pulse"></span>
                  <span>Online & Ready to Help</span>
                </div>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1.5 text-white/80">
              {/* Audio Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                title={soundEnabled ? 'Mute Picky Sounds' : 'Unmute Picky Sounds'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-60" />}
              </button>

              {/* Reset Chat */}
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                title="Restart Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* 0G Config Button */}
              <button
                onClick={() => setShowConfig(!showConfig)}
                className={`p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors ${showConfig ? 'text-[#f5d7b7] bg-white/10' : ''}`}
                title="0G Compute API Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                onClick={handleOpen}
                className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                title="Minimize Picky"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 0G Compute Configuration Drawer */}
          {showConfig && (
            <div className="bg-[#faefe4] border-b border-[#ebd7c3] p-4 text-xs space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-fredoka font-bold text-[#352018] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#b87d55]" />
                  <span>0G Compute AI Integration (Optional)</span>
                </span>
                <button
                  onClick={() => setShowConfig(false)}
                  className="text-[#8a5b3a] hover:text-[#352018]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-[#6b4c38] leading-tight">
                Picky operates with her smart built-in puppy assistant. You can optionally connect your custom 0G Compute API key below.
              </p>

              <form onSubmit={handleSaveConfig} className="space-y-2">
                <input
                  type="text"
                  placeholder="0G API Key (e.g. 0g-comp-...)"
                  value={zeroGConfig.apiKey || ''}
                  onChange={(e) => setZeroGConfigState({ ...zeroGConfig, apiKey: e.target.value })}
                  className="w-full p-2 rounded-lg border border-[#ebd7c3] bg-white text-xs"
                />

                <input
                  type="text"
                  placeholder="0G Endpoint URL"
                  value={zeroGConfig.endpoint || ''}
                  onChange={(e) => setZeroGConfigState({ ...zeroGConfig, endpoint: e.target.value })}
                  className="w-full p-2 rounded-lg border border-[#ebd7c3] bg-white text-xs"
                />

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="submit"
                    className="bg-[#4a2e1b] text-white font-fredoka text-xs px-4 py-1.5 rounded-lg shadow"
                  >
                    Save 0G Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Chat Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end gap-2 max-w-[88%]">
                  {msg.sender === 'picky' && (
                    <div className="w-7 h-7 rounded-full bg-[#faefe4] border border-[#ebd7c3] text-[#4a2e1b] flex items-center justify-center text-sm flex-shrink-0 shadow-sm mb-1">
                      🐶
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-[#4a2e1b] text-white rounded-br-none shadow-sm'
                        : 'bg-white border border-[#ebd7c3] text-[#352018] rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Direct Action Link button if present */}
                {msg.actionLink && (
                  <div className="mt-2 ml-9">
                    <button
                      onClick={() => {
                        playClickSound();
                        onNavigateSection(msg.actionLink!.sectionId);
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#faefe4] hover:bg-[#ebd7c3] text-[#4a2e1b] font-fredoka font-semibold text-xs px-3.5 py-2 rounded-xl border border-[#ebd7c3] shadow-sm transition-all"
                    >
                      <span>{msg.actionLink.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Suggested Prompts chips */}
                {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                    {msg.suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="bg-[#faefe4] hover:bg-[#ebd7c3] text-[#6b442b] font-fredoka text-[11px] px-3 py-1 rounded-full border border-[#ebd7c3] transition-all"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-[#a88d7b] px-1 mt-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#faefe4] border border-[#ebd7c3] text-[#4a2e1b] flex items-center justify-center text-sm flex-shrink-0 shadow-sm">
                  🐶
                </div>
                <div className="bg-white border border-[#ebd7c3] px-3 py-2 rounded-2xl rounded-bl-none flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-[#8a5b3a] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#8a5b3a] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#8a5b3a] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Shortcuts Bar */}
          <div className="px-3 py-2 bg-[#faefe4] border-t border-[#ebd7c3] flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => handleSendMessage('Help me report dog abuse')}
              className="bg-white hover:bg-[#fbf6f0] text-[#991b1b] border border-[#fca5a5] font-fredoka px-2.5 py-1 rounded-full whitespace-nowrap shadow-2xs"
            >
              🚨 Report Abuse
            </button>
            <button
              onClick={() => handleSendMessage('I want to adopt a dog')}
              className="bg-white hover:bg-[#fbf6f0] text-[#166534] border border-[#86efac] font-fredoka px-2.5 py-1 rounded-full whitespace-nowrap shadow-2xs"
            >
              🏡 Adopt Dog
            </button>
            <button
              onClick={() => handleSendMessage('I lost or found a dog')}
              className="bg-white hover:bg-[#fbf6f0] text-[#9a3412] border border-[#fdba74] font-fredoka px-2.5 py-1 rounded-full whitespace-nowrap shadow-2xs"
            >
              🔍 Lost Pet
            </button>
            <button
              onClick={() => handleSendMessage('Volunteer for rescue')}
              className="bg-white hover:bg-[#fbf6f0] text-[#8a4ea8] border border-[#e9d5ff] font-fredoka px-2.5 py-1 rounded-full whitespace-nowrap shadow-2xs"
            >
              🙋‍♀️ Volunteer
            </button>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#ebd7c3] flex items-center gap-2 flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask Picky anything or answer questions..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#fbf6f0] border border-[#ebd7c3] rounded-2xl px-3.5 py-2.5 text-xs text-[#352018] focus:outline-none focus:ring-2 focus:ring-[#4a2e1b]"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#4a2e1b] hover:bg-[#352018] disabled:opacity-40 text-white rounded-2xl shadow transition-colors flex items-center justify-center flex-shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
