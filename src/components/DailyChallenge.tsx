
import { useState } from 'react';
import { Target, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

const DailyChallenge = () => {
  const [completed, setCompleted] = useState(false);
  const progress = 65;

  return (
    <div className="relative">
      <Card className="group overflow-hidden border-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-slate-900/50 shadow-xl shadow-slate-500/5 hover:shadow-2xl hover:shadow-slate-500/10 transition-all duration-500 hover:-translate-y-2">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Daily Challenge</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Complete 10 cards today</p>
              </div>
            </div>
            
            {completed ? (
              <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/50 px-4 py-2 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Complete!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">8h left</span>
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-300">Progress</span>
              <span className="text-slate-600 dark:text-slate-400">6 / 10 cards</span>
            </div>
            <Progress 
              value={progress} 
              className="h-3 bg-slate-100 dark:bg-slate-800"
            />
          </div>

          {/* Reward */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/50 px-3 py-2 rounded-xl">
                <Star className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">+50 XP</span>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Reward</span>
            </div>

            <Link to="/learn">
              <Button 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl group"
                onClick={() => !completed && setCompleted(true)}
              >
                <span className="flex items-center gap-2">
                  Continue
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>
        </CardContent>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-lg" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-slate-200/20 to-gray-200/20 rounded-full blur-lg" />
      </Card>
    </div>
  );
};

export default DailyChallenge;
