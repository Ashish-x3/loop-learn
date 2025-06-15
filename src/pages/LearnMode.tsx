
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Learn Mode</h1>
                <p className="text-sm text-muted-foreground">
                  Card {currentCardIndex + 1} of {sampleFlashcards.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleRestart}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>
              <Button
                onClick={toggleTheme}
                size="sm"
                variant="outline"
                className="rounded-full w-9 h-9 p-0"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-32 space-y-8">
        {/* Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: currentCardIndex + 1, label: "Current Card", color: "text-purple-600" },
            { value: sampleFlashcards.length, label: "Total Cards", color: "text-blue-600" },
            { value: completedCards.length, label: "Completed", color: "text-green-600" },
            { value: sampleFlashcards.length - completedCards.length, label: "Remaining", color: "text-orange-600" }
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center space-y-2">
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Flashcard */}
        <FlashcardView
          flashcard={currentCard}
          onNext={currentCardIndex < sampleFlashcards.length - 1 ? handleNext : undefined}
          onPrevious={currentCardIndex > 0 ? handlePrevious : undefined}
          showNavigation={true}
        />

        {/* Completion Message */}
        {currentCardIndex === sampleFlashcards.length - 1 && completedCards.includes(currentCard.id) && (
          <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
            <CardHeader className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <CardTitle className="text-green-800 dark:text-green-200">Fantastic Work!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-green-700 dark:text-green-300">
                You've mastered all the flashcards in this session!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button onClick={handleRestart} variant="outline">
                  🔄 Study Again
                </Button>
                <Link to="/">
                  <Button variant="outline">
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
