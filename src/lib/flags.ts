import { Flag } from '@/types/flag';

// Initialize flags array with default values
const defaultFlags: Flag[] = [
  // Level-based flags
  {
    id: 'FLAG_1',
    name: 'Level 1 - Caesar Cipher',
    description: 'Decode the message using Caesar cipher',
    category: 'encryption',
    level: 1,
    flag: 'FLAG_1{hello_world}',
    points: 10,
    hint: 'Try to decode this message: "uryyb_jbeyq"',
    found: false
  },
  // Achievement flags
  {
    id: 'sound_flag',
    name: 'Sound Master',
    description: 'Geluid aan/uit gezet',
    category: 'achievement',
    points: 10,
    found: false
  },
  {
    id: 'animation_flag',
    name: 'Animation Expert',
    description: 'Animaties aan/uit gezet',
    category: 'achievement',
    points: 10,
    found: false
  },
  {
    id: 'text_flag',
    name: 'Text Wizard',
    description: 'Tekstgrootte aangepast',
    category: 'achievement',
    points: 10,
    found: false
  },
  {
    id: 'theme_flag',
    name: 'Theme Master',
    description: 'Thema aangepast',
    category: 'achievement',
    points: 10,
    found: false
  },
  {
    id: '404_flag',
    name: '404 Finder',
    description: 'Je hebt de geheime 404-pagina gevonden!',
    category: 'achievement',
    points: 10,
    found: false,
  },
  {
    id: 'admin_flag',
    name: 'Admin Ontdekker',
    description: 'Je hebt de geheime admin pagina gevonden',
    category: 'achievement',
    points: 50,
    found: false
  },
  {
    id: 'admin_maintenance_flag',
    name: 'Maintenance Master',
    description: 'Je hebt geprobeerd de maintenance mode te activeren',
    category: 'achievement',
    points: 25,
    found: false
  },
  {
    id: 'admin_settings_flag',
    name: 'Settings Specialist',
    description: 'Je hebt geprobeerd de instellingen bij te werken',
    category: 'achievement',
    points: 25,
    found: false
  },
  {
    id: 'admin_delete_flag',
    name: 'Delete Daredevil',
    description: 'Je hebt geprobeerd alle data te verwijderen',
    category: 'achievement',
    points: 50,
    found: false
  },
  {
    id: 'einstein_flag',
    name: 'Einstein Friend',
    description: 'Op Einstein geklikt',
    category: 'achievement',
    points: 5,
    found: false
  },
  {
    id: 'quiz_flag',
    name: 'Quiz Master',
    description: 'Quiz voltooid',
    category: 'quiz',
    points: 25,
    found: false
  },
  {
    id: 'easy_game_flag',
    name: 'Easy Game Master',
    description: 'Alle levels van de makkelijke game voltooid',
    category: 'achievement',
    points: 50,
    found: false
  },
  {
    id: 'hard_game_flag',
    name: 'Hard Game Master',
    description: 'Alle levels van de moeilijke game voltooid',
    category: 'achievement',
    points: 100,
    found: false
  },
  {
    id: 'decryption_master',
    name: 'Decryptie Meester',
    description: 'Een verborgen flag gevonden met de decryptie tool',
    category: 'achievement',
    points: 50,
    found: false
  },
  {
    id: 'first_decryption',
    name: 'Eerste Decryptie',
    description: 'Je eerste succesvolle decryptie uitgevoerd',
    category: 'achievement',
    points: 25,
    found: false
  }
];

// Initialize flags from localStorage or use defaults
let flags: Flag[] = defaultFlags;

// Load flags from localStorage on initialization
if (typeof window !== 'undefined') {
  const savedFlags = localStorage.getItem('flags');
  if (savedFlags) {
    try {
      const parsedFlags = JSON.parse(savedFlags);
      // Merge saved flags with defaults to ensure all flags exist
      flags = defaultFlags.map(defaultFlag => {
        const savedFlag = parsedFlags.find((f: Flag) => f.id === defaultFlag.id);
        return savedFlag || defaultFlag;
      });
    } catch (error) {
      console.error('Error loading flags from localStorage:', error);
      flags = defaultFlags;
    }
  }
}

export function verifyFlag(input: string): boolean {
  const flag = flags.find(f => f.flag?.toLowerCase() === input.toLowerCase());
  if (flag && !flag.found) {
    flag.found = true;
    flag.foundAt = new Date().toISOString();
    saveFlags();
    return true;
  }
  return false;
}

export function getFlagById(id: string): Flag | undefined {
  return flags.find(f => f.id === id);
}

export function getFlagsByLevel(level: number): Flag[] {
  return flags.filter(f => f.level === level);
}

export function getFlagsByCategory(category: Flag['category']): Flag[] {
  return flags.filter(f => f.category === category);
}

export function getFoundFlags(): Flag[] {
  return flags.filter(f => f.found);
}

export function getTotalPoints(): number {
  return flags
    .filter(f => f.found)
    .reduce((sum, flag) => sum + flag.points, 0);
}

export function findFlag(id: string): void {
  const flag = flags.find(f => f.id === id);
  if (flag && !flag.found) {
    flag.found = true;
    flag.foundAt = new Date().toISOString();
    saveFlags();
    // Dispatch a custom event to notify other components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('flagsUpdated'));
    }
  }
}

function saveFlags(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('flags', JSON.stringify(flags));
      // Dispatch a custom event to notify other components
      window.dispatchEvent(new Event('flagsUpdated'));
    } catch (error) {
      console.error('Error saving flags to localStorage:', error);
    }
  }
} 