import { useState, useEffect } from 'react';
import { Flag, FlagState } from '@/types/flag';

const initialFlags: Flag[] = [
  {
    id: 'sound_flag',
    type: 'sound',
    name: 'Sound Master',
    description: 'Geluid aan/uit gezet',
    points: 10,
    found: false
  },
  {
    id: 'animation_flag',
    type: 'animation',
    name: 'Animation Expert',
    description: 'Animaties aan/uit gezet',
    points: 10,
    found: false
  },
  {
    id: 'text_flag',
    type: 'text',
    name: 'Text Wizard',
    description: 'Tekstgrootte aangepast',
    points: 10,
    found: false
  },
  {
    id: 'theme_flag',
    type: 'theme',
    name: 'Theme Master',
    description: 'Thema aangepast',
    points: 10,
    found: false
  },
  {
    id: '404_flag',
    type: '404',
    name: '404 Explorer',
    description: '404 pagina gevonden',
    points: 20,
    found: false
  },
  {
    id: 'admin_flag',
    type: 'admin',
    name: 'Admin Access',
    description: 'Admin pagina gevonden',
    points: 30,
    found: false
  },
  {
    id: 'einstein_flag',
    type: 'einstein',
    name: 'Einstein Friend',
    description: 'Op Einstein geklikt',
    points: 5,
    found: false
  }
];

export function useFlags() {
  const [flagState, setFlagState] = useState<FlagState>(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('flagState');
      if (savedState) {
        return JSON.parse(savedState);
      }
    }
    return {
      flags: initialFlags,
      totalPoints: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('flagState', JSON.stringify(flagState));
  }, [flagState]);

  const findFlag = (type: Flag['type']) => {
    setFlagState(prevState => {
      const updatedFlags = prevState.flags.map(flag => {
        if (flag.type === type && !flag.found) {
          return {
            ...flag,
            found: true,
            foundAt: new Date().toISOString()
          };
        }
        return flag;
      });

      const totalPoints = updatedFlags
        .filter(flag => flag.found)
        .reduce((sum, flag) => sum + flag.points, 0);

      return {
        flags: updatedFlags,
        totalPoints
      };
    });
  };

  const getFoundFlags = () => {
    return flagState.flags.filter(flag => flag.found);
  };

  const getFlagByType = (type: Flag['type']) => {
    return flagState.flags.find(flag => flag.type === type);
  };

  const resetFlags = () => {
    setFlagState({
      flags: initialFlags,
      totalPoints: 0
    });
  };

  return {
    flags: flagState.flags,
    foundFlags: getFoundFlags(),
    totalPoints: flagState.totalPoints,
    findFlag,
    getFlagByType,
    resetFlags
  };
} 