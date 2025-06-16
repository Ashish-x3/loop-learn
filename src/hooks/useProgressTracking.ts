
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProgressUpdate {
  flashcardId: string;
  isCompleted: boolean;
  timeSpent?: number;
}

export const useProgressTracking = () => {
  const queryClient = useQueryClient();

  const updateProgress = useMutation({
    mutationFn: async ({ flashcardId, isCompleted, timeSpent = 0 }: ProgressUpdate) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      console.log('Updating progress:', { flashcardId, isCompleted, timeSpent });

      // Check if progress record exists
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('flashcard_id', flashcardId)
        .maybeSingle();

      if (existingProgress) {
        // Update existing progress
        const { data, error } = await supabase
          .from('user_progress')
          .update({
            attempts: (existingProgress.attempts || 0) + 1,
            is_mastered: isCompleted,
            last_reviewed: new Date().toISOString()
          })
          .eq('id', existingProgress.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Create new progress record
        const { data, error } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            flashcard_id: flashcardId,
            attempts: 1,
            is_mastered: isCompleted,
            last_reviewed: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch progress-related queries
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
      queryClient.invalidateQueries({ queryKey: ['flashcards'] });
    },
    onError: (error) => {
      console.error('Error updating progress:', error);
    }
  });

  const markAsCompleted = useMutation({
    mutationFn: async (flashcardId: string) => {
      return updateProgress.mutateAsync({ flashcardId, isCompleted: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
    }
  });

  return {
    updateProgress,
    markAsCompleted,
    isUpdating: updateProgress.isPending || markAsCompleted.isPending
  };
};
