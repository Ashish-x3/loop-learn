
import { useState, useEffect } from 'react';
import { Book, Brain, Search, TrendingUp, Plus, ArrowRight, Moon, Sun, User, Zap, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import FloatingDock from '@/components/FloatingDock';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const dailyCard = {
    id: 1,
    topic: "JavaScript Promise",
    category: "JavaScript",
    difficulty: "Intermediate"
  };

  const topicCategories = [
    { name: "JavaScript", count: 45, color: "bg-yellow-500", icon: "🟨" },
    { name: "React", count: 32, color: "bg-blue-500", icon: "⚛️" },
    { name: "CSS", count: 28, color: "bg-purple-500", icon: "🎨" },
    { name: "Git", count: 20, color: "bg-orange-500", icon: "📦" },
    { name: "HTML", count: 25, color: "bg-red-500", icon: "📄" },
    { name: "Node.js", count: 18, color: "bg-green-500", icon: "🟢" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleTheme}
          size="sm"
          variant="outline"
          className="rounded-full w-9 h-9 p-0"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Loop Learn
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master tech concepts with AI-powered flashcards designed for everyone
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search any tech topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/learn">
              <Button size="lg">
                <Brain className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Create Card
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-32 space-y-16">
        {/* Featured Card */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              Today's Challenge
            </h2>
            <Badge>Daily</Badge>
          </div>

          <Link to="/learn">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{dailyCard.category}</Badge>
                  <Badge variant="outline">{dailyCard.difficulty}</Badge>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {dailyCard.topic}
                </CardTitle>
                <CardDescription className="text-base">
                  Learn how JavaScript Promises work with pizza delivery analogies! 🍕
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  Start Challenge
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Topic Categories */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Book className="w-6 h-6 text-primary" />
            Explore Topics
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topicCategories.map((category, index) => (
              <Link to="/learn" key={index}>
                <Card className="hover:shadow-md transition-all cursor-pointer group h-full">
                  <CardContent className="p-4 text-center space-y-3">
                    <div className="text-2xl group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {category.count} cards
                      </p>
                    </div>
                    <div className={`w-full h-1 ${category.color} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`} />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Your Learning Journey</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Target, value: "127", label: "Cards Learned", color: "text-purple-600" },
              { icon: Zap, value: "7", label: "Day Streak", color: "text-blue-600" },
              { icon: Trophy, value: "89%", label: "Accuracy", color: "text-green-600" },
              { icon: Brain, value: "42", label: "Minutes Today", color: "text-orange-600" }
            ].map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="p-2 bg-muted rounded-lg">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <FloatingDock />
    </div>
  );
};

export default Index;
