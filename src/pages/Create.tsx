
import { useState } from 'react';
import { Plus, ArrowLeft, Lightbulb, Code, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import FloatingDock from '@/components/FloatingDock';

const Create = () => {
  const [topic, setTopic] = useState('');

  const quickTopics = [
    "JavaScript Promise",
    "React useState",
    "CSS Flexbox",
    "Git Merge",
    "HTML Semantic Tags",
    "Node.js Modules"
  ];

  const categories = [
    { name: "JavaScript", icon: "🟨", count: 45 },
    { name: "React", icon: "⚛️", count: 32 },
    { name: "CSS", icon: "🎨", count: 28 },
    { name: "HTML", icon: "📄", count: 25 },
    { name: "Git", icon: "📦", count: 20 },
    { name: "Node.js", icon: "🟢", count: 18 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Create Flashcard</h1>
              <p className="text-sm text-muted-foreground">
                Generate AI-powered flashcards or create your own
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pb-32">
        {/* AI Generator */}
        <section className="space-y-6 mb-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold">AI Flashcard Generator</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter any tech topic and let AI create kid-friendly explanations with examples
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">What do you want to learn?</CardTitle>
              <CardDescription>
                Type a programming concept, framework, or technology
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="e.g., JavaScript Closures, React Hooks, CSS Grid..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1"
                />
                <Button disabled={!topic.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>

              {/* Quick Topics */}
              <div className="space-y-3">
                <p className="text-sm font-medium">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickTopics.map((quickTopic, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setTopic(quickTopic)}
                      className="text-xs"
                    >
                      {quickTopic}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* Browse by Category */}
        <section className="space-y-6 mb-12">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Browse by Category</h2>
            <p className="text-muted-foreground">
              Explore existing flashcards or add to specific topics
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {category.count} cards
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Manual Creation */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-secondary rounded-full">
                <Code className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-2xl font-bold">Create Manually</h2>
            <p className="text-muted-foreground">
              Prefer to write your own? Create custom flashcards from scratch
            </p>
          </div>

          <div className="max-w-2xl mx-auto grid gap-4">
            <Link to="/create/manual">
              <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        Custom Flashcard
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Create your own definition, analogy, and examples
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>

      <FloatingDock />
    </div>
  );
};

export default Create;
