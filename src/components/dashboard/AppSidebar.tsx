import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Truck,
  BarChart3,
  FileText,
  Users,
  Settings,
  AlertTriangle,
  Search,
  Link2
} from 'lucide-react';
import { useState } from 'react';

const mainItems = [
  { title: "Dashboard Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Demand Forecasting", url: "/dashboard/forecasting", icon: TrendingUp },
  { title: "Inventory Management", url: "/dashboard/inventory", icon: Package },
  { title: "Supply Chain", url: "/dashboard/supply-chain", icon: Truck },
  { title: "Risk Assessment", url: "/dashboard/risk-assessment", icon: AlertTriangle },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Reports", url: "/dashboard/reports", icon: FileText },
  { title: "Customers", url: "/dashboard/customers", icon: Users },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

const supplierSubItems = [
  { title: "Find New Suppliers", url: "/dashboard/suppliers/discovery", icon: Search },
  { title: "My Network", url: "/dashboard/suppliers/network", icon: Link2 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [suppliersOpen, setSuppliersOpen] = useState(
    location.pathname.includes('/suppliers')
  );
  
  const isActive = (path: string) => location.pathname === path;
  const isCollapsed = state === "collapsed";
  const isSuppliersActive = location.pathname.includes('/suppliers');

  return (
    <Sidebar 
      className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 ease-in-out border-r border-border/40 bg-card`} 
      collapsible="icon"
    >
      <div className="p-3 border-b border-border/40 flex items-center justify-center">
        <SidebarTrigger className="h-10 w-10 transition-all duration-200 hover:scale-110 hover:bg-primary/10 rounded-lg" />
      </div>
      <SidebarContent className="pt-4 px-2">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-3 mb-3">
              Main Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {mainItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <Link to={item.url} className="block">
                      <div
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-lg
                          transition-all duration-200 group relative overflow-hidden
                          ${active 
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md'
                          }
                          ${isCollapsed ? 'justify-center px-2' : ''}
                        `}
                      >
                        {active && !isCollapsed && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent animate-pulse opacity-50" />
                        )}
                        
                        <item.icon
                          className={`
                            h-5 w-5 flex-shrink-0 relative z-10 transition-all duration-200
                            ${active ? 'scale-110' : 'group-hover:scale-105'}
                          `} 
                        />
                        {!isCollapsed && (
                          <span className="font-medium text-sm whitespace-nowrap relative z-10 transition-opacity duration-200">
                            {item.title}
                          </span>
                        )}
                      </div>
                    </Link>
                  </SidebarMenuItem>
                );
              })}

              {/* Suppliers Section with Sub-menu */}
              <SidebarMenuItem>
                <Collapsible open={suppliersOpen} onOpenChange={setSuppliersOpen}>
                  <CollapsibleTrigger asChild>
                    <div
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer
                        transition-all duration-200 group relative overflow-hidden
                        ${isSuppliersActive && !suppliersOpen
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                          : 'text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md'
                        }
                        ${isCollapsed ? 'justify-center px-2' : ''}
                      `}
                    >
                      <Users
                        className={`
                          h-5 w-5 flex-shrink-0 relative z-10 transition-all duration-200
                          ${isSuppliersActive ? 'scale-110' : 'group-hover:scale-105'}
                        `} 
                      />
                      {!isCollapsed && (
                        <>
                          <span className="font-medium text-sm whitespace-nowrap relative z-10 flex-1">
                            Suppliers
                          </span>
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform duration-200 ${suppliersOpen ? 'rotate-180' : ''}`}
                          />
                        </>
                      )}
                    </div>
                  </CollapsibleTrigger>
                  
                  {!isCollapsed && (
                    <CollapsibleContent className="mt-1 ml-4 space-y-1">
                      {supplierSubItems.map((subItem) => {
                        const active = isActive(subItem.url);
                        return (
                          <Link key={subItem.title} to={subItem.url} className="block">
                            <div
                              className={`
                                flex items-center gap-3 px-3 py-2 rounded-lg
                                transition-all duration-200 group
                                ${active 
                                  ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                }
                              `}
                            >
                              <subItem.icon className="h-4 w-4 flex-shrink-0" />
                              <span className="font-medium text-sm whitespace-nowrap">
                                {subItem.title}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
