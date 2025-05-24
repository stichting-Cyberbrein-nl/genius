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
  const [progress, setProgress] = useState<GameProgress>(initialProgress);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gameProgress', JSON.stringify(progress));
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