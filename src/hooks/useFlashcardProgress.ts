
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useFlashcardProgress = (flashcardId: string) => {
  return useQuery({
    queryKey: ['flashcard-progress', flashcardId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { isCompleted: false, attempts: 0 };
      }

      const { data: progress, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('flashcard_id', flashcardId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching flashcard progress:', error);
        return { isCompleted: false, attempts: 0 };
      }

      return {
        isCompleted: progress?.is_mastered || false,
        attempts: progress?.attempts || 0
      };
    },
    enabled: !!flashcardId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
