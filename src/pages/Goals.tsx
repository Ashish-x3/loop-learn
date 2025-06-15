
import { useState } from 'react';
import { Target, Plus, Calendar, Clock, CheckCircle, Circle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import FloatingDock from '@/components/FloatingDock';

const Goals = () => {
  const [goals] = useState([
    {
      id: 1,
      title: "Master JavaScript Fundamentals",
      description: "Complete 100 JavaScript flashcards",
      progress: 67,
      target: 100,
      deadline: "2024-02-15",
      category: "JavaScript",
      completed: false
    },
    {
      id: 2,
      title: "30-Day Learning Streak",
      description: "Study consistently for 30 days",
      progress: 7,
      target: 30,
      deadline: "2024-02-01",
      category: "Habit",
      completed: false
    },
    {
      id: 3,
      title: "React Components Mastery",
      description: "Learn 50 React concepts",
      progress: 50,
      target: 50,
      deadline: "2024-01-30",
      category: "React",
      completed: true
    },
    {
      id: 4,
      title: "CSS Grid & Flexbox",
      description: "Master modern CSS layouts",
      progress: 23,
      target: 40,
      deadline: "2024-02-20",
      category: "CSS",
      completed: false
    }
  ];

  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
        {/* Quick Stats */}
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
              <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {activeGoals.filter(goal => getDaysRemaining(goal.deadline) <= 7).length}
              </div>
              <p className="text-sm text-muted-foreground">Due This Week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {Math.round(goals.reduce((sum, goal) => sum + (goal.progress / goal.target * 100), 0) / goals.length)}%
              </div>
              <p className="text-sm text-muted-foreground">Avg Progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold flex items-center">
              <Circle className="w-5 h-5 mr-2 text-blue-600" />
              Active Goals
            </h2>
            <div className="grid gap-4">
              {activeGoals.map((goal) => {
                const progressPercentage = Math.round((goal.progress / goal.target) * 100);
                const daysRemaining = getDaysRemaining(goal.deadline);
                
                return (
                  <Card key={goal.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{goal.title}</CardTitle>
                          <CardDescription>{goal.description}</CardDescription>
                        </div>
                        <Badge variant="secondary">{goal.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress: {goal.progress}/{goal.target}</span>
                          <span className="font-medium">{progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                      
                      {/* Deadline */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </div>
                        <Badge variant={daysRemaining <= 7 ? "destructive" : "outline"}>
                          {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Completed Goals
            </h2>
            <div className="grid gap-4">
              {completedGoals.map((goal) => (
                <Card key={goal.id} className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                          {goal.title}
                        </CardTitle>
                        <CardDescription>{goal.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{goal.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Completed: {goal.progress}/{goal.target}
                      </div>
                      <Badge className="bg-green-600">100% Complete</Badge>
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
