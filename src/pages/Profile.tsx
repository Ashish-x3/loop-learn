
import { useState } from 'react';
import { User, Settings, Trophy, Target, Brain, Calendar, ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import FloatingDock from '@/components/FloatingDock';

const Profile = () => {
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com", 
    joinDate: "2024-01-01",
    avatar: null
  };

  const stats = [
    { label: "Cards Learned", value: "127", icon: Brain, color: "text-purple-600" },
    { label: "Current Streak", value: "7 days", icon: Calendar, color: "text-blue-600" },
    { label: "Achievements", value: "3", icon: Trophy, color: "text-yellow-600" },
    { label: "Goals Completed", value: "1", icon: Target, color: "text-green-600" }
  ];

  const recentActivity = [
    { action: "Completed", item: "JavaScript Promise", time: "2 hours ago" },
    { action: "Achieved", item: "Week Warrior badge", time: "1 day ago" },
    { action: "Started", item: "React Components goal", time: "3 days ago" },
    { action: "Completed", item: "CSS Flexbox", time: "5 days ago" }
  ];

  const learningPreferences = {
    dailyGoal: "20 cards",
    preferredTime: "Evening",
    difficulty: "Intermediate",
    notifications: true
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
                <h1 className="text-2xl font-bold">Profile</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your account and learning preferences
                </p>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pb-32">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground mb-1">{user.email}</p>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6 text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest learning actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-sm">
                      {activity.action} <span className="text-primary">{activity.item}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
              <CardDescription>Customize your learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Daily Goal</span>
                  <Badge variant="outline">{learningPreferences.dailyGoal}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Preferred Time</span>
                  <Badge variant="outline">{learningPreferences.preferredTime}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Difficulty Level</span>
                  <Badge variant="outline">{learningPreferences.difficulty}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Notifications</span>
                  <Badge variant={learningPreferences.notifications ? "default" : "secondary"}>
                    {learningPreferences.notifications ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Update Preferences
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common profile actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/achievements">
                <Button variant="outline" className="w-full">
                  <Trophy className="w-4 h-4 mr-2" />
                  View Achievements
                </Button>
              </Link>
              <Link to="/goals">
                <Button variant="outline" className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Manage Goals
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
              <Button variant="outline" className="w-full">
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <FloatingDock />
    </div>
  );
};

export default Profile;
