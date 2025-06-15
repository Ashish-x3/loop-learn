
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
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-black dark:text-white">Daily Challenge</CardTitle>
              <p className="text-sm text-black/70 dark:text-white/70">Complete 10 cards today</p>
            </div>
          </div>
          
          {completed ? (
            <Badge className="bg-white/20 dark:bg-black/20 text-black dark:text-white border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30">
              <CheckCircle className="w-4 h-4 mr-1" />
              Complete!
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1 bg-white/10 dark:bg-black/10 text-black dark:text-white border-white/20 dark:border-white/10">
              <Clock className="w-4 h-4" />
              8h left
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-black dark:text-white">Progress</span>
            <span className="text-black/70 dark:text-white/70">6 / 10 cards</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Reward and Action */}
        <div className="flex items-center justify-between pt-2">
          <Badge className="bg-white/20 dark:bg-black/20 text-black dark:text-white border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30">
            <Star className="w-4 h-4 mr-1" />
            +50 XP
          </Badge>

          <Link to="/learn">
            <Button 
              size="sm"
              className="gap-2 bg-blue-500/80 hover:bg-blue-600/80 text-white border-0 backdrop-blur-sm"
              onClick={() => !completed && setCompleted(true)}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyChallenge;
