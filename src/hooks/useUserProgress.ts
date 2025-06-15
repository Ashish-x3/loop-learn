
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

      console.log('Fetching user progress for user:', user.id);

      // Get total flashcards count
      const { data: flashcards, error: flashcardsError } = await supabase
        .from('flashcards')
        .select('id');

      if (flashcardsError) {
        console.error('Error fetching flashcards:', flashcardsError);
        throw flashcardsError;
      }

      // Get user progress data with more detailed queries
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) {
        console.error('Error fetching user progress:', progressError);
        throw progressError;
      }

      console.log('User progress data:', progress);

      const totalCards = flashcards?.length || 0;
      const masteredCards = progress?.filter(p => p.is_mastered).length || 0;
      const totalAttempts = progress?.reduce((sum, p) => sum + (p.attempts || 0), 0) || 0;
      
      // Calculate accuracy based on mastered vs attempted
      const attemptedCards = progress?.length || 0;
      const accuracy = attemptedCards > 0 ? Math.round((masteredCards / attemptedCards) * 100) : 0;
      
      // Calculate streak based on recent activity (consecutive days with reviews)
      const today = new Date();
      const recentDays = progress?.filter(p => {
        if (!p.last_reviewed) return false;
        const reviewDate = new Date(p.last_reviewed);
        const daysDiff = Math.floor((today.getTime() - reviewDate.getTime()) / (1000 * 60 * 60 * 24));
        return daysDiff <= 7;
      }).length || 0;

      // Calculate study time based on attempts (rough estimate: 1 minute per attempt)
      const studyTime = totalAttempts;

      // Generate recent activity data based on actual progress
      const recentActivity = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Count cards studied on this date
        const cardsStudiedOnDate = progress?.filter(p => {
          if (!p.last_reviewed) return false;
          const reviewDateStr = new Date(p.last_reviewed).toISOString().split('T')[0];
          return reviewDateStr === dateStr;
        }).length || 0;

        return {
          date: dateStr,
          cardsStudied: cardsStudiedOnDate
        };
      }).reverse();

      const result = {
        totalCards,
        masteredCards,
        accuracy,
        streak: recentDays,
        studyTime,
        recentActivity
      };

      console.log('Calculated user progress:', result);
      return result;
    },
    refetchInterval: 5000, // Refetch every 5 seconds to keep data current
  });
};
