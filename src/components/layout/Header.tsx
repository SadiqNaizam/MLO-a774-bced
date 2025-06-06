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
import { Search, Bell, UserCircle, Settings, LogOut, ChevronDown, LogIn } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext'; // Path to the new AuthContext

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { isAuthenticated, user, login, logout } = useAuth();

  const handleLogin = () => {
    // In a real MSAL app: instance.loginRedirect(loginRequestScopes).catch(e => console.error(e));
    // or instance.loginPopup(loginRequestScopes).catch(e => console.error(e));
    login(); // Calls mock login
  };

  const handleLogout = () => {
    // In a real MSAL app: instance.logoutRedirect({ postLogoutRedirectUri: "/" });
    // or instance.logoutPopup({ postLogoutRedirectUri: "/" });
    logout(); // Calls mock logout
  };

  const getUserInitials = () => {
    if (user?.name) {
      const nameParts = user.name.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
      }
      return nameParts[0].substring(0, 2).toUpperCase();
    }
    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className={cn(
      'flex justify-between items-center px-6 h-16',
      'bg-card border-b border-border',
      'sticky top-0 z-50', // Sticky header
      className
    )}>
      {/* Left side: Page Title or Search (as per existing TopHeader) */}
      {/* Keeping dashboard title from context for now, could be dynamic via props */}
      <div className="text-2xl font-bold text-foreground">DataAI</div>
      
      {/* Right side: Search, Notifications, User Menu / Login Button */}
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

        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 py-1 h-auto rounded-lg hover:bg-muted">
                <Avatar className="h-8 w-8">
                  {/* In a real MSAL app, user.name or claims could provide avatar info or initials */}
                  {/* Using a generic placeholder for avatar image, or initials from mock user */}
                  <AvatarImage src={user.idTokenClaims?.picture || `https://i.pravatar.cc/150?u=${user.username}`} alt={user.name || user.username} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium text-foreground">{user.name || user.username}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:inline" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{user.name || "My Account"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled> {/* Placeholder items */}
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled> {/* Placeholder items */}
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={handleLogin} variant="outline">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;