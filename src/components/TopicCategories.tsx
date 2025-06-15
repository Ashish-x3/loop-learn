import { useState } from 'react';
import { BookOpen, Code, Palette, Globe, Database, Server, Cpu, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/useCategories';

const TopicCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: categories = [], isLoading, error } = useCategories();

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, any> = {
      'JavaScript': Code,
      'React': Code,
      'CSS': Palette,
      'HTML': Globe,
      'Python': Code,
      'Database': Database,
      'Web Development': Globe,
      'DevOps': Server,
      'Data Structures': Cpu,
      'Algorithms': Brain,
      'Programming': Code
    };
    return iconMap[category] || BookOpen;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'JavaScript': 'from-yellow-500 to-orange-600',
      'React': 'from-blue-500 to-cyan-600',
      'CSS': 'from-pink-500 to-purple-600',
      'HTML': 'from-orange-500 to-red-600',
      'Python': 'from-green-500 to-blue-600',
      'Database': 'from-gray-500 to-slate-600',
      'Web Development': 'from-teal-500 to-green-600',
      'DevOps': 'from-indigo-500 to-purple-600',
      'Data Structures': 'from-red-500 to-pink-600',
      'Algorithms': 'from-violet-500 to-purple-600',
      'Programming': 'from-slate-500 to-gray-600'
    };
    return colorMap[category] || 'from-gray-500 to-slate-600';
  };

  // Function to create URL-safe topic slug - matches LearnMode parsing exactly
  const createTopicSlug = (topic: string) => {
    // Convert topic to lowercase and replace spaces with hyphens, then URL encode
    const slug = topic.toLowerCase().replace(/\s+/g, '-');
    return encodeURIComponent(slug);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Unable to load categories. Please try again later.</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <BookOpen className="w-16 h-16 mx-auto text-muted-foreground" />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">No flashcards yet</h3>
          <p className="text-muted-foreground">Create your first flashcards to see them organized by category!</p>
        </div>
        <Link to="/create">
          <Button>Create Flashcards</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold">Browse by Category</h2>
        <p className="text-muted-foreground">
          Explore flashcards organized by topic - {categories.reduce((total, cat) => total + cat.count, 0)} topics available
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((categoryData) => {
          const IconComponent = getCategoryIcon(categoryData.category);
          const isSelected = selectedCategory === categoryData.category;
          
          return (
            <Card 
              key={categoryData.category}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 overflow-hidden ${
                isSelected ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedCategory(isSelected ? null : categoryData.category)}
            >
              <div className={`h-2 bg-gradient-to-r ${getCategoryColor(categoryData.category)}`} />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getCategoryColor(categoryData.category)} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{categoryData.category}</CardTitle>
                      <CardDescription className="text-sm">
                        {categoryData.count} topic{categoryData.count !== 1 ? 's' : ''}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {categoryData.count}
                  </Badge>
                </div>
              </CardHeader>
              
              {isSelected && (
                <CardContent className="pt-0 pb-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                      Available Topics
                    </h4>
                    <div className="grid gap-2">
                      {categoryData.topics.map((topic) => {
                        const topicSlug = createTopicSlug(topic);
                        console.log('Creating link for topic:', topic, 'slug:', topicSlug);
                        
                        return (
                          <Link key={topic} to={`/learn/${topicSlug}`}>
                            <Button 
                              variant="ghost" 
                              className="w-full justify-start h-auto p-3 text-left hover:bg-primary/5"
                            >
                              <div>
                                <div className="font-medium">{topic}</div>
                                <div className="text-xs text-muted-foreground">Start learning</div>
                              </div>
                            </Button>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TopicCategories;
