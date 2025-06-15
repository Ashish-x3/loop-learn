
import { useState, useEffect } from 'react';
import { Brain, Sparkles, ArrowRight, Play, CheckCircle, Users, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

const Landing = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases = [
    "Master anything",
    "Learn faster", 
    "Remember more",
    "Achieve goals"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Smart Learning",
      description: "AI-powered spaced repetition adapts to your learning pace"
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description: "Visual progress tracking and achievement system"
    },
    {
      icon: Zap,
      title: "Quick & Efficient",
      description: "Learn more in less time with proven techniques"
    },
    {
      icon: Users,
      title: "Community",
      description: "Join thousands of learners achieving their goals"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <ThemeToggle />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black">
        {/* Floating orbs background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-6">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-blue-500/80 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20 rotate-3 hover:rotate-0 transition-transform duration-700 backdrop-blur-sm">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/90 dark:bg-black/90 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-black dark:text-white" />
              </div>
            </div>
          </div>

          {/* Dynamic headline */}
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-black tracking-tight">
              <span className="text-black dark:text-white">
                {phrases[currentPhrase]}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-black/70 dark:text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              The most beautiful way to learn anything. 
              <span className="block mt-2 text-lg opacity-75">Transform how you study with intelligent flashcards.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link to="/dashboard">
              <Button className="group relative overflow-hidden bg-blue-500/80 hover:bg-blue-600/80 text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm border-0">
                <span className="relative z-10 flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            
            <Button className="px-8 py-6 text-lg font-medium rounded-2xl border border-black/20 dark:border-white/20 bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 text-black dark:text-white transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-12 bg-gradient-to-b from-black/40 dark:from-white/40 to-transparent rounded-full" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-black dark:text-white">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
              Join thousands of learners who've transformed their study habits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-500/80 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-black/70 dark:text-white/70">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-bold text-black dark:text-white">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            Join thousands of students, professionals, and lifelong learners who are mastering new skills every day.
          </p>
          <Link to="/dashboard">
            <Button className="bg-blue-500/80 hover:bg-blue-600/80 text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm border-0">
              Start Learning Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
