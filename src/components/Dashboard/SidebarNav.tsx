import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  BarChartHorizontalBig,
  Activity,
  Database,
  Settings,
  HelpCircle,
  ChevronRight,
  BarChartBig, // For DataAI logo
  ShieldCheck, // For Pro features box
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Overview', icon: LayoutDashboard, href: '#', isActive: true },
  {
    label: 'Reports',
    icon: BarChartHorizontalBig,
    href: '#reports',
    subItems: [
      { label: 'Sales Reports', icon: ChevronRight, href: '#reports/sales' },
      { label: 'User Reports', icon: ChevronRight, href: '#reports/users' },
    ],
  },
  {
    label: 'Analytics',
    icon: Activity,
    href: '#analytics',
    subItems: [
      { label: 'Traffic Analysis', icon: ChevronRight, href: '#analytics/traffic' },
      { label: 'Conversion Rates', icon: ChevronRight, href: '#analytics/conversion' },
    ],
  },
  { label: 'Data Sources', icon: Database, href: '#' },
  { label: 'Setting', icon: Settings, href: '#' },
  { label: 'Help', icon: HelpCircle, href: '#' },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [activePath, setActivePath] = React.useState<string>('#');

  const renderNavItem = (item: NavItem, isSubItem: boolean = false) => (
    <Button
      key={item.href}
      variant={item.href === activePath ? 'secondary' : 'ghost'}
      className={cn(
        'w-full justify-start text-sm font-medium',
        isSubItem ? 'pl-10' : 'pl-3',
        item.href === activePath
          ? 'bg-sidebar-foreground/10 text-sidebar-foreground'
          : 'text-sidebar-foreground/80 hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground'
      )}
      onClick={() => setActivePath(item.href)}
    >
      <item.icon className={cn('mr-3 h-5 w-5', isSubItem && 'h-4 w-4')} />
      {item.label}
    </Button>
  );

  return (
    <aside className={cn('w-64 bg-sidebar text-sidebar-foreground flex flex-col justify-between h-full', className)}>
      <div>
        <div className="flex items-center gap-2 p-6 border-b border-sidebar-foreground/10">
          <BarChartBig className="h-8 w-8 text-sidebar-foreground" />
          <h1 className="text-2xl font-bold text-sidebar-foreground">DataAI</h1>
        </div>
        <nav className="flex flex-col space-y-1 p-4">
          {navItems.map((item) => {
            if (item.subItems && item.subItems.length > 0) {
              return (
                <Accordion type="single" collapsible key={item.label} className="w-full">
                  <AccordionItem value={item.label} className="border-b-0">
                    <AccordionTrigger
                      className={cn(
                        'w-full justify-start text-sm font-medium py-2 px-3 rounded-md',
                        'text-sidebar-foreground/80 hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground hover:no-underline',
                        item.subItems.some(sub => sub.href === activePath) && 'bg-sidebar-foreground/10 text-sidebar-foreground'
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.label}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0 pt-1 space-y-1">
                      {item.subItems.map(subItem => renderNavItem(subItem, true))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            }
            return renderNavItem(item);
          })}
        </nav>
      </div>
      <div className="p-4 mt-auto">
        <div className="bg-sidebar-foreground/10 p-4 rounded-lg text-center">
          <ShieldCheck className="h-10 w-10 text-sidebar-foreground mx-auto mb-2" />
          <h3 className="text-md font-semibold text-sidebar-foreground">Data AI Pro</h3>
          <p className="text-xs text-sidebar-foreground/70 mb-3">Get access to all features on Data AI</p>
          <Button size="sm" className="w-full bg-sidebar-foreground text-primary hover:bg-sidebar-foreground/90">
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;