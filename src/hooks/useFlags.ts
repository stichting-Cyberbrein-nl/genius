import { useState, useEffect } from 'react';
import { Flag, FlagState } from '@/types/flag';
import { getFoundFlags, getTotalPoints, findFlag as findFlagAction } from '@/lib/flags';

export function useFlags() {
  const [flagState, setFlagState] = useState<FlagState>(() => {
    // Initialize state from localStorage if available
    if (typeof window !== 'undefined') {
      const savedFlags = localStorage.getItem('flags');
      if (savedFlags) {
        try {
          const parsedFlags = JSON.parse(savedFlags);
          return {
            flags: parsedFlags.filter((f: Flag) => f.found),
            totalPoints: parsedFlags
              .filter((f: Flag) => f.found)
              .reduce((sum: number, flag: Flag) => sum + flag.points, 0)
          };
        } catch (error) {
          console.error('Error loading flags from localStorage:', error);
        }
      }
    }
    return {
      flags: getFoundFlags(),
      totalPoints: getTotalPoints()
    };
  });

  // Listen for changes in localStorage and custom events
  useEffect(() => {
    const handleStorageChange = () => {
      const savedFlags = localStorage.getItem('flags');
      if (savedFlags) {
        try {
          const parsedFlags = JSON.parse(savedFlags);
          setFlagState({
            flags: parsedFlags.filter((f: Flag) => f.found),
            totalPoints: parsedFlags
              .filter((f: Flag) => f.found)
              .reduce((sum: number, flag: Flag) => sum + flag.points, 0)
          });
        } catch (error) {
          console.error('Error loading flags from localStorage:', error);
        }
      }
    };

    // Listen for both storage events and custom flag update events
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('flagsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('flagsUpdated', handleStorageChange);
    };
  }, []);

  const findFlag = (id: string) => {
    findFlagAction(id);
    // Update state immediately after finding a flag
    const savedFlags = localStorage.getItem('flags');
    if (savedFlags) {
      try {
        const parsedFlags = JSON.parse(savedFlags);
        setFlagState({
          flags: parsedFlags.filter((f: Flag) => f.found),
          totalPoints: parsedFlags
            .filter((f: Flag) => f.found)
            .reduce((sum: number, flag: Flag) => sum + flag.points, 0)
        });
      } catch (error) {
        console.error('Error loading flags from localStorage:', error);
      }
    }
  };

  return {
    foundFlags: flagState.flags,
    totalPoints: flagState.totalPoints,
    findFlag
  };
} 