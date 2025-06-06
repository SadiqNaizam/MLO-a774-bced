import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/lib/AuthContext'; // Path to the new AuthContext

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <AuthProvider> {/* Wrap the entire layout with AuthProvider */}
      <div className={cn(
        "grid h-screen w-screen overflow-hidden", // Ensures layout fills viewport and grid itself doesn't scroll
        "grid-cols-[auto_1fr]", // Sidebar takes its natural width (w-64 from Sidebar.tsx), header/main take rest
        "grid-rows-[auto_1fr]", // Header takes its natural height (h-16 from Header.tsx), main content takes rest
        "bg-background" // Overall background for the app, typically hsl(var(--background))
      )}>
        {/* Sidebar: occupies col 1, row 1 and 2. Defines its own width (w-64) and bg-sidebar. */}
        <Sidebar className="row-span-2 border-r border-border" />
        
        {/* Header: occupies col 2, row 1. Defines its own height (h-16) and bg-card. */}
        <Header className="col-start-2" />
        
        {/* Main Content Area: occupies col 2, row 2. Scrolls internally. */}
        <main className="col-start-2 row-start-2 overflow-y-auto bg-background">
          {/* Content wrapper with padding as per layoutRequirements.mainContent.container */}
          <div className="px-6 py-4">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  );
};

export default MainAppLayout;