
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const SavedFlashcards = () => {
  const { user } = useAuth();
  const [savedCards, setSavedCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchSaved = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('user_progress')
        .select('flashcard_id')
        .eq('user_id', user.id);

      if (data && data.length) {
        // now fetch the flashcard data
        const ids = data.map(row => row.flashcard_id);
        const { data: fcs, error: err2 } = await supabase
          .from('flashcards')
          .select('*')
          .in('id', ids);

        setSavedCards(fcs || []);
      } else {
        setSavedCards([]);
      }
      setIsLoading(false);
    };
    fetchSaved();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-[30vh] flex flex-col justify-center items-center">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
        <span className="text-sm mt-2">Loading saved flashcards...</span>
      </div>
    );
  }

  if (!savedCards.length) {
    return (
      <div className="min-h-[30vh] flex flex-col justify-center items-center">
        <span className="text-xl font-semibold mb-1">No Saved Flashcards</span>
        <span className="text-muted-foreground">Go search a topic and save some flashcards!</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Your Saved Flashcards</h2>
      {savedCards.map(card => (
        <Card key={card.id} className="mb-2">
          <CardHeader>
            <CardTitle className="text-lg">{card.question}</CardTitle>
            <CardDescription className="text-sm">{card.topic} &middot; {card.difficulty}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-base">{card.answer}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SavedFlashcards;
