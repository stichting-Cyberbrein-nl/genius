export interface Flag {
  id: string;
  level: number;
  category: 'encryption' | 'puzzle' | 'ui' | 'quiz';
  flag: string;
  points: number;
  hint: string;
}

const flags: Flag[] = [
  {
    id: 'FLAG_1',
    level: 1,
    category: 'encryption',
    flag: 'FLAG_1{hello_world}',
    points: 10,
    hint: 'Try to decode this message: "uryyb_jbeyq"',
  },
];

export function verifyFlag(input: string): boolean {
  const flag = flags.find(f => f.flag.toLowerCase() === input.toLowerCase());
  if (flag) {
    const achievedFlags = getAchievedFlags();
    if (!achievedFlags.includes(flag.id)) {
      achievedFlags.push(flag.id);
      localStorage.setItem('achievedFlags', JSON.stringify(achievedFlags));
    }
    return true;
  }
  return false;
}

export function getAchievedFlags(): string[] {
  const flags = localStorage.getItem('achievedFlags');
  return flags ? JSON.parse(flags) : [];
}

export function getFlagById(id: string): Flag | undefined {
  return flags.find(f => f.id === id);
}

export function getFlagsByLevel(level: number): Flag[] {
  return flags.filter(f => f.level === level);
}

export function getTotalPoints(): number {
  const achievedFlags = getAchievedFlags();
  return flags
    .filter(f => achievedFlags.includes(f.id))
    .reduce((sum, flag) => sum + flag.points, 0);
} 