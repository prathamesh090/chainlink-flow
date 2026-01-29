import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Star, Link2, Check } from 'lucide-react';

export interface Supplier {
  id: string;
  companyName: string;
  logo?: string;
  bio: string;
  location: string;
  rating: number;
  specialties: string[];
  isConnected: boolean;
  connectionStatus?: 'pending' | 'active' | 'inactive';
  contactEmail: string;
  contactPhone: string;
  materialsCount: number;
}

interface SupplierCardProps {
  supplier: Supplier;
  onConnect?: (id: string) => void;
  onClick?: (id: string) => void;
  showConnectButton?: boolean;
}

export function SupplierCard({ supplier, onConnect, onClick, showConnectButton = true }: SupplierCardProps) {
  const handleConnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConnect?.(supplier.id);
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-border/50 hover:border-primary/30 bg-card"
      onClick={() => onClick?.(supplier.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              {supplier.logo ? (
                <img src={supplier.logo} alt={supplier.companyName} className="h-8 w-8 object-contain" />
              ) : (
                <Building2 className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {supplier.companyName}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {supplier.location}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{supplier.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {supplier.bio}
        </p>
        
        <div className="flex flex-wrap gap-1.5">
          {supplier.specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} variant="secondary" className="text-xs bg-secondary/50">
              {specialty}
            </Badge>
          ))}
          {supplier.specialties.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{supplier.specialties.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            {supplier.materialsCount} materials available
          </span>
          
          {showConnectButton && (
            supplier.isConnected ? (
              <Badge 
                variant="secondary" 
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
            ) : (
              <Button size="sm" variant="outline" onClick={handleConnect} className="gap-1.5">
                <Link2 className="h-3.5 w-3.5" />
                Connect
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
