
import { useState } from 'react';
import { User, ArrowLeft, Edit, Palette, Moon, Sun, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import FloatingDock from '@/components/FloatingDock';
import { useTheme } from '@/contexts/ThemeContext';

const Profile = () => {
  const { isDark, accentColor, setIsDark, setAccentColor } = useTheme();
  
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com", 
    joinDate: "2024-01-01",
    avatar: null
  };

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

  const accentColors = [
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
    { name: 'Purple', value: 'purple', color: 'bg-purple-500' },
    { name: 'Green', value: 'green', color: 'bg-green-500' },
    { name: 'Orange', value: 'orange', color: 'bg-orange-500' },
    { name: 'Pink', value: 'pink', color: 'bg-pink-500' },
    { name: 'Red', value: 'red', color: 'bg-red-500' }
  ];

  const handleSignOut = () => {
    console.log('User signed out');
    // Add sign-out logic here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="h-8 w-8 sm:w-auto sm:h-9">
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Profile</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Manage your account and learning preferences
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="h-8 sm:h-9"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8 pb-32">
        {/* Profile Header */}
        <Card className="mb-4 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
                  <h2 className="text-lg sm:text-2xl font-bold truncate">{user.name}</h2>
                  <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-1 truncate">{user.email}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Customization Section */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
                Customization
              </CardTitle>
              <CardDescription className="text-sm">Personalize your app appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <div>
                    <p className="font-medium text-sm sm:text-base">Dark Mode</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {isDark ? 'Dark theme enabled' : 'Light theme enabled'}
                    </p>
                  </div>
                </div>
                <Switch checked={isDark} onCheckedChange={setIsDark} />
              </div>
              
              <Separator />
              
              {/* Accent Color Selection */}
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm sm:text-base">Accent Color</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Choose your preferred accent color</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {accentColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        console.log('Setting accent color to:', color.value);
                        setAccentColor(color.value as any);
                      }}
                      className={`flex items-center space-x-2 p-2 sm:p-3 rounded-lg border transition-all ${
                        accentColor === color.value 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${color.color}`} />
                      <span className="text-xs sm:text-sm font-medium">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Preferences */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Learning Preferences</CardTitle>
              <CardDescription className="text-sm">Customize your learning experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-medium">Daily Goal</span>
                  <Badge variant="outline" className="text-xs">{learningPreferences.dailyGoal}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-medium">Preferred Time</span>
                  <Badge variant="outline" className="text-xs">{learningPreferences.preferredTime}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-medium">Difficulty Level</span>
                  <Badge variant="outline" className="text-xs">{learningPreferences.difficulty}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-medium">Notifications</span>
                  <Badge variant={learningPreferences.notifications ? "default" : "secondary"} className="text-xs">
                    {learningPreferences.notifications ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3 sm:mt-4 h-8 sm:h-9 text-sm">
                Update Preferences
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-4 sm:mt-8">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
            <CardDescription className="text-sm">Your latest learning actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-1 sm:py-2">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-xs sm:text-sm truncate">
                    {activity.action} <span className="text-primary">{activity.item}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <FloatingDock />
    </div>
  );
};

export default Profile;
