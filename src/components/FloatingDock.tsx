
import { useState } from 'react';
import { User, Brain, Trophy, Target, Home, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FloatingDock = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const dockItems = [
    { 
      icon: Home, 
      label: 'Home', 
      path: '/', 
      notification: null
    },
    { 
      icon: Brain, 
      label: 'Learn', 
      path: '/learn', 
      notification: '3'
    },
    { 
      icon: Plus, 
      label: 'Create', 
      path: '/create', 
      notification: null
    },
    { 
      icon: Trophy, 
      label: 'Achievements', 
      path: '/achievements', 
      notification: '2'
    },
    { 
      icon: Target, 
      label: 'Goals', 
      path: '/goals', 
      notification: null
    },
    { 
      icon: User, 
      label: 'Profile', 
      path: '/profile', 
      notification: null
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-2xl shadow-lg p-2"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex items-center space-x-1">
          {dockItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <div key={index} className="relative group">
                {/* Tooltip */}
                <div 
                  className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border shadow-md ${
                    isExpanded ? 'translate-y-0' : 'translate-y-1'
                  }`}
                >
                  {item.label}
                </div>

                {/* Dock Item */}
                <Link to={item.path}>
                  <Button
                    variant={active ? "default" : "ghost"}
                    size="sm"
                    className={`relative w-10 h-10 rounded-xl transition-all ${
                      isExpanded ? 'scale-110' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    
                    {/* Notification Badge */}
                    {item.notification && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 w-4 h-4 p-0 text-xs flex items-center justify-center rounded-full"
                      >
                        {item.notification}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Streak Indicator */}
        <div className="flex items-center justify-center mt-2 pt-2 border-t">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
            <span className="text-muted-foreground font-medium">7 day streak 🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingDock;
