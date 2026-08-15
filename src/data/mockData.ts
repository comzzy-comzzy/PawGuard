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
    description: 'A 4-month-old golden mix is tied with a heavy 2-foot metal chain behind an auto shop. No doghouse, no water bowl. Visible shivering and distress.',
    dogName: 'Teddy',
    dogBreed: 'Golden Retriever Mix Puppy',
    photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
    reporter: 'Sarah Lin (Concerned Neighbor)',
    assignedVolunteer: 'Marcus Vance (Rescue Unit 3)',
    updates: [
      { time: '18m ago', text: 'Critical case reported with geotagged photo.', author: 'System Dispatch' },
      { time: '12m ago', text: 'Volunteer Marcus Vance accepted dispatch. En route with transport crate and thermal blanket.', author: 'Marcus Vance' },
      { time: '4m ago', text: 'Humane officer notified for legal property entry accompaniment.', author: 'Dispatch Support' }
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
      { time: '1h 30m ago', text: 'Elena and rescue team reached location. Secured mama with recovery food.', author: 'Elena Rostova' },
      { time: '35m ago', text: 'Arrived at St. Francis Veterinary Hospital. IV fluids started, pups stabilized.', author: 'Dr. Kim (Vet)' }
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
    description: 'Multiple dogs kept in rusted wire cages without medical care. Multi-agency raid conducted.',
    dogName: 'North Valley 8',
    dogBreed: 'French Bulldogs & Poodles',
    photoUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&auto=format&fit=crop&q=80',
    reporter: 'PawGuard Investigation Squad',
    assignedVolunteer: 'Captain Rodriguez & SPCA Team',
    updates: [
      { time: '1d ago', text: 'Evidence package submitted to law enforcement.', author: 'Investigation Lead' },
      { time: '18h ago', text: 'All 8 dogs legally seized and placed into safe medical quarantine.', author: 'SPCA Officers' },
      { time: '6h ago', text: 'Grooming, vaccinations and deworming completed. Now in foster recovery.', author: 'PawGuard HQ' }
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
    story: 'Bella was rescued from an abusive household where she was kept confined in a dark bathroom. Despite her past, she has blossomed into an affectionate companion who loves relaxing with family.',
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
    personality: ['Eager to Learn', 'Well Behaved', 'Affectionate', 'Friendly'],
    story: 'Oliver was found abandoned in heavy rain. Today, he is healthy, energetic, and brings calm companionship to everyone he meets.',
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
    story: 'Rescued from severe neglect where he was chained for months without room to exercise. Rusty now has perfected leash manners and loves daily walks.',
    healthStatus: 'Fully rehabilitated, clear veterinary screening',
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
    personality: ['Curious', 'Quick Learner', 'Friendly', 'Social'],
    story: 'Mochi was abandoned in a box behind a grocery store as a pup. She is healthy, friendly, and eager to learn household routines.',
    healthStatus: 'Up to date on puppy vaccines, fully vetted',
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
    personality: ['Calm & Patient', 'Relaxed', 'Food Enthusiast', 'Quiet'],
    story: 'Surrendered due to family hardship. Barnaby is an easygoing companion who loves quiet afternoons and slow strolls.',
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
    personality: ['Protective', 'Intelligent', 'Athletic', 'Attentive'],
    story: 'Saved from an abusive fighting yard where he refused to participate. Zeus is a gentle giant who thrives with an active owner and structured exercise.',
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
    details: 'Wearing a red collar with silver bone tag. Friendly, answers to Cooper. Dislikes thunder.',
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
    details: 'Small male dog, clean fur, well groomed. Found wandering near the parking lot. Safe in foster care.',
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
    contactPhone: '+1 (555) 777-3647',
    details: 'Limping on right front paw, dehydrated. Mobile veterinary unit dispatched.',
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
    badge: 'Top Responder'
  },
  {
    id: 'VOL-2',
    name: 'Daniel Thorne',
    role: 'Emergency Foster',
    location: 'North Suburbs',
    rescuesAssisted: 32,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    badge: 'Sanctuary Foster'
  },
  {
    id: 'VOL-3',
    name: 'Sofia Al-Mansoor',
    role: 'Vet Assistant',
    location: 'St. Jude Animal Care',
    rescuesAssisted: 64,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    badge: 'Medical Dispatch'
  },
  {
    id: 'VOL-4',
    name: 'Carlos Mendez',
    role: 'Field Spotter',
    location: 'East Industrial District',
    rescuesAssisted: 28,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    badge: 'Field Scout'
  }
];

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: 'EDU-1',
    title: 'Understanding Canine Pain & Silent Distress Signals',
    category: 'Body Language',
    readTime: '4 min read',
    summary: 'Dogs often mask severe pain as an evolutionary survival instinct. Learn to identify subtle signs like lip-licking, whale eye, and stiffness.',
    content: `Dogs often mask physical discomfort until it becomes severe. Key indicators of suffering include:
1. Whale Eye: Showing the whites of their eyes while turning their head away, indicating anxiety or defense.
2. Yawning & Excessive Lip Licking: Outside of tiredness or feeding, this indicates acute stress.
3. Pacing & Inability to Settle: Often seen in dogs experiencing internal pain or abdominal distress.
4. Sudden Touch Sensitivity: A calm dog flinching or snapping when touched on their hip or ear is almost always experiencing sharp localized pain.`,
    icon: 'Eye'
  },
  {
    id: 'EDU-2',
    title: 'What Constitutes Illegal Animal Cruelty: Legal Guide',
    category: 'Legal Rights',
    readTime: '6 min read',
    summary: 'Clear legal definitions of neglect, tethering violations, deprivation of sustenance, and how to safely document evidence for law enforcement.',
    content: `Cruelty falls into two primary categories:
- Active Abuse: Physical violence, deliberate burning, dog fighting, poisoning, or mutilation.
- Passive Neglect: Denying clean drinking water, adequate food, veterinary care for wounds, or continuous chaining without weather shelter.

How to gather lawful evidence:
- Note exact timestamps and street addresses.
- Take clear photos and short video clips from public sidewalks or legal vantage points without trespassing.
- Document recurring patterns (e.g. animal left outside continuously during severe weather).`,
    icon: 'ShieldCheck'
  },
  {
    id: 'EDU-3',
    title: 'Emergency First-Aid: Heatstroke, Toxin Ingestion & Wounds',
    category: 'First Aid',
    readTime: '5 min read',
    summary: 'Life-saving protocols every dog guardian should know while transporting an animal to an emergency veterinary clinic.',
    content: `Heatstroke Emergency Protocol:
- Move the dog to shade or air conditioning immediately.
- Pour cool (not ice cold) water over paw pads, groin, and neck. Ice water causes blood vessels to constrict and traps core heat.
- Offer small amounts of cool water. Do not force water down the throat.

Suspected Toxin Ingestion:
- Take a photo of the ingested packaging.
- Do not induce vomiting without consulting an emergency veterinary clinic, as caustic chemicals cause esophageal burns.`,
    icon: 'HeartPulse'
  },
  {
    id: 'EDU-4',
    title: 'Positive Reinforcement vs Punishment: Canine Behavioral Science',
    category: 'Preventing Cruelty',
    readTime: '4 min read',
    summary: 'Why dominance-based punishment causes severe behavioral trauma, and how humane positive reinforcement builds trust.',
    content: `Modern behavioral science shows that dominance-based punishment (choke collars, physical intimidation, shouting) activates fear centers in the canine brain, leading to learned helplessness or defensive aggression.
Positive reinforcement rewards desired behaviors, creating confidence, mutual respect, and long-term stability for the dog.`,
    icon: 'BookOpen'
  }
];

export const EMERGENCY_HOTLINES = [
  { name: 'PawGuard Rapid Dispatch Hotline', number: '1-800-555-7297 (24/7)', note: 'Toll-free emergency triage & volunteer dispatch' },
  { name: 'National Animal Cruelty Reporting Line', number: '1-800-222-7722', note: 'Legal cruelty investigation dispatch' },
  { name: 'Emergency Pet Poison Control Center', number: '1-888-426-4435', note: '24-hour toxicology assistance for ingested toxins' },
  { name: 'Lost Dog Emergency Broadcast Desk', number: '1-800-411-3463', note: 'Microchip lookup and community broadcast desk' }
];
