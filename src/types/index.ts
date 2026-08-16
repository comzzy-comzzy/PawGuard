export interface RescueCaseUpdate {
  time: string;
  text: string;
  author: string;
}

export interface RescueCase {
  id: string;
  title: string;
  type: 'Abuse/Violence' | 'Neglect/Starvation' | 'Severe Chaining' | 'Abandoned' | 'Injured/Road Trauma' | 'Dog Fighting' | 'Illegal Culling';
  urgency: 'critical' | 'high' | 'moderate';
  status: 'reported' | 'dispatching' | 'volunteer_en_route' | 'at_vet' | 'rescued_safe';
  location: string;
  landmark?: string;
  coordinates: [number, number];
  distance: string;
  reportedAt: string;
  description: string;
  dogName?: string;
  dogBreed?: string;
  photoUrl: string;
  reporter: string;
  reporterPhone?: string;
  isAnonymous?: boolean;
  assignedVolunteer?: string;
  adminNotes?: string;
  updates: RescueCaseUpdate[];
}

export interface AdoptableDog {
  id: string;
  name: string;
  age: string;
  gender: 'Male' | 'Female';
  breed: string;
  size: 'Small' | 'Medium' | 'Large';
  photoUrl: string;
  personality: string[];
  story: string;
  healthStatus: string;
  isVaccinated: boolean;
  isNeutered: boolean;
  goodWithKids: boolean;
  goodWithDogs: boolean;
  goodWithCats: boolean;
  rescueDate: string;
  status?: 'available' | 'adoption_pending' | 'adopted';
  submittedBy?: string;
  contactPhone?: string;
}

export interface AdoptionInquiry {
  id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  dogId?: string;
  dogName: string;
  housingType: 'House with Fenced Yard' | 'Apartment / Condo' | 'Farm / Acreage' | 'Townhouse';
  hasOtherPets: boolean;
  hasChildren: boolean;
  experienceLevel: 'First-time Owner' | 'Experienced Dog Parent' | 'Professional Trainer/Foster';
  notes: string;
  submittedAt: string;
  status: 'pending' | 'under_review' | 'approved' | 'contacted' | 'declined';
  adminNotes?: string;
}

export interface LostFoundDog {
  id: string;
  status: 'lost' | 'found' | 'injured_stray';
  caseStatus?: 'open' | 'reunited' | 'resolved';
  dogName?: string;
  breed: string;
  color: string;
  lastSeenLocation: string;
  date: string;
  photoUrl: string;
  contactName: string;
  contactPhone: string;
  reward?: string;
  details: string;
  hasMicrochip: boolean;
  submittedAt?: string;
  adminNotes?: string;
}

export interface VolunteerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Rescue Driver & Transport' | 'Emergency Foster' | 'Field Spotter' | 'Vet Assistant' | 'Community Advocate';
  location: string;
  availability: 'Full Time / Emergency' | 'Weekends' | 'Evenings' | 'On-Call';
  hasVehicle: boolean;
  experience: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'contacted' | 'declined';
  adminNotes?: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: number | string;
  currency: 'USD' | 'BTC' | 'ETH' | 'BNB' | 'EUR';
  targetCause: string;
  paymentMethod: 'Crypto Transfer' | 'Credit Card / Online' | 'Bank Wire' | 'Direct Supply Donation';
  txHashOrReceipt?: string;
  donorNote?: string;
  submittedAt: string;
  status: 'verified' | 'pending_verification' | 'thanked';
  adminNotes?: string;
}

export interface EmergencyAlert {
  id: string;
  callerName: string;
  phone: string;
  location: string;
  urgency: 'Critical Emergency' | 'High Urgency' | 'Callback Request';
  emergencyType: 'Cruelty / Abuse in Progress' | 'Severe Injury / Hit & Run' | 'Starvation / Trapped Dog' | 'Other Emergency';
  notes: string;
  submittedAt: string;
  status: 'active' | 'in_touch' | 'resolved';
  adminNotes?: string;
}

export interface AdminActivityLog {
  id: string;
  action: string;
  targetId: string;
  timestamp: string;
  type: 'rescue_case' | 'adoption_inquiry' | 'lost_found' | 'volunteer' | 'donation' | 'emergency_alert' | 'dog';
  details: string;
}

export interface VolunteerMember {
  id: string;
  name: string;
  role: 'Rescue Driver' | 'Emergency Foster' | 'Field Spotter' | 'Vet Assistant' | 'Community Advocate';
  location: string;
  rescuesAssisted: number;
  avatarUrl: string;
  badge: string;
}

export interface EducationalArticle {
  id: string;
  title: string;
  category: 'Body Language' | 'First Aid' | 'Legal Rights' | 'Preventing Cruelty' | 'Care Basics';
  readTime: string;
  summary: string;
  content: string;
  icon: string;
}
