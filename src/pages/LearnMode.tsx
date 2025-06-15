import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Home, RotateCcw, Moon, Sun, Loader2 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FlashcardView from '@/components/FlashcardView';
import FloatingDock from '@/components/FloatingDock';
import { useFlashcards } from '@/hooks/useFlashcards';
import { supabase } from '@/integrations/supabase/client';

const LearnMode = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  // Use the general useFlashcards hook
  const { data: allFlashcards = [], isLoading, error } = useFlashcards();
  
  // Filter flashcards by exact topic match - much stricter filtering
  const flashcards = topic 
    ? allFlashcards.filter(card => {
        // Decode the URL topic parameter
        const decodedTopic = decodeURIComponent(topic);
        
        // Convert URL format back to original topic format
        const originalTopic = decodedTopic.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        console.log('Filtering flashcards:', {
          urlTopic: topic,
          decodedTopic,
          originalTopic,
          cardTopic: card.topic,
          exactMatch: card.topic === originalTopic
        });
        
        // Only include cards that exactly match the topic
        return card.topic === originalTopic;
      })
    : allFlashcards;
  
  console.log('Topic from URL:', topic);
  console.log('All available topics:', [...new Set(allFlashcards.map(f => f.topic))]);
  console.log('Filtered flashcards count:', flashcards.length);
  console.log('Filtered flashcards topics:', [...new Set(flashcards.map(f => f.topic))]);

  // Reset state when topic changes
  useEffect(() => {
    setCurrentCardIndex(0);
    setCompletedCards([]);
  }, [topic]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const updateUserProgress = async (flashcardId: string, isCompleted: boolean = false) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      console.log('Updating progress for flashcard:', flashcardId, 'completed:', isCompleted);

      // Check if progress record exists
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('flashcard_id', flashcardId)
        .maybeSingle();

      if (existingProgress) {
        // Update existing progress
        const { error } = await supabase
          .from('user_progress')
          .update({
            attempts: (existingProgress.attempts || 0) + 1,
            is_mastered: isCompleted,
            last_reviewed: new Date().toISOString()
          })
          .eq('id', existingProgress.id);

        if (error) {
          console.error('Error updating progress:', error);
        } else {
          console.log('Progress updated successfully for card:', flashcardId);
        }
      } else {
        // Create new progress record
        const { error } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            flashcard_id: flashcardId,
            attempts: 1,
            is_mastered: isCompleted,
            last_reviewed: new Date().toISOString()
          });

        if (error) {
          console.error('Error creating progress:', error);
        } else {
          console.log('Progress created successfully for card:', flashcardId);
        }
      }
    } catch (error) {
      console.error('Error in updateUserProgress:', error);
    }
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

  // Show message if no flashcards found for specific topic
  if (topic && flashcards.length === 0) {
    const decodedTopic = decodeURIComponent(topic);
    const topicDisplayName = decodedTopic.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">No flashcards found</h2>
          <p className="text-muted-foreground">
            No flashcards found for topic: <strong>{topicDisplayName}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Available topics: {[...new Set(allFlashcards.map(f => f.topic))].join(', ')}
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/create">
              <Button>Create Flashcards</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentCardIndex];
  const progress = flashcards.length > 0 ? ((currentCardIndex + 1) / flashcards.length) * 100 : 0;

  // Get the actual topic name from the first flashcard for display
  const topicDisplayName = flashcards.length > 0 
    ? flashcards[0].topic 
    : topic 
      ? decodeURIComponent(topic).split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
      : 'Mixed Topics';

  const handleNext = async () => {
    if (currentCard && !completedCards.includes(currentCard.id)) {
      await updateUserProgress(currentCard.id.toString(), true);
      setCompletedCards([...completedCards, currentCard.id]);
    }

    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
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

  const handleCardViewed = async () => {
    if (currentCard) {
      await updateUserProgress(currentCard.id.toString(), false);
    }
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
        <div className="flex justify-center">
          <Badge className="bg-primary/20 text-primary border-primary/30">
            Learning: {topicDisplayName}
          </Badge>
        </div>

        {/* Debug info */}
        <div className="text-xs text-muted-foreground text-center">
          Topic: {topicDisplayName} | Cards: {flashcards.length} | Current: {currentCard?.topic}
        </div>

        {/* Flashcard */}
        <div className="px-1 sm:px-0">
          <FlashcardView
            flashcard={currentCard}
            onNext={currentCardIndex < flashcards.length - 1 ? handleNext : undefined}
            onPrevious={currentCardIndex > 0 ? handlePrevious : undefined}
            onCardViewed={handleCardViewed}
            showNavigation={true}
          />
        </div>

        {/* Completion Message */}
        {currentCardIndex === flashcards.length - 1 && completedCards.includes(currentCard.id) && (
          <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
            <CardHeader className="text-center pb-2 sm:pb-4">
              <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">🎉</div>
              <CardTitle className="text-green-800 dark:text-green-200 text-lg sm:text-xl">
                {topicDisplayName} Mastered!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3 sm:space-y-4 pt-0">
              <p className="text-green-700 dark:text-green-300 text-sm sm:text-base">
                You've completed all {topicDisplayName} flashcards!
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
