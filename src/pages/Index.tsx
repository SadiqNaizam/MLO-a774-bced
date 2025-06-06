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
import { useAuth } from '@/lib/AuthContext'; // Path to the new AuthContext
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, login } = useAuth();

  if (!isAuthenticated) {
    return (
      <MainAppLayout> {/* MainAppLayout provides AuthProvider */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--header-height,4rem)-var(--main-padding,2rem))] p-4 text-center">
           {/* Adjust height calculation if needed, assuming header is ~4rem, main padding ~2rem total vertically */}
          <h1 className="text-3xl font-bold text-foreground mb-4">Welcome to DataAI</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Please log in to access your dashboard and insights.
          </p>
          <Button onClick={login} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <LogIn className="mr-2 h-5 w-5" />
            Log In (Simulated)
          </Button>
          <p className="mt-6 text-sm text-muted-foreground">
            <strong>Note:</strong> This is a simulated login experience.
            <br />
            Full Microsoft (MSAL) authentication requires additional setup and dependencies
            <br />
            that cannot be added automatically in this environment.
          </p>
        </div>
      </MainAppLayout>
    );
  }

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