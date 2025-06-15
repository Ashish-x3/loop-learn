
import { useState } from 'react';
import { User, Brain, Trophy, Target, Home, Plus, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FloatingDock = () => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dockItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Brain, label: 'Learn', path: '/learn' },
    { icon: Plus, label: 'Create', path: '/create' },
    { icon: BookOpen, label: 'Saved', path: '/saved' },
    { icon: Trophy, label: 'Achievements', path: '/achievements' },
    { icon: Target, label: 'Goals', path: '/goals' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-700/50 rounded-3xl shadow-2xl shadow-slate-500/10 dark:shadow-black/25 p-3">
        <div className="flex items-center gap-2">
          {dockItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const isHovered = hoveredIndex === index;
            
            return (
              <div 
                key={index} 
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                <div 
                  className={`absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm rounded-xl opacity-0 pointer-events-none transition-all duration-300 whitespace-nowrap ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  {item.label}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-white" />
                </div>

                {/* Dock Item */}
                <Link to={item.path}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`relative w-14 h-14 rounded-2xl transition-all duration-300 ${
                      active 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-xl scale-110' 
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-110'
                    } ${
                      isHovered && !active ? 'scale-125 bg-slate-100 dark:bg-slate-800' : ''
                    }`}
                  >
                    <Icon className={`w-6 h-6 transition-all duration-300 ${
                      active ? 'text-white' : 'text-slate-600 dark:text-slate-300'
                    }`} />
                    
                    {active && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 animate-pulse" />
                    )}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Activity indicator */}
        <div className="flex items-center justify-center mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-medium">7 day streak 🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingDock;
