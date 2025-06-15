
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
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Saved Flashcards</h1>
                <p className="text-muted-foreground mt-2">
                  Review and manage your saved flashcards
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-32">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === 'all' ? 'All Categories' : category}
            </Button>
          ))}
        </div>

        {/* Flashcards Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{savedFlashcards.length}</p>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{savedFlashcards.filter(card => card.mastered).length}</p>
                  <p className="text-sm text-muted-foreground">Mastered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{savedFlashcards.filter(card => !card.mastered).length}</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Flashcards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFlashcards.map((flashcard) => {
            const IconComponent = getCategoryIcon(flashcard.category);
            return (
              <Card key={flashcard.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {flashcard.category}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {flashcard.difficulty}
                      </Badge>
                      {flashcard.mastered && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <IconComponent className="w-5 h-5 text-purple-600" />
                    {flashcard.topic}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {flashcard.front}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Added {new Date(flashcard.dateAdded).toLocaleDateString()}</span>
                    <Link to="/learn">
                      <Button size="sm" variant="outline">
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
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No flashcards found</h3>
            <p className="text-muted-foreground mb-4">
              {selectedCategory === 'all' 
                ? "You haven't saved any flashcards yet."
                : `No flashcards found in the ${selectedCategory} category.`}
            </p>
            <Link to="/learn">
              <Button>Start Learning</Button>
            </Link>
          </div>
        )}
      </main>

      <FloatingDock />
    </div>
  );
};

export default SavedFlashcards;
