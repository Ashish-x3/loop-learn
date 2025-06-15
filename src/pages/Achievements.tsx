
import { useState } from 'react';
import { Trophy, Medal, Star, Zap, Target, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import FloatingDock from '@/components/FloatingDock';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first flashcard",
      icon: Star,
      unlocked: true,
      unlockedAt: "2024-01-15",
      points: 50
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Maintain a 7-day learning streak",
      icon: Zap,
      unlocked: true,
      unlockedAt: "2024-01-20",
      points: 200
    },
    {
      id: 3,
      title: "JavaScript Master",
      description: "Complete 50 JavaScript flashcards",
      icon: Trophy,
      unlocked: true,
      unlockedAt: "2024-01-25",
      points: 500
    },
    {
      id: 4,
      title: "Perfect Score",
      description: "Get 100% accuracy in a learning session",
      icon: Medal,
      unlocked: false,
      unlockedAt: null,
      points: 300
    },
    {
      id: 5,
      title: "Speed Learner",
      description: "Complete 20 cards in under 10 minutes",
      icon: Target,
      unlocked: false,
      unlockedAt: null,
      points: 250
    },
    {
      id: 6,
      title: "Consistency King",
      description: "Learn for 30 consecutive days",
      icon: Calendar,
      unlocked: false,
      unlockedAt: null,
      points: 1000
    }
  ];

  const totalPoints = achievements
    .filter(achievement => achievement.unlocked)
    .reduce((sum, achievement) => sum + achievement.points, 0);

  const unlockedCount = achievements.filter(achievement => achievement.unlocked).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Achievements</h1>
                <p className="text-sm text-muted-foreground">
                  Track your learning milestones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pb-32">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{unlockedCount}</div>
              <p className="text-sm text-muted-foreground">Unlocked</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalPoints}</div>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </CardContent>
          </Card>
          <Card className="col-span-2 lg:col-span-1">
            <CardContent className="p-6 text-center">
              <Medal className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{Math.round((unlockedCount / achievements.length) * 100)}%</div>
              <p className="text-sm text-muted-foreground">Completion</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">All Achievements</h2>
          <div className="grid gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card key={achievement.id} className={`transition-all ${
                  achievement.unlocked 
                    ? 'border-primary/20 bg-primary/5' 
                    : 'opacity-60 border-dashed'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${
                        achievement.unlocked 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          {achievement.unlocked && (
                            <Badge variant="secondary">{achievement.points} pts</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.unlockedAt && (
                          <p className="text-xs text-muted-foreground">
                            Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        )}
                        {!achievement.unlocked && (
                          <Badge variant="outline" className="text-xs">
                            Locked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <FloatingDock />
    </div>
  );
};

export default Achievements;
