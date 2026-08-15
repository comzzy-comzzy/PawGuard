import { RescueCase, AdoptableDog, LostFoundDog } from '../types';

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

// 0G Compute Configuration
export interface ZeroGConfig {
  apiKey?: string;
  endpoint?: string;
  model?: string;
}

export const getZeroGConfig = (): ZeroGConfig => {
  try {
    const saved = localStorage.getItem('pawguard_0g_config');
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    apiKey: (import.meta as any).env?.VITE_0G_API_KEY || '',
    endpoint: (import.meta as any).env?.VITE_0G_COMPUTE_ENDPOINT || 'https://api.0g.ai/v1/chat/completions',
    model: (import.meta as any).env?.VITE_0G_MODEL || '0g-deepseek-r1',
  };
};

export const saveZeroGConfig = (config: ZeroGConfig) => {
  try {
    localStorage.setItem('pawguard_0g_config', JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save 0G config:', e);
  }
};

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
 * Attempts to call 0G Compute LLM API if key is present; returns null if unavailable/errors
 */
export const queryZeroGCompute = async (
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  config?: ZeroGConfig
): Promise<string | null> => {
  const currentConfig = config || getZeroGConfig();
  if (!currentConfig.apiKey || !currentConfig.endpoint) {
    return null;
  }

  try {
    const systemPrompt = `You are Picky, an enthusiastic, caring, and smart girl tiny puppy dog assistant for PawGuard (a community platform dedicated to protecting dogs, preventing abuse, cruelty, neglect, chaining, and abandonment).
You talk with puppy warmth, empathy, and joy (using cute touches like "Woof!", "Tail wags!", and 🐾 emojis occasionally).
You know all about PawGuard features:
1. Report Abuse: Step-by-step logging for physical abuse, chaining, starvation, hit-and-runs, fighting.
2. Find & Rescue: Location-based rescue reports board.
3. Adoption: Loving rescued dogs looking for foster and forever homes.
4. Lost & Found: Missing pet notices and printable flyer generation.
5. Learn: Humane canine care, detecting neglect, whale eye stress signals, heatstroke triage.
6. Community & Volunteer: Rescue drivers, foster homes, spotters.
7. Support Us: Crypto medical funding (BTC, ETH, BNB) for surgeries, vaccines, nutrition kits, foster crates.
8. Get Help Desk: Direct emergency channels.
Help users fill forms, collect all necessary report/inquiry details for admins, answer dog questions, and guide them to the right pages.`;

    const response = await fetch(currentConfig.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentConfig.apiKey}`
      },
      body: JSON.stringify({
        model: currentConfig.model || '0g-deepseek-r1',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 600
      })
    });

    if (!response.ok) {
      console.warn('0G Compute returned non-OK status:', response.status);
      return null;
    }

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content;
    return replyText || null;
  } catch (err) {
    console.warn('0G Compute API fetch error, falling back to built-in puppy engine:', err);
    return null;
  }
};

/**
 * Built-in Picky conversational reasoning and form intake processor
 */
export const processPickyMessage = (
  userText: string,
  context: PickyConversationContext
): { response: PickyResponse; newContext: PickyConversationContext } => {
  const text = userText.trim().toLowerCase();
  let draft = { ...(context.draftData || {}) };
  let activeFlow = context.activeFlow || null;
  let step = context.step || 0;

  // 1. Check if we are currently in an active step-by-step form intake flow

  // --- FLOW: REPORT ABUSE INTAKE ---
  if (activeFlow === 'report') {
    if (step === 1) {
      draft.abuseType = userText;
      return {
        response: {
          reply: `🐾 I've noted that this involves "${userText}".\n\n📍 Step 2: What is the exact location or street address (and any landmarks, like near a store or gate)?`,
          suggestedPrompts: ['Use my current location', '123 Main Street', 'Near the Central Market'],
        },
        newContext: { activeFlow: 'report', step: 2, draftData: draft }
      };
    } else if (step === 2) {
      draft.location = userText;
      return {
        response: {
          reply: `📍 Location saved as "${userText}".\n\n🐶 Step 3: Can you describe the dog (breed, color, size) and their current physical condition?`,
          suggestedPrompts: ['Brown mixed breed, medium size, injured leg', 'Small puppy, white and black, very thin', 'Chained dog without water'],
        },
        newContext: { activeFlow: 'report', step: 3, draftData: draft }
      };
    } else if (step === 3) {
      draft.description = userText;
      return {
        response: {
          reply: `📝 Details recorded!\n\n🔒 Step 4: Would you like to submit this anonymously, or provide your contact info for rescue dispatchers?`,
          suggestedPrompts: ['Submit Anonymously', 'My name is Alex (phone: 555-0192)'],
        },
        newContext: { activeFlow: 'report', step: 4, draftData: draft }
      };
    } else if (step === 4) {
      draft.reporter = userText;
      
      // Save record to Admin Inbox
      saveToAdminInbox({
        type: 'Abuse Incident Intake (Via Picky)',
        userMessage: userText,
        details: {
          incidentType: draft.abuseType,
          location: draft.location,
          dogDescription: draft.description,
          reporter: draft.reporter,
          loggedVia: 'Picky AI Assistant'
        }
      });

      return {
        response: {
          reply: `🎉 *Woof!* Your report has been logged and sent to the rescue dispatch admins!\n\n📋 **Report Summary:**\n• **Incident:** ${draft.abuseType}\n• **Location:** ${draft.location}\n• **Dog Details:** ${draft.description}\n• **Reporter Info:** ${draft.reporter}\n\nOur responders have been alerted! You can also view the live reports board or fill more details on the Report page. 🐾`,
          actionLink: {
            label: 'Open Find & Rescue Board',
            sectionId: 'rescue'
          },
          suggestedPrompts: ['Report another incident', 'How else can I help?', 'Adopt a dog'],
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

  // --- FLOW: ADOPTION INQUIRY INTAKE ---
  if (activeFlow === 'adopt') {
    if (step === 1) {
      draft.preferredDog = userText;
      return {
        response: {
          reply: `🐾 Wonderful! You're inquiring about: "${userText}".\n\n🏡 Step 2: What is your home environment like (e.g. fenced yard, apartment, other pets or kids)?`,
          suggestedPrompts: ['Apartment with park nearby', 'Fenced house with kids', 'Have 1 other friendly dog'],
        },
        newContext: { activeFlow: 'adopt', step: 2, draftData: draft }
      };
    } else if (step === 2) {
      draft.homeEnvironment = userText;
      return {
        response: {
          reply: `Got it! Sounds like a lovely place for a puppy! 🐶\n\n📞 Step 3: What is your name and contact info (phone number or email) so the adoption desk can reach you?`,
          suggestedPrompts: ['Jordan Taylor (jordan@example.com)', 'My phone is +123456789'],
        },
        newContext: { activeFlow: 'adopt', step: 3, draftData: draft }
      };
    } else if (step === 3) {
      draft.contact = userText;

      saveToAdminInbox({
        type: 'Adoption Inquiry (Via Picky)',
        details: {
          targetDog: draft.preferredDog,
          homeEnvironment: draft.homeEnvironment,
          applicantContact: draft.contact,
          loggedVia: 'Picky AI Assistant'
        }
      });

      return {
        response: {
          reply: `🐾 *Tail wag!* Your adoption inquiry has been recorded and submitted to our adoption team!\n\n📋 **Inquiry Details:**\n• **Dog:** ${draft.preferredDog}\n• **Home:** ${draft.homeEnvironment}\n• **Contact:** ${draft.contact}\n\nOur team will review your details and reach out to you shortly!`,
          actionLink: {
            label: 'View Adoption Directory',
            sectionId: 'adopt'
          },
          suggestedPrompts: ['Check lost & found dogs', 'Volunteer to foster', 'Learn dog care tips']
        },
        newContext: { activeFlow: null, step: 0, draftData: {} }
      };
    }
  }

  // --- FLOW: LOST / FOUND DOG INTAKE ---
  if (activeFlow === 'lost') {
    if (step === 1) {
      draft.dogNameAndBreed = userText;
      return {
        response: {
          reply: `🐾 Noted: "${userText}".\n\n📍 Step 2: Where was the dog last seen (street, city, or area)?`,
          suggestedPrompts: ['Downtown Maple Street', 'Oak Park near the playground', 'Sunset Boulevard'],
        },
        newContext: { activeFlow: 'lost', step: 2, draftData: draft }
      };
    } else if (step === 2) {
      draft.lastSeen = userText;
      return {
        response: {
          reply: `Location saved as "${userText}".\n\n📞 Step 3: What contact number or email should someone reach if the dog is spotted?`,
          suggestedPrompts: ['Call me at 555-0143', 'Email me at rescue@example.com'],
        },
        newContext: { activeFlow: 'lost', step: 3, draftData: draft }
      };
    } else if (step === 3) {
      draft.contact = userText;

      saveToAdminInbox({
        type: 'Lost / Found Dog Notice (Via Picky)',
        details: {
          dogInfo: draft.dogNameAndBreed,
          lastSeenLocation: draft.lastSeen,
          contactInfo: draft.contact,
          loggedVia: 'Picky AI Assistant'
        }
      });

      return {
        response: {
          reply: `🐾 *Woof!* Your notice details have been recorded!\n\n📋 **Notice Summary:**\n• **Pet Details:** ${draft.dogNameAndBreed}\n• **Last Seen:** ${draft.lastSeen}\n• **Contact:** ${draft.contact}\n\nYou can also generate a printable missing pet poster right on the Lost & Found page!`,
          actionLink: {
            label: 'Open Lost & Found Noticeboard',
            sectionId: 'lost-found'
          },
          suggestedPrompts: ['Generate missing pet poster', 'Report dog in danger', 'Return to home']
        },
        newContext: { activeFlow: null, step: 0, draftData: {} }
      };
    }
  }

  // --- FLOW: VOLUNTEER SIGN-UP INTAKE ---
  if (activeFlow === 'volunteer') {
    if (step === 1) {
      draft.role = userText;
      return {
        response: {
          reply: `🐾 Awesome choice! Role: "${userText}".\n\n📍 Step 2: What city or district are you located in?`,
          suggestedPrompts: ['New York City', 'Austin, TX', 'London, UK', 'Lagos, Nigeria'],
        },
        newContext: { activeFlow: 'volunteer', step: 2, draftData: draft }
      };
    } else if (step === 2) {
      draft.location = userText;
      return {
        response: {
          reply: `Location: "${userText}".\n\n📞 Step 3: What is your full name and phone number/email?`,
          suggestedPrompts: ['Taylor Swift (taylor@example.com)'],
        },
        newContext: { activeFlow: 'volunteer', step: 3, draftData: draft }
      };
    } else if (step === 3) {
      draft.contact = userText;

      saveToAdminInbox({
        type: 'Volunteer Application (Via Picky)',
        details: {
          role: draft.role,
          location: draft.location,
          contact: draft.contact,
          loggedVia: 'Picky AI Assistant'
        }
      });

      return {
        response: {
          reply: `🎉 *Tail wags!* Thank you for volunteering to protect dogs!\n\n📋 **Registration Details:**\n• **Role:** ${draft.role}\n• **Location:** ${draft.location}\n• **Contact:** ${draft.contact}\n\nOur coordinator will connect with you soon! 🐾`,
          actionLink: {
            label: 'Explore Volunteer Guild',
            sectionId: 'community'
          },
          suggestedPrompts: ['Adopt a dog', 'Report abuse', 'Support medical fund']
        },
        newContext: { activeFlow: null, step: 0, draftData: {} }
      };
    }
  }

  // 2. Intent Trigger Detection (Starting new intake flows or navigating)

  // Report Abuse Trigger
  if (text.includes('report') || text.includes('abuse') || text.includes('cruelty') || text.includes('beat') || text.includes('chain') || text.includes('starv') || text.includes('danger')) {
    return {
      response: {
        reply: `🚨 *I'm ready to help you report this emergency right now!* 🐾\n\nLet's gather the details so our rescue team can respond.\n\n👉 **Step 1:** What kind of incident is happening? (e.g. Physical violence, continuous chaining, starvation/neglect, abandonment, hit-and-run, or dog fighting?)`,
        actionLink: {
          label: 'Or Open Incident Report Page',
          sectionId: 'report'
        },
        suggestedPrompts: ['Physical abuse / violence', 'Continuous chaining 24/7', 'Severe starvation / neglect', 'Injured hit-and-run dog']
      },
      newContext: { activeFlow: 'report', step: 1, draftData: {} }
    };
  }

  // Adoption Trigger
  if (text.includes('adopt') || text.includes('foster') || text.includes('puppy') || text.includes('dog for adoption') || text.includes('want a dog')) {
    return {
      response: {
        reply: `🏡 *Aww, that makes my tail wag so much!* 🐶💕\n\nWe have wonderful rescued dogs looking for loving homes!\n\n👉 **Step 1:** Are you looking to adopt or foster, or do you have a specific dog name/size in mind?`,
        actionLink: {
          label: 'Browse All Adoptable Dogs',
          sectionId: 'adopt'
        },
        suggestedPrompts: ['Looking to adopt a friendly dog', 'Want to become an emergency foster home', 'Small or medium sized puppy']
      },
      newContext: { activeFlow: 'adopt', step: 1, draftData: {} }
    };
  }

  // Lost & Found Trigger
  if (text.includes('lost') || text.includes('found') || text.includes('missing') || text.includes('stray') || text.includes('flyer') || text.includes('poster')) {
    return {
      response: {
        reply: `🔍 *I'll help you reunite or alert the community about this dog!* 🐾\n\n👉 **Step 1:** Is this a **Missing Pet** that you lost, a **Found Dog**, or an **Injured Stray**? Please also tell me the dog's name or breed.`,
        actionLink: {
          label: 'Open Lost & Found Noticeboard',
          sectionId: 'lost-found'
        },
        suggestedPrompts: ['Lost my Golden Retriever', 'Found a friendly brown stray dog', 'Injured stray needing medical attention']
      },
      newContext: { activeFlow: 'lost', step: 1, draftData: {} }
    };
  }

  // Volunteer Trigger
  if (text.includes('volunteer') || text.includes('guild') || text.includes('help out') || text.includes('driver') || text.includes('spotter') || text.includes('join')) {
    return {
      response: {
        reply: `🙋‍♀️ *We'd love to have you on our team!* 🐾 Every volunteer saves lives!\n\n👉 **Step 1:** Which volunteer role interests you most?\n• **Rescue Driver & Transport**\n• **Emergency Foster Home**\n• **Field Spotter & Evidence**\n• **General Community Helper**`,
        actionLink: {
          label: 'View Volunteer Guild Page',
          sectionId: 'community'
        },
        suggestedPrompts: ['Rescue Driver & Transport', 'Emergency Foster Home', 'Field Spotter & Evidence', 'General Community Helper']
      },
      newContext: { activeFlow: 'volunteer', step: 1, draftData: {} }
    };
  }

  // Support / Donation / Crypto Trigger
  if (text.includes('donate') || text.includes('support') || text.includes('crypto') || text.includes('btc') || text.includes('eth') || text.includes('fund') || text.includes('medical')) {
    return {
      response: {
        reply: `🪙 *Every single penny counts for our rescued dogs!* 🩺❤️\n\n100% of donations directly fund:\n• **Emergency Surgeries** (orthopedic fracture pinning & trauma surgery)\n• **ICU & Clinical Care** (IV fluids, parvovirus antivirals)\n• **Clinical Nutrition Kits** (specialized starvation refeeding)\n• **Foster & Shelter Supplies** (crates, thermal blankets)\n\nYou can donate directly via Bitcoin (BTC), Ethereum (ETH), or BNB Chain on the Support Us page!`,
        actionLink: {
          label: 'Go to Medical Support & Crypto Wallets',
          sectionId: 'support'
        },
        suggestedPrompts: ['How do I report abuse?', 'How do I adopt a dog?', 'Volunteer as a driver']
      },
      newContext: { activeFlow: null, step: 0, draftData: {} }
    };
  }

  // Educational / Dog Care / Knowledge Trigger
  if (text.includes('learn') || text.includes('care') || text.includes('whale eye') || text.includes('heatstroke') || text.includes('food') || text.includes('symptom') || text.includes('quiz') || text.includes('educat')) {
    return {
      response: {
        reply: `📚 *Education is the key to preventing cruelty!* 🐾\n\nHere are quick vital tips:\n• **Whale Eye:** When a dog shows the white of their eyes, it's a major sign of high fear and stress!\n• **Heatstroke First-Aid:** Never submerge in ice water! Move to shade and apply cool (not freezing) water to paw pads and neck.\n• **Continuous Chaining:** Restricting dogs on 24/7 chains causes extreme psychological trauma and is legally actionable neglect.\n\nYou can read all comprehensive guides and take our Welfare Assessment Quiz on the Learn page!`,
        actionLink: {
          label: 'Explore Humane Education Guides',
          sectionId: 'learn'
        },
        suggestedPrompts: ['Report dog abuse', 'I want to adopt', 'Donate to medical fund']
      },
      newContext: { activeFlow: null, step: 0, draftData: {} }
    };
  }

  // General Emergency Help Trigger
  if (text.includes('help') || text.includes('emergency') || text.includes('hotline') || text.includes('desk')) {
    return {
      response: {
        reply: `🚨 *If a dog is in severe danger or immediate life threat:* \n\n1. You can click the **Get Help** button in the top navbar to open our emergency desk.\n2. Or use our **Report Abuse** portal to submit an incident with GPS location and photo evidence directly!`,
        actionLink: {
          label: 'Go to Report Abuse Portal',
          sectionId: 'report'
        },
        suggestedPrompts: ['Help me fill abuse report', 'Adopt a dog', 'Post a lost pet']
      },
      newContext: { activeFlow: null, step: 0, draftData: {} }
    };
  }

  // Greetings
  if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('picky') || text.includes('who are you')) {
    return {
      response: {
        reply: `*Woof woof!* 🐶 Hi there! I'm **Picky**, your tiny puppy assistant! 🎀🐾\n\nHow may I help you today? I can help you report animal abuse, guide you through adoption, create lost dog flyers, answer dog care questions, or record messages for the admins!`,
        suggestedPrompts: ['🚨 Report dog abuse', '🏡 Adopt a rescued dog', '🔍 Post missing/found dog', '🪙 Support medical fund']
      },
      newContext: { activeFlow: null, step: 0, draftData: {} }
    };
  }

  // Default fallback response
  return {
    response: {
      reply: `*Woof!* 🐾 I'm here with you! I can help guide you through anything on PawGuard:\n\n• **Report Abuse:** Ask me to help you fill an incident report.\n• **Adoption:** Inquire about dogs looking for homes.\n• **Lost & Found:** Create a notice or missing dog poster.\n• **Volunteer Guild:** Register to become a rescue driver or foster home.\n• **Medical Donations:** Learn how crypto donations fund emergency surgeries.\n\nWhat would you like to do?`,
      suggestedPrompts: ['Help me report dog abuse', 'I want to adopt a dog', 'I lost my dog', 'Join as volunteer', 'Support medical fund']
    },
    newContext: { activeFlow: null, step: 0, draftData: {} }
  };
};
