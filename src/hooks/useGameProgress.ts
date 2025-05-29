'use client';

import { useState, useEffect } from 'react';

interface GameProgress {
  easy: {
    currentLevel: number;
    points: number;
  };
  hard: {
    currentLevel: number;
    points: number;
  };
}

const initialProgress: GameProgress = {
  easy: {
    currentLevel: 1,
    points: 0
  },
  hard: {
    currentLevel: 1,
    points: 0
  }
};

export function useGameProgress() {
  // Initialize state with a function to ensure it only runs once
  const [progress, setProgress] = useState<GameProgress>(() => {
    if (typeof window !== 'undefined') {
      const savedProgress = localStorage.getItem('gameProgress');
      if (savedProgress) {
        try {
          return JSON.parse(savedProgress);
        } catch (error) {
          console.error('Error parsing saved progress:', error);
          return initialProgress;
        }
      }
    }
    return initialProgress;
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gameProgress', JSON.stringify(progress));
    }
  }, [progress]);

  const updateProgress = (difficulty: 'easy' | 'hard', level: number, points: number) => {
    setProgress(prev => ({
      ...prev,
      [difficulty]: {
        currentLevel: level,
        points: points
      }
    }));
  };

  const getProgress = (difficulty: 'easy' | 'hard') => {
    return progress[difficulty];
  };

  const resetProgress = (difficulty?: 'easy' | 'hard') => {
    if (difficulty) {
      setProgress(prev => ({
        ...prev,
        [difficulty]: initialProgress[difficulty]
      }));
    } else {
      setProgress(initialProgress);
    }
  };

  return {
    progress,
    updateProgress,
    getProgress,
    resetProgress
  };
} 