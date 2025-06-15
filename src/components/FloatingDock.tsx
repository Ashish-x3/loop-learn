
import { useState } from 'react';
import { User, Brain, Home, Plus, BookOpen, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const FloatingDock = () => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dockItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: Brain,
      label: 'Learn',
      path: '/learn'
    },
    {
      icon: Plus,
      label: 'Create',
      path: '/create'
    },
    {
      icon: BookOpen,
      label: 'Saved',
      path: '/saved'
    },
    {
      icon: User,
      label: 'Profile',
      path: '/profile'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-2 sm:px-3 w-full max-w-sm sm:max-w-none sm:w-auto">
      <div className="relative backdrop-blur-xl bg-white/90 dark:bg-black/80 border border-white/30 dark:border-white/20 shadow-2xl shadow-black/20 dark:shadow-black/50 rounded-2xl sm:rounded-xl p-3 sm:p-2">
        {/* Enhanced glassmorphic background */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-white/20 dark:from-black/10 dark:to-black/20 rounded-2xl sm:rounded-xl px-[2px]" />
        
        <div className="relative flex items-end justify-center gap-3 sm:gap-2 px-1 sm:px-1">
          {dockItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const isHovered = hoveredIndex === index;

            // Scale factors for hover effect on desktop
            let scale = 1;
            if (hoveredIndex !== null && window.innerWidth >= 768) {
              const distance = Math.abs(index - hoveredIndex);
              if (distance === 0) scale = 1.2;
              else if (distance === 1) scale = 1.1;
            }

            return (
              <div
                key={index}
                className="relative group flex flex-col items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  zIndex: isHovered ? 10 : 1,
                  minWidth: window.innerWidth < 640 ? '44px' : '40px',
                  minHeight: window.innerWidth < 640 ? '56px' : '48px'
                }}
              >
                {/* Tooltip - Hidden on mobile */}
                <div className={cn(
                  "absolute bottom-full mb-2 px-2 py-1 bg-black/90 dark:bg-white/90 text-white dark:text-black text-xs rounded-lg opacity-0 pointer-events-none transition-all duration-300 whitespace-nowrap backdrop-blur-sm shadow-xl hidden md:block",
                  isHovered && "opacity-100 -translate-y-1"
                )}>
                  {item.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-3 border-transparent border-t-black/90 dark:border-t-white/90" />
                </div>

                {/* Dock Item */}
                <Link to={item.path} className="block">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "relative rounded-xl transition-all duration-300 ease-out border-0 hover:bg-transparent touch-manipulation active:scale-90",
                      "w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center"
                    )}
                    style={{
                      transform: `scale(${scale}) translateY(${scale > 1 ? -((scale - 1) * 8) : 0}px)`,
                      transformOrigin: 'bottom center'
                    }}
                  >
                    {/* Icon background */}
                    <div className={cn(
                      "absolute inset-0 rounded-xl transition-all duration-300 backdrop-blur-sm",
                      active
                        ? "bg-primary shadow-lg shadow-primary/30 border border-primary/50"
                        : "bg-white/30 dark:bg-black/30 hover:bg-white/40 dark:hover:bg-black/40 border border-white/30 dark:border-white/20 shadow-md"
                    )} />
                    
                    <Icon className={cn(
                      "relative z-10 transition-colors duration-300",
                      "w-5 h-5 sm:w-4 sm:h-4",
                      active ? "text-primary-foreground" : "text-black dark:text-white"
                    )} />
                    
                    {/* Active indicator */}
                    {active && (
                      <div className="absolute -bottom-0.5 w-1.5 h-1.5 sm:w-1 sm:h-1 bg-primary-foreground rounded-full shadow-lg" />
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
