
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { toast } from 'sonner';

interface CompletionButtonProps {
  flashcardId: string;
  onComplete?: () => void;
  className?: string;
}

const CompletionButton = ({ 
  flashcardId, 
  onComplete,
  className = ""
}: CompletionButtonProps) => {
  const [isMarked, setIsMarked] = useState(false);
  const { markAsCompleted, isUpdating } = useProgressTracking();
  const { data: progress, isLoading } = useFlashcardProgress(flashcardId);

  useEffect(() => {
    if (progress) {
      setIsMarked(progress.isCompleted);
    }
  }, [progress]);

  const handleMarkCompleted = async () => {
    try {
      console.log('Marking as completed with flashcard ID:', flashcardId);
      await markAsCompleted.mutateAsync(flashcardId);
      setIsMarked(true);
      toast.success('Card marked as completed!');
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Error marking as completed:', error);
      toast.error('Failed to mark as completed');
    }
  };

  if (isLoading) {
    return (
      <Button
        variant="outline"
        disabled
        className={`flex items-center space-x-2 ${className}`}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading...</span>
      </Button>
    );
  }

  if (isMarked) {
    return (
      <Button
        variant="outline"
        disabled
        className={`flex items-center space-x-2 text-green-600 border-green-600 ${className}`}
      >
        <CheckCircle className="w-4 h-4" />
        <span>Completed</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleMarkCompleted}
      disabled={isUpdating}
      className={`flex items-center space-x-2 ${className}`}
    >
      {isUpdating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <CheckCircle className="w-4 h-4" />
      )}
      <span>{isUpdating ? 'Marking...' : 'Mark as Completed'}</span>
    </Button>
  );
};

export default CompletionButton;
