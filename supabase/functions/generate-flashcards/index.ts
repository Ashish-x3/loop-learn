
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic } = await req.json();
    
    if (!topic) {
      throw new Error('Topic is required');
    }

    // Initialize Supabase client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check if flashcards already exist for this topic
    const { data: existingCards } = await supabase
      .from('flashcards')
      .select('id')
      .ilike('topic', topic)
      .limit(1);

    if (existingCards && existingCards.length > 0) {
      // Return existing flashcards
      const { data: flashcards, error } = await supabase
        .from('flashcards')
        .select('*')
        .ilike('topic', topic)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return new Response(JSON.stringify({ 
        flashcards,
        generated: false,
        message: `Found ${flashcards.length} existing flashcards for ${topic}` 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate new flashcards using OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are an expert educator. Generate exactly 10 high-quality flashcards for learning about the given topic. 
            Return ONLY a valid JSON array of objects, each with "question", "answer", and "difficulty" (easy/medium/hard) properties.
            Make questions diverse, covering fundamentals, practical applications, and advanced concepts.
            Keep questions clear and answers comprehensive but concise.` 
          },
          { 
            role: 'user', 
            content: `Generate 10 flashcards about: ${topic}` 
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;
    
    let flashcardsData;
    try {
      flashcardsData = JSON.parse(generatedContent);
    } catch (e) {
      throw new Error('Failed to parse AI response as JSON');
    }

    // Insert flashcards into database
    const flashcardsToInsert = flashcardsData.map((card: any) => ({
      topic: topic.toLowerCase(),
      question: card.question,
      answer: card.answer,
      difficulty: card.difficulty || 'medium'
    }));

    const { data: insertedCards, error: insertError } = await supabase
      .from('flashcards')
      .insert(flashcardsToInsert)
      .select();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }

    return new Response(JSON.stringify({ 
      flashcards: insertedCards,
      generated: true,
      message: `Generated ${insertedCards.length} new flashcards for ${topic}`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-flashcards function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      flashcards: [],
      generated: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
