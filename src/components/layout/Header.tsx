import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Search, Bell, UserCircle, Settings, LogOut, ChevronDown } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      'flex justify-between items-center px-6 h-16',
      'bg-card border-b border-border',
      'sticky top-0 z-50', // Sticky header
      className
    )}>
      {/* Left side: Page Title or Search (as per existing TopHeader) */}
      {/* Keeping dashboard title from context for now, could be dynamic via props */}
      <div className="text-2xl font-bold text-foreground">Dashboard</div>
      
      {/* Right side: Search, Notifications, User Menu */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-10 pr-4 h-10 w-64 rounded-lg bg-background border-border focus-visible:ring-primary text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full w-9 h-9">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 py-1 h-auto rounded-lg hover:bg-muted">
              <Avatar className="h-8 w-8">
                {/* Using a generic avatar or placeholder if image not available */}
                <AvatarImage src="https://i.pravatar.cc/150?u=lesliealexander" alt="Leslie Alexander" />
                <AvatarFallback><UserCircle className="h-5 w-5" /></AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium text-foreground">Leslie Alexander</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:inline" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
