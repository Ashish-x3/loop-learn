
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
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="border-b border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/10 dark:bg-black/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/20 p-2 sm:px-3">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-white">Learning Goals</h1>
                <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1">
                  Set and track your learning objectives
                </p>
              </div>
            </div>
            <Button className="w-full sm:w-auto bg-blue-500/80 hover:bg-blue-600/80 text-white border-0 backdrop-blur-sm">
              <Plus className="w-4 h-4 mr-2" />
              New Goal
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 sm:pb-32">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
            <CardContent className="p-4 sm:p-6 text-center">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-black dark:text-white">{activeGoals.length}</div>
              <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">Active Goals</p>
            </CardContent>
          </Card>
          <Card className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
            <CardContent className="p-4 sm:p-6 text-center">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-black dark:text-white">{completedGoals.length}</div>
              <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">Completed</p>
            </CardContent>
          </Card>
          <Card className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
            <CardContent className="p-4 sm:p-6 text-center">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-black dark:text-white">7</div>
              <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">Days Avg</p>
            </CardContent>
          </Card>
          <Card className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
            <CardContent className="p-4 sm:p-6 text-center">
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-black dark:text-white">85%</div>
              <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Goals */}
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">Active Goals</h2>
          <div className="grid gap-3 sm:gap-4">
            {activeGoals.map((goal) => (
              <Card key={goal.id} className="border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <div className="space-y-1">
                      <CardTitle className="text-base sm:text-lg text-black dark:text-white">{goal.title}</CardTitle>
                      <CardDescription className="text-sm text-black/70 dark:text-white/70">{goal.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="w-fit bg-white/20 dark:bg-black/20 text-black dark:text-white border-white/20 dark:border-white/10">
                      {goal.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black dark:text-white">Progress</span>
                      <span className="text-black/70 dark:text-white/70">{goal.progress}/{goal.target}</span>
                    </div>
                    <div className="w-full bg-white/20 dark:bg-black/20 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all" 
                        style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div className="flex items-center text-sm text-black/70 dark:text-white/70">
                        <Calendar className="w-4 h-4 mr-1" />
                        Due {new Date(goal.deadline).toLocaleDateString()}
                      </div>
                      <Button size="sm" className="w-full sm:w-auto bg-blue-500/80 hover:bg-blue-600/80 text-white border-0 backdrop-blur-sm">
                        Continue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">Completed Goals</h2>
            <div className="grid gap-3 sm:gap-4">
              {completedGoals.map((goal) => (
                <Card key={goal.id} className="opacity-75 border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div className="space-y-1">
                        <CardTitle className="text-base sm:text-lg flex items-center text-black dark:text-white">
                          {goal.title}
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 ml-2" />
                        </CardTitle>
                        <CardDescription className="text-sm text-black/70 dark:text-white/70">{goal.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="w-fit bg-white/20 dark:bg-black/20 text-black dark:text-white border-white/20 dark:border-white/10">
                        {goal.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div className="flex items-center text-sm text-black/70 dark:text-white/70">
                        <Calendar className="w-4 h-4 mr-1" />
                        Completed {new Date(goal.deadline).toLocaleDateString()}
                      </div>
                      <Badge variant="outline" className="w-fit text-blue-500 border-blue-500/20 bg-blue-500/10">
                        Completed
                      </Badge>
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
