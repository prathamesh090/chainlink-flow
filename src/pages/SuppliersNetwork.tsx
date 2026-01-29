import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { SupplierCard } from '@/components/dashboard/SupplierCard';
import { suppliersData } from '@/data/suppliersData';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Users, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function SuppliersNetwork() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'inactive'>('all');

  const connectedSuppliers = suppliersData.filter(s => s.isConnected);

  const handleSupplierClick = (id: string) => {
    navigate(`/dashboard/suppliers/${id}`);
  };

  const filteredSuppliers = connectedSuppliers
    .filter(supplier => {
      const matchesSearch = 
        supplier.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || supplier.connectionStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });

  const stats = {
    total: connectedSuppliers.length,
    active: connectedSuppliers.filter(s => s.connectionStatus === 'active').length,
    pending: connectedSuppliers.filter(s => s.connectionStatus === 'pending').length,
    inactive: connectedSuppliers.filter(s => s.connectionStatus === 'inactive').length,
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 overflow-hidden">
          <div className="p-6 space-y-6 overflow-auto h-screen">
            {/* Header */}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-foreground">My Network</h1>
              <p className="text-muted-foreground">
                Manage your connected suppliers and partnerships
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${statusFilter === 'all' ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Connected</p>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${statusFilter === 'active' ? 'ring-2 ring-green-500' : ''}`}
                onClick={() => setStatusFilter('active')}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</p>
                    <p className="text-sm text-muted-foreground">Active</p>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${statusFilter === 'pending' ? 'ring-2 ring-yellow-500' : ''}`}
                onClick={() => setStatusFilter('pending')}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${statusFilter === 'inactive' ? 'ring-2 ring-muted-foreground' : ''}`}
                onClick={() => setStatusFilter('inactive')}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-muted-foreground">{stats.inactive}</p>
                    <p className="text-sm text-muted-foreground">Inactive</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your connected suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Active Filter Indicator */}
            {statusFilter !== 'all' && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filtering by:</span>
                <Badge 
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setStatusFilter('all')}
                >
                  {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <span className="ml-1">×</span>
                </Badge>
              </div>
            )}

            {/* Results Count */}
            <p className="text-sm text-muted-foreground">
              Showing {filteredSuppliers.length} connected supplier{filteredSuppliers.length !== 1 ? 's' : ''}
            </p>

            {/* Suppliers Grid */}
            {filteredSuppliers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredSuppliers.map((supplier) => (
                  <SupplierCard
                    key={supplier.id}
                    supplier={supplier}
                    onClick={handleSupplierClick}
                    showConnectButton={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  {connectedSuppliers.length === 0 
                    ? "You haven't connected with any suppliers yet"
                    : "No suppliers match your filter criteria"
                  }
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
