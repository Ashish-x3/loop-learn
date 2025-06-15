
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Home, RotateCcw, Moon, Sun, Loader2 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FlashcardView from '@/components/FlashcardView';
import FloatingDock from '@/components/FloatingDock';
import { useFlashcardsByTopic } from '@/hooks/useFlashcards';

const LearnMode = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  // Fetch flashcards from Supabase
  const { data: flashcards = [], isLoading, error } = useFlashcardsByTopic(topic || '');
  
  // Reset state when topic changes
  useEffect(() => {
    setCurrentCardIndex(0);
    setCompletedCards([]);
  }, [topic]);

  // Redirect if no flashcards found for topic
  useEffect(() => {
    if (!isLoading && topic && flashcards.length === 0) {
      navigate('/dashboard');
    }
  }, [topic, flashcards, navigate, isLoading]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <h2 className="text-xl font-semibold">Loading flashcards...</h2>
          <p className="text-muted-foreground">Preparing your learning content</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Error loading flashcards</h2>
          <p className="text-muted-foreground">Please try again or go back to dashboard</p>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentCardIndex];
  const progress = flashcards.length > 0 ? ((currentCardIndex + 1) / flashcards.length) * 100 : 0;

  const topicDisplayName = topic ? topic.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') : 'Mixed Topics';

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      if (!completedCards.includes(currentCard.id)) {
        setCompletedCards([...completedCards, currentCard.id]);
      }
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentCardIndex(0);
    setCompletedCards([]);
  };

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">No flashcards available</h2>
          <p className="text-muted-foreground">Try selecting a different topic</p>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            {/* Left side - Back button */}
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="p-2 h-9 w-9">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            
            {/* Center - Title and progress */}
            <div className="flex-1 text-center">
              <h1 className="text-lg font-semibold">{topicDisplayName}</h1>
              <p className="text-sm text-muted-foreground">
                {currentCardIndex + 1} of {flashcards.length}
              </p>
            </div>
            
            {/* Right side - Theme toggle */}
            <Button
              onClick={toggleTheme}
              size="sm"
              variant="ghost"
              className="h-9 w-9 p-0"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 pb-32 space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{Math.round(progress)}% Complete</span>
            <span>{completedCards.length} Done</span>
          </div>
        </div>

        {/* Topic Badge */}
        {topic && (
          <div className="flex justify-center">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              Learning: {topicDisplayName}
            </Badge>
          </div>
        )}

        {/* Flashcard */}
        <div className="px-1 sm:px-0">
          <FlashcardView
            flashcard={currentCard}
            onNext={currentCardIndex < flashcards.length - 1 ? handleNext : undefined}
            onPrevious={currentCardIndex > 0 ? handlePrevious : undefined}
            showNavigation={true}
          />
        </div>

        {/* Completion Message */}
        {currentCardIndex === flashcards.length - 1 && completedCards.includes(currentCard.id) && (
          <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
            <CardHeader className="text-center pb-2 sm:pb-4">
              <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">🎉</div>
              <CardTitle className="text-green-800 dark:text-green-200 text-lg sm:text-xl">
                {topic ? `${topicDisplayName} Mastered!` : 'Great Job!'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3 sm:space-y-4 pt-0">
              <p className="text-green-700 dark:text-green-300 text-sm sm:text-base">
                {topic 
                  ? `You've completed all ${topicDisplayName} flashcards!`
                  : "You've completed this learning session!"
                }
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
                <Button onClick={handleRestart} variant="outline" size="sm" className="text-sm">
                  🔄 Study Again
                </Button>
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="text-sm">
                    🏠 Back to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <FloatingDock />
    </div>
  );
};

export default LearnMode;
