
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
      color: 'text-blue-600',
      notification: null
    },
    { 
      icon: Brain, 
      label: 'Learn', 
      path: '/learn', 
      color: 'text-purple-600',
      notification: '3'
    },
    { 
      icon: Plus, 
      label: 'Create', 
      path: '/create', 
      color: 'text-green-600',
      notification: null
    },
    { 
      icon: Trophy, 
      label: 'Achievements', 
      path: '/achievements', 
      color: 'text-yellow-600',
      notification: '2'
    },
    { 
      icon: Target, 
      label: 'Goals', 
      path: '/goals', 
      color: 'text-red-600',
      notification: null
    },
    { 
      icon: User, 
      label: 'Profile', 
      path: '/profile', 
      color: 'text-indigo-600',
      notification: null
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      {/* Main Dock */}
      <div 
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-2"
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
                  className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap ${
                    isExpanded ? 'translate-y-0' : 'translate-y-2'
                  }`}
                >
                  {item.label}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
                </div>

                {/* Dock Item */}
                <Link to={item.path} className="block">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`relative w-12 h-12 rounded-xl transition-all duration-300 ${
                      active 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-110' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105'
                    } ${isExpanded ? 'scale-110' : ''}`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-white' : item.color}`} />
                    
                    {/* Notification Badge */}
                    {item.notification && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs flex items-center justify-center rounded-full animate-pulse"
                      >
                        {item.notification}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* Active Indicator */}
                {active && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        {/* Streak Indicator */}
        <div className="flex items-center justify-center mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-gray-600 dark:text-gray-400 font-medium">7 day streak 🔥</span>
          </div>
        </div>
      </div>

      {/* Floating Action Button (optional center button) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className={`transition-all duration-300 ${isExpanded ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default FloatingDock;
