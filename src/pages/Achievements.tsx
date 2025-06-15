
import { useState } from 'react';
import { Trophy, Target, Zap, Calendar, BookOpen, Star, Code, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
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

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    { 
      id: 1, 
      title: "First Steps", 
      description: "Complete your first flashcard", 
      icon: Target,
      unlocked: true,
      unlockedDate: "2024-01-15"
    },
    { 
      id: 2, 
      title: "Week Warrior", 
      description: "Maintain a 7-day learning streak", 
      icon: Calendar,
      unlocked: true,
      unlockedDate: "2024-01-20"
    },
    { 
      id: 3, 
      title: "Speed Demon", 
      description: "Answer 10 cards in under 2 minutes", 
      icon: Zap,
      unlocked: false,
      progress: 65
    },
    { 
      id: 4, 
      title: "Knowledge Master", 
      description: "Master 50 flashcards", 
      icon: Trophy,
      unlocked: false,
      progress: 84
    }
  ];

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
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
              <p className="text-muted-foreground mt-2">
                Track your learning progress and unlock new badges
              </p>
            </div>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-32">
        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="flashcards">Saved Flashcards</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-sm text-muted-foreground">Unlocked</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">42</p>
                      <p className="text-sm text-muted-foreground">Cards Mastered</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">7</p>
                      <p className="text-sm text-muted-foreground">Day Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">89%</p>
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`transition-all ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'opacity-75'}`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-yellow-100' : 'bg-muted'}`}>
                        <achievement.icon className={`w-6 h-6 ${achievement.unlocked ? 'text-yellow-600' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {achievement.title}
                          {achievement.unlocked && <Badge variant="secondary" className="text-yellow-700 bg-yellow-100">Unlocked</Badge>}
                        </CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {achievement.unlocked ? (
                      <p className="text-sm text-muted-foreground">
                        Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
                      </p>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="flashcards" className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </TabsContent>
        </Tabs>
      </main>

      <FloatingDock />
    </div>
  );
};

export default Achievements;
