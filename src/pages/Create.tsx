
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
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="border-b border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/10 dark:bg-black/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/20 p-2 sm:px-3">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-white">Create Flashcard</h1>
                <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1">
                  Generate AI-powered flashcards or create your own
                </p>
              </div>
            </div>
            <Button className="w-full sm:w-auto bg-blue-500/80 hover:bg-blue-600/80 text-white border-0 backdrop-blur-sm">
              <Plus className="w-4 h-4 mr-2" />
              Quick Create
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 sm:pb-32">
        {/* AI Generator */}
        <section className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="flex justify-center">
              <div className="p-3 sm:p-4 bg-blue-500/10 rounded-2xl backdrop-blur-sm">
                <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white">AI Flashcard Generator</h2>
            <p className="text-sm sm:text-base text-black/70 dark:text-white/70 max-w-md mx-auto px-4">
              Enter any tech topic and let AI create kid-friendly explanations with examples
            </p>
          </div>

          <Card className="max-w-2xl mx-auto border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-black dark:text-white">What do you want to learn?</CardTitle>
              <CardDescription className="text-sm text-black/70 dark:text-white/70">
                Type a programming concept, framework, or technology
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  placeholder="e.g., JavaScript Closures, React Hooks, CSS Grid..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1 bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50"
                />
                <Button disabled={!topic.trim()} className="w-full sm:w-auto bg-blue-500/80 hover:bg-blue-600/80 text-white border-0 backdrop-blur-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>

              {/* Quick Topics */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-black dark:text-white">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickTopics.map((quickTopic, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setTopic(quickTopic)}
                      className="text-xs bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/20"
                    >
                      {quickTopic}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8 sm:my-12 bg-white/20 dark:bg-white/10" />

        {/* Browse by Category */}
        <section className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white">Browse by Category</h2>
            <p className="text-sm sm:text-base text-black/70 dark:text-white/70 px-4">
              Explore existing flashcards or add to specific topics
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:-translate-y-1">
                <CardContent className="p-4 sm:p-6 text-center space-y-2 sm:space-y-3">
                  <div className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-sm sm:text-base font-semibold group-hover:text-blue-500 transition-colors text-black dark:text-white">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs bg-white/20 dark:bg-black/20 text-black dark:text-white border-white/20 dark:border-white/10">
                      {category.count} cards
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8 sm:my-12 bg-white/20 dark:bg-white/10" />

        {/* Manual Creation */}
        <section className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="flex justify-center">
              <div className="p-3 sm:p-4 bg-white/10 dark:bg-black/10 rounded-2xl backdrop-blur-sm">
                <Code className="w-6 h-6 sm:w-8 sm:h-8 text-black dark:text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white">Create Manually</h2>
            <p className="text-sm sm:text-base text-black/70 dark:text-white/70 px-4">
              Prefer to write your own? Create custom flashcards from scratch
            </p>
          </div>

          <div className="max-w-2xl mx-auto grid gap-4">
            <Link to="/create/manual">
              <Card className="hover:shadow-lg transition-all cursor-pointer group border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:-translate-y-1">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="p-2 sm:p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors backdrop-blur-sm">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold group-hover:text-blue-500 transition-colors text-black dark:text-white">
                        Custom Flashcard
                      </h3>
                      <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">
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
