
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
    { name: "JavaScript", count: 45, color: "from-yellow-400 to-orange-500", icon: "🟨", bgPattern: "bg-gradient-to-br" },
    { name: "React", count: 32, color: "from-blue-400 to-blue-600", icon: "⚛️", bgPattern: "bg-gradient-to-br" },
    { name: "CSS", count: 28, color: "from-purple-400 to-pink-500", icon: "🎨", bgPattern: "bg-gradient-to-br" },
    { name: "Git", count: 20, color: "from-orange-400 to-red-500", icon: "📦", bgPattern: "bg-gradient-to-br" },
    { name: "HTML", count: 25, color: "from-red-400 to-pink-500", icon: "📄", bgPattern: "bg-gradient-to-br" },
    { name: "Node.js", count: 18, color: "from-green-400 to-emerald-500", icon: "🟢", bgPattern: "bg-gradient-to-br" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-colors duration-300">
      {/* Floating Theme Toggle */}
      <Button
        onClick={toggleTheme}
        size="sm"
        variant="outline"
        className="fixed top-4 right-4 z-50 rounded-full w-10 h-10 p-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
      >
        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 dark:from-purple-400/20 dark:to-blue-400/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Loop Learn
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
              Master Tech Concepts Like You're 10! 🚀
            </p>
            
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12">
              AI-powered flashcards with simple analogies, real-world examples, and interactive learning
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search any tech topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-400 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg"
                />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 -z-10" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/learn">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                  <Brain className="w-5 h-5 mr-2" />
                  Start Learning
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg rounded-xl border-2 border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                <Plus className="w-5 h-5 mr-2" />
                Create Card
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-32">
        {/* Featured Card */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="w-7 h-7 mr-3 text-purple-600" />
              Today's Challenge
            </h2>
            <Badge variant="secondary" className="text-purple-600 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 text-sm font-medium">
              🔥 Daily
            </Badge>
          </div>

          <Link to="/learn">
            <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:-translate-y-2 border-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="border-white/30 text-white bg-white/20 backdrop-blur-sm">
                    {dailyCard.category}
                  </Badge>
                  <Badge variant="outline" className="border-white/30 text-white bg-white/20 backdrop-blur-sm">
                    {dailyCard.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-3xl font-bold mb-2">
                  {dailyCard.topic}
                </CardTitle>
                <CardDescription className="text-purple-100 text-lg">
                  Learn how JavaScript Promises work with pizza delivery analogies! 🍕
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <Button 
                  variant="outline" 
                  className="border-white/30 text-purple-600 bg-white hover:bg-purple-50 group-hover:translate-x-2 transition-all font-semibold"
                >
                  Start Challenge
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Topic Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <Book className="w-7 h-7 mr-3 text-purple-600" />
            Explore Topics
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {topicCategories.map((category, index) => (
              <Link to="/learn" key={index}>
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {category.count} cards
                    </p>
                    <div className={`w-full h-2 bg-gradient-to-r ${category.color} rounded-full opacity-70 group-hover:opacity-100 transition-opacity`} />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Your Learning Journey
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, value: "127", label: "Cards Learned", color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
              { icon: Zap, value: "7", label: "Day Streak", color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
              { icon: Trophy, value: "89%", label: "Accuracy", color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" },
              { icon: Brain, value: "42", label: "Minutes Today", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30" }
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Dock */}
      <FloatingDock />
    </div>
  );
};

export default Index;
