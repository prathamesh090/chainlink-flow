import { useParams, useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { suppliersData, RawMaterial } from '@/data/suppliersData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Star,
  Mail,
  Phone,
  Globe,
  Users,
  Calendar,
  Award,
  Package,
  Link2,
  Check,
  ArrowUpDown,
} from 'lucide-react';
import { useState } from 'react';

type SortField = 'name' | 'category' | 'leadTime' | 'stockStatus';
type SortDirection = 'asc' | 'desc';

export default function SupplierDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const supplier = suppliersData.find(s => s.id === id);

  if (!supplier) {
    return (
      <SidebarProvider defaultOpen={false}>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 p-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">Supplier Not Found</h2>
              <Button onClick={() => navigate('/dashboard/suppliers/discovery')}>
                Back to Discovery
              </Button>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStockStatusOrder = (status: string) => {
    switch (status) {
      case 'in-stock': return 1;
      case 'low-stock': return 2;
      case 'out-of-stock': return 3;
      default: return 4;
    }
  };

  const sortedMaterials = [...supplier.materials].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      case 'leadTime':
        const aTime = parseInt(a.leadTime.split('-')[0]);
        const bTime = parseInt(b.leadTime.split('-')[0]);
        comparison = aTime - bTime;
        break;
      case 'stockStatus':
        comparison = getStockStatusOrder(a.stockStatus) - getStockStatusOrder(b.stockStatus);
        break;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const getStockBadge = (status: RawMaterial['stockStatus']) => {
    switch (status) {
      case 'in-stock':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100">In Stock</Badge>;
      case 'low-stock':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-100">Low Stock</Badge>;
      case 'out-of-stock':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100">Out of Stock</Badge>;
    }
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ArrowUpDown className={`h-3 w-3 ${sortField === field ? 'text-primary' : 'text-muted-foreground'}`} />
      </div>
    </TableHead>
  );

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 overflow-hidden">
          <div className="p-6 space-y-6 overflow-auto h-screen">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {/* Company Header */}
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Company Info */}
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-10 w-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-2xl font-bold text-foreground">{supplier.companyName}</h1>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-5 w-5 fill-current" />
                          <span className="font-semibold">{supplier.rating}</span>
                        </div>
                        {supplier.isConnected && (
                          <Badge 
                            className={`
                              ${supplier.connectionStatus === 'active' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                : supplier.connectionStatus === 'pending'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-muted text-muted-foreground'
                              }
                            `}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            {supplier.connectionStatus === 'active' ? 'Connected' : 
                             supplier.connectionStatus === 'pending' ? 'Pending' : 'Inactive'}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {supplier.location}
                      </div>
                      <p className="text-muted-foreground max-w-2xl">{supplier.bio}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {supplier.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="bg-secondary/50">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:items-end">
                    {!supplier.isConnected && (
                      <Button className="gap-2">
                        <Link2 className="h-4 w-4" />
                        Connect with Supplier
                      </Button>
                    )}
                    <Button variant="outline" className="gap-2">
                      <Mail className="h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium truncate">{supplier.contactEmail}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{supplier.contactPhone}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Website</p>
                    <p className="text-sm font-medium">{supplier.website}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Employees</p>
                    <p className="text-sm font-medium">{supplier.employees}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Founded</p>
                    <p className="text-sm font-medium">{supplier.founded}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="md:col-span-2 lg:col-span-3">
                <CardContent className="p-4 flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Certifications</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {supplier.certifications.map((cert) => (
                        <Badge key={cert} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Raw Materials Catalog */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Raw Materials Catalog
                  <Badge variant="secondary" className="ml-2">{supplier.materials.length} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <SortableHeader field="name">Material Name</SortableHeader>
                        <SortableHeader field="category">Category</SortableHeader>
                        <TableHead>Technical Specifications</TableHead>
                        <SortableHeader field="leadTime">Lead Time</SortableHeader>
                        <SortableHeader field="stockStatus">Stock Status</SortableHeader>
                        <TableHead>Price</TableHead>
                        <TableHead>Min. Order</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedMaterials.map((material) => (
                        <TableRow key={material.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">{material.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {material.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground max-w-xs">
                            {material.specifications}
                          </TableCell>
                          <TableCell>{material.leadTime}</TableCell>
                          <TableCell>{getStockBadge(material.stockStatus)}</TableCell>
                          <TableCell className="font-medium">{material.price}</TableCell>
                          <TableCell className="text-muted-foreground">{material.minOrder}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
