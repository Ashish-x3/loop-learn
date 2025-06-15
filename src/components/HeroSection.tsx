
import { useState } from 'react';
import { Brain, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl">
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Loop Learn
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master tech concepts with AI-powered flashcards designed for everyone
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search any tech topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/learn">
            <Button size="lg">
              <Brain className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Create Card
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
