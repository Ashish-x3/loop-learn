
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Flashcard {
  id: string;
  topic: string;
  question: string;
  answer: string;
  difficulty: string;
  created_at: string;
  updated_at: string;
}

export const useFlashcards = (topic?: string) => {
  return useQuery({
    queryKey: ['flashcards', topic],
    queryFn: async () => {
      let query = supabase
        .from('flashcards')
        .select('*')
        .order('created_at', { ascending: false });

      if (topic) {
        query = query.eq('topic', topic.toLowerCase());
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching flashcards:', error);
        throw error;
      }

      return data as Flashcard[];
    },
  });
};

export const useFlashcardsByTopic = (topic: string) => {
  return useQuery({
    queryKey: ['flashcards', 'topic', topic],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('topic', topic.toLowerCase())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching flashcards by topic:', error);
        throw error;
      }

      return data as Flashcard[];
    },
    enabled: !!topic,
  });
};
