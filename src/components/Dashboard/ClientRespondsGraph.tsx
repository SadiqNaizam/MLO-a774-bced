import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ClientRespondsGraphProps {
  className?: string;
}

const clientRespondsData = [
  { time: '7am', responds: 50 }, { time: '8am', responds: 40 }, { time: '9am', responds: 85 }, 
  { time: '10am', responds: 70 }, { time: '11am', responds: 110 }, { time: '12pm', responds: 95 }, 
  { time: '1pm', responds: 150 }, { time: '2pm', responds: 130 }, { time: '3pm', responds: 100 },
  { time: '4pm', responds: 120 }, { time: '5pm', responds: 90 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 shadow-lg rounded-lg border border-border">
        <p className="text-xs text-muted-foreground">{`${label}`}</p>
        <p className="text-sm font-semibold text-primary">{`Responds: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ClientRespondsGraph: React.FC<ClientRespondsGraphProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Client Responds</CardTitle>
          <CardDescription className="flex items-center">
            <span className="text-green-500 text-xs mr-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-0.5"/> +5.2% 
            </span> 
            vs last 24h
          </CardDescription>
          <div className="mt-1">
            <p className="text-xs text-muted-foreground">Today</p>
            <p className="text-2xl font-bold text-foreground">16,468</p>
          </div>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2 text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
                <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="h-[250px] pt-0 -ml-4 -mr-2 -mb-2"> {/* Negative margins to extend chart to card edges if needed */} 
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={clientRespondsData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorClientResponds" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            {/* <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} /> */}
            <XAxis 
                dataKey="time" 
                tickLine={false} 
                axisLine={false} 
                dy={10}
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            />
            {/* YAxis can be hidden for a cleaner look as per image */}
            {/* <YAxis hide={true} domain={[0, 'dataMax + 20']}/> */}
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}/>
            <Area 
                type="monotone" 
                dataKey="responds" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorClientResponds)" 
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, fill: 'hsl(var(--background))', stroke: 'hsl(var(--primary))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ClientRespondsGraph;