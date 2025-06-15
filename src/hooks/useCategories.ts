
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
      const { data: flashcards, error } = await supabase
        .from('flashcards')
        .select('topic');

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      if (!flashcards || flashcards.length === 0) {
        return [];
      }

      // Enhanced auto-categorize topics with better keyword matching
      const categoryKeywords = {
        'React': ['react', 'jsx', 'component', 'props', 'state', 'hook', 'usestate', 'useeffect', 'context', 'reducer', 'virtual dom', 'lifecycle'],
        'JavaScript': ['javascript', 'js', 'promise', 'async', 'await', 'closure', 'hoisting', 'prototype', 'arrow', 'function', 'variable', 'scope', 'dom', 'event', 'callback', 'es6', 'es2015', 'node', 'npm'],
        'CSS': ['css', 'flexbox', 'grid', 'animation', 'transition', 'media query', 'responsive', 'bootstrap', 'sass', 'scss', 'selector', 'box model', 'position', 'display'],
        'HTML': ['html', 'semantic', 'accessibility', 'form', 'input', 'meta', 'head', 'body', 'div', 'span'],
        'Python': ['python', 'django', 'flask', 'pandas', 'numpy', 'list comprehension', 'decorator', 'lambda', 'class', 'inheritance'],
        'Data Structures': ['array', 'linked list', 'stack', 'queue', 'tree', 'graph', 'hash table', 'heap', 'binary search', 'sorting'],
        'Algorithms': ['algorithm', 'complexity', 'big o', 'recursion', 'dynamic programming', 'greedy', 'divide and conquer', 'search', 'sort'],
        'Database': ['sql', 'database', 'mysql', 'postgresql', 'mongodb', 'nosql', 'query', 'join', 'index', 'transaction'],
        'Web Development': ['http', 'api', 'rest', 'graphql', 'ajax', 'fetch', 'cors', 'authentication', 'authorization', 'session'],
        'DevOps': ['docker', 'kubernetes', 'ci/cd', 'git', 'deployment', 'server', 'cloud', 'aws', 'azure', 'gcp'],
        'Programming': ['oop', 'functional programming', 'design pattern', 'solid', 'dry', 'clean code', 'testing', 'debugging']
      };

      // Get unique topics and normalize them
      const uniqueTopics = [...new Set(flashcards.map(card => card.topic))];
      console.log('Unique topics found:', uniqueTopics);
      
      // Categorize topics with improved matching
      const categorizedTopics: Record<string, string[]> = {};
      
      uniqueTopics.forEach(topic => {
        const topicLower = topic.toLowerCase();
        let bestMatch = 'Programming'; // Default category
        let maxMatches = 0;

        // Check for exact or partial matches
        Object.entries(categoryKeywords).forEach(([category, keywords]) => {
          let matches = 0;
          
          // Check if topic contains any of the keywords or vice versa
          keywords.forEach(keyword => {
            if (topicLower.includes(keyword) || keyword.includes(topicLower)) {
              matches++;
            }
          });
          
          // Also check if the category name is in the topic
          if (topicLower.includes(category.toLowerCase())) {
            matches += 5; // Give extra weight to direct category matches
          }
          
          if (matches > maxMatches) {
            maxMatches = matches;
            bestMatch = category;
          }
        });

        console.log(`Topic "${topic}" categorized as "${bestMatch}" with ${maxMatches} matches`);

        if (!categorizedTopics[bestMatch]) {
          categorizedTopics[bestMatch] = [];
        }
        categorizedTopics[bestMatch].push(topic);
      });

      // Convert to CategoryData format and sort by count
      const result = Object.entries(categorizedTopics).map(([category, topics]) => ({
        category,
        count: topics.length,
        topics: topics.sort() // Sort topics alphabetically within each category
      })).sort((a, b) => b.count - a.count);

      console.log('Final categorization result:', result);
      return result;
    },
  });
};
