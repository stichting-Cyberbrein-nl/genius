export type FlagCategory = 'encryption' | 'puzzle' | 'ui' | 'quiz' | 'achievement';

export interface Flag {
  id: string;
  name: string;
  description: string;
  category: FlagCategory;
  points: number;
  found: boolean;
  foundAt?: string;
  // Optional fields for level-based flags
  level?: number;
  flag?: string;
  hint?: string;
}

export interface FlagState {
  flags: Flag[];
  totalPoints: number;
} 