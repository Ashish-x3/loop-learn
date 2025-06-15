
import { Book } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const TopicCategories = () => {
  const topicCategories = [
    { name: "JavaScript", count: 45, color: "bg-yellow-500", icon: "🟨" },
    { name: "React", count: 32, color: "bg-blue-500", icon: "⚛️" },
    { name: "CSS", count: 28, color: "bg-purple-500", icon: "🎨" },
    { name: "Git", count: 20, color: "bg-orange-500", icon: "📦" },
    { name: "HTML", count: 25, color: "bg-red-500", icon: "📄" },
    { name: "Node.js", count: 18, color: "bg-green-500", icon: "🟢" }
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-3">
        <Book className="w-6 h-6 text-primary" />
        Explore Topics
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {topicCategories.map((category, index) => (
          <Link to="/learn" key={index}>
            <Card className="hover:shadow-md transition-all cursor-pointer group h-full">
              <CardContent className="p-4 text-center space-y-3">
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {category.count} cards
                  </p>
                </div>
                <div className={`w-full h-1 ${category.color} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopicCategories;
