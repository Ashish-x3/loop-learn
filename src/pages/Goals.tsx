
import { useState } from 'react';
import { Target, Plus, Calendar, TrendingUp, CheckCircle, ArrowLeft, Clock, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import FloatingDock from '@/components/FloatingDock';

const Goals = () => {
  const [goals] = useState([
    {
      id: 1,
      title: "Master React Hooks",
      description: "Complete 30 React hook-related flashcards",
      progress: 18,
      target: 30,
      category: "React",
      deadline: "2024-02-15",
      status: "active"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      description: "Learn core JavaScript concepts",
      progress: 45,
      target: 50,
      category: "JavaScript",
      deadline: "2024-02-10",
      status: "active"
    },
    {
      id: 3,
      title: "CSS Grid Mastery",
      description: "Complete CSS Grid layout challenges",
      progress: 12,
      target: 12,
      category: "CSS",
      deadline: "2024-01-30",
      status: "completed"
    }
  ]);

  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');

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
                <h1 className="text-2xl font-bold">Learning Goals</h1>
                <p className="text-sm text-muted-foreground">
                  Set and track your learning objectives
                </p>
              </div>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Goal
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pb-32">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{activeGoals.length}</div>
              <p className="text-sm text-muted-foreground">Active Goals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{completedGoals.length}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">7</div>
              <p className="text-sm text-muted-foreground">Days Avg</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">85%</div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Goals */}
        <div className="space-y-6 mb-8">
          <h2 className="text-xl font-semibold">Active Goals</h2>
          <div className="grid gap-4">
            {activeGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">{goal.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}/{goal.target}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all" 
                        style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        Due {new Date(goal.deadline).toLocaleDateString()}
                      </div>
                      <Button size="sm">Continue</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Completed Goals</h2>
            <div className="grid gap-4">
              {completedGoals.map((goal) => (
                <Card key={goal.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center">
                          {goal.title}
                          <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                        </CardTitle>
                        <CardDescription>{goal.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{goal.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        Completed {new Date(goal.deadline).toLocaleDateString()}
                      </div>
                      <Badge variant="outline" className="text-green-600">Completed</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <FloatingDock />
    </div>
  );
};

export default Goals;
