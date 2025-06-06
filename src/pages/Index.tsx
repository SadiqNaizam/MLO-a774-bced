import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import StatsCardGrid from '@/components/Dashboard/StatsCardGrid';
import SalesOverview from '@/components/Dashboard/SalesOverview';
import PerformanceBarChart from '@/components/Dashboard/PerformanceBarChart';
import TrafficSources from '@/components/Dashboard/TrafficSources';
import ClientRespondsGraph from '@/components/Dashboard/ClientRespondsGraph';
import ClientRespondsPieChart from '@/components/Dashboard/ClientRespondsPieChart';
import UserRatingTable from '@/components/Dashboard/UserRatingTable';
import RecentActivityFeed from '@/components/Dashboard/RecentActivityFeed';

const DashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      <div className="space-y-6">
        {/* Section 1: Stats Cards - Full width relative to content area */}
        <StatsCardGrid />

        {/* Section 2: Main Dashboard Grid for charts and key info */}
        {/* Layout: 1 column on small screens, 2 columns on medium screens, custom 2fr/1fr on XL screens */}
        {/* This adheres to 'mainContent.layout: "grid grid-cols-2 xl:grid-cols-[2fr_1fr] gap-6"' by making 'grid-cols-2' apply from md breakpoint upwards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1fr] gap-6">
          {/* Left Column (Wider on XL) */}
          <div className="space-y-6">
            <SalesOverview />
            <TrafficSources />
            <UserRatingTable />
          </div>

          {/* Right Column (Narrower on XL) */}
          <div className="space-y-6">
            <PerformanceBarChart />
            <ClientRespondsGraph />
            <ClientRespondsPieChart />
          </div>
        </div>

        {/* Section 3: Recent Activity Table - Full width relative to content area */}
        <RecentActivityFeed />
      </div>
    </MainAppLayout>
  );
};

export default DashboardPage;
