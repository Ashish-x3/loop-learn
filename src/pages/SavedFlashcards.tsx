
import { useState } from 'react';
import { BookOpen, Star, Code, Lightbulb, Target, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import FloatingDock from '@/components/FloatingDock';
import ThemeToggle from '@/components/ThemeToggle';

// Sample saved flashcards data
const savedFlashcards = [
  {
    id: 1,
    topic: "JavaScript Promise",
    category: "JavaScript",
    difficulty: "Intermediate",
    dateAdded: "2024-01-15",
    mastered: true,
    front: "What is a JavaScript Promise?",
  },
  {
    id: 2,
    topic: "Array.map()",
    category: "JavaScript", 
    difficulty: "Beginner",
    dateAdded: "2024-01-14",
    mastered: true,
    front: "What does Array.map() do?",
  },
  {
    id: 3,
    topic: "CSS Flexbox",
    category: "CSS",
    difficulty: "Intermediate", 
    dateAdded: "2024-01-13",
    mastered: false,
    front: "What is CSS Flexbox?",
  },
  {
    id: 4,
    topic: "React useState",
    category: "React",
    difficulty: "Beginner",
    dateAdded: "2024-01-12",
    mastered: true,
    front: "How does React useState work?",
  },
  {
    id: 5,
    topic: "Node.js Event Loop",
    category: "Node.js",
    difficulty: "Advanced",
    dateAdded: "2024-01-11", 
    mastered: false,
    front: "Explain the Node.js Event Loop",
  }
];

const SavedFlashcards = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'JavaScript', 'CSS', 'React', 'Node.js'];
  
  const filteredFlashcards = selectedCategory === 'all' 
    ? savedFlashcards 
    : savedFlashcards.filter(card => card.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'javascript': return Code;
      case 'css': return Star;
      case 'react': return Lightbulb;
      case 'node.js': return Target;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <ThemeToggle />
      
      {/* Header */}
      <header className="border-b border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/10 dark:bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-6">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/20 p-2 sm:px-3">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-black dark:text-white">Saved Flashcards</h1>
                <p className="text-black/70 dark:text-white/70 mt-1 text-xs sm:text-sm lg:text-base">
                  Review and manage your saved flashcards
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8 pb-24 sm:pb-32">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`capitalize text-xs sm:text-sm ${
                selectedCategory === category 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10 text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/30'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </Button>
          ))}
        </div>

        {/* Flashcards Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Card className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white">{savedFlashcards.length}</p>
                  <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">Total Saved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white">{savedFlashcards.filter(card => card.mastered).length}</p>
                  <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">Mastered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white">{savedFlashcards.filter(card => !card.mastered).length}</p>
                  <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">In Progress</p>
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
              <Card key={flashcard.id} className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all">
                <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="text-xs bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30">
                      {flashcard.category}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Badge className="text-xs bg-white/20 dark:bg-black/20 text-black dark:text-white border-white/30 dark:border-white/20">
                        {flashcard.difficulty}
                      </Badge>
                      {flashcard.mastered && (
                        <Star className="w-4 h-4 text-blue-500 fill-current" />
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-sm sm:text-base lg:text-lg flex items-center gap-2 text-black dark:text-white">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    {flashcard.topic}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mb-3 line-clamp-2">
                    {flashcard.front}
                  </p>
                  <div className="flex items-center justify-between text-xs text-black/70 dark:text-white/70">
                    <span>Added {new Date(flashcard.dateAdded).toLocaleDateString()}</span>
                    <Link to="/learn">
                      <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600 text-xs">
                        Review
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredFlashcards.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-black/50 dark:text-white/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">No flashcards found</h3>
            <p className="text-black/70 dark:text-white/70 mb-4">
              {selectedCategory === 'all' 
                ? "You haven't saved any flashcards yet."
                : `No flashcards found in the ${selectedCategory} category.`}
            </p>
            <Link to="/learn">
              <Button className="bg-blue-500 text-white hover:bg-blue-600">Start Learning</Button>
            </Link>
          </div>
        )}
      </main>

      <FloatingDock />
    </div>
  );
};

export default SavedFlashcards;
