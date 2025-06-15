
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Home, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import FlashcardView from '@/components/FlashcardView';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Learn Mode</h1>
                <p className="text-sm text-gray-600">
                  Card {currentCardIndex + 1} of {sampleFlashcards.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={handleRestart}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
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

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 text-center border border-purple-100">
            <div className="text-2xl font-bold text-purple-600">{currentCardIndex + 1}</div>
            <div className="text-sm text-gray-600">Current Card</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{sampleFlashcards.length}</div>
            <div className="text-sm text-gray-600">Total Cards</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-green-100">
            <div className="text-2xl font-bold text-green-600">{completedCards.length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">{sampleFlashcards.length - completedCards.length}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
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
          <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Great Job!</h3>
            <p className="text-green-100 mb-4">
              You've completed all the flashcards in this session!
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" className="bg-white text-green-600 border-white hover:bg-green-50" onClick={handleRestart}>
                Study Again
              </Button>
              <Link to="/">
                <Button variant="outline" className="bg-white text-green-600 border-white hover:bg-green-50">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LearnMode;
