import React, { useState } from "react";
import { useFlashcards } from "@/hooks/useFlashcards";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LearnMode: React.FC = () => {
  // Always fetch latest on refocus
  const { data: flashcards = [], isLoading, refetch } = useFlashcards(undefined, {
    refetchOnWindowFocus: true,
  });

  // Get all unique topics from the flashcards
  const topics = Array.from(new Set(flashcards.map(card => card.topic)));

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Filter flashcards to current topic
  const topicToShow = selectedTopic || topics[0];
  const filtered = flashcards.filter(card => card.topic === topicToShow);

  // Topic chip UI
  const TopicList = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      {topics.map(topic => (
        <Button
          key={topic}
          variant={selectedTopic === topic ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedTopic(topic)}
          className="capitalize"
        >
          {topic}
        </Button>
      ))}
    </div>
  );

  // Single flashcard UI (very basic, for demo)
  const FlashcardList = () => (
    <div className="space-y-4">
      {filtered.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">No cards for this topic.</div>
      ) : (
        filtered.map(card => (
          <Card key={card.id} className="max-w-lg mx-auto">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge>{card.topic}</Badge>
                <span className="text-xs text-muted-foreground">{card.difficulty}</span>
              </div>
              <CardTitle className="text-lg">{card.front}</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              {/* Show just one part of the back for simplicity */}
              <div>
                <div className="font-bold mb-1">Definition:</div>
                <div>{card.back.definition}</div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  if (isLoading) return <div className="p-12 text-center text-muted-foreground">Loading flashcards…</div>;

  if (!flashcards.length)
    return (
      <div className="py-16 text-center space-y-2">
        <h2 className="text-2xl font-bold">No flashcards found</h2>
        <p className="text-muted-foreground">Start by generating or creating your first flashcard!</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Learn Mode</h1>
      <TopicList />
      <FlashcardList />
    </div>
  );
};

export default LearnMode;
