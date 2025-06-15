
import { useState } from 'react';
import { Book, Brain, Search, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const recentCards = [
    { id: 1, topic: "Array.map()", category: "JavaScript", completed: true },
    { id: 2, topic: "Flexbox", category: "CSS", completed: false },
    { id: 3, topic: "useState Hook", category: "React", completed: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Loop Learn
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Flashcards</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Card
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Learn Tech Concepts 
            <span className="block text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Like You're 10 Years Old! 🧠
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Master programming concepts with AI-powered flashcards that use simple analogies and real-world examples
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search any tech topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
            />
          </div>
        </div>

        {/* Daily Card */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-purple-600" />
              Today's Featured Card
            </h3>
            <Badge variant="secondary" className="text-purple-600 bg-purple-100">
              Daily Challenge
            </Badge>
          </div>

          <Link to="/learn">
            <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-white text-white bg-white/20">
                    {dailyCard.category}
                  </Badge>
                  <Badge variant="outline" className="border-white text-white bg-white/20">
                    {dailyCard.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold">
                  {dailyCard.topic}
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Learn how JavaScript Promises work with pizza delivery analogies!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="border-white text-purple-600 bg-white hover:bg-purple-50 group-hover:translate-x-1 transition-transform"
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Topic Categories */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Book className="w-6 h-6 mr-2 text-purple-600" />
            Explore Topics
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {topicCategories.map((category, index) => (
              <Link to="/learn" key={index}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-1">
                      {category.name}
                    </h4>
                    <p className="text-gray-600">
                      {category.count} cards
                    </p>
                    <div className={`w-full h-1 ${category.color} rounded-full mt-3 opacity-70 group-hover:opacity-100 transition-opacity`}></div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Progress */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Continue Learning
          </h3>
          
          <div className="space-y-3">
            {recentCards.map((card) => (
              <Link to="/learn" key={card.id}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${card.completed ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{card.topic}</h4>
                          <p className="text-sm text-gray-600">{card.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={card.completed ? "default" : "secondary"}>
                          {card.completed ? "Completed" : "In Progress"}
                        </Badge>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Start Button */}
        <div className="text-center mb-12">
          <Link to="/learn">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg">
              <Brain className="w-5 h-5 mr-2" />
              Start Learning Now
            </Button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">127</div>
              <p className="text-gray-600">Cards Learned</p>
            </CardContent>
          </Card>
          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">7</div>
              <p className="text-gray-600">Day Streak</p>
            </CardContent>
          </Card>
          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
              <p className="text-gray-600">Accuracy</p>
            </CardContent>
          </Card>
          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">42</div>
              <p className="text-gray-600">Minutes Today</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
