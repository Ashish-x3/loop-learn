
import { Trophy, Target, Zap, Calendar, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const StatsSection = () => {
  const stats = [
    { 
      icon: Trophy, 
      value: "42", 
      label: "Cards Mastered", 
      change: "+12 this week"
    },
    { 
      icon: Target, 
      value: "89%", 
      label: "Accuracy Rate", 
      change: "+5% improvement"
    },
    { 
      icon: Zap, 
      value: "7", 
      label: "Day Streak", 
      change: "Keep it up!"
    },
    { 
      icon: Calendar, 
      value: "24m", 
      label: "Study Time", 
      change: "Today"
    }
  ];

  const achievements = [
    { name: "Speed Demon", description: "10 cards in 2 minutes", progress: 85 },
    { name: "Consistency King", description: "30 day streak", progress: 23 },
    { name: "Knowledge Master", description: "100 cards mastered", progress: 42 }
  ];

  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center space-y-3 sm:space-y-4 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
          Your Progress
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
          Track your learning journey and celebrate every milestone.
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <Card key={stat.label} className="group overflow-hidden border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/80 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                </div>
                
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-black/70 dark:text-white/70 leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-xs text-blue-500 font-medium">
                    {stat.change}
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute bottom-2 right-2 w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/10 rounded-full blur-lg group-hover:bg-blue-500/20 transition-all" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievement Progress */}
      <Card className="overflow-hidden border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-xl">
        <CardContent className="p-4 sm:p-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white">Achievements</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {achievements.map((achievement, index) => (
              <div key={achievement.name} className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-black dark:text-white text-sm sm:text-base">{achievement.name}</h4>
                  <span className="text-xs sm:text-sm text-black/70 dark:text-white/70">{achievement.progress}%</span>
                </div>
                <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">{achievement.description}</p>
                <div className="w-full bg-white/20 dark:bg-black/20 rounded-full h-1.5 sm:h-2 backdrop-blur-sm">
                  <div 
                    className="bg-blue-500/80 h-1.5 sm:h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSection;
