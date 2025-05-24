export type FlagType = 'sound' | 'animation' | 'text' | 'theme' | '404' | 'admin' | 'einstein';

export interface Flag {
  id: string;
  type: FlagType;
  name: string;
  description: string;
  points: number;
  found: boolean;
  foundAt?: string;
}

export interface FlagState {
  flags: Flag[];
  totalPoints: number;
} 