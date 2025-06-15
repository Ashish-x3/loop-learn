
-- Create a table to store AI-generated flashcards
CREATE TABLE public.flashcards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  difficulty VARCHAR(50) DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster topic searches
CREATE INDEX idx_flashcards_topic ON public.flashcards(topic);

-- Create a table to store user's learning progress
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  flashcard_id UUID REFERENCES public.flashcards(id) ON DELETE CASCADE,
  is_mastered BOOLEAN DEFAULT FALSE,
  attempts INTEGER DEFAULT 0,
  last_reviewed TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for flashcards (public read access for learning)
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read flashcards
CREATE POLICY "Anyone can view flashcards" 
  ON public.flashcards 
  FOR SELECT 
  USING (true);

-- Add RLS policies for user progress
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Users can only see their own progress
CREATE POLICY "Users can view their own progress" 
  ON public.user_progress 
  FOR ALL 
  USING (auth.uid() = user_id);
