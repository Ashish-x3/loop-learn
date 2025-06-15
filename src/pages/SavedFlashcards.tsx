
import { useState } from 'react';
import { BookOpen, Star, Code, Lightbulb, Target, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import FloatingDock from '@/components/FloatingDock';
import ThemeToggle from '@/components/ThemeToggle';
import { useFlashcards } from '@/hooks/useFlashcards';
import { useCategories } from '@/hooks/useCategories';

const SavedFlashcards = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: flashcards = [], isLoading: flashcardsLoading } = useFlashcards();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const isLoading = flashcardsLoading || categoriesLoading;

  // Get all categories plus 'all' option
  const categoryOptions = ['all', ...categories.map(cat => cat.category)];
  
  const filteredFlashcards = selectedCategory === 'all' 
    ? flashcards 
    : flashcards.filter(card => {
        // Auto-categorize each flashcard
        const topicLower = card.topic.toLowerCase();
        const categoryKeywords = {
          'JavaScript': ['javascript', 'js', 'promise', 'async', 'await', 'closure', 'hoisting'],
          'React': ['react', 'jsx', 'component', 'props', 'state', 'hook', 'usestate', 'useeffect'],
          'CSS': ['css', 'flexbox', 'grid', 'animation', 'transition', 'media query'],
          'HTML': ['html', 'semantic', 'accessibility', 'form', 'input'],
          'Python': ['python', 'django', 'flask', 'pandas', 'numpy'],
          'Data Structures': ['array', 'linked list', 'stack', 'queue', 'tree', 'graph'],
          'Algorithms': ['algorithm', 'complexity', 'big o', 'recursion'],
          'Database': ['sql', 'database', 'mysql', 'postgresql', 'mongodb'],
          'Web Development': ['http', 'api', 'rest', 'graphql', 'ajax', 'fetch'],
          'DevOps': ['docker', 'kubernetes', 'ci/cd', 'git', 'deployment'],
          'Programming': ['oop', 'functional programming', 'design pattern']
        };

        const keywords = categoryKeywords[selectedCategory as keyof typeof categoryKeywords] || [];
        return keywords.some(keyword => topicLower.includes(keyword) || keyword.includes(topicLower));
      });

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, any> = {
      'JavaScript': Code,
      'React': Code,
      'CSS': Star,
      'HTML': Target,
      'Python': Code,
      'Database': Target,
      'Web Development': Globe,
      'DevOps': Server,
      'Data Structures': Cpu,
      'Algorithms': Brain,
      'Programming': Code
    };
    return iconMap[category] || BookOpen;
  };

  const masteredCount = flashcards.length; // In production, this would come from user progress
  const inProgressCount = 0; // In production, this would come from user progress

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <h2 className="text-xl font-semibold">Loading flashcards...</h2>
          <p className="text-muted-foreground">Getting your saved content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />
      
      {/* Header */}
      <header className="border-b border-border backdrop-blur-xl bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-6">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent p-2 sm:px-3">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">Saved Flashcards</h1>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm lg:text-base">
                  Review and manage your flashcards
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8 pb-24 sm:pb-32">
        {flashcards.length === 0 ? (
          <div className="text-center py-12 space-y-6">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">No flashcards yet</h3>
              <p className="text-muted-foreground">Create your first flashcards to start learning!</p>
            </div>
            <Link to="/create">
              <Button>Create Flashcards</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              {categoryOptions.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`capitalize text-xs sm:text-sm ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-card border-border text-foreground hover:bg-accent'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </Button>
              ))}
            </div>

            {/* Flashcards Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <Card className="border-border bg-card">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <div className="text-center sm:text-left">
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">{flashcards.length}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Total Saved</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border bg-card">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <div className="text-center sm:text-left">
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">{masteredCount}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <div className="text-center sm:text-left">
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">{categories.length}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Categories</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Flashcards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredFlashcards.map((flashcard) => {
                const IconComponent = getCategoryIcon(flashcard.category);
                return (
                  <Card key={flashcard.id} className="border-border bg-card hover:bg-accent/50 transition-all">
                    <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="text-xs bg-primary/20 text-primary border-primary/30">
                          {flashcard.category}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Badge className="text-xs bg-secondary text-secondary-foreground border-border">
                            {flashcard.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-sm sm:text-base lg:text-lg flex items-center gap-2 text-foreground">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        {flashcard.topic}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                        {flashcard.front}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Ready to review</span>
                        <Link to={`/learn/${flashcard.topic}`}>
                          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
                            Review
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredFlashcards.length === 0 && selectedCategory !== 'all' && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">No flashcards found</h3>
                <p className="text-muted-foreground mb-4">
                  No flashcards found in the {selectedCategory} category.
                </p>
                <Link to="/create">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Create Flashcards</Button>
                </Link>
              </div>
            )}
          </>
        )}
      </main>

      <FloatingDock />
    </div>
  );
};

export default SavedFlashcards;
