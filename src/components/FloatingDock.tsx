
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
    <div className="fixed bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-3">
      <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-black/40 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 md:p-3 max-w-[350px] overflow-x-auto">
        {/* Glassmorphic background */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-white/10 dark:from-black/5 dark:to-black/10 rounded-xl sm:rounded-2xl" />
        
        <div className="relative flex items-end justify-center gap-1 sm:gap-2 md:gap-3 px-1">
          {dockItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const isHovered = hoveredIndex === index;
            
            // Reduced scale factors for mobile
            let scale = 1;
            if (hoveredIndex !== null && window.innerWidth >= 768) {
              const distance = Math.abs(index - hoveredIndex);
              if (distance === 0) scale = 1.1;
              else if (distance === 1) scale = 1.05;
            }

            return (
              <div
                key={index}
                className="relative group flex flex-col items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  zIndex: isHovered ? 10 : 1,
                  minWidth: '28px',
                  minHeight: '40px'
                }}
              >
                {/* Tooltip - only show on desktop */}
                <div className={cn(
                  "absolute bottom-full mb-2 px-2 py-1 bg-black/80 dark:bg-white/80 text-white dark:text-black text-xs rounded-lg opacity-0 pointer-events-none transition-all duration-200 whitespace-nowrap backdrop-blur-sm shadow-lg hidden md:block",
                  isHovered && "opacity-100 -translate-y-1"
                )}>
                  {item.label}
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-2 border-transparent border-t-black/80 dark:border-t-white/80" />
                </div>

                {/* Dock Item */}
                <Link to={item.path} className="block">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "relative rounded-lg sm:rounded-xl transition-all duration-300 ease-out border-0 hover:bg-transparent touch-manipulation active:scale-95",
                      "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center"
                    )}
                    style={{
                      transform: `scale(${scale}) translateY(${scale > 1 ? -((scale - 1) * 6) : 0}px)`,
                      transformOrigin: 'bottom center'
                    }}
                  >
                    {/* Icon background */}
                    <div className={cn(
                      "absolute inset-0 rounded-lg sm:rounded-xl transition-all duration-300 backdrop-blur-sm",
                      active ? 
                        "bg-blue-500/80 shadow-lg shadow-blue-500/25" :
                        "bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 border border-white/20 dark:border-white/10"
                    )} />
                    
                    <Icon className={cn(
                      "relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 transition-colors duration-300",
                      active ? "text-white" : "text-black dark:text-white"
                    )} />
                    
                    {/* Active indicator dot */}
                    {active && (
                      <div className="absolute -bottom-0.5 w-1 h-1 bg-white rounded-full" />
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
