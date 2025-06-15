
-- Add the user_id column to the flashcards table
ALTER TABLE public.flashcards ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Remove the old, less secure access policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.flashcards;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.flashcards;

-- Add new policies for more granular control
CREATE POLICY "Users can view their own or public flashcards"
ON public.flashcards FOR SELECT
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Authenticated users can create their own flashcards"
ON public.flashcards FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own flashcards"
ON public.flashcards FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own flashcards"
ON public.flashcards FOR DELETE
USING (auth.uid() = user_id);
