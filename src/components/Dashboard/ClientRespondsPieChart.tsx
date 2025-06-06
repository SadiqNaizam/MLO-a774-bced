import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

interface ClientRespondsPieChartProps {
  className?: string;
}

const genderData = [
  { name: 'Male', value: 58.08, color: 'hsl(var(--primary))' },
  { name: 'Female', value: 35.07, color: 'hsl(var(--primary) / 0.7)' }, // Lighter primary
  { name: 'Others', value: 6.05, color: 'hsl(var(--primary) / 0.4)' }, // Even lighter primary
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 shadow-lg rounded-lg border border-border">
        <p className="text-sm font-semibold text-foreground">{`${payload[0].name}: ${payload[0].value.toFixed(2)}%`}</p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex flex-col space-y-1.5 ml-4">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center text-xs">
          <span style={{ backgroundColor: entry.color, width: '10px', height: '10px', borderRadius: '50%', marginRight: '6px', display: 'inline-block' }}></span>
          <span className="text-muted-foreground mr-1.5">{entry.payload.name}:</span>
          <span className="font-medium text-foreground">{`${entry.payload.value.toFixed(2)}%`}</span>
        </li>
      ))}
    </ul>
  );
};

const ClientRespondsPieChart: React.FC<ClientRespondsPieChartProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Client Responds</CardTitle>
            <CardDescription>Gender distribution of clients.</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="h-8 text-xs">View Details</Button>
      </CardHeader>
      <CardContent className="h-[250px] flex items-center justify-center p-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={genderData}
              cx="35%" // Adjust center X to make space for legend
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              // label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              //   const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
              //   const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
              //   return (
              //     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10}>
              //       {`${(percent * 100).toFixed(0)}%`}
              //     </text>
              //   );
              // }}
            >
              {genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
              ))}
            </Pie>
            <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right" 
                content={renderLegend} 
                wrapperStyle={{ right: 10 }} // Adjust legend position
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ClientRespondsPieChart;