
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const DailyChallenge = () => {
  const dailyCard = {
    id: 1,
    topic: "JavaScript Promise",
    category: "JavaScript",
    difficulty: "Intermediate"
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-primary" />
          Today's Challenge
        </h2>
        <Badge>Daily</Badge>
      </div>

      <Link to="/learn">
        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">{dailyCard.category}</Badge>
              <Badge variant="outline">{dailyCard.difficulty}</Badge>
            </div>
            <CardTitle className="text-2xl group-hover:text-primary transition-colors">
              {dailyCard.topic}
            </CardTitle>
            <CardDescription className="text-base">
              Learn how JavaScript Promises work with pizza delivery analogies! 🍕
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm">
              Start Challenge
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </Link>
    </section>
  );
};

export default DailyChallenge;
