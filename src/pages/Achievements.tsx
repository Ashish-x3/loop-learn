
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
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
              <p className="text-muted-foreground mt-2">
                Track your learning progress and unlock new badges
              </p>
            </div>
            <Link to="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-32">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Unlocked</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-sm text-muted-foreground">Cards Mastered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className={`transition-all ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'opacity-75'}`}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${achievement.unlocked ? 'bg-yellow-100' : 'bg-muted'}`}>
                    <achievement.icon className={`w-6 h-6 ${achievement.unlocked ? 'text-yellow-600' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {achievement.title}
                      {achievement.unlocked && <Badge variant="secondary" className="text-yellow-700 bg-yellow-100">Unlocked</Badge>}
                    </CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {achievement.unlocked ? (
                  <p className="text-sm text-muted-foreground">
                    Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}%</span>
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
