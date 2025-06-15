
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [savedTopics, setSavedTopics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchUserTopics = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('user_progress')
        .select('flashcard_id')
        .eq('user_id', user.id);

      if (data && data.length) {
        const ids = data.map(row => row.flashcard_id);
        const { data: cards } = await supabase
          .from('flashcards')
          .select('topic')
          .in('id', ids);

        const topics = [...new Set((cards || []).map(card => card.topic))];
        setSavedTopics(topics);
      } else {
        setSavedTopics([]);
      }
      setIsLoading(false);
    };
    fetchUserTopics();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-[30vh] flex flex-col justify-center items-center">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
        <span className="mt-2 text-muted-foreground">Loading your dashboard...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {savedTopics.length > 0 ? (
        <>
          <h3 className="text-lg mb-2 text-primary">Continue Learning</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {savedTopics.map((topic) => (
              <Link key={topic} to={`/learn/${topic}`}>
                <Button variant="secondary" className="capitalize">{topic}</Button>
              </Link>
            ))}
          </div>
          <span className="text-muted-foreground text-sm">
            Pick a topic to review your saved flashcards and track your progress.
          </span>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center py-8">
            <span className="text-lg font-semibold mb-2">No saved flashcards yet</span>
            <span className="text-muted-foreground mb-4">Get started now by searching a topic and saving flashcards to learn!</span>
            <Link to="/">
              <Button variant="default">Search for a Topic!</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
