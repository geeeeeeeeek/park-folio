
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
  asciiArt: string;
  established: string;
  funFact: string;
}

export type RatingValue = 0 | 1 | 2 | 3;

export interface VisitLog {
  date: string;
  notes: string;
}

export interface UserParkHistory {
  parkId: string;
  rating?: RatingValue;
  visits: VisitLog[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (history: UserParkHistory[], parks: NationalPark[]) => boolean;
  color: string;
}

export type ViewState = 'MAP' | 'BADGES' | 'LOGS';
