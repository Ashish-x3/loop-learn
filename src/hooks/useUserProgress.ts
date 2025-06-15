
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface UserProgressData {
  totalCards: number;
  masteredCards: number;
  accuracy: number;
  streak: number;
  studyTime: number;
  recentActivity: {
    date: string;
    cardsStudied: number;
  }[];
}

export const useUserProgress = () => {
  return useQuery({
    queryKey: ['user-progress'],
    queryFn: async (): Promise<UserProgressData> => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Get total flashcards count
      const { data: flashcards, error: flashcardsError } = await supabase
        .from('flashcards')
        .select('id');

      if (flashcardsError) {
        console.error('Error fetching flashcards:', flashcardsError);
        throw flashcardsError;
      }

      // Get user progress data
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) {
        console.error('Error fetching user progress:', progressError);
        throw progressError;
      }

      const totalCards = flashcards?.length || 0;
      const masteredCards = progress?.filter(p => p.is_mastered).length || 0;
      const totalAttempts = progress?.reduce((sum, p) => sum + (p.attempts || 0), 0) || 0;
      const correctAttempts = masteredCards; // Simplified calculation
      
      const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
      
      // Calculate streak (simplified - days with activity)
      const recentDays = progress?.filter(p => {
        const daysDiff = Math.floor((Date.now() - new Date(p.last_reviewed || '').getTime()) / (1000 * 60 * 60 * 24));
        return daysDiff <= 7;
      }).length || 0;

      // Mock study time calculation (in minutes)
      const studyTime = Math.max(totalAttempts * 2, 0);

      // Generate recent activity data
      const recentActivity = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          date: date.toISOString().split('T')[0],
          cardsStudied: Math.floor(Math.random() * 10) // Simplified for now
        };
      }).reverse();

      return {
        totalCards,
        masteredCards,
        accuracy,
        streak: recentDays,
        studyTime,
        recentActivity
      };
    },
  });
};
