
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to automatically categorize topics
function categorizeTopics(topics: string[]): Record<string, string> {
  const categories: Record<string, string> = {};
  
  const categoryKeywords = {
    'JavaScript': ['javascript', 'js', 'promise', 'async', 'await', 'closure', 'hoisting', 'prototype', 'arrow', 'function', 'variable', 'scope', 'dom', 'event', 'callback', 'es6', 'es2015', 'node', 'npm'],
    'React': ['react', 'jsx', 'component', 'props', 'state', 'hook', 'usestate', 'useeffect', 'context', 'reducer', 'virtual dom', 'lifecycle'],
    'CSS': ['css', 'flexbox', 'grid', 'animation', 'transition', 'media query', 'responsive', 'bootstrap', 'sass', 'scss', 'selector', 'box model', 'position', 'display'],
    'HTML': ['html', 'semantic', 'accessibility', 'form', 'input', 'meta', 'head', 'body', 'div', 'span'],
    'Python': ['python', 'django', 'flask', 'pandas', 'numpy', 'list comprehension', 'decorator', 'lambda', 'class', 'inheritance'],
    'Data Structures': ['array', 'linked list', 'stack', 'queue', 'tree', 'graph', 'hash table', 'heap', 'binary search', 'sorting'],
    'Algorithms': ['algorithm', 'complexity', 'big o', 'recursion', 'dynamic programming', 'greedy', 'divide and conquer', 'search', 'sort'],
    'Database': ['sql', 'database', 'mysql', 'postgresql', 'mongodb', 'nosql', 'query', 'join', 'index', 'transaction'],
    'Web Development': ['http', 'api', 'rest', 'graphql', 'ajax', 'fetch', 'cors', 'authentication', 'authorization', 'session'],
    'DevOps': ['docker', 'kubernetes', 'ci/cd', 'git', 'deployment', 'server', 'cloud', 'aws', 'azure', 'gcp', 'branch', 'merge', 'commit'],
    'Programming': ['oop', 'functional programming', 'design pattern', 'solid', 'dry', 'clean code', 'testing', 'debugging']
  };

  topics.forEach(topic => {
    const topicLower = topic.toLowerCase();
    let bestMatch = 'Programming'; // Default category
    let maxMatches = 0;

    Object.entries(categoryKeywords).forEach(([category, keywords]) => {
      const matches = keywords.filter(keyword => 
        topicLower.includes(keyword) || keyword.includes(topicLower)
      ).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = category;
      }
    });

    categories[topic] = bestMatch;
  });

  return categories;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header to extract user info
    const authHeader = req.headers.get('Authorization');
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // Use service role key for inserting
    );

    // If we have an auth header, try to get the user
    let userId = null;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
      if (!userError && user) {
        userId = user.id;
      }
    }

    console.log('User ID:', userId);

    const { topics } = await req.json();
    
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Please provide an array of topics' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Auto-categorize topics
    const topicCategories = categorizeTopics(topics);
    console.log('Auto-categorized topics:', topicCategories);

    const allFlashcards = [];

    for (const topic of topics) {
      const category = topicCategories[topic];
      
      const prompt = `Create exactly 10 educational flashcards about "${topic}" in the "${category}" category. 

For each flashcard, provide:
1. A clear, specific question about the topic
2. A comprehensive answer with these 4 sections:
   - definition: A simple, clear explanation (1-2 sentences)
   - analogy: A kid-friendly analogy with emojis that makes it easy to understand
   - realWorldUse: Practical applications and when to use it
   - codeExample: A relevant code example (if applicable, otherwise provide a practical example)

Format your response as a JSON array with this exact structure:
[
  {
    "topic": "${topic}",
    "category": "${category}",
    "difficulty": "Beginner|Intermediate|Advanced",
    "question": "Clear, specific question",
    "answer": {
      "definition": "Simple explanation",
      "analogy": "Kid-friendly analogy with emojis",
      "realWorldUse": "Practical applications",
      "codeExample": "Code example or practical example"
    }
  }
]

Make sure the difficulty is appropriate for the complexity of the concept.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        }),
      });

      if (!response.ok) {
        console.error(`Gemini API error for topic ${topic}:`, response.status, response.statusText);
        continue;
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        console.error(`No content generated for topic: ${topic}`);
        continue;
      }

      try {
        const cleanedText = generatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const flashcards = JSON.parse(cleanedText);

        if (Array.isArray(flashcards)) {
          for (const flashcard of flashcards) {
            const flashcardData = {
              topic: flashcard.topic.toLowerCase(),
              question: flashcard.question,
              answer: JSON.stringify(flashcard.answer),
              difficulty: flashcard.difficulty.toLowerCase(),
              ...(userId && { user_id: userId }) // Only include user_id if we have a valid user
            };

            const { data: savedCard, error: saveError } = await supabaseClient
              .from('flashcards')
              .insert(flashcardData)
              .select()
              .single();

            if (saveError) {
              console.error('Error saving flashcard:', saveError);
              // If there's a user, this might be an RLS issue
              // If no user, create a public flashcard without user_id restriction
            } else {
              allFlashcards.push(savedCard);
            }
          }
        }
      } catch (parseError) {
        console.error(`Error parsing JSON for topic ${topic}:`, parseError);
        console.error('Generated text:', generatedText);
      }
    }

    return new Response(
      JSON.stringify({
        message: `Generated ${allFlashcards.length} flashcards for ${topics.length} topics`,
        flashcards: allFlashcards,
        categories: topicCategories
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-gemini-flashcards function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
