import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface PerformanceBarChartProps {
  className?: string;
}

const performanceData = [
  { name: 'Jan', target: 4000000, paid: 2400000, pending: 200000 },
  { name: 'Feb', target: 3000000, paid: 1398000, pending: 120000 },
  { name: 'Mar', target: 2000000, paid: 5800000, pending: 200000 }, // Paid > Target example
  { name: 'Apr', target: 2780000, paid: 3908000, pending: 150000 },
  { name: 'May', target: 1890000, paid: 4800000, pending: 180000 },
  { name: 'Jun', target: 2390000, paid: 3800000, pending: 250000 },
  { name: 'Jul', target: 3490000, paid: 4300000, pending: 210000 },
  { name: 'Aug', target: 4200000, paid: 3200000, pending: 280000 },
  { name: 'Sep', target: 3800000, paid: 2900000, pending: 300000 },
  { name: 'Oct', target: 5000000, paid: 4500000, pending: 220000 },
  { name: 'Nov', target: 6000000, paid: 5700000, pending: 300000 }, // Data from image
  { name: 'Dec', target: 5500000, paid: 4000000, pending: 150000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 shadow-lg rounded-lg border border-border">
        <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, backgroundColor: pld.fill, marginRight: 5, borderRadius: '2px' }} />
            <p className="text-xs text-muted-foreground">
              {pld.name}: <span className="font-medium text-foreground">{`${(pld.value / 1000000).toFixed(1)}M`}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const PerformanceBarChart: React.FC<PerformanceBarChartProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Performance</CardTitle>
            <CardDescription>Monthly target, paid, and pending amounts.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mr-2">
                <span className="flex items-center"><span className="h-2 w-2 rounded-full bg-muted-foreground/50 mr-1.5"></span>Target</span>
                <span className="flex items-center"><span className="h-2 w-2 rounded-full bg-primary mr-1.5"></span>Paid</span>
                <span className="flex items-center"><span className="h-2 w-2 rounded-full bg-destructive/70 mr-1.5"></span>Pending</span>
            </div>
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
          <BarChart data={performanceData} margin={{ top: 5, right: 0, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))"/>
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis 
              tickFormatter={(value) => `${value / 1000000}M`} 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              domain={[0, 'dataMax + 1000000']} // Ensure y-axis accommodates highest value
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))' }}/>
            {/* Legend can be removed if custom legend is used in CardHeader */}
            {/* <Legend wrapperStyle={{fontSize: "12px"}} iconSize={10} /> */}
            <Bar dataKey="target" fill="hsl(var(--muted-foreground) / 0.5)" radius={[4, 4, 0, 0]} barSize={12} />
            <Bar dataKey="paid" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={12} />
            <Bar dataKey="pending" fill="hsl(var(--destructive) / 0.7)" radius={[4, 4, 0, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceBarChart;