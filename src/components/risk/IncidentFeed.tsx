import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { RiskIncident } from '@/services/riskApi';

interface Props {
  incidents: RiskIncident[];
  loading?: boolean;
}

const severityStyle: Record<string, string> = {
  Critical: 'bg-red-100 text-red-800 border-red-200',
  High: 'bg-orange-100 text-orange-800 border-orange-200',
  Medium: 'bg-amber-100 text-amber-800 border-amber-200',
  Low: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return 'Just now';
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function IncidentFeed({ incidents, loading }: Props) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Recent Incidents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
        ) : incidents.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No recent incidents.</p>
        ) : (
          <AnimatePresence>
            {incidents.map((inc, i) => (
              <motion.div
                key={inc.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-3 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-sm">{inc.type}</p>
                  <Badge variant="outline" className={severityStyle[inc.severity]}>{inc.severity}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{inc.supplier} – {inc.country}</p>
                <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {timeAgo(inc.timestamp)}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  );
}
