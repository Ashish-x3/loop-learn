import { useState } from 'react';
import { Search, Plus, Loader2, BookOpen, Lightbulb } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface Flashcard {
  id: string;
  topic: string;
  question: string;
  answer: string;
  difficulty: string;
  created_at: string;
}

const TopicSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchResults, setSearchResults] = useState<Flashcard[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const suggestedTopics = [
    'React Hooks', 'JavaScript ES6', 'CSS Flexbox', 'Node.js Basics', 
    'Python Functions', 'Data Structures', 'Git Commands', 'API Design'
  ];

  // Helper: Save flashcard for the logged in user
  const handleSaveFlashcard = async (card: Flashcard) => {
    if (!user) {
      toast({ 
        title: "Please sign in to save flashcards!",
        variant: "destructive" 
      });
      return;
    }
    try {
      // Upsert user_progress row for flashcard
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          flashcard_id: card.id,
          attempts: 0,
          is_mastered: false,
        }, { onConflict: 'user_id,flashcard_id' });

      if (error) throw error;
      toast({ title: "Flashcard saved!", description: `"${card.question}" added to your Saved cards.` });
    } catch (e) {
      toast({ title: "Could not save card", description: "Already saved or there was a problem.", variant: "destructive" });
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Please enter a topic",
        description: "Type something you'd like to learn about",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setHasSearched(true);

    try {
      // First, search existing flashcards
      const { data: existingCards, error: searchError } = await supabase
        .from('flashcards')
        .select('*')
        .ilike('topic', `%${searchTerm.toLowerCase()}%`)
        .order('created_at', { ascending: false });

      if (searchError) throw searchError;

      if (existingCards && existingCards.length > 0) {
        setSearchResults(existingCards);
        toast({
          title: "Found existing flashcards!",
          description: `Found ${existingCards.length} flashcards for "${searchTerm}"`
        });
        setIsGenerating(false);
        return;
      }

      // If no existing cards, generate new ones
      const response = await supabase.functions.invoke('generate-flashcards', {
        body: { topic: searchTerm }
      });

      if (response.error) throw response.error;

      const { flashcards, generated, message } = response.data;
      setSearchResults(flashcards || []);
      
      toast({
        title: generated ? "Flashcards Generated!" : "Flashcards Found!",
        description: message
      });

    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "Please try again. Make sure you're connected to the internet.",
        variant: "destructive"
      });
      setSearchResults([]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestedTopic = (topic: string) => {
    setSearchTerm(topic);
  };

  const uniqueTopics = [...new Set(searchResults.map(card => card.topic))];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
          Learn Any Topic
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
          Search for any topic and get AI-generated flashcards instantly, or browse our suggested topics.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Enter any topic (e.g., React, Python, Machine Learning...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10 backdrop-blur-sm"
            />
          </div>
          <Button 
            onClick={handleSearch}
            disabled={isGenerating}
            className="bg-primary hover:bg-primary/90"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Suggested Topics */}
      {!hasSearched && (
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-lg font-semibold mb-4 text-center">Suggested Topics</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestedTopics.map((topic) => (
              <Button
                key={topic}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestedTopic(topic)}
                className="bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30"
              >
                <Lightbulb className="w-3 h-3 mr-1" />
                {topic}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {hasSearched && (
        <div className="max-w-6xl mx-auto px-4">
          {isGenerating ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              <h3 className="mt-4 text-lg font-semibold">Generating Flashcards...</h3>
            </div>
          ) : (
            <>
              {uniqueTopics.length > 0 ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">
                      Found {searchResults.length} flashcards for "{searchTerm}"
                    </h3>
                    <p className="text-muted-foreground">Click Save to keep cards or go to Saved tab to review</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((card) => (
                      <Card key={card.id} className="group border bg-white/70 dark:bg-black/30 transition-shadow">
                        <CardHeader className="p-4 pt-2 flex flex-row justify-between items-center">
                          <div>
                            <CardTitle className="text-base font-semibold">{card.question}</CardTitle>
                            <CardDescription className="text-xs mb-2">{card.topic} &middot; {card.difficulty}</CardDescription>
                          </div>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleSaveFlashcard(card)}
                            className="ml-2"
                          >
                            Save
                          </Button>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-sm">{card.answer}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold">No flashcards found</h3>
                  <p className="text-muted-foreground">Try searching for a different topic or check your spelling</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TopicSearch;
