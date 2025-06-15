
import { useState } from 'react';
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
  showNavigation?: boolean;
}

const FlashcardView = ({ flashcard, onNext, onPrevious, showNavigation = true }: FlashcardViewProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState('definition');

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setActiveTab('definition');
    }
  };

  const handleReset = () => {
    setIsFlipped(false);
    setActiveTab('definition');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="text-purple-600 bg-purple-100">
            {flashcard.category}
          </Badge>
          <Badge variant="outline">
            {flashcard.difficulty}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </Button>
      </div>

      {/* Flashcard */}
      <div className="relative mb-8">
        <div className="perspective-1000">
          <div
            className={`relative w-full h-96 transform-style-preserve-3d transition-transform duration-700 ${
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
              <CardContent className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-lg">
                <BookOpen className="w-12 h-12 mb-6 opacity-80" />
                <h2 className="text-3xl font-bold text-center mb-4">
                  {flashcard.topic}
                </h2>
                <p className="text-xl text-center text-purple-100 mb-8">
                  {flashcard.front}
                </p>
                <div className="text-sm text-purple-200 flex items-center">
                  <span>Click to reveal answer</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </CardContent>
            </Card>

            {/* Back Side */}
            <Card
              className={`absolute inset-0 backface-hidden rotate-y-180 ${
                !isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              <CardContent className="h-full p-6 bg-white">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="definition" className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span className="hidden sm:inline">Definition</span>
                    </TabsTrigger>
                    <TabsTrigger value="analogy" className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4" />
                      <span className="hidden sm:inline">Analogy</span>
                    </TabsTrigger>
                    <TabsTrigger value="usage" className="flex items-center space-x-2">
                      <Target className="w-4 h-4" />
                      <span className="hidden sm:inline">Usage</span>
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex items-center space-x-2">
                      <Code className="w-4 h-4" />
                      <span className="hidden sm:inline">Code</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="definition" className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                      <h3 className="text-xl font-bold text-gray-900">Simple Definition</h3>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {flashcard.back.definition}
                    </p>
                  </TabsContent>

                  <TabsContent value="analogy" className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                      <h3 className="text-xl font-bold text-gray-900">Kid-Friendly Analogy</h3>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {flashcard.back.analogy}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="usage" className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Target className="w-5 h-5 text-green-600" />
                      <h3 className="text-xl font-bold text-gray-900">Real-World Use</h3>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {flashcard.back.realWorldUse}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="code" className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Code className="w-5 h-5 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-900">Code Example</h3>
                    </div>
                    {flashcard.back.codeExample ? (
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                          <code>{flashcard.back.codeExample}</code>
                        </pre>
                      </div>
                    ) : (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-8 rounded-lg text-center">
                        <p className="text-gray-500">No code example available for this concept</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {showNavigation && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
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
            onClick={onNext}
            className="flex items-center space-x-2"
            disabled={!onNext}
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlashcardView;
