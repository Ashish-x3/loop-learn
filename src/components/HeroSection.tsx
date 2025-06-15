
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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 px-4">
      {/* Floating orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-200/20 to-blue-300/20 dark:from-blue-500/10 dark:to-blue-600/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-to-r from-blue-200/15 to-blue-300/15 dark:from-blue-500/8 dark:to-blue-600/8 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-slate-200/10 to-gray-200/10 dark:from-slate-500/5 dark:to-gray-500/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20 rotate-3 hover:rotate-0 transition-transform duration-700">
              <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-blue-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
            </div>
          </div>
        </div>

        {/* Dynamic headline */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              {phrases[currentPhrase]}
            </span>
          </h1>
          <div className="space-y-2">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
              The most beautiful way to learn anything.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-400 opacity-75">
              Designed for humans, powered by intelligence.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 sm:pt-8 w-full max-w-md mx-auto sm:max-w-none">
          <Link to="/learn" className="w-full sm:w-auto">
            <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto touch-manipulation active:scale-95">
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                Start Learning
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
          
          <Link to="/create" className="w-full sm:w-auto">
            <Button variant="outline" className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-medium rounded-xl sm:rounded-2xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto touch-manipulation active:scale-95">
              Create Cards
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center pt-8 sm:pt-12">
          <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-center">
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">10K+</div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Cards Mastered</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">7 Day</div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Streak</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">89%</div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-slate-400 to-transparent rounded-full" />
      </div>
    </div>
  );
};

export default HeroSection;
