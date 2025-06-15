
import { Brain, Code, Palette, Calculator, Globe, BookOpen, Lightbulb, Heart, Database, Server, Smartphone, Monitor } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const TopicCategories = () => {
  const categories = [
    { name: "JavaScript", icon: Code, count: 128, slug: "javascript" },
    { name: "React", icon: Lightbulb, count: 87, slug: "react" },
    { name: "Data Structures", icon: Database, count: 156, slug: "data-structures" },
    { name: "Algorithms", icon: Brain, count: 92, slug: "algorithms" },
    { name: "CSS & Design", icon: Palette, count: 73, slug: "css" },
    { name: "Backend Dev", icon: Server, count: 64, slug: "backend" },
    { name: "Mobile Dev", icon: Smartphone, count: 45, slug: "mobile" },
    { name: "Web Dev", icon: Monitor, count: 38, slug: "web-dev" }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
          Start Learning
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
          Choose a topic and start learning with AI-powered flashcards designed for easy understanding.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
          
          return (
            <Link key={category.name} to={`/learn/${category.slug}`}>
              <Card className="group overflow-hidden border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer min-h-[140px] sm:min-h-[160px]">
                <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4 flex flex-col justify-center h-full">
                  <div className="flex justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-black dark:text-white group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-black/70 dark:text-white/70 text-xs sm:text-sm">
                      {category.count} cards
                    </p>
                  </div>

                  {/* Progress indicator */}
                  <div className="w-full bg-white/20 dark:bg-black/20 rounded-full h-1.5 sm:h-2 backdrop-blur-sm">
                    <div 
                      className="bg-primary/80 h-1.5 sm:h-2 rounded-full transition-all duration-1000 group-hover:w-full"
                      style={{ width: `${Math.random() * 60 + 20}%` }}
                    />
                  </div>
                </CardContent>

                {/* Decorative elements */}
                <div className="absolute top-2 right-2 w-8 h-8 sm:w-12 sm:h-12 bg-primary/10 rounded-full blur-lg group-hover:bg-primary/20 transition-all" />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopicCategories;
