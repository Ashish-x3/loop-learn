
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Home, RotateCcw, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-purple-100 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-purple-100 dark:hover:bg-purple-900/30">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Learn Mode</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Card {currentCardIndex + 1} of {sampleFlashcards.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={handleRestart} className="border-purple-200 dark:border-purple-700">
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>
              <Button
                onClick={toggleTheme}
                size="sm"
                variant="outline"
                className="rounded-full w-9 h-9 p-0 border-purple-200 dark:border-purple-700"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Link to="/">
                <Button variant="ghost" size="sm" className="hover:bg-purple-100 dark:hover:bg-purple-900/30">
                  <Home className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 pb-32">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { value: currentCardIndex + 1, label: "Current Card", color: "purple", gradient: "from-purple-500 to-purple-600" },
            { value: sampleFlashcards.length, label: "Total Cards", color: "blue", gradient: "from-blue-500 to-blue-600" },
            { value: completedCards.length, label: "Completed", color: "green", gradient: "from-green-500 to-green-600" },
            { value: sampleFlashcards.length - completedCards.length, label: "Remaining", color: "orange", gradient: "from-orange-500 to-orange-600" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 text-center border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
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
          <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 text-center shadow-2xl">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-3xl font-bold mb-4">Fantastic Work!</h3>
            <p className="text-green-100 mb-6 text-lg">
              You've mastered all the flashcards in this session! 
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="outline" 
                className="bg-white text-green-600 border-white hover:bg-green-50 font-semibold px-6 py-3" 
                onClick={handleRestart}
              >
                🔄 Study Again
              </Button>
              <Link to="/">
                <Button variant="outline" className="bg-white text-green-600 border-white hover:bg-green-50 font-semibold px-6 py-3">
                  🏠 Back to Home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Floating Dock */}
      <FloatingDock />
    </div>
  );
};

export default LearnMode;
