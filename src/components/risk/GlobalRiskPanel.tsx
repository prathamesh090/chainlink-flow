import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Globe, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import type { GlobalDisruption } from '@/services/riskApi';

interface Props {
  disruptions: GlobalDisruption[];
  loading?: boolean;
}

const severityColor: Record<string, string> = {
  Critical: 'bg-red-100 text-red-800 border-red-200',
  High: 'bg-orange-100 text-orange-800 border-orange-200',
  Medium: 'bg-amber-100 text-amber-800 border-amber-200',
};

const statusColor: Record<string, string> = {
  Active: 'bg-red-500',
  Monitoring: 'bg-amber-500',
  Resolved: 'bg-emerald-500',
};

export function GlobalRiskPanel({ disruptions, loading }: Props) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="h-5 w-5 text-secondary" />
          Global Disruptions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
        ) : disruptions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No active disruptions.</p>
        ) : (
          disruptions.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-lg border p-3 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${statusColor[d.status]} animate-pulse`} />
                  <p className="font-medium text-sm">{d.title}</p>
                </div>
                <Badge variant="outline" className={severityColor[d.severity]}>{d.severity}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{d.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{d.region}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{d.affectedSuppliers} suppliers</span>
              </div>
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
