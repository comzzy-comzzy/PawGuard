export interface RescueCase {
  id: string;
  title: string;
  type: 'Abuse/Violence' | 'Neglect/Starvation' | 'Severe Chaining' | 'Abandoned' | 'Injured/Road Trauma' | 'Dog Fighting' | 'Illegal Culling';
  urgency: 'critical' | 'high' | 'moderate';
  status: 'reported' | 'dispatching' | 'volunteer_en_route' | 'at_vet' | 'rescued_safe';
  location: string;
  coordinates: [number, number];
  distance: string;
  reportedAt: string;
  description: string;
  dogName?: string;
  dogBreed?: string;
  photoUrl: string;
  reporter: string;
  assignedVolunteer?: string;
  updates: Array<{
    time: string;
    text: string;
    author: string;
  }>;
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
}

export interface LostFoundDog {
  id: string;
  status: 'lost' | 'found' | 'injured_stray';
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
