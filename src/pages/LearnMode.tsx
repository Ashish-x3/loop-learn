
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Home, RotateCcw, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FlashcardView from '@/components/FlashcardView';
import FloatingDock from '@/components/FloatingDock';

// Sample flashcard data
const sampleFlashcards = [
  {
    id: 1,
    topic: "JavaScript Promise",
    category: "JavaScript",
    difficulty: "Intermediate",
    front: "What is a JavaScript Promise?",
    back: {
      definition: "A way to handle something that will finish later (like loading data from a website)",
      analogy: "Like ordering pizza! 🍕 When you call the pizza place, they promise to deliver your pizza. You don't wait by the phone - you do other things. When the pizza arrives (or if they can't deliver), they let you know. Promises work the same way with code!",
      realWorldUse: "Fetching data from an API, loading images, reading files, or any task that takes time to complete",
      codeExample: `const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Pizza delivered! 🍕");
  }, 3000);
});

promise.then(result => {
  console.log(result); // "Pizza delivered! 🍕"
});`
    }
  },
  {
    id: 2,
    topic: "Array.map()",
    category: "JavaScript",
    difficulty: "Beginner",
    front: "What does Array.map() do?",
    back: {
      definition: "Creates a new array by transforming each item in the original array",
      analogy: "Like having a magical copying machine! 📋✨ You put in a list of numbers, tell the machine 'double each number', and it gives you back a brand new list with all numbers doubled. The original list stays exactly the same!",
      realWorldUse: "Converting data formats, calculating new values, or transforming user information for display",
      codeExample: `const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);

console.log(numbers); // [1, 2, 3, 4, 5] (unchanged!)
console.log(doubled); // [2, 4, 6, 8, 10] (new array!)`
    }
  },
  {
    id: 3,
    topic: "CSS Flexbox",
    category: "CSS",
    difficulty: "Intermediate",
    front: "What is CSS Flexbox?",
    back: {
      definition: "A layout method that makes it easy to arrange items in rows or columns",
      analogy: "Like organizing toys in a toy box! 🧸 You can tell the toys to line up in a row, stack in a column, spread out evenly, or bunch up together. Flexbox is like having magic organizing powers for your webpage elements!",
      realWorldUse: "Creating navigation bars, centering content, making responsive layouts, and aligning items",
      codeExample: `.container {
  display: flex;
  justify-content: center; /* center horizontally */
  align-items: center;     /* center vertically */
  gap: 20px;              /* space between items */
}

.item {
  flex: 1; /* each item takes equal space */
}`
    }
  }
];

const LearnMode = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const currentCard = sampleFlashcards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / sampleFlashcards.length) * 100;

  const handleNext = () => {
    if (currentCardIndex < sampleFlashcards.length - 1) {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            {/* Left side - Back button and title */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Link to="/">
                <Button variant="ghost" size="sm" className="p-1.5 sm:p-2 h-8 w-8 sm:h-9 sm:w-auto sm:px-3">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline sm:ml-2">Back</span>
                </Button>
              </Link>
              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-xl font-semibold truncate">Learn Mode</h1>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  Card {currentCardIndex + 1} of {sampleFlashcards.length}
                </p>
              </div>
            </div>
            
            {/* Right side - Action buttons */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" onClick={handleRestart} className="h-8 px-2 sm:h-9 sm:px-3">
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline sm:ml-2">Restart</span>
              </Button>
              <Button
                onClick={toggleTheme}
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 sm:h-9 sm:w-9"
              >
                {isDarkMode ? <Sun className="w-3 h-3 sm:w-4 sm:h-4" /> : <Moon className="w-3 h-3 sm:w-4 sm:h-4" />}
              </Button>
              <Link to="/">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 sm:h-9 sm:w-9">
                  <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 lg:py-8 pb-24 sm:pb-32 space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Progress */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5 sm:h-2" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {[
            { value: currentCardIndex + 1, label: "Current", color: "text-purple-600" },
            { value: sampleFlashcards.length, label: "Total", color: "text-blue-600" },
            { value: completedCards.length, label: "Done", color: "text-green-600" },
            { value: sampleFlashcards.length - completedCards.length, label: "Left", color: "text-orange-600" }
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-2 sm:p-4 text-center space-y-1 sm:space-y-2">
                <div className={`text-lg sm:text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Flashcard */}
        <div className="px-1 sm:px-0">
          <FlashcardView
            flashcard={currentCard}
            onNext={currentCardIndex < sampleFlashcards.length - 1 ? handleNext : undefined}
            onPrevious={currentCardIndex > 0 ? handlePrevious : undefined}
            showNavigation={true}
          />
        </div>

        {/* Completion Message */}
        {currentCardIndex === sampleFlashcards.length - 1 && completedCards.includes(currentCard.id) && (
          <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
            <CardHeader className="text-center pb-2 sm:pb-4">
              <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">🎉</div>
              <CardTitle className="text-green-800 dark:text-green-200 text-lg sm:text-xl">Fantastic Work!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3 sm:space-y-4 pt-0">
              <p className="text-green-700 dark:text-green-300 text-sm sm:text-base">
                You've mastered all the flashcards in this session!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
                <Button onClick={handleRestart} variant="outline" size="sm" className="text-sm">
                  🔄 Study Again
                </Button>
                <Link to="/">
                  <Button variant="outline" size="sm" className="text-sm">
                    🏠 Back to Home
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
