import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Truck,
  BarChart3,
  FileText,
  Users,
  Settings,
  CheckCircle,
  Plus,
  AlertTriangle,
  Clock,
  Activity
} from 'lucide-react';

const sidebarItems = [
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

const statsData = [
  { title: "Suppliers Connected", value: "24", icon: Users, change: "+2 this week" },
  { title: "Raw Materials Tracked", value: "156", icon: Package, change: "+12 this month" },
  { title: "Forecast Accuracy", value: "94.2%", icon: TrendingUp, change: "+1.2% improvement" },
  { title: "Active Risk Alerts", value: "3", icon: AlertTriangle, change: "2 resolved today" },
  { title: "Avg Supplier Response", value: "2.3h", icon: Clock, change: "-15min improvement" },
  { title: "Orders Last Month", value: "89", icon: Activity, change: "+15% vs last month" },
];

const monthlyOrdersData = [
  { month: 'Jul', orders: 65 },
  { month: 'Aug', orders: 72 },
  { month: 'Sep', orders: 68 },
  { month: 'Oct', orders: 81 },
  { month: 'Nov', orders: 89 },
  { month: 'Dec', orders: 94 },
];

const demandTrendData = [
  { month: 'Jul', demand: 78 },
  { month: 'Aug', demand: 82 },
  { month: 'Sep', demand: 75 },
  { month: 'Oct', demand: 88 },
  { month: 'Nov', demand: 92 },
  { month: 'Dec', demand: 96 },
];

const recentActivities = [
  { id: 1, action: "Supplier added", description: "Steel Corp India was successfully onboarded", time: "2 hours ago", type: "success" },
  { id: 2, action: "Forecast updated", description: "Q1 2024 demand forecast completed with 95.3% confidence", time: "4 hours ago", type: "info" },
  { id: 3, action: "Risk alert triggered", description: "Delivery delay risk detected for Order #ORD-2024-001", time: "6 hours ago", type: "warning" },
  { id: 4, action: "Inventory updated", description: "Raw material stock levels synchronized", time: "8 hours ago", type: "info" },
  { id: 5, action: "Supplier performance", description: "Monthly supplier scorecards generated", time: "1 day ago", type: "success" },
];

function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={`${isCollapsed ? "w-14" : "w-60"} transition-all duration-300 ease-in-out`} collapsible="icon">
      <div className="p-2">
        <SidebarTrigger className="h-10 w-10 transition-transform duration-200 hover:scale-110" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center gap-2 transition-all duration-200">
                      <item.icon className="h-4 w-4 transition-transform duration-200" />
                      {!isCollapsed && (
                        <span className="animate-fade-in whitespace-nowrap overflow-hidden">
                          {item.title}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function MainDashboard() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 overflow-hidden">
          <div className="p-6 space-y-6 overflow-auto h-screen">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">ChainLink Manufacturing Co.</h2>
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {statsData.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                      </div>
                      <stat.icon className="h-8 w-8 text-secondary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Orders (Last 6 Months)
                  </CardTitle>
                  <CardDescription>
                    Track your order volume trends over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyOrdersData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="orders" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Demand Trend
                  </CardTitle>
                  <CardDescription>
                    Forecasted vs actual demand patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={demandTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="demand" stroke="hsl(var(--secondary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Frequently used operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Supplier
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Run Forecast
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Risk Check
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity Feed */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates across your supply chain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'success' ? 'bg-green-500' : 
                          activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}