
import { Brain, Code, Palette, Calculator, Globe, BookOpen, Lightbulb, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const TopicCategories = () => {
  const categories = [
    { 
      name: "Programming", 
      icon: Code, 
      count: 128, 
      color: "from-slate-600 to-slate-700",
      bgColor: "from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50"
    },
    { 
      name: "Design", 
      icon: Palette, 
      count: 87, 
      color: "from-rose-500 to-pink-500",
      bgColor: "from-rose-50 to-pink-50 dark:from-rose-950/50 dark:to-pink-950/50"
    },
    { 
      name: "Science", 
      icon: Calculator, 
      count: 156, 
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50"
    },
    { 
      name: "Languages", 
      icon: Globe, 
      count: 92, 
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50"
    },
    { 
      name: "Literature", 
      icon: BookOpen, 
      count: 73, 
      color: "from-indigo-500 to-violet-500",
      bgColor: "from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50"
    },
    { 
      name: "Psychology", 
      icon: Brain, 
      count: 64, 
      color: "from-amber-500 to-orange-500",
      bgColor: "from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50"
    },
    { 
      name: "Philosophy", 
      icon: Lightbulb, 
      count: 45, 
      color: "from-yellow-500 to-amber-500",
      bgColor: "from-yellow-50 to-amber-50 dark:from-yellow-950/50 dark:to-amber-950/50"
    },
    { 
      name: "Health", 
      icon: Heart, 
      count: 38, 
      color: "from-teal-500 to-emerald-500",
      bgColor: "from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
          Explore Topics
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Discover thousands of flashcards across diverse subjects. Choose your path to mastery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
          
          return (
            <Link key={category.name} to="/learn">
              <Card className={`group overflow-hidden border-0 bg-gradient-to-br ${category.bgColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer`}>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {category.count} flashcards
                    </p>
                  </div>

                  {/* Progress indicator */}
                  <div className="w-full bg-white/50 dark:bg-slate-800/50 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-1000 group-hover:w-full`}
                      style={{ width: `${Math.random() * 60 + 20}%` }}
                    />
                  </div>
                </CardContent>

                {/* Decorative elements */}
                <div className={`absolute top-2 right-2 w-12 h-12 bg-gradient-to-br ${category.color} opacity-10 rounded-full blur-lg group-hover:opacity-20 transition-opacity`} />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopicCategories;
