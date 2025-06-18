
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CategoryData {
  category: string;
  count: number;
  topics: string[];
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<CategoryData[]> => {
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase
        .from('flashcards')
        .select('topic');

      // Show user's own cards and public cards
      if (user) {
        query = query.or(`user_id.is.null,user_id.eq.${user.id}`);
      } else {
        query = query.is('user_id', null);
      }

      const { data: flashcards, error } = await query;

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      // Group flashcards by topic to create categories
      const topicCounts: Record<string, Set<string>> = {};
      
      flashcards?.forEach(card => {
        const topic = card.topic;
        const category = topic; // For now, each topic is its own category
        
        if (!topicCounts[category]) {
          topicCounts[category] = new Set();
        }
        topicCounts[category].add(topic);
      });

      // Convert to CategoryData format
      const categories: CategoryData[] = Object.entries(topicCounts).map(([category, topics]) => ({
        category,
        count: topics.size,
        topics: Array.from(topics)
      }));

      return categories.sort((a, b) => a.category.localeCompare(b.category));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
