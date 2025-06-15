
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
      // Fallback for old format or if answer is not an object
      backContent.definition = card.answer;
    }
  } catch (error) {
    // Fallback for old format (answer is just a string) or invalid JSON
    backContent.definition = card.answer;
  }

  return {
    id: parseInt(card.id.slice(-8), 16), // Convert string ID to number for compatibility
    topic: card.topic,
    category: card.topic, // Use topic as category
    difficulty: card.difficulty as "Beginner" | "Intermediate" | "Advanced",
    front: card.question,
    back: backContent,
  };
};

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

      return (data as Flashcard[]).map(transformFlashcard);
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

      return (data as Flashcard[]).map(transformFlashcard);
    },
    enabled: !!topic,
  });
};
