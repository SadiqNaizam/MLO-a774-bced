import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface TrafficSource {
  name: string;
  value: number;
  color: string; // Tailwind color class e.g. 'bg-primary'
}

interface TrafficSourcesProps {
  className?: string;
}

const trafficSourcesData: TrafficSource[] = [
  { name: 'Google', value: 89528, color: 'bg-primary' },
  { name: 'Social Media', value: 57658, color: 'bg-purple-400' }, // Slightly different purple for variety
  { name: 'Direct Message', value: 22717, color: 'bg-green-500' }, // From image, looks like a green bar
  { name: 'Referral', value: 15300, color: 'bg-sky-500' },
];

const totalTraffic = trafficSourcesData.reduce((sum, source) => sum + source.value, 0);

const TrafficSources: React.FC<TrafficSourcesProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Breakdown of your website traffic.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Select defaultValue="aug">
                <SelectTrigger className="w-[90px] h-9 text-xs"><SelectValue placeholder="Month" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="aug">Aug</SelectItem>
                    <SelectItem value="jul">Jul</SelectItem>
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
      <CardContent className="space-y-5 pt-4">
        {trafficSourcesData.map((source) => {
          const percentage = (source.value / totalTraffic) * 100;
          return (
            <div key={source.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-foreground">{source.name}</span>
                <span className="text-sm text-muted-foreground">{source.value.toLocaleString()}</span>
              </div>
              <Progress value={percentage} className="h-2 [&>*]:bg-primary" indicatorClassName={source.color} />
              {/* The image has x-axis labels 10k, 20k etc. This simple progress doesn't show that directly. */}
              {/* We could add a subtle scale underneath if needed, but Progress component isn't designed for that. */}
            </div>
          );
        })}
        {/* The image shows an X-axis like 10k, 20k, etc. This is harder to represent with simple Progress bars */}
        {/* For simplicity, we'll omit the shared X-axis, as each bar represents its own max relative to total */}
        <div className="flex justify-between text-xs text-muted-foreground border-t pt-2 mt-4">
            <span>0k</span>
            <span>20k</span>
            <span>40k</span>
            <span>60k</span>
            <span>80k</span>
            <span>100k+</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficSources;