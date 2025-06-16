
import { useQuery } from '@tanstack/react-query';
import { useFlashcards } from './useFlashcards';

interface CategoryData {
  category: string;
  count: number;
  topics: string[];
}

export const useCategories = () => {
  const { data: flashcards = [], isLoading: flashcardsLoading, error: flashcardsError } = useFlashcards();

  return useQuery({
    queryKey: ['categories', flashcards],
    queryFn: async (): Promise<CategoryData[]> => {
      const categoryMap = new Map<string, Set<string>>();

      flashcards.forEach(flashcard => {
        const category = flashcard.category || flashcard.topic;
        const topic = flashcard.topic;
        
        if (!categoryMap.has(category)) {
          categoryMap.set(category, new Set());
        }
        categoryMap.get(category)!.add(topic);
      });

      const categories: CategoryData[] = Array.from(categoryMap.entries()).map(([category, topics]) => ({
        category,
        count: topics.size,
        topics: Array.from(topics).sort()
      }));

      console.log('Categories processed:', categories);
      return categories.sort((a, b) => b.count - a.count);
    },
    enabled: !flashcardsLoading && !flashcardsError,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
