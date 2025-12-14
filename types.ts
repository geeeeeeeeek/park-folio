
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface NationalPark {
  id: string;
  name: string;
  state: string;
  coordinates: Coordinates;
  description: string;
  imageUrl: string;
  established: string;
  funFact: string; // Replaces 'acres' for a more engaging experience
}

export interface UserVisit {
  parkId: string;
  visited: boolean;
  dateLastVisited?: string;
  visitCount: number;
  rating?: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  favoriteMoment?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (visits: UserVisit[], parks: NationalPark[]) => boolean;
  color: string;
}

export type ViewState = 'MAP' | 'BADGES' | 'LOGS';
