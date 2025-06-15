
import { useState } from 'react';
import { Trophy, Target, Zap, Calendar, BookOpen, Star, Code, Lightbulb, Brain } from 'lucide-react';
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

  const bottomStats = [
    { label: "Cards Learned", value: "127", icon: Brain, color: "text-primary" },
    { label: "Achievements", value: "3", icon: Trophy, color: "text-primary" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      {/* Header */}
      <header className="border-b border-border backdrop-blur-xl bg-background/80">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-6">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="hover:bg-muted p-2 sm:px-3">
                  <Target className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Achievements</h1>
                <p className="text-muted-foreground mt-1 text-xs sm:text-sm lg:text-base">
                  Track your learning progress and unlock new badges
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8 pb-24 sm:pb-32">
        {/* Current Streak - Top Section */}
        <div className="mb-6 sm:mb-8">
          <Card className="border-0 backdrop-blur-xl bg-card/50 border border-border">
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">7 days</div>
                <p className="text-lg text-muted-foreground">Current Streak</p>
                <p className="text-sm text-muted-foreground">Keep it up! You're on fire! 🔥</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {bottomStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 backdrop-blur-xl bg-card/50 border border-border">
                <CardContent className="p-3 sm:p-4 lg:p-6 text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className={`transition-all border-0 backdrop-blur-xl border border-border ${achievement.unlocked ? 'bg-primary/10 border-primary/20' : 'bg-card/50'}`}>
              <CardHeader className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-start sm:items-center space-x-3">
                  <div className={`p-2 rounded-lg backdrop-blur-sm ${achievement.unlocked ? 'bg-primary/20' : 'bg-muted'}`}>
                    <achievement.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm sm:text-base lg:text-lg">
                      <span className="truncate">{achievement.title}</span>
                      {achievement.unlocked && (
                        <Badge className="text-primary-foreground bg-primary text-xs w-fit shrink-0">
                          Unlocked
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm mt-1">
                      {achievement.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
                {achievement.unlocked ? (
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span>Progress</span>
                      <span className="text-muted-foreground">{achievement.progress}%</span>
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
