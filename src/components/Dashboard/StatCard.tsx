import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react'; 

export interface StatCardProps {
  title: string;
  value: string;
  percentageChange: number;
  changeDescription: string;
  icon: React.ElementType;
  changeType: 'increase' | 'decrease';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  percentageChange,
  changeDescription,
  icon: IconComponent,
  changeType,
  className,
}) => {
  const isIncrease = changeType === 'increase';
  const changeColor = isIncrease ? 'text-success' : 'text-destructive';
  const ChangeIcon = isIncrease ? TrendingUp : TrendingDown;

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-md">
                <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2 text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Export Data</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <span className={cn('flex items-center font-semibold mr-1', changeColor)}>
            <ChangeIcon className="h-3 w-3 mr-0.5" />
            {percentageChange.toFixed(2)}%
          </span>
          {changeDescription}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;