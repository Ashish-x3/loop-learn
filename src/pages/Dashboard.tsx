
import DailyChallenge from '@/components/DailyChallenge';
import TopicCategories from '@/components/TopicCategories';
import StatsSection from '@/components/StatsSection';
import ThemeToggle from '@/components/ThemeToggle';
import FloatingDock from '@/components/FloatingDock';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      {/* Welcome Header */}
      <div className="container mx-auto px-6 pt-12 pb-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Welcome back! 👋
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Ready to continue your learning journey?
          </p>
        </div>
      </div>

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

export default Dashboard;
