
import { useState } from 'react';
import { Plus, ArrowLeft, Lightbulb, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import FloatingDock from '@/components/FloatingDock';
import ThemeToggle from '@/components/ThemeToggle';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type Flashcard = {
  id?: string;
  topic: string;
  question: string;
  answer: string;
  difficulty: string;
  created_at?: string;
};

const Create = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const { toast } = useToast();

  const quickTopics = [
    "JavaScript Closures",
    "React Hooks",
    "CSS Grid",
    "Git Branches",
    "API Requests",
    "Database Queries"
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "Type something you'd like to learn about",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setFlashcards([]);

    try {
      // First, search for existing flashcards that match the topic
      const { data: existingCards, error: searchError } = await supabase
        .from('flashcards')
        .select('*')
        .ilike('topic', `%${topic.toLowerCase()}%`)
        .order('created_at', { ascending: false });

      if (searchError) {
        console.error('Search error:', searchError);
      }

      if (existingCards && existingCards.length > 0) {
        setFlashcards(existingCards);
        toast({
          title: "Found existing flashcards!",
          description: `Found ${existingCards.length} flashcards for "${topic}"`
        });
        setIsLoading(false);
        return;
      }

      // If no existing cards found, generate new ones
      const response = await supabase.functions.invoke('generate-gemini-flashcards', {
        body: { topics: [topic.trim()] }
      });

      if (response.error) {
        console.error('Edge function error:', response.error);
        toast({ 
          title: "Generation failed", 
          description: response.error.message || "Failed to generate flashcards",
          variant: "destructive" 
        });
        return;
      }

      const { flashcards: generatedCards, message } = response.data;
      
      if (generatedCards && generatedCards.length > 0) {
        setFlashcards(generatedCards);
        toast({
          title: "Flashcards Generated!",
          description: message || `Created ${generatedCards.length} flashcards for "${topic}"`
        });
      } else {
        toast({
          title: "No flashcards generated",
          description: "Please try again with a different topic",
          variant: "destructive"
        });
      }
    } catch (err: any) {
      console.error('Generation error:', err);
      toast({ 
        title: "Error", 
        description: "Failed to generate flashcards. Please try again.",
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickTopic = (quickTopic: string) => {
    setTopic(quickTopic);
  };

  const renderAnswer = (answer: string) => {
    try {
      const parsed = JSON.parse(answer);
      if (typeof parsed === 'object' && parsed !== null && parsed.definition) {
        return (
          <div className="space-y-1 text-xs text-muted-foreground">
            {parsed.definition && <p><strong>Def:</strong> {parsed.definition}</p>}
            {parsed.analogy && <p><strong>Analogy:</strong> {parsed.analogy}</p>}
          </div>
        );
      }
      return <div className="text-sm text-muted-foreground line-clamp-3">{answer}</div>;
    } catch (e) {
      return <div className="text-sm text-muted-foreground line-clamp-3">{answer}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      {/* Header */}
      <div className="border-b border-border backdrop-blur-xl bg-background/80 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="hover:bg-muted p-2 sm:px-3">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Create Flashcard</h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Search for existing flashcards or generate new AI-powered ones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 sm:pb-32">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-3xl backdrop-blur-sm">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">Find or Generate Flashcards</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Search for existing flashcards first, or create new ones with AI if none exist for your topic.
              </p>
            </div>
          </div>
          {/* Generator Card */}
          <Card className="border-0 backdrop-blur-xl bg-card/50 border border-border shadow-2xl">
            <CardHeader className="p-6 sm:p-8">
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-primary" />
                What do you want to learn?
              </CardTitle>
              <CardDescription className="text-base">
                Enter any topic - we'll find existing flashcards or create new ones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6 sm:p-8 pt-0">
              {/* Main Input */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Input
                  placeholder="e.g., react, javascript, css..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                  className="flex-1 text-base p-4 h-12"
                  disabled={isLoading}
                />
                <Button
                  disabled={!topic.trim() || isLoading}
                  className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground border-0 backdrop-blur-sm"
                  onClick={handleGenerate}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5 mr-2" />}
                  {isLoading ? "Searching..." : "Find/Generate"}
                </Button>
              </div>
              {/* Quick Suggestions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Popular topics:</span>
                  <Badge variant="secondary" className="text-xs">Try these</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {quickTopics.map((quickTopic, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickTopic(quickTopic)}
                      className="text-sm justify-start h-10"
                      disabled={isLoading}
                    >
                      {quickTopic}
                    </Button>
                  ))}
                </div>
              </div>
              {/* Results */}
              {flashcards.length > 0 && (
                <div className="space-y-6 mt-6">
                  <h3 className="font-bold text-lg">Flashcards for "{topic}"</h3>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {flashcards.map((card, idx) => (
                      <Card key={idx} className="bg-primary/5">
                        <CardContent className="p-4">
                          <span className="block font-medium mb-1">{card.difficulty ?? "Beginner"}</span>
                          <div className="mb-2 font-semibold">{card.question}</div>
                          {renderAnswer(card.answer)}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {/* Features */}
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl">🔍</div>
                  <h4 className="font-semibold text-sm">Smart Search</h4>
                  <p className="text-xs text-muted-foreground">Finds existing flashcards first</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl">🧠</div>
                  <h4 className="font-semibold text-sm">AI Generation</h4>
                  <p className="text-xs text-muted-foreground">Creates new ones if needed</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl">⚡</div>
                  <h4 className="font-semibold text-sm">Instant Results</h4>
                  <p className="text-xs text-muted-foreground">Fast and efficient learning</p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* How it Works */}
          <div className="text-center space-y-6">
            <h3 className="text-xl font-bold">How it works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h4 className="font-semibold">Enter a Topic</h4>
                <p className="text-sm text-muted-foreground">Type any topic like "react" or "javascript"</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold">Smart Search</h4>
                <p className="text-sm text-muted-foreground">We find existing flashcards or create new ones</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold">Start Learning</h4>
                <p className="text-sm text-muted-foreground">Get all relevant flashcards instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FloatingDock />
    </div>
  );
};

export default Create;
