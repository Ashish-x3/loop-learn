
import { useState, useEffect } from 'react';
import { Brain, Sparkles, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
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

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950">
      {/* Floating orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-pink-200/25 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-6">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25 rotate-3 hover:rotate-0 transition-transform duration-700">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-yellow-800" />
            </div>
          </div>
        </div>

        {/* Dynamic headline */}
        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
              {phrases[currentPhrase]}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            The most beautiful way to learn anything. 
            <span className="block mt-2 text-lg opacity-75">Designed for humans, powered by intelligence.</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link to="/learn">
            <Button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1">
              <span className="relative z-10 flex items-center gap-3">
                <Play className="w-5 h-5" />
                Start Learning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
          
          <Link to="/create">
            <Button variant="outline" className="px-8 py-6 text-lg font-medium rounded-2xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1">
              Create Cards
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center pt-12">
          <div className="flex gap-8 md:gap-12 text-center">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">10K+</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Cards Mastered</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">7 Day</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Streak</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">89%</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-12 bg-gradient-to-b from-slate-400 to-transparent rounded-full" />
      </div>
    </div>
  );
};

export default HeroSection;
