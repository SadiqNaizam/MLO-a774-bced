import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

interface Activity {
  id: string;
  user: string;
  dateTime: string;
  duration: string;
  commission: number;
  status: 'Successful' | 'Pending' | 'Failed';
}

interface RecentActivityFeedProps {
  className?: string;
}

const activityData: Activity[] = [
  { id: '1', user: 'Esther Howard', dateTime: '22 Aug, 5.32 pm', duration: '00.18.25', commission: 38582, status: 'Successful' as const },
  { id: '2', user: 'Cameron Williamson', dateTime: '22 Aug, 6.12 pm', duration: '00.13.39', commission: 35957, status: 'Pending' as const },
  { id: '3', user: 'Brooklyn Simmons', dateTime: '22 Aug, 6.50 pm', duration: '00.32.21', commission: 30291, status: 'Successful' as const },
  { id: '4', user: 'Wade Warren', dateTime: '22 Aug, 7.15 pm', duration: '00.09.55', commission: 28840, status: 'Failed' as const },
  { id: '5', user: 'Jenny Wilson', dateTime: '22 Aug, 8.03 pm', duration: '00.25.10', commission: 42100, status: 'Successful' as const },
];

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ className }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activityData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(activityData.length / itemsPerPage);

  const getStatusBadge = (status: Activity['status']) => {
    switch (status) {
      case 'Successful':
        return <Badge variant="outline" className="bg-success/10 text-success border-success/30 capitalize font-normal px-2 py-0.5 text-xs">{status}</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-yellow-400/10 text-yellow-500 border-yellow-400/30 capitalize font-normal px-2 py-0.5 text-xs">{status}</Badge>;
      case 'Failed':
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 capitalize font-normal px-2 py-0.5 text-xs">{status}</Badge>;
      default:
        return <Badge variant="secondary" className="capitalize font-normal px-2 py-0.5 text-xs">{status}</Badge>;
    }
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Overview of recent user activities.</CardDescription>
            </div>
             <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9 text-xs">
                    <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                    22 Aug 2023
                </Button>
                <Select defaultValue="4" onValueChange={(value) => setItemsPerPage(Number(value))}>
                    <SelectTrigger className="w-[100px] h-9 text-xs"><SelectValue placeholder="Show" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="4">Show 4</SelectItem>
                        <SelectItem value="10">Show 10</SelectItem>
                        <SelectItem value="20">Show 20</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="px-4 py-3 text-xs text-muted-foreground font-medium whitespace-nowrap">User</TableHead>
                <TableHead className="px-4 py-3 text-xs text-muted-foreground font-medium whitespace-nowrap">Date & Time</TableHead>
                <TableHead className="px-4 py-3 text-xs text-muted-foreground font-medium whitespace-nowrap">Duration</TableHead>
                <TableHead className="px-4 py-3 text-xs text-muted-foreground font-medium whitespace-nowrap">Commission</TableHead>
                <TableHead className="px-4 py-3 text-xs text-muted-foreground font-medium whitespace-nowrap text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((activity) => (
                <TableRow key={activity.id} className="hover:bg-muted/50 border-b last:border-b-0">
                  <TableCell className="px-4 py-3 text-sm text-foreground font-medium whitespace-nowrap">{activity.user}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{activity.dateTime}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{activity.duration}</TableCell>
                  <TableCell className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{activity.commission.toLocaleString()} USD</TableCell>
                  <TableCell className="px-4 py-3 text-right whitespace-nowrap">{getStatusBadge(activity.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 p-4 border-t">
            <span className="text-xs text-muted-foreground">
                Page {currentPage} of {totalPages}
            </span>
            <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
            >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
            >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
      )}
    </Card>
  );
};

export default RecentActivityFeed;