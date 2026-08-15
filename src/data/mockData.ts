import { RescueCase, AdoptableDog, LostFoundDog, VolunteerMember, EducationalArticle } from '../types';

export const INITIAL_RESCUE_CASES: RescueCase[] = [
  {
    id: 'PG-RESCUE-8942',
    title: 'Puppy chained outdoors in freezing rain without shelter',
    type: 'Severe Chaining',
    urgency: 'critical',
    status: 'volunteer_en_route',
    location: '448 Maple Avenue, District 4, Metro Area',
    coordinates: [40.7128, -74.0060],
    distance: '1.2 km away',
    reportedAt: '18 minutes ago',
    description: 'A 4-month-old golden mix is tied with a heavy 2-foot metal chain behind an abandoned auto shop. No doghouse, no water bowl. Visible shivering and whimpering.',
    dogName: 'Teddy',
    dogBreed: 'Golden Retriever Mix Puppy',
    photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
    reporter: 'Sarah Lin (Concerned Neighbor)',
    assignedVolunteer: 'Marcus Vance (Rescue Unit 3)',
    updates: [
      { time: '18m ago', text: 'Critical case reported with geotagged photo.', author: 'System Dispatch' },
      { time: '12m ago', text: 'Volunteer Marcus Vance accepted dispatch. En route with transport crate and thermal blanket.', author: 'Marcus Vance' },
      { time: '4m ago', text: 'Officer Davis notified for legal property entry accompaniment.', author: 'Dispatch Support' }
    ]
  },
  {
    id: 'PG-RESCUE-8941',
    title: 'Starved mama dog and 5 newborn pups in construction ditch',
    type: 'Neglect/Starvation',
    urgency: 'high',
    status: 'at_vet',
    location: 'Industrial Blvd & 7th Street, East End',
    coordinates: [40.7306, -73.9352],
    distance: '3.8 km away',
    reportedAt: '2 hours ago',
    description: 'Emaciated mama hound found guarding 5 newborn pups inside an open excavation trench. Mama is weak but protective.',
    dogName: 'Hope & 5 Pups',
    dogBreed: 'Hound Mix',
    photoUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
    reporter: 'Anonymous Worker',
    assignedVolunteer: 'Elena Rostova (PawGuard Shelter Lead)',
    updates: [
      { time: '2h ago', text: 'Report received with GPS coordinates.', author: 'System Dispatch' },
      { time: '1h 30m ago', text: 'Elena and Team Bravo reached location. Successfully secured mama with high-value treats.', author: 'Elena Rostova' },
      { time: '35m ago', text: 'Arrived at St. Francis Veterinary Hospital. IV fluids started, pups warm and nursing.', author: 'Dr. Kim (Vet)' }
    ]
  },
  {
    id: 'PG-RESCUE-8939',
    title: 'Injured stray dog hit by car, driver fled scene',
    type: 'Injured/Road Trauma',
    urgency: 'critical',
    status: 'at_vet',
    location: 'Corner of Sunset Hwy & Elm Street',
    coordinates: [40.6782, -73.9442],
    distance: '5.1 km away',
    reportedAt: '3 hours ago',
    description: 'Black Labrador mix suffered hind leg injury after vehicular hit-and-run. Conscious, calm, rescued by passersby with emergency towel wrap.',
    dogName: 'Buster',
    dogBreed: 'Black Labrador Mix',
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80',
    reporter: 'David Chen',
    assignedVolunteer: 'Oakridge Rescue Patrol',
    updates: [
      { time: '3h ago', text: 'Emergency hit-and-run alert logged.', author: 'David Chen' },
      { time: '2h 15m ago', text: 'Transported to Emergency Vet Trauma Center. Fractured femur stabilized.', author: 'Oakridge Rescue' }
    ]
  },
  {
    id: 'PG-RESCUE-8935',
    title: 'Illegal backyard breeding enclosure with 8 neglected dogs',
    type: 'Abuse/Violence',
    urgency: 'high',
    status: 'rescued_safe',
    location: '124 Old Mill Road, North Valley',
    coordinates: [40.7589, -73.9851],
    distance: '7.4 km away',
    reportedAt: '1 day ago',
    description: 'Multiple French bulldogs and poodles kept in rusted wire cages without medical care. Multi-agency raid conducted.',
    dogName: 'North Valley 8',
    dogBreed: 'French Bulldogs & Poodles',
    photoUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop&q=80',
    reporter: 'PawGuard Investigation Squad',
    assignedVolunteer: 'Captain Rodriguez & SPCA Team',
    updates: [
      { time: '1d ago', text: 'Evidence package submitted to law enforcement.', author: 'Investigation Lead' },
      { time: '18h ago', text: 'All 8 dogs legally seized and placed into safe medical quarantine.', author: 'SPCA Officers' },
      { time: '6h ago', text: 'Grooming, vaccinations and deworming completed. Now in warm foster recovery.', author: 'PawGuard HQ' }
    ]
  }
];

export const ADOPTABLE_DOGS: AdoptableDog[] = [
  {
    id: 'ADOPT-101',
    name: 'Bella',
    age: '1.5 years',
    gender: 'Female',
    breed: 'Apricot Poodle Mix',
    size: 'Small',
    photoUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=80',
    personality: ['Sweet & Cuddly', 'Gentle with Children', 'Lap Dog', 'Playful'],
    story: 'Bella was rescued from an abusive household where she was kept in a dark bathroom. Despite her past, she has blossomed into the most affectionate cuddlebug who loves curling up in your lap.',
    healthStatus: 'Fully healthy, microchipped & spayed',
    isVaccinated: true,
    isNeutered: true,
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: true,
    rescueDate: 'October 2025'
  },
  {
    id: 'ADOPT-102',
    name: 'Oliver',
    age: '2 years',
    gender: 'Male',
    breed: 'Fluffy Maltipoo',
    size: 'Small',
    photoUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&auto=format&fit=crop&q=80',
    personality: ['Eager to Learn', 'Bowtie Fashionista', 'Affectionate', 'Friendly'],
    story: 'Oliver was found tied to a park bench in heavy rain. Today, he wears his bowtie with pride and loves spreading joy to everyone he meets! He loves squeaky toys and car rides.',
    healthStatus: 'Excellent, vaccinated & parasite-free',
    isVaccinated: true,
    isNeutered: true,
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: false,
    rescueDate: 'November 2025'
  },
  {
    id: 'ADOPT-103',
    name: 'Rusty',
    age: '3 years',
    gender: 'Male',
    breed: 'Golden Cocker Spaniel Mix',
    size: 'Medium',
    photoUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&auto=format&fit=crop&q=80',
    personality: ['Loyal Companion', 'Outdoor Lover', 'Trained', 'Gentle Spirit'],
    story: 'Rescued from severe neglect where he was chained for 2 years without room to run. Rusty now runs with boundless joy and has perfected his leash manners.',
    healthStatus: 'Fully rehabilitated, clear bloodwork',
    isVaccinated: true,
    isNeutered: true,
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: true,
    rescueDate: 'September 2025'
  },
  {
    id: 'ADOPT-104',
    name: 'Mochi',
    age: '8 months',
    gender: 'Female',
    breed: 'Cream Bichon Frise Mix',
    size: 'Small',
    photoUrl: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&auto=format&fit=crop&q=80',
    personality: ['Curious', 'Bouncy', 'Fast Learner', 'Heart Stealer'],
    story: 'Mochi was abandoned in a cardboard box behind a supermarket as a 6-week-old pup. She is pure sunshine and adores tummy rubs and learning new tricks.',
    healthStatus: 'Up to date on puppy vaccines, healthy',
    isVaccinated: true,
    isNeutered: true,
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: true,
    rescueDate: 'December 2025'
  },
  {
    id: 'ADOPT-105',
    name: 'Barnaby',
    age: '4 years',
    gender: 'Male',
    breed: 'Gentle Basset Hound Mix',
    size: 'Medium',
    photoUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&auto=format&fit=crop&q=80',
    personality: ['Calm & Patient', 'Couch Potato', 'Food Enthusiast', 'Quiet'],
    story: 'Barnaby was surrendered when his previous owner threatened to discard him. He is the ultimate soothing companion who loves gentle afternoon strolls.',
    healthStatus: 'Healthy, ear treatment completed',
    isVaccinated: true,
    isNeutered: true,
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: true,
    rescueDate: 'August 2025'
  },
  {
    id: 'ADOPT-106',
    name: 'Zeus',
    age: '2.5 years',
    gender: 'Male',
    breed: 'German Shepherd / Husky Mix',
    size: 'Large',
    photoUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&auto=format&fit=crop&q=80',
    personality: ['Protective', 'Intelligent', 'Athletic', 'Eager to Please'],
    story: 'Saved from an abusive fighting yard where he refused to fight. Zeus is a gentle giant who just wants to protect his humans and play fetch in the yard.',
    healthStatus: 'Strong, healthy joints, fully vetted',
    isVaccinated: true,
    isNeutered: true,
    goodWithKids: false,
    goodWithDogs: true,
    goodWithCats: false,
    rescueDate: 'July 2025'
  }
];

export const LOST_FOUND_DOGS: LostFoundDog[] = [
  {
    id: 'LF-301',
    status: 'lost',
    dogName: 'Cooper',
    breed: 'Golden Retriever',
    color: 'Light Golden / Cream',
    lastSeenLocation: 'Oak Ridge Park, Near North Trail Entrance',
    date: 'Yesterday, 4:30 PM',
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80',
    contactName: 'Jessica Miller',
    contactPhone: '+1 (555) 234-8901',
    reward: '$500 Reward',
    details: 'Wearing a red collar with silver bone tag. Very friendly, answers to "Cooper" or whistle. Scared of thunderstorms.',
    hasMicrochip: true
  },
  {
    id: 'LF-302',
    status: 'found',
    dogName: 'Unknown (Wearing blue collar)',
    breed: 'Shih Tzu Mix',
    color: 'White & Tan',
    lastSeenLocation: 'Found near Green Valley Grocery on 14th St',
    date: 'Today, 8:00 AM',
    photoUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&auto=format&fit=crop&q=80',
    contactName: 'PawGuard Safe Haven Station 2',
    contactPhone: '+1 (555) 987-6543',
    details: 'Small male dog, clean fur, very well groomed. Found wandering near the parking lot. Safe in warm foster room.',
    hasMicrochip: false
  },
  {
    id: 'LF-303',
    status: 'injured_stray',
    dogName: 'Stray Corgi Mix',
    breed: 'Corgi Mix',
    color: 'Tri-color Brown / Black / White',
    lastSeenLocation: 'Under Pine Street Overpass',
    date: 'Today, 11:15 AM',
    photoUrl: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=600&auto=format&fit=crop&q=80',
    contactName: 'Emergency Vet Dispatch',
    contactPhone: '+1 (555) 777-DOGS',
    details: 'Limping on right front paw, dehydrated but accepting water. Mobile clinic dispatched.',
    hasMicrochip: false
  }
];

export const VOLUNTEERS: VolunteerMember[] = [
  {
    id: 'VOL-1',
    name: 'Maya Henderson',
    role: 'Rescue Driver',
    location: 'Downtown & Metro Core',
    rescuesAssisted: 47,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    badge: '🏆 Top Rescue Responder'
  },
  {
    id: 'VOL-2',
    name: 'Daniel Thorne',
    role: 'Emergency Foster',
    location: 'North Suburbs',
    rescuesAssisted: 32,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    badge: '🏡 Sanctuary Hero'
  },
  {
    id: 'VOL-3',
    name: 'Sofia Al-Mansoor',
    role: 'Vet Assistant',
    location: 'St. Jude Animal Care',
    rescuesAssisted: 64,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    badge: '🩺 Trauma Medic Star'
  },
  {
    id: 'VOL-4',
    name: 'Carlos Mendez',
    role: 'Field Spotter',
    location: 'East Industrial District',
    rescuesAssisted: 28,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    badge: '👁️ Anti-Cruelty Scout'
  }
];

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'EDU-1',
    title: 'Understanding Canine Pain & Silent Distress Signals',
    category: 'Body Language',
    readTime: '4 min read',
    summary: 'Dogs often hide severe pain as an evolutionary survival instinct. Learn to identify subtle signs like lip-licking, whale eye, and stiffness.',
    content: `Dogs are masters at masking discomfort until it becomes unbearable. Key indicators of suffering include:
1. **Whale Eye**: Showing the whites of their eyes while turning their head away, indicating fear or defense.
2. **Yawning & Excessive Lip Licking**: Outside of hunger or tiredness, this indicates high stress or nausea.
3. **Pacing & Inability to Settle**: Often seen in dogs experiencing internal pain, abdominal colic, or distress.
4. **Sudden Aggression upon Touch**: A normally sweet dog snapping when touched on their hip or ear is almost always in sharp physical pain.`,
    icon: 'Eye'
  },
  {
    id: 'EDU-2',
    title: 'What Constitutes Illegal Animal Cruelty: A Citizen Guide',
    category: 'Legal Rights',
    readTime: '6 min read',
    summary: 'Clear legal definitions of neglect, tethering violations, deprivation of sustenance, and how to safely document evidence for law enforcement.',
    content: `Cruelty falls into two main categories:
- **Active Abuse**: Physical beating, deliberate burning, staging dog fights, poisoning, or mutilation.
- **Passive Neglect**: Denying clean drinking water, adequate food, veterinary care for open wounds, or keeping a dog continuously tied on a short chain without shelter against extreme heat or freezing cold.

**How to gather lawful evidence:**
- Note exact timestamps and street addresses.
- Take clear photos and short video clips from public sidewalks or legal vantage points. Do not trespass on private property.
- Note recurring patterns (e.g. "dog has been left outside through three days of continuous sub-zero temperatures").`,
    icon: 'ShieldCheck'
  },
  {
    id: 'EDU-3',
    title: 'Emergency First-Aid: Heatstroke, Toxin Ingestion & Wounds',
    category: 'First Aid',
    readTime: '5 min read',
    summary: 'Life-saving protocols every dog guardian should know while rushing to an emergency veterinary clinic.',
    content: `**Heatstroke Emergency Protocol:**
- Move dog to shade/air conditioning immediately.
- Pour cool (NEVER ICE COLD) water over paw pads, groin, and neck. Ice water causes blood vessels to constrict and traps core heat.
- Offer small sips of cool water. Do not force water down the throat.

**Suspected Toxin Ingestion (Chocolate, Xylitol, Rodenticide, Human Pills):**
- Take a photo of the packaging.
- Do NOT induce vomiting without calling a vet or animal poison control hotline, as caustic chemicals cause double burn injuries coming back up.`,
    icon: 'HeartPulse'
  },
  {
    id: 'EDU-4',
    title: 'Positive Reinforcement vs Punishment: The Science of Canine Trust',
    category: 'Preventing Cruelty',
    readTime: '4 min read',
    summary: 'Why outdated "alpha roll" and dominance methods cause severe trauma and bite escalations, and how science-backed positive reinforcement creates bonded pets.',
    content: `Modern behavioral science has thoroughly debunked alpha-dominance theories in domestic dogs. Dominance-based punishment (choke collars, alpha rolls, shouting) activates the canine amygdala fear response, leading to learned helplessness or sudden fear-biting.
Positive reinforcement rewards desired behaviors, building confidence, mutual respect, and lifelong security for the dog.`,
    icon: 'BookOpen'
  }
];

export const EMERGENCY_HOTLINES = [
  { name: 'PawGuard Rapid Dispatch Hotline', number: '1-800-555-PAWS (24/7)', note: 'Toll-free immediate emergency triage & volunteer dispatch' },
  { name: 'National Animal Cruelty Reporting Line', number: '1-800-222-SPCA', note: 'Official legal cruelty investigation dispatch' },
  { name: 'Emergency Pet Poison Control Center', number: '1-888-426-4435', note: '24-hour toxicology assistance for ingested poisons' },
  { name: 'Lost Dog Emergency Broadcast Desk', number: '1-800-411-FIND', note: 'Immediate microchip lookup and community radio broadcast' }
];
