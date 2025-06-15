
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
      
      {/* Hero Section - Full viewport */}
      <HeroSection />

      {/* Content Sections */}
      <div className="container mx-auto px-6 pb-32 space-y-24">
        {/* Daily Challenge */}
        <section className="max-w-2xl mx-auto">
          <DailyChallenge />
        </section>

        {/* Topic Categories */}
        <section>
          <TopicCategories />
        </section>

        {/* Stats and Progress */}
        <section>
          <StatsSection />
        </section>
      </div>

      <FloatingDock />
    </div>
  );
};

export default Index;
