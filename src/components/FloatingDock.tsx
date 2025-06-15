
import { useState } from 'react';
import { User, Brain, Trophy, Target, Home, Plus, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/20 dark:border-gray-700/20 shadow-2xl shadow-black/10 dark:shadow-black/40 rounded-2xl p-2">
        {/* macOS-style dock background */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl" />
        
        <div className="relative flex items-end gap-1 px-2">
          {dockItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const isHovered = hoveredIndex === index;
            
            // Calculate scale based on distance from hovered item
            let scale = 1;
            if (hoveredIndex !== null) {
              const distance = Math.abs(index - hoveredIndex);
              if (distance === 0) scale = 1.5;
              else if (distance === 1) scale = 1.3;
              else if (distance === 2) scale = 1.1;
            }

            return (
              <div
                key={index}
                className="relative group flex flex-col items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                <div className={cn(
                  "absolute bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-md opacity-0 pointer-events-none transition-all duration-200 whitespace-nowrap",
                  isHovered && "opacity-100 -translate-y-1"
                )}>
                  {item.label}
                </div>

                {/* Dock Item */}
                <Link to={item.path}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "relative rounded-xl transition-all duration-300 ease-out border-0 hover:bg-transparent",
                      "w-12 h-12 flex items-center justify-center",
                      active && "bg-blue-500/10 dark:bg-blue-400/10"
                    )}
                    style={{
                      transform: `scale(${scale}) translateY(${scale > 1 ? -((scale - 1) * 20) : 0}px)`,
                      transformOrigin: 'bottom center'
                    }}
                  >
                    {/* Icon background */}
                    <div className={cn(
                      "absolute inset-0 rounded-xl transition-all duration-300",
                      active ? 
                        "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25" :
                        "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700"
                    )} />
                    
                    <Icon className={cn(
                      "relative z-10 w-6 h-6 transition-colors duration-300",
                      active ? "text-white" : "text-gray-700 dark:text-gray-300"
                    )} />
                    
                    {/* Active indicator dot */}
                    {active && (
                      <div className="absolute -bottom-1 w-1 h-1 bg-gray-700 dark:bg-gray-300 rounded-full" />
                    )}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FloatingDock;
