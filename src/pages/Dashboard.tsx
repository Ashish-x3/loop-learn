
import { useState } from 'react';
import { Trophy, Target, Zap, Calendar, Brain, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DailyChallenge from '@/components/DailyChallenge';
import StatsSection from '@/components/StatsSection';
import FloatingDock from '@/components/FloatingDock';
import { Link } from 'react-router-dom';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useAchievements } from '@/hooks/useAchievements';

const Dashboard = () => {
  const [showAchievements, setShowAchievements] = useState(false);
  const { data: userProgress, isLoading: progressLoading } = useUserProgress();
  const { data: achievements, isLoading: achievementsLoading } = useAchievements();

  const bottomStats = [
    { 
      label: "Cards Learned", 
      value: userProgress?.totalCards.toString() || "0", 
      icon: Brain, 
      color: "text-primary" 
    },
    { 
      label: "Achievements", 
      value: achievements?.filter(a => a.unlocked).length.toString() || "0", 
      icon: Trophy, 
      color: "text-primary" 
    }
  ];

  if (showAchievements) {
    if (achievementsLoading || progressLoading) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading achievements...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border backdrop-blur-xl bg-background/80">
          <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-6">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-muted p-2 sm:px-3"
                  onClick={() => setShowAchievements(false)}
                >
                  <Target className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
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
                  <div className="text-4xl font-bold text-primary">
                    {userProgress?.streak || 0} days
                  </div>
                  <p className="text-lg text-muted-foreground">Current Streak</p>
                  <p className="text-sm text-muted-foreground">
                    {userProgress?.streak && userProgress.streak > 0 
                      ? "Keep it up! You're on fire! 🔥" 
                      : "Start your learning streak today! 💪"
                    }
                  </p>
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
            {achievements?.map((achievement) => (
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
                      Unlocked on {achievement.unlockedDate ? new Date(achievement.unlockedDate).toLocaleDateString() : 'Unknown date'}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Progress</span>
                        <span className="text-muted-foreground">{Math.round(achievement.progress || 0)}%</span>
                      </div>
                      <Progress value={achievement.progress || 0} className="h-2" />
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
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Welcome Header */}
      <div className="container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Welcome back! 👋
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            Ready to continue your learning journey?
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 pb-24 sm:pb-32 space-y-16 sm:space-y-24">
        {/* Daily Challenge */}
        <section className="max-w-2xl mx-auto">
          <DailyChallenge />
        </section>

        {/* Learn a New Topic Button */}
        <section className="flex flex-col items-center">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
              Learn a New Topic
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
              Use our AI Flashcard Generator to create personalized flashcards on any concept you want to master.
            </p>
            <Link to="/create">
              <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-6 py-4">
                <Plus className="mr-2 w-5 h-5" />
                Go to Flashcard Generator
              </Button>
            </Link>
          </div>
        </section>

        {/* Stats and Progress */}
        <section>
          <StatsSection />
        </section>

        {/* Achievements Preview */}
        <section className="space-y-8 sm:space-y-12">
          <div className="text-center space-y-3 sm:space-y-4 px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
              Recent Achievements
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
              Your latest unlocked badges and progress towards new goals.
            </p>
          </div>

          {/* Quick Achievement Stats */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-md mx-auto">
            {bottomStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
                  <CardContent className="p-3 sm:p-4 text-center space-y-3">
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

          {/* Latest Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {achievements?.slice(0, 2).map((achievement) => (
              <Card key={achievement.id} className={`transition-all border-0 backdrop-blur-xl border border-white/20 dark:border-white/10 ${achievement.unlocked ? 'bg-primary/10 border-primary/20' : 'bg-white/10 dark:bg-black/20'}`}>
                <CardHeader className="p-3 sm:p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg backdrop-blur-sm ${achievement.unlocked ? 'bg-primary/20' : 'bg-muted'}`}>
                      <achievement.icon className={`w-5 h-5 ${achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                        <span>{achievement.title}</span>
                        {achievement.unlocked && (
                          <Badge className="text-primary-foreground bg-primary text-xs">
                            Unlocked
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        {achievement.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {!achievement.unlocked && (
                  <CardContent className="p-3 sm:p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span className="text-muted-foreground">{Math.round(achievement.progress || 0)}%</span>
                      </div>
                      <Progress value={achievement.progress || 0} className="h-2" />
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* View All Achievements Button */}
          <div className="text-center">
            <Button 
              onClick={() => setShowAchievements(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Trophy className="w-4 h-4 mr-2" />
              View All Achievements
            </Button>
          </div>
        </section>
      </div>

      <FloatingDock />
    </div>
  );
};

export default Dashboard;
