import { RescueCase } from '../types';

export interface PickyResponse {
  reply: string;
  actionLink?: {
    label: string;
    sectionId: string;
  };
  suggestedPrompts?: string[];
  collectedData?: {
    type: 'report' | 'adopt' | 'lost' | 'volunteer' | 'general';
    data: Record<string, any>;
    readyToSubmit?: boolean;
  };
}

export interface PickyConversationContext {
  activeFlow?: 'report' | 'adopt' | 'lost' | 'volunteer' | null;
  step?: number;
  draftData?: Record<string, any>;
}

/**
 * Saves recorded intake details to the PawGuard Admin Inbox in localStorage
 */
export const saveToAdminInbox = (record: {
  type: string;
  userMessage?: string;
  details: Record<string, any>;
}) => {
  try {
    const existing = JSON.parse(localStorage.getItem('pawguard_admin_inbox') || '[]');
    const newEntry = {
      id: `ADMIN-MSG-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      type: record.type,
      userMessage: record.userMessage || '',
      details: record.details,
      status: 'pending'
    };
    localStorage.setItem('pawguard_admin_inbox', JSON.stringify([newEntry, ...existing]));
    return newEntry;
  } catch (e) {
    console.error('Failed to save to admin inbox:', e);
    return null;
  }
};

/**
 * Picky's friendly, natural puppy conversational processor
 */
export const processPickyMessage = (
  userText: string,
  context: PickyConversationContext
): { response: PickyResponse; newContext: PickyConversationContext } => {
  const text = userText.trim().toLowerCase();
  let draft = { ...(context.draftData || {}) };
  let activeFlow = context.activeFlow || null;
  let step = context.step || 0;

  // --- 1. Natural Step-by-Step Form Intakes ---

  // Flow: Reporting Abuse
  if (activeFlow === 'report') {
    if (step === 1) {
      draft.abuseType = userText;
      return {
        response: {
          reply: `Thank you for sharing that. Where is the dog located right now? (Street name, city, or any landmarks like nearby shops or gates)`,
          suggestedPrompts: ['Downtown Main Street near the market', 'Corner of 5th and Oak Ave', 'At an abandoned building'],
        },
        newContext: { activeFlow: 'report', step: 2, draftData: draft }
      };
    } else if (step === 2) {
      draft.location = userText;
      return {
        response: {
          reply: `Got the location! What does the dog look like (breed, color, size) and how are they doing?`,
          suggestedPrompts: ['Brown mixed breed, medium size, limping', 'Small black puppy, looks very thin', 'Chained outside with no shelter'],
        },
        newContext: { activeFlow: 'report', step: 3, draftData: draft }
      };
    } else if (step === 3) {
      draft.description = userText;
      return {
        response: {
          reply: `Thank you. Would you like to keep your name private, or would you like to leave your name and phone number so rescuers can reach you?`,
          suggestedPrompts: ['Keep me anonymous', 'My name is Alex, phone is 555-0192'],
        },
        newContext: { activeFlow: 'report', step: 4, draftData: draft }
      };
    } else if (step === 4) {
      draft.reporter = userText;
      
      saveToAdminInbox({
        type: 'Abuse Incident Report',
        userMessage: userText,
        details: {
          incident: draft.abuseType,
          location: draft.location,
          dogInfo: draft.description,
          reporter: draft.reporter,
          source: 'Picky Assistant'
        }
      });

      return {
        response: {
          reply: `I've sent your report straight to our rescue dispatchers! 🐾 Thank you so much for looking out for this dog.\n\n• Incident: ${draft.abuseType}\n• Location: ${draft.location}\n• Details: ${draft.description}\n\nOur team has been alerted!`,
          actionLink: {
            label: 'View Rescue Dispatch Board',
            sectionId: 'rescue'
          },
          suggestedPrompts: ['How do I adopt a dog?', 'What are signs of dog distress?', 'Return to home'],
          collectedData: {
            type: 'report',
            data: draft,
            readyToSubmit: true
          }
        },
        newContext: { activeFlow: null, step: 0, draftData: {} }
      };
    }
  }

  // Flow: Adoption Inquiry
  if (activeFlow === 'adopt') {
    if (step === 1) {
      draft.preferredDog = userText;
      return {
        response: {
          reply: `That's great! 🐶 Tell me a little about your home — do you have a yard, other pets, or kids?`,
          suggestedPrompts: ['Apartment with lots of daily walks', 'Fenced yard with another friendly dog', 'Family home with kids'],
        },
        newContext: { activeFlow: 'adopt', step: 2, draftData: draft }
      };
    } else if (step === 2) {
      draft.home = userText;
      return {
        response: {
          reply: `Sounds like a cozy home! What's your name and email or phone number so our adoption team can reach out?`,
          suggestedPrompts: ['Sarah Connor (sarah@example.com)', 'Call me at 555-0123'],
        },
        newContext: { activeFlow: 'adopt', step: 3, draftData: draft }
      };
    } else if (step === 3) {
      draft.contact = userText;

      saveToAdminInbox({
        type: 'Adoption Inquiry',
        details: {
          dog: draft.preferredDog,
          home: draft.home,
          contact: draft.contact,
          source: 'Picky Assistant'
        }
      });

      return {
        response: {
          reply: `All set! 🐾 I've forwarded your inquiry to our adoption coordinators. They will get back to you soon!\n\n• Dog of interest: ${draft.preferredDog}\n• Contact: ${draft.contact}`,
          actionLink: {
            label: 'Browse Adoptable Dogs',
            sectionId: 'adopt'
          },
          suggestedPrompts: ['Learn about dog care', 'Volunteer to foster', 'How to support rescues']
        },
        newContext: { activeFlow: null, step: 0, draftData: {} }
      };
    }
  }

  // Flow: Lost & Found
  if (activeFlow === 'lost') {
    if (step === 1) {
      draft.petInfo = userText;
      return {
        response: {
          reply: `Got it. Where was the dog last seen? (Street, neighborhood, or city)`,
          suggestedPrompts: ['Near Maple Street park', 'Downtown area by the market', 'Suburban greenway'],
        },
        newContext: { activeFlow: 'lost', step: 2, draftData: draft }
      };
    } else if (step === 2) {
      draft.lastSeen = userText;
      return {
        response: {
          reply: `What phone number or email should people contact if they spot the dog?`,
          suggestedPrompts: ['Call 555-0199', 'Email rescue@example.com'],
        },
        newContext: { activeFlow: 'lost', step: 3, draftData: draft }
      };
    } else if (step === 3) {
      draft.contact = userText;

      saveToAdminInbox({
        type: 'Lost / Found Pet Notice',
        details: {
          pet: draft.petInfo,
          location: draft.lastSeen,
          contact: draft.contact,
          source: 'Picky Assistant'
        }
      });

      return {
        response: {
          reply: `I've recorded this notice! 🐾 You can also view all notices and make a printable flyer on the Lost & Found page.`,
          actionLink: {
            label: 'Open Lost & Found Noticeboard',
            sectionId: 'lost-found'
          },
          suggestedPrompts: ['Create a missing pet flyer', 'Report a dog in danger', 'Return to home']
        },
        newContext: { activeFlow: null, step: 0, draftData: {} }
      };
    }
  }

  // Flow: Volunteer Guild
  if (activeFlow === 'volunteer') {
    if (step === 1) {
      draft.role = userText;
      return {
        response: {
          reply: `We would love to have your help! 🐾 What city or area are you based in?`,
          suggestedPrompts: ['New York', 'Austin, TX', 'London', 'Lagos'],
        },
        newContext: { activeFlow: 'volunteer', step: 2, draftData: draft }
      };
    } else if (step === 2) {
      draft.location = userText;
      return {
        response: {
          reply: `What's your name and contact phone or email?`,
          suggestedPrompts: ['Jordan (jordan@example.com)'],
        },
        newContext: { activeFlow: 'volunteer', step: 3, draftData: draft }
      };
    } else if (step === 3) {
      draft.contact = userText;

      saveToAdminInbox({
        type: 'Volunteer Registration',
        details: {
          role: draft.role,
          location: draft.location,
          contact: draft.contact,
          source: 'Picky Assistant'
        }
      });

      return {
        response: {
          reply: `Thank you for volunteering! 🐾 Our team will reach out to welcome you to the rescue guild.`,
          actionLink: {
            label: 'View Volunteer Guild',
            sectionId: 'community'
          },
          suggestedPrompts: ['Adopt a dog', 'Report an incident', 'Support medical funds']
        },
        newContext: { activeFlow: null, step: 0, draftData: {} }
      };
    }
  }

  // --- 2. Natural Intent Triggers ---

  // Report Abuse
  if (text.includes('report') || text.includes('abuse') || text.includes('cruel') || text.includes('beat') || text.includes('chain') || text.includes('starv') || text.includes('hurt') || text.includes('danger') || text.includes('hit')) {
    return {
      response: {
        reply: `I'm here to help you report this dog right away. 🐾 What kind of situation is it? (For example: physical abuse, 24/7 chaining, abandonment, or an injured stray)`,
        actionLink: {
          label: 'Or Go to Report Abuse Page',
          sectionId: 'report'
        },
        suggestedPrompts: ['Physical abuse or beating', 'Dog chained with no shelter', 'Injured hit-and-run dog', 'Abandoned stray dog']
      },
      newContext: { activeFlow: 'report', step: 1, draftData: {} }
    };
  }

  // Adoption / Foster
  if (text.includes('adopt') || text.includes('foster') || text.includes('puppy') || text.includes('get a dog') || text.includes('want a dog')) {
    return {
      response: {
        reply: `That makes me so happy! 🐶 Are you looking to adopt or foster a dog? Tell me what kind of dog you have in mind!`,
        actionLink: {
          label: 'View Adoptable Dogs',
          sectionId: 'adopt'
        },
        suggestedPrompts: ['Looking to adopt a friendly dog', 'Want to foster temporarily', 'Looking for a small puppy']
      },
      newContext: { activeFlow: 'adopt', step: 1, draftData: {} }
    };
  }

  // Lost / Found Pet
  if (text.includes('lost') || text.includes('found') || text.includes('missing') || text.includes('flyer') || text.includes('stray')) {
    return {
      response: {
        reply: `Let's help bring them home! 🐾 Did you lose your dog, or find a dog that needs help? Tell me their breed and name.`,
        actionLink: {
          label: 'Go to Lost & Found Page',
          sectionId: 'lost-found'
        },
        suggestedPrompts: ['Lost my Golden Retriever', 'Found a friendly brown stray', 'Injured stray dog']
      },
      newContext: { activeFlow: 'lost', step: 1, draftData: {} }
    };
  }

  // Volunteer
  if (text.includes('volunteer') || text.includes('driver') || text.includes('foster home') || text.includes('join') || text.includes('guild')) {
    return {
      response: {
        reply: `We always need kind people! 🐾 What role would suit you best?\n• Rescue Driver (Transporting rescued dogs)\n• Emergency Foster Home\n• Field Spotter (Checking on reported areas)\n• Community Helper`,
        actionLink: {
          label: 'Explore Volunteer Guild',
          sectionId: 'community'
        },
        suggestedPrompts: ['Rescue Driver', 'Emergency Foster Home', 'Field Spotter', 'Community Helper']
      },
      newContext: { activeFlow: 'volunteer', step: 1, draftData: {} }
    };
  }

  // Donations / Medical Crypto Support
  if (text.includes('donate') || text.includes('crypto') || text.includes('fund') || text.includes('support') || text.includes('money') || text.includes('btc') || text.includes('eth')) {
    return {
      response: {
        reply: `Every contribution helps save lives! 🩺 You can support emergency surgeries, infection treatments, starvation recovery kits, and shelter blankets directly with crypto (BTC, ETH, BNB) on our Support Us page.`,
        actionLink: {
          label: 'Open Support & Crypto Wallets',
          sectionId: 'support'
        },
        suggestedPrompts: ['How do I report abuse?', 'How do I adopt a dog?', 'Volunteer with us']
      },
      newContext: { activeFlow: null, step: 0, draftData: {} }
    };
  }

  // Dog Care / Health Questions
  if (text.includes('care') || text.includes('heat') || text.includes('food') || text.includes('sick') || text.includes('eye') || text.includes('stress') || text.includes('learn') || text.includes('quiz')) {
    return {
      response: {
        reply: `Here are quick health & safety tips: 🐾\n• "Whale Eye": When a dog shows the whites of their eyes, they are feeling anxious or threatened.\n• Heatstroke: Never put a dog in freezing ice water — move to shade and cool their paw pads with room-temperature water.\n• Chaining: Dogs tied up 24/7 suffer physical and emotional harm.\n\nYou can read all our guides and try the quiz on the Learn page!`,
        actionLink: {
          label: 'Read Humane Care Guides',
          sectionId: 'learn'
        },
        suggestedPrompts: ['Report abuse', 'I want to adopt', 'Support medical funds']
      },
      newContext: { activeFlow: null, step: 0, draftData: {} }
    };
  }

  // Greetings
  if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('picky')) {
    return {
      response: {
        reply: `Hi friend! I'm Picky! 🐾 What can I help you with today? I can help you report an incident, find a dog to adopt, post a lost pet, or answer questions!`,
        suggestedPrompts: ['Report dog abuse', 'Adopt a dog', 'Post a lost pet', 'Support medical fund']
      },
      newContext: { activeFlow: null, step: 0, draftData: {} }
    };
  }

  // Friendly Fallback
  return {
    response: {
      reply: `I'm right here with you! 🐾 Tell me what you'd like to do:\n• Report a dog in trouble\n• Adopt or foster a dog\n• Post a lost or found dog\n• Join our volunteer guild\n• Support medical funds`,
      suggestedPrompts: ['Report dog abuse', 'I want to adopt a dog', 'I lost my dog', 'Join as a volunteer', 'Donate to medical care']
    },
    newContext: { activeFlow: null, step: 0, draftData: {} }
  };
};
