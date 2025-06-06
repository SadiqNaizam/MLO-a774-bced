import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCircle } from 'lucide-react';

interface UserRating {
  rank: number;
  avatarUrl?: string;
  avatarFallback: string;
  name: string;
  commission: number;
}

interface UserRatingTableProps {
  className?: string;
}

const userRatingsData: UserRating[] = [
  { rank: 1, avatarUrl: 'https://i.pravatar.cc/150?u=estherhoward', avatarFallback: 'EH', name: 'Esther Howard', commission: 25000 },
  { rank: 2, avatarUrl: 'https://i.pravatar.cc/150?u=lesliealexander2', avatarFallback: 'LA', name: 'Leslie Alexander', commission: 18000 },
  { rank: 3, avatarUrl: 'https://i.pravatar.cc/150?u=jennywilson', avatarFallback: 'JW', name: 'Jenny Wilson', commission: 14000 },
  { rank: 4, avatarUrl: 'https://i.pravatar.cc/150?u=ronaldrichards', avatarFallback: 'RR', name: 'Ronald Richards', commission: 10000 },
  { rank: 5, avatarUrl: 'https://i.pravatar.cc/150?u=jacobjones', avatarFallback: 'JJ', name: 'Jacob Jones', commission: 8500 },
];

const UserRatingTable: React.FC<UserRatingTableProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>User Rating</CardTitle>
                <CardDescription>Top users by commission.</CardDescription>
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
      <CardContent className="p-0">
        <Table>
          {/* No TableHeader as per image, direct data rows */}
          <TableBody>
            {userRatingsData.map((user) => (
              <TableRow key={user.rank} className="hover:bg-muted/50">
                <TableCell className="w-10 px-4 py-3">
                  <div className={cn(
                      "h-7 w-7 flex items-center justify-center rounded-sm text-xs font-medium",
                      user.rank === 1 ? "bg-primary text-primary-foreground" : 
                      user.rank === 2 ? "bg-primary/80 text-primary-foreground" :
                      user.rank === 3 ? "bg-primary/60 text-primary-foreground" :
                      "bg-muted text-muted-foreground"
                  )}>
                    {user.rank}
                  </div>
                </TableCell>
                <TableCell className="px-2 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback className="text-xs bg-muted"><UserCircle className="h-5 w-5 text-muted-foreground"/></AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground truncate">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right px-4 py-3 text-sm font-semibold text-foreground">
                  ${user.commission.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserRatingTable;