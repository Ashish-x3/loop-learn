
import DailyChallenge from '@/components/DailyChallenge';
import TopicCategories from '@/components/TopicCategories';
import StatsSection from '@/components/StatsSection';
import FloatingDock from '@/components/FloatingDock';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Welcome Header */}
      <div className="container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
            Welcome back! 👋
          </h1>
          <p className="text-base sm:text-lg text-black/70 dark:text-white/70 px-2">
            Ready to continue your learning journey?
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 pb-24 sm:pb-32 space-y-16 sm:space-y-24">
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
