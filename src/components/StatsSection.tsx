
import { Trophy, Target, Zap, Calendar, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const StatsSection = () => {
  const stats = [
    { 
      icon: Trophy, 
      value: "42", 
      label: "Cards Mastered", 
      change: "+12 this week",
      color: "from-amber-500 to-yellow-500",
      bgColor: "from-amber-50 to-yellow-50 dark:from-amber-950/50 dark:to-yellow-950/50"
    },
    { 
      icon: Target, 
      value: "89%", 
      label: "Accuracy Rate", 
      change: "+5% improvement",
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50"
    },
    { 
      icon: Zap, 
      value: "7", 
      label: "Day Streak", 
      change: "Keep it up!",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50"
    },
    { 
      icon: Calendar, 
      value: "24m", 
      label: "Study Time", 
      change: "Today",
      color: "from-slate-600 to-slate-700",
      bgColor: "from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50"
    }
  ];

  const achievements = [
    { name: "Speed Demon", description: "10 cards in 2 minutes", progress: 85 },
    { name: "Consistency King", description: "30 day streak", progress: 23 },
    { name: "Knowledge Master", description: "100 cards mastered", progress: 42 }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
          Your Progress
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Track your learning journey and celebrate every milestone.
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <Card key={stat.label} className={`group overflow-hidden border-0 bg-gradient-to-br ${stat.bgColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {stat.change}
                  </div>
                </div>

                {/* Decorative element */}
                <div className={`absolute bottom-2 right-2 w-16 h-16 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-lg group-hover:opacity-20 transition-opacity`} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievement Progress */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Achievements</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={achievement.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900 dark:text-white">{achievement.name}</h4>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{achievement.progress}%</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.description}</p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-1000"
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
