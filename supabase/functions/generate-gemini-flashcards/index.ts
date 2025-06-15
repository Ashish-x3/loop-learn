
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Prepare CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Gemini API config
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// Helper: generate flashcards with Gemini API
async function generateWithGemini(topic: string) {
  // Debug logging about key
  if (!GEMINI_API_KEY) {
    console.error("[Gemini] API key is missing.");
  } else {
    console.info("[Gemini] API key loaded, length:", GEMINI_API_KEY.length);
  }

  const prompt = `
Act as a kids' coding teacher. 
Create exactly 5 flashcards on the topic "${topic}", each with:
- question
- answer
- difficulty: "Beginner", "Intermediate", or "Advanced"
Return JSON array only, in this format:
[
  {
    "question": "...",
    "answer": "...",
    "difficulty": "Beginner" | "Intermediate" | "Advanced"
  }
]
  `;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  // Improved error logging
  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Gemini Error] Status:", response.status, response.statusText);
    console.error("[Gemini Error] Body:", errorText);
    throw new Error("Failed to generate flashcards from Gemini");
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const jsonArrayStr = text.match(/\[\s*{[\s\S]*?}\s*\]/)?.[0];
  if (!jsonArrayStr) throw new Error("Could not parse Gemini response as flashcards");
  const flashcards = JSON.parse(jsonArrayStr);
  return flashcards;
}

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic } = await req.json();
    if (!topic || typeof topic !== "string") {
      return new Response(JSON.stringify({ error: "Missing or invalid topic" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Supabase client for edge functions
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2.50.0");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Check DB for existing flashcards (case-insensitive)
    const { data: existing, error } = await supabase
      .from("flashcards")
      .select("*")
      .ilike("topic", topic.toLowerCase())
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (existing && existing.length > 0) {
      return new Response(JSON.stringify({
        source: "existing",
        flashcards: existing
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" }});
    }

    // 2. If none, generate new flashcards
    const cards = await generateWithGemini(topic);

    // Format + insert into db (all with lowercase topic for deduplication)
    const toInsert = cards.map((card: any) => ({
      topic: topic.toLowerCase(),
      question: card.question,
      answer: card.answer,
      difficulty: card.difficulty || "Beginner"
    }));

    const { data: inserted, error: insertError } = await supabase
      .from("flashcards")
      .insert(toInsert)
      .select("*");

    if (insertError) throw insertError;

    return new Response(JSON.stringify({
      source: "generated",
      flashcards: inserted
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" }});

  } catch (err: any) {
    console.error("[generate-gemini-flashcards] error:", err);
    return new Response(JSON.stringify({ error: err.message || String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
