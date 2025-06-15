
import { Brain, Code, Palette, Calculator, Globe, BookOpen, Lightbulb, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const TopicCategories = () => {
  const categories = [
    { name: "Programming", icon: Code, count: 128 },
    { name: "Design", icon: Palette, count: 87 },
    { name: "Science", icon: Calculator, count: 156 },
    { name: "Languages", icon: Globe, count: 92 },
    { name: "Literature", icon: BookOpen, count: 73 },
    { name: "Psychology", icon: Brain, count: 64 },
    { name: "Philosophy", icon: Lightbulb, count: 45 },
    { name: "Health", icon: Heart, count: 38 }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-black dark:text-white">
          Explore Topics
        </h2>
        <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
          Discover thousands of flashcards across diverse subjects. Choose your path to mastery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
          
          return (
            <Link key={category.name} to="/learn">
              <Card className="group overflow-hidden border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-blue-500/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-black/70 dark:text-white/70 text-sm">
                      {category.count} flashcards
                    </p>
                  </div>

                  {/* Progress indicator */}
                  <div className="w-full bg-white/20 dark:bg-black/20 rounded-full h-2 backdrop-blur-sm">
                    <div 
                      className="bg-blue-500/80 h-2 rounded-full transition-all duration-1000 group-hover:w-full"
                      style={{ width: `${Math.random() * 60 + 20}%` }}
                    />
                  </div>
                </CardContent>

                {/* Decorative elements */}
                <div className="absolute top-2 right-2 w-12 h-12 bg-blue-500/10 rounded-full blur-lg group-hover:bg-blue-500/20 transition-all" />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopicCategories;
