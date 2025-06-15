
import { Target, Zap, Trophy, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const StatsSection = () => {
  const stats = [
    { icon: Target, value: "127", label: "Cards Learned", color: "text-purple-600" },
    { icon: Zap, value: "7", label: "Day Streak", color: "text-blue-600" },
    { icon: Trophy, value: "89%", label: "Accuracy", color: "text-green-600" },
    { icon: Brain, value: "42", label: "Minutes Today", color: "text-orange-600" }
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Your Learning Journey</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center space-y-3">
              <div className="flex justify-center">
                <div className="p-2 bg-muted rounded-lg">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="space-y-1">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
