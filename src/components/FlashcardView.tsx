import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCcw, ArrowLeft, ArrowRight, BookOpen, Code, Lightbulb, Target } from 'lucide-react';

interface FlashcardData {
  id: number;
  topic: string;
  category: string;
  difficulty: string;
  front: string;
  back: {
    definition: string;
    analogy: string;
    realWorldUse: string;
    codeExample?: string;
  };
}

interface FlashcardViewProps {
  flashcard: FlashcardData;
  onNext?: () => void;
  onPrevious?: () => void;
  onCardViewed?: () => void;
  showNavigation?: boolean;
}

const FlashcardView = ({ flashcard, onNext, onPrevious, onCardViewed, showNavigation = true }: FlashcardViewProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState('definition');

  // Reset flip state when flashcard changes
  useEffect(() => {
    setIsFlipped(false);
    setActiveTab('definition');
  }, [flashcard.id]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setActiveTab('definition');
      // Track that the card was viewed when flipped to answer
      if (onCardViewed) {
        onCardViewed();
      }
    }
  };

  const handleReset = () => {
    setIsFlipped(false);
    setActiveTab('definition');
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
      // The useEffect will handle resetting the flip state
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
      // The useEffect will handle resetting the flip state
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Badge variant="secondary" className="text-purple-600 bg-purple-100 text-xs sm:text-sm">
            {flashcard.category}
          </Badge>
          <Badge variant="outline" className="text-xs sm:text-sm">
            {flashcard.difficulty}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-3"
        >
          <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Reset</span>
        </Button>
      </div>

      {/* Flashcard */}
      <div className="relative mb-6 sm:mb-8">
        <div className="perspective-1000">
          <div
            className={`relative w-full h-80 sm:h-96 transform-style-preserve-3d transition-transform duration-700 ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front Side */}
            <Card
              className={`absolute inset-0 backface-hidden cursor-pointer hover:shadow-xl transition-shadow ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={handleFlip}
            >
              <CardContent className="flex flex-col items-center justify-center h-full p-4 sm:p-8 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-lg">
                <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 mb-4 sm:mb-6 opacity-80" />
                <h2 className="text-xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">
                  {flashcard.topic}
                </h2>
                <p className="text-base sm:text-xl text-center text-purple-100 mb-6 sm:mb-8 px-2">
                  {flashcard.front}
                </p>
                <div className="text-xs sm:text-sm text-purple-200 flex items-center">
                  <span>Click to reveal answer</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                </div>
              </CardContent>
            </Card>

            {/* Back Side */}
            <Card
              className={`absolute inset-0 backface-hidden rotate-y-180 ${
                !isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              <CardContent className="h-full p-3 sm:p-6 bg-white">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  <TabsList className="grid w-full grid-cols-4 mb-4 sm:mb-6 h-auto">
                    <TabsTrigger value="definition" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-2 text-xs">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-[10px] sm:text-sm">Definition</span>
                    </TabsTrigger>
                    <TabsTrigger value="analogy" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-2 text-xs">
                      <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-[10px] sm:text-sm">Analogy</span>
                    </TabsTrigger>
                    <TabsTrigger value="usage" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-2 text-xs">
                      <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-[10px] sm:text-sm">Usage</span>
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-2 text-xs">
                      <Code className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-[10px] sm:text-sm">Code</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="definition" className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">Simple Definition</h3>
                    </div>
                    <p className="text-sm sm:text-lg text-gray-700 leading-relaxed">
                      {flashcard.back.definition}
                    </p>
                  </TabsContent>

                  <TabsContent value="analogy" className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">Kid-Friendly Analogy</h3>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 rounded">
                      <p className="text-sm sm:text-lg text-gray-700 leading-relaxed">
                        {flashcard.back.analogy}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="usage" className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">Real-World Use</h3>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-400 p-3 sm:p-4 rounded">
                      <p className="text-sm sm:text-lg text-gray-700 leading-relaxed">
                        {flashcard.back.realWorldUse}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="code" className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">Code Example</h3>
                    </div>
                    {flashcard.back.codeExample ? (
                      <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto">
                        <pre className="text-xs sm:text-sm">
                          <code>{flashcard.back.codeExample}</code>
                        </pre>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-6 sm:p-8 rounded-lg text-center">
                        <p className="text-gray-500 text-sm">No code example available for this concept</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Navigation - Mobile Optimized */}
      {showNavigation && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          {/* Mobile: Stack buttons vertically */}
          <div className="flex flex-col sm:hidden w-full space-y-3">
            <Button
              variant={isFlipped ? "outline" : "default"}
              onClick={handleFlip}
              className="w-full py-3 text-base font-medium"
            >
              {isFlipped ? "Show Question" : "Show Answer"}
            </Button>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex-1 flex items-center justify-center space-x-2 py-3"
                disabled={!onPrevious}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleNext}
                className="flex-1 flex items-center justify-center space-x-2 py-3"
                disabled={!onNext}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Desktop: Original layout */}
          <div className="hidden sm:flex items-center justify-between w-full">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex items-center space-x-2"
              disabled={!onPrevious}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center space-x-4">
              <Button
                variant={isFlipped ? "outline" : "default"}
                onClick={handleFlip}
                className="px-8"
              >
                {isFlipped ? "Show Question" : "Show Answer"}
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={handleNext}
              className="flex items-center space-x-2"
              disabled={!onNext}
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardView;
