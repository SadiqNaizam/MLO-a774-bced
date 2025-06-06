import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { Button } from '@/components/ui/button';

interface SalesOverviewProps {
  className?: string;
}

const salesData = [
  { name: 'Aug 21', sales: 2800, lastPeriod: 2200 },
  { name: 'Aug 22', sales: 3200, lastPeriod: 2500 },
  { name: 'Aug 23', sales: 2900, lastPeriod: 3000 },
  { name: 'Aug 24', sales: 3500, lastPeriod: 2800 },
  { name: 'Aug 25', sales: 3100, lastPeriod: 3300 },
  { name: 'Aug 26', sales: 4200, lastPeriod: 3500, annotation: { value: 25254, change: 2.5 } }, // For specific annotation point
  { name: 'Aug 27', sales: 3800, lastPeriod: 4000 },
  { name: 'Aug 28', sales: 5100, lastPeriod: 4500 },
  { name: 'Aug 29', sales: 4800, lastPeriod: 5000 },
  { name: 'Aug 30', sales: 4600, lastPeriod: 4800 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = salesData.find(d => d.name === label);
    return (
      <div className="bg-background p-3 shadow-lg rounded-lg border border-border">
        <p className="text-sm font-semibold text-foreground">{`${label}`}</p>
        <p className="text-xs text-primary">{`Sales: $${payload[0].value.toLocaleString()}`}</p>
        {dataPoint?.annotation && (
          <div className="mt-1 pt-1 border-t border-border">
            <p className="text-xs font-bold text-foreground">{`$${dataPoint.annotation.value.toLocaleString()}`}</p>
            <p className="text-xs text-success flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> {`${dataPoint.annotation.change}%`}
            </p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const SalesOverview: React.FC<SalesOverviewProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Track your sales performance over time.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="sprint">
              <SelectTrigger className="w-[100px] h-9 text-xs"><SelectValue placeholder="Period" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sprint">Sprint</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="quarter">Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="aug">
              <SelectTrigger className="w-[90px] h-9 text-xs"><SelectValue placeholder="Month" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="jan">Jan</SelectItem>
                <SelectItem value="feb">Feb</SelectItem>
                {/* ... other months ... */}
                <SelectItem value="aug">Aug</SelectItem>
                <SelectItem value="sep">Sep</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="2023">
              <SelectTrigger className="w-[90px] h-9 text-xs"><SelectValue placeholder="Year" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[350px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" dot={false} activeDot={{ r: 6, strokeWidth: 2, fill: 'hsl(var(--background))', stroke: 'hsl(var(--primary))' }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesOverview;