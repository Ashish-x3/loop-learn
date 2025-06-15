
import { useState } from 'react';
import { Trophy, Target, Zap, Calendar, BookOpen, Star, Code, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import FloatingDock from '@/components/FloatingDock';
import ThemeToggle from '@/components/ThemeToggle';

const Achievements = () => {
  const achievements = [
    { 
      id: 1, 
      title: "First Steps", 
      description: "Complete your first flashcard", 
      icon: Target,
      unlocked: true,
      unlockedDate: "2024-01-15"
    },
    { 
      id: 2, 
      title: "Week Warrior", 
      description: "Maintain a 7-day learning streak", 
      icon: Calendar,
      unlocked: true,
      unlockedDate: "2024-01-20"
    },
    { 
      id: 3, 
      title: "Speed Demon", 
      description: "Answer 10 cards in under 2 minutes", 
      icon: Zap,
      unlocked: false,
      progress: 65
    },
    { 
      id: 4, 
      title: "Knowledge Master", 
      description: "Master 50 flashcards", 
      icon: Trophy,
      unlocked: false,
      progress: 84
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <ThemeToggle />
      
      {/* Header */}
      <header className="border-b border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/10 dark:bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">Achievements</h1>
              <p className="text-black/70 dark:text-white/70 mt-1 sm:mt-2 text-sm sm:text-base">
                Track your learning progress and unlock new badges
              </p>
            </div>
            <Link to="/dashboard">
              <Button variant="outline" className="bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/20 text-sm sm:text-base">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 sm:pb-32">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">2</p>
                  <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">Unlocked</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">42</p>
                  <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">Cards Mastered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">7</p>
                  <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">89%</p>
                  <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className={`transition-all border-0 backdrop-blur-xl border border-white/20 dark:border-white/10 ${achievement.unlocked ? 'bg-blue-500/10 border-blue-500/20' : 'bg-white/10 dark:bg-black/20'}`}>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg backdrop-blur-sm ${achievement.unlocked ? 'bg-blue-500/20' : 'bg-white/20 dark:bg-black/20'}`}>
                    <achievement.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${achievement.unlocked ? 'text-blue-600' : 'text-black/70 dark:text-white/70'}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-black dark:text-white text-base sm:text-lg">
                      {achievement.title}
                      {achievement.unlocked && (
                        <Badge className="text-blue-700 bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-300 text-xs w-fit">
                          Unlocked
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-black/70 dark:text-white/70 text-sm">
                      {achievement.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                {achievement.unlocked ? (
                  <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">
                    Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-black dark:text-white">Progress</span>
                      <span className="text-black/70 dark:text-white/70">{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <FloatingDock />
    </div>
  );
};

export default Achievements;
