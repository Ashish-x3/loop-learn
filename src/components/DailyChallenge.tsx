
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
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Daily Challenge</CardTitle>
              <p className="text-sm text-muted-foreground">Complete 10 cards today</p>
            </div>
          </div>
          
          {completed ? (
            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
              <CheckCircle className="w-4 h-4 mr-1" />
              Complete!
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1">
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
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">6 / 10 cards</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Reward and Action */}
        <div className="flex items-center justify-between pt-2">
          <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            <Star className="w-4 h-4 mr-1" />
            +50 XP
          </Badge>

          <Link to="/learn">
            <Button 
              size="sm"
              className="gap-2"
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
