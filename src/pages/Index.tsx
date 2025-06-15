
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Target, Users, ArrowRight, Star, BookOpen, Clock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: "AI-Generated Content",
      description: "Smart flashcards created by advanced AI to optimize your learning experience"
    },
    {
      icon: Zap,
      title: "Instant Learning",
      description: "Get flashcards on any topic instantly. Just type what you want to learn!"
    },
    {
      icon: Target,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and achievement badges"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Learn from flashcards created by other users and share your own knowledge"
    }
  ];

  const stats = [
    { icon: BookOpen, label: "Active Learners", value: "10K+" },
    { icon: Clock, label: "Study Hours", value: "50K+" },
    { icon: Trophy, label: "Achievements", value: "25K+" },
    { icon: Star, label: "Success Rate", value: "94%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">FlashCards</span>
            </div>
            <div className="flex items-center space-x-3">
              {user ? (
                <Link to="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 px-4 py-2">
              🚀 AI-Powered Learning Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Master Any Subject with
              <br />
              Smart Flashcards
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your learning experience with AI-generated flashcards. Study smarter, 
              retain more, and achieve your goals faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-background/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose FlashCards?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with proven learning techniques 
              to deliver the most effective study experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students and professionals who are already learning smarter with FlashCards.
            </p>
            {user ? (
              <Link to="/dashboard">
                <Button size="lg">
                  Continue Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg">
                  Start Learning Today
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">FlashCards</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 FlashCards. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
