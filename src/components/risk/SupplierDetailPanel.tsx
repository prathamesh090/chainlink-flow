import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building2, MapPin, Factory, Package, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { riskApi, type RiskSupplier, type RiskExplanation, type SupplierTimeline } from '@/services/riskApi';
import { RiskTrendCharts } from './RiskTrendCharts';
import type { RiskTrend } from '@/services/riskApi';

interface Props {
  supplier: RiskSupplier | null;
  open: boolean;
  onClose: () => void;
}

const scoreColor = (score: number) => {
  if (score >= 70) return 'bg-red-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-emerald-500';
};

const scoreLabel = (score: number) => {
  if (score >= 70) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
};

const tlIcon: Record<string, React.ReactNode> = {
  incident: <AlertCircle className="h-4 w-4 text-destructive" />,
  resolution: <CheckCircle className="h-4 w-4 text-emerald-600" />,
  update: <Clock className="h-4 w-4 text-muted-foreground" />,
};

export function SupplierDetailPanel({ supplier, open, onClose }: Props) {
  const [explanation, setExplanation] = useState<RiskExplanation | null>(null);
  const [timeline, setTimeline] = useState<SupplierTimeline[]>([]);
  const [trends, setTrends] = useState<RiskTrend[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supplier) return;
    setLoading(true);
    Promise.all([
      riskApi.getRiskFeed(supplier.id),
      riskApi.getIntegratedRisk(supplier.id),
    ]).then(([feed, risk]) => {
      setExplanation(feed.explanation);
      setTimeline(feed.timeline);
      setTrends(risk.trends);
    }).finally(() => setLoading(false));
  }, [supplier]);

  if (!supplier) return null;

  const scores = [
    { label: 'Financial Risk', score: supplier.financialRiskScore },
    { label: 'Inherent Risk', score: supplier.inherentRiskScore },
    { label: 'Integrated Risk', score: supplier.integratedRiskScore },
  ];

  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl">{supplier.name}</SheetTitle>
        </SheetHeader>

        {/* Header Info */}
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-5">
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{supplier.country}</span>
          <span className="flex items-center gap-1"><Factory className="h-4 w-4" />{supplier.industry}</span>
        </div>

        {/* Connected Materials */}
        <div className="mb-5">
          <p className="text-sm font-medium mb-2 flex items-center gap-1"><Package className="h-4 w-4" />Connected Materials</p>
          <div className="flex flex-wrap gap-1.5">
            {supplier.connectedMaterials.map(m => (
              <Badge key={m} variant="secondary" className="text-xs">{m}</Badge>
            ))}
          </div>
        </div>

        <Separator className="mb-5" />

        {/* Risk Scores */}
        <div className="space-y-4 mb-5">
          <p className="text-sm font-medium">Risk Scores</p>
          {scores.map(s => (
            <div key={s.label}>
              <div className="flex justify-between text-sm mb-1">
                <span>{s.label}</span>
                <span className="font-semibold">{s.score}/100 · <span className={s.score >= 70 ? 'text-red-600' : s.score >= 40 ? 'text-amber-600' : 'text-emerald-600'}>{scoreLabel(s.score)}</span></span>
              </div>
              <Progress value={s.score} className="h-2.5" />
            </div>
          ))}
        </div>

        <Separator className="mb-5" />

        {/* Risk Explanation */}
        {loading ? <Skeleton className="h-24 w-full mb-5" /> : explanation && (
          <Card className="mb-5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Building2 className="h-4 w-4" />Risk Explanation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-medium">{explanation.summary}</p>
              <ul className="space-y-1">
                {explanation.details.map((d, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Incident Timeline */}
        {loading ? <Skeleton className="h-32 w-full mb-5" /> : timeline.length > 0 && (
          <Card className="mb-5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Incident Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 space-y-4">
                <div className="absolute left-[11px] top-1 bottom-1 w-px bg-border" />
                {timeline.map((t, i) => (
                  <div key={i} className="relative flex items-start gap-3">
                    <div className="absolute -left-6 mt-0.5">{tlIcon[t.type]}</div>
                    <div>
                      <p className="text-sm font-medium">{t.event}</p>
                      <p className="text-xs text-muted-foreground">{t.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Risk Trend Chart */}
        {loading ? <Skeleton className="h-48 w-full" /> : trends.length > 0 && (
          <RiskTrendCharts trends={trends} compact />
        )}
      </SheetContent>
    </Sheet>
  );
}
