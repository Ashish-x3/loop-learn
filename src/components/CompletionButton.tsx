
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { toast } from 'sonner';

interface CompletionButtonProps {
  flashcardId: string;
  isCompleted?: boolean;
  onComplete?: () => void;
  className?: string;
}

const CompletionButton = ({ 
  flashcardId, 
  isCompleted = false, 
  onComplete,
  className = ""
}: CompletionButtonProps) => {
  const [isMarked, setIsMarked] = useState(isCompleted);
  const { markAsCompleted, isUpdating } = useProgressTracking();

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
