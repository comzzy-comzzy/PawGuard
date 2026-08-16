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
    caseId?: string;
    isUpdate?: boolean;
  };
}

export interface PickyConversationContext {
  activeFlow?: 'report' | 'adopt' | 'lost' | 'volunteer' | null;
  step?: number;
  draftData?: Record<string, any>;
  currentCaseId?: string;
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
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return null;
    }
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
 * Picky's friendly, robust puppy conversational processor
 */
export const processPickyMessage = (
  userText: string,
  context: PickyConversationContext,
  attachedPhoto?: string | null
): { response: PickyResponse; newContext: PickyConversationContext } => {
  const text = (userText || '').trim().toLowerCase();
  let draft = { ...(context.draftData || {}) };
  if (attachedPhoto) {
    draft.photoUrl = attachedPhoto;
  }
  let activeFlow = context.activeFlow || null;
  let step = context.step || 0;
  let currentCaseId = context.currentCaseId || `PG-RESCUE-${Math.floor(1000 + Math.random() * 9000)}`;

  // --- 1. Active Step-by-Step Intakes ---

  // Flow: Reporting Abuse
  if (activeFlow === 'report') {
    if (step === 1) {
      draft.abuseType = userText;
      draft.caseId = currentCaseId;

      // Save immediate case on step 1 so admin receives it immediately!
      saveToAdminInbox({
        type: 'Abuse Incident Report',
        userMessage: userText,
        details: {
          caseId: currentCaseId,
          incident: draft.abuseType,
          status: 'Reported via Picky',
          source: 'Picky Assistant'
        }
      });

      return {
        response: {
          reply: `🚨 Incident recorded (Case #${currentCaseId})! Rescuers and dispatchers have been alerted.\n\nWhere is the dog located right now? (Street name, city, landmark, or neighborhood)`,
          suggestedPrompts: [
            'Downtown Main Street near the market',
            'Corner of 5th and Oak Ave',
            'At an abandoned house'
          ],
          collectedData: {
            type: 'report',
            data: draft,
            caseId: currentCaseId,
            readyToSubmit: true
          }
        },
        newContext: { activeFlow: 'report', step: 2, draftData: draft, currentCaseId }
      };
    } else if (step === 2) {
      draft.location = userText;

      return {
        response: {
          reply: `📍 Location recorded: "${userText}"!\n\nWhat does the dog look like (breed, color, size) and how are they doing?`,
          suggestedPrompts: [
            'Brown mixed breed, medium size, limping',
            'Small black puppy, looks very thin',
            'Chained outside with no food or water'
          ],
          collectedData: {
            type: 'report',
            data: draft,
            caseId: currentCaseId,
            readyToSubmit: true,
            isUpdate: true
          }
        },
        newContext: { activeFlow: 'report', step: 3, draftData: draft, currentCaseId }
      };
    } else if (step === 3) {
      draft.description = userText;

      return {
        response: {
          reply: `Thank you. Would you like to leave your name or contact phone number for rescuers, or keep it anonymous?`,
          suggestedPrompts: ['Keep me anonymous', 'My name is Alex, phone is 555-0192'],
          collectedData: {
            type: 'report',
            data: draft,
            caseId: currentCaseId,
            readyToSubmit: true,
            isUpdate: true
          }
        },
        newContext: { activeFlow: 'report', step: 4, draftData: draft, currentCaseId }
      };
    } else if (step === 4) {
      draft.reporter = userText;

      saveToAdminInbox({
        type: 'Abuse Incident Report (Complete)',
        userMessage: userText,
        details: {
          caseId: currentCaseId,
          incident: draft.abuseType,
          location: draft.location,
          dogInfo: draft.description,
          reporter: draft.reporter,
          source: 'Picky Assistant'
        }
      });

      return {
        response: {
          reply: `✅ Report #${currentCaseId} is fully filed and active!\n\n• Incident: ${draft.abuseType || 'Reported Incident'}\n• Location: ${draft.location || 'Local Area'}\n• Details: ${draft.description || 'Logged'}\n• Reporter: ${draft.reporter}\n\nOur rescue responders have been notified! Thank you for protecting this dog. 🐾`,
          actionLink: {
            label: 'View Rescue Dispatch Board',
            sectionId: 'rescue'
          },
          suggestedPrompts: ['How do I adopt a dog?', 'What are signs of dog distress?', 'Return to home'],
          collectedData: {
            type: 'report',
            data: draft,
            caseId: currentCaseId,
            readyToSubmit: true,
            isUpdate: true
          }
        },
        newContext: { activeFlow: null, step: 0, draftData: {}, currentCaseId: undefined }
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
          suggestedPrompts: ['Apartment with daily walks', 'Fenced yard with friendly dog', 'Family home with kids'],
          collectedData: {
            type: 'adopt',
            data: draft,
            readyToSubmit: true
          }
        },
        newContext: { activeFlow: 'adopt', step: 2, draftData: draft }
      };
    } else if (step === 2) {
      draft.home = userText;
      return {
        response: {
          reply: `Sounds like a loving home! What's your name and email or phone number so our adoption team can reach out?`,
          suggestedPrompts: ['Sarah (sarah@example.com, 555-0123)'],
          collectedData: {
            type: 'adopt',
            data: draft,
            readyToSubmit: true
          }
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
          suggestedPrompts: ['Learn about dog care', 'Volunteer to foster', 'How to support rescues'],
          collectedData: {
            type: 'adopt',
            data: draft,
            readyToSubmit: true
          }
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
          collectedData: {
            type: 'lost',
            data: draft,
            readyToSubmit: true
          }
        },
        newContext: { activeFlow: 'lost', step: 2, draftData: draft }
      };
    } else if (step === 2) {
      draft.lastSeen = userText;
      return {
        response: {
          reply: `What phone number or email should people contact if they spot the dog?`,
          suggestedPrompts: ['Call 555-0199', 'Email rescue@example.com'],
          collectedData: {
            type: 'lost',
            data: draft,
            readyToSubmit: true
          }
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
          suggestedPrompts: ['Create a missing pet flyer', 'Report a dog in danger', 'Return to home'],
          collectedData: {
            type: 'lost',
            data: draft,
            readyToSubmit: true
          }
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
          collectedData: {
            type: 'volunteer',
            data: draft,
            readyToSubmit: true
          }
        },
        newContext: { activeFlow: 'volunteer', step: 2, draftData: draft }
      };
    } else if (step === 2) {
      draft.location = userText;
      return {
        response: {
          reply: `What's your name and contact phone or email?`,
          suggestedPrompts: ['Jordan (jordan@example.com)'],
          collectedData: {
            type: 'volunteer',
            data: draft,
            readyToSubmit: true
          }
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
          suggestedPrompts: ['Adopt a dog', 'Report an incident', 'Support medical funds'],
          collectedData: {
            type: 'volunteer',
            data: draft,
            readyToSubmit: true
          }
        },
        newContext: { activeFlow: null, step: 0, draftData: {} }
      };
    }
  }

  // --- 2. Natural Intent Triggers & Instant Report Creation ---

  // Check if message is a full incident description (e.g. "There is a dog being beaten on 4th street")
  const isDirectReport =
    text.includes('abuse') ||
    text.includes('cruel') ||
    text.includes('beat') ||
    text.includes('chain') ||
    text.includes('starv') ||
    text.includes('injured') ||
    text.includes('hit by') ||
    text.includes('in danger') ||
    text.includes('emergency') ||
    text.includes('trap');

  if (isDirectReport) {
    draft.abuseType = userText;
    draft.description = userText;
    draft.caseId = currentCaseId;

    saveToAdminInbox({
      type: 'Direct Abuse Alert',
      userMessage: userText,
      details: {
        caseId: currentCaseId,
        content: userText,
        source: 'Picky Direct Intake'
      }
    });

    return {
      response: {
        reply: `🚨 Case #${currentCaseId} recorded with rescue dispatchers!\n\nI've sent this directly to our rescue queue. What is the exact street address, city, or nearest landmark so rescuers can navigate there?`,
        actionLink: {
          label: 'View Rescue Dispatch Board',
          sectionId: 'rescue'
        },
        suggestedPrompts: [
          'Downtown Main Street near the grocery',
          'Corner of 5th and Oak Ave',
          'Keep me anonymous'
        ],
        collectedData: {
          type: 'report',
          data: draft,
          caseId: currentCaseId,
          readyToSubmit: true
        }
      },
      newContext: { activeFlow: 'report', step: 2, draftData: draft, currentCaseId }
    };
  }

  // Report Abuse trigger button
  if (text.includes('report') || text.includes('trouble') || text.includes('hurt')) {
    return {
      response: {
        reply: `I'm here to help you report this dog right away. 🐾 What kind of situation is it? (For example: physical abuse, continuous chaining, abandonment, or an injured stray)`,
        actionLink: {
          label: 'Or Open Dedicated Report Page',
          sectionId: 'report'
        },
        suggestedPrompts: [
          'Physical abuse or beating',
          'Dog chained with no shelter',
          'Injured hit-and-run dog',
          'Abandoned starving stray'
        ]
      },
      newContext: { activeFlow: 'report', step: 1, draftData: {}, currentCaseId }
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
        suggestedPrompts: ['Report abuse', 'How do I adopt a dog?', 'Volunteer with us']
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
        suggestedPrompts: ['Report a dog in trouble', 'Adopt or foster a dog', 'Post a lost or found dog', 'Volunteer with us']
      },
      newContext: { activeFlow: null, step: 0, draftData: {} }
    };
  }

  // Fallback
  return {
    response: {
      reply: `I heard: "${userText}". 🐾 How would you like me to help? If there is an animal in danger, tell me where they are or choose one of the options below:`,
      suggestedPrompts: [
        'Report a dog in trouble',
        'Adopt or foster a dog',
        'Post a lost or found dog',
        'Support medical care'
      ]
    },
    newContext: { activeFlow: null, step: 0, draftData: {} }
  };
};
