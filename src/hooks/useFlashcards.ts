
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
  user_id: string | null;
}

// Transform Supabase flashcard to match FlashcardView expectations
const transformFlashcard = (card: Flashcard) => {
  let backContent = {
    definition: "",
    analogy: "",
    realWorldUse: "",
    codeExample: "",
  };

  try {
    const parsedAnswer = JSON.parse(card.answer);
    if (typeof parsedAnswer === 'object' && parsedAnswer !== null) {
      backContent = {
        definition: parsedAnswer.definition || "",
        analogy: parsedAnswer.analogy || "",
        realWorldUse: parsedAnswer.realWorldUse || "",
        codeExample: parsedAnswer.codeExample || "",
      };
    } else {
      backContent.definition = card.answer;
    }
  } catch (error) {
    backContent.definition = card.answer;
  }

  return {
    id: card.id, // Keep the original UUID string instead of converting to integer
    topic: card.topic,
    category: card.topic,
    difficulty: card.difficulty as "Beginner" | "Intermediate" | "Advanced",
    front: card.question,
    back: backContent,
  };
};

export const useFlashcards = (topic?: string) => {
  return useQuery({
    queryKey: ['flashcards', topic],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase
        .from('flashcards')
        .select('*')
        .order('created_at', { ascending: false });

      // Show user's own cards and public cards (where user_id is null)
      if (user) {
        query = query.or(`user_id.is.null,user_id.eq.${user.id}`);
      } else {
        query = query.is('user_id', null);
      }

      if (topic) {
        query = query.eq('topic', topic.toLowerCase());
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching flashcards:', error);
        throw error;
      }

      return (data as Flashcard[]).map(transformFlashcard);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};

export const useFlashcardsByTopic = (topic: string) => {
  return useQuery({
    queryKey: ['flashcards', 'topic', topic],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase
        .from('flashcards')
        .select('*')
        .eq('topic', topic.toLowerCase())
        .order('created_at', { ascending: false });

      // Show user's own cards and public cards
      if (user) {
        query = query.or(`user_id.is.null,user_id.eq.${user.id}`);
      } else {
        query = query.is('user_id', null);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching flashcards by topic:', error);
        throw error;
      }

      return (data as Flashcard[]).map(transformFlashcard);
    },
    enabled: !!topic,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
