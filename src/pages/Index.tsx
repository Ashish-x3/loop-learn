
import HeroSection from '@/components/HeroSection';
import DailyChallenge from '@/components/DailyChallenge';
import TopicCategories from '@/components/TopicCategories';
import StatsSection from '@/components/StatsSection';
import ThemeToggle from '@/components/ThemeToggle';
import FloatingDock from '@/components/FloatingDock';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      <HeroSection />

      <div className="container mx-auto px-4 pb-32 space-y-16">
        <DailyChallenge />
        <TopicCategories />
        <StatsSection />
      </div>

      <FloatingDock />
    </div>
  );
};

export default Index;
