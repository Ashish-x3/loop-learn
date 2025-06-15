
import { useQuery } from '@tanstack/react-query';
import { useUserProgress } from './useUserProgress';
import { Trophy, Target, Zap, Calendar } from 'lucide-react';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress?: number;
  unlockedDate?: string;
}

export const useAchievements = () => {
  const { data: userProgress } = useUserProgress();

  return useQuery({
    queryKey: ['achievements', userProgress],
    queryFn: async (): Promise<Achievement[]> => {
      if (!userProgress) return [];

      const achievements: Achievement[] = [
        {
          id: 1,
          title: "First Steps",
          description: "Complete your first flashcard",
          icon: Target,
          unlocked: userProgress.totalCards > 0,
          unlockedDate: userProgress.totalCards > 0 ? "2024-01-15" : undefined
        },
        {
          id: 2,
          title: "Week Warrior",
          description: "Maintain a 7-day learning streak",
          icon: Calendar,
          unlocked: userProgress.streak >= 7,
          progress: Math.min((userProgress.streak / 7) * 100, 100),
          unlockedDate: userProgress.streak >= 7 ? "2024-01-20" : undefined
        },
        {
          id: 3,
          title: "Speed Demon",
          description: "Answer 10 cards in under 2 minutes",
          icon: Zap,
          unlocked: false,
          progress: Math.min((userProgress.studyTime / 120) * 100, 100) // Simplified calculation
        },
        {
          id: 4,
          title: "Knowledge Master",
          description: "Master 50 flashcards",
          icon: Trophy,
          unlocked: userProgress.masteredCards >= 50,
          progress: Math.min((userProgress.masteredCards / 50) * 100, 100),
          unlockedDate: userProgress.masteredCards >= 50 ? "2024-01-25" : undefined
        }
      ];

      return achievements;
    },
    enabled: !!userProgress,
  });
};
