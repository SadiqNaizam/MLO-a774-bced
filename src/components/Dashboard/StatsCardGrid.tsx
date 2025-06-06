import React from 'react';
import { cn } from '@/lib/utils';
import StatCard, { StatCardProps } from './StatCard';
import { Users, MousePointerClick, FileText, TrendingUp, TrendingDown, LineChart } from 'lucide-react';

interface StatsCardGridProps {
  className?: string;
}

const statCardData: StatCardProps[] = [
  {
    title: 'Total Visitors',
    value: '2,01,620',
    percentageChange: 2.31,
    changeDescription: 'From Last Month',
    icon: Users,
    changeType: 'increase' as const,
  },
  {
    title: 'Total Clicks',
    value: '1,96,325',
    percentageChange: 5.93,
    changeDescription: 'From Last Month',
    icon: MousePointerClick,
    changeType: 'increase' as const,
  },
  {
    title: 'Commission',
    value: '1,20,145',
    percentageChange: 9.05,
    changeDescription: 'From Last Month',
    icon: FileText, // Placeholder, image shows a document icon for commission.
    changeType: 'increase' as const,
  },
  {
    title: 'Bounce Rate',
    value: '1,546',
    percentageChange: 1.03,
    changeDescription: 'From Last Month',
    icon: LineChart, // Image implies a chart line for bounce rate.
    changeType: 'decrease' as const,
  },
];

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6', className)}>
      {statCardData.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          percentageChange={stat.percentageChange}
          changeDescription={stat.changeDescription}
          icon={stat.icon}
          changeType={stat.changeType}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;