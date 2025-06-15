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
    if (!topic.trim()) return;
    setIsLoading(true);
    setFlashcards([]);

    try {
      const resp = await fetch(
        "https://ftpmfnigubshfarshebm.functions.supabase.co/generate-gemini-flashcards",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic })
        }
      );
      const data = await resp.json();
      if (data.error) {
        toast({ title: "Generation failed", description: data.error, variant: "destructive" });
        setIsLoading(false);
        return;
      }
      setFlashcards(data.flashcards || []);
      toast({
        title: data.source === "existing" ? "Found existing flashcards!" : "AI Generated new flashcards!",
        description: (data.flashcards?.length ?? 0) + " flashcards ready"
      });
    } catch (err: any) {
      toast({ title: "Error", description: String(err), variant: "destructive" });
    } finally {
      setIsLoading(false);
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
                  Generate AI-powered flashcards for any tech topic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 sm:pb-32">
        {/* Main AI Generator */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-3xl backdrop-blur-sm">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">AI Flashcard Generator</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transform any programming concept into easy-to-understand flashcards with kid-friendly explanations, analogies, and code examples.
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
                Enter any programming concept, technology, or software development topic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6 sm:p-8 pt-0">
              {/* Main Input */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Input
                  placeholder="e.g., JavaScript Closures, React Context, Database Indexing..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1 text-base p-4 h-12"
                  disabled={isLoading}
                />
                <Button 
                  disabled={!topic.trim() || isLoading} 
                  className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground border-0 backdrop-blur-sm"
                  onClick={handleGenerate}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5 mr-2" />}
                  {isLoading ? "Generating..." : "Generate Flashcard"}
                </Button>
              </div>
              {/* Quick Suggestions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Popular topics:</span>
                  <Badge variant="secondary" className="text-xs">AI-Generated</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {quickTopics.map((quickTopic, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setTopic(quickTopic)}
                      className="text-sm justify-start h-10"
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
                          <div className="text-sm text-muted-foreground">{card.answer}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {/* Features */}
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl">🧠</div>
                  <h4 className="font-semibold text-sm">Simple Explanations</h4>
                  <p className="text-xs text-muted-foreground">Complex concepts made easy to understand</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl">🎯</div>
                  <h4 className="font-semibold text-sm">Real Analogies</h4>
                  <p className="text-xs text-muted-foreground">Relatable comparisons that stick</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl">💻</div>
                  <h4 className="font-semibold text-sm">Code Examples</h4>
                  <p className="text-xs text-muted-foreground">Practical examples you can try</p>
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
                <p className="text-sm text-muted-foreground">Type any programming concept you want to learn</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h4 className="font-semibold">AI Creates Flashcard</h4>
                <p className="text-sm text-muted-foreground">Our AI generates kid-friendly explanations and examples</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h4 className="font-semibold">Start Learning</h4>
                <p className="text-sm text-muted-foreground">Study your new flashcard and master the concept</p>
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
