
import { useState } from 'react';
import { Target, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const DailyChallenge = () => {
  const [completed, setCompleted] = useState(false);
  const progress = 65;

  return (
    <Card className="border-0 shadow-lg backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg text-black dark:text-white">Daily Challenge</CardTitle>
              <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">Complete 10 cards today</p>
            </div>
          </div>
          
          {completed ? (
            <Badge className="bg-white/20 dark:bg-black/20 text-black dark:text-white border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 text-xs">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Complete!
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1 bg-white/10 dark:bg-black/10 text-black dark:text-white border-white/20 dark:border-white/10 text-xs">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              8h left
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-medium text-black dark:text-white">Progress</span>
            <span className="text-black/70 dark:text-white/70">6 / 10 cards</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Reward and Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 pt-2">
          <Badge className="bg-white/20 dark:bg-black/20 text-black dark:text-white border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 text-xs">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            +50 XP
          </Badge>

          <Link to="/learn" className="w-full sm:w-auto">
            <Button 
              size="sm"
              className="w-full sm:w-auto gap-2 bg-blue-500/80 hover:bg-blue-600/80 text-white border-0 backdrop-blur-sm text-sm h-9"
              onClick={() => !completed && setCompleted(true)}
            >
              Continue
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyChallenge;
