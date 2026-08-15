import { EducationalArticle } from '../types';

export const CONTACT_INFO = {
  email: 'kane69251@gmail.com',
  emailUrl: 'mailto:kane69251@gmail.com',
  phone: '+2348105463507',
  whatsappNumber: '2348105463507',
  whatsappUrl: 'https://wa.me/2348105463507',
};

export const DONATION_WALLETS = {
  btc: '1HHarwxVUXW3A5Yn8q7eqkbMxLFiCukLmb',
  eth: '0x0D57D06bD867cB052eCC1dA67561a5b199578360',
  bnb: '0x0D57D06bD867cB052eCC1dA67561a5b199578360',
};

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'EDU-1',
    title: 'Preventing Dog Abuse, Bullying & Harassment',
    category: 'Preventing Cruelty',
    readTime: '4 min read',
    summary: 'Understanding how abuse, harassment, and bullying affect dogs physically and psychologically, and how communities can intervene safely.',
    content: `Dogs are sensitive, social animals that experience physical pain and psychological trauma from bullying, teasing, and intentional harm.
Key prevention measures:
1. Speak up against harassment: Never allow dogs to be taunted, stoned, or chased for amusement.
2. Teach children safe interactions: Educate youth to respect animals and recognize that teasing causes defensive fear reactions.
3. Report active cruelty: Continuous physical intimidation or physical abuse should immediately be reported to local authorities and rescue networks.`,
    icon: 'ShieldCheck'
  },
  {
    id: 'EDU-2',
    title: 'Ending Dog Abandonment & Unnecessary Killing',
    category: 'Legal Rights',
    readTime: '5 min read',
    summary: 'Why dog abandonment and unnecessary cullings must be stopped, and practical alternatives through shelter fostering and rescue networks.',
    content: `Abandonment leaves domesticated dogs vulnerable to starvation, vehicular accidents, and cruel cullings.
Humane solutions:
- Foster networks: Temporary volunteer homes save animals when owners face emergency situations.
- Humane population management: High-volume spay and neuter programs humanely reduce street dog populations without lethal culling.
- Rescue rehabilitation: Injured or abandoned dogs can make complete recoveries when given medical care and safe shelter.`,
    icon: 'HeartPulse'
  },
  {
    id: 'EDU-3',
    title: 'Recognizing Signs of Severe Neglect & Chaining',
    category: 'Body Language',
    readTime: '4 min read',
    summary: 'How to spot silent signs of starvation, extreme tethering, and dehydration in dogs needing rescue.',
    content: `Neglect is one of the most common forms of animal suffering.
Key indicators include:
- Continuous 24/7 chaining on short restrictive chains without freedom to move.
- Visible ribs, spine, and hip bones from severe lack of nourishment.
- Lack of access to clean, potable drinking water or shade in extreme weather.
- Untreated open sores, deep mange, or visible untreated fractures.`,
    icon: 'Eye'
  },
  {
    id: 'EDU-4',
    title: 'Treating Dogs Humanely: Care & Respect Guide',
    category: 'Care Basics',
    readTime: '3 min read',
    summary: 'Core principles of humane canine care, nutrition, gentle training, and providing a safe environment.',
    content: `Every dog deserves safety, nourishment, and compassionate treatment.
Guiding principles:
- Safe shelter: Protection from rain, excessive heat, and freezing temperatures.
- Daily nutrition and clean water: Adequate daily meals and continuous access to fresh water.
- Positive reinforcement: Rewarding good behavior rather than using physical punishment or fear-based intimidation.
- Veterinary attention: Immediate medical triage when a dog is injured or sick.`,
    icon: 'BookOpen'
  }
];
