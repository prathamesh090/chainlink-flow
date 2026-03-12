import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, AlertTriangle, ShieldAlert, Globe } from 'lucide-react';
import type { RiskSupplier, RiskIncident, GlobalDisruption } from '@/services/riskApi';

interface Props {
  suppliers: RiskSupplier[];
  incidents: RiskIncident[];
  disruptions: GlobalDisruption[];
}

export function RiskSummaryCards({ suppliers, incidents, disruptions }: Props) {
  const highRisk = suppliers.filter(s => s.integratedRisk === 'High').length;
  const activeAlerts = incidents.filter(i => i.severity === 'High' || i.severity === 'Critical').length;

  const cards = [
    { label: 'Suppliers Monitored', value: suppliers.length, icon: Users, gradient: 'from-primary to-secondary' },
    { label: 'Active Risk Alerts', value: activeAlerts, icon: AlertTriangle, gradient: 'from-destructive to-primary' },
    { label: 'High Risk Suppliers', value: highRisk, icon: ShieldAlert, gradient: 'from-secondary to-accent' },
    { label: 'Global Disruptions', value: disruptions.filter(d => d.status === 'Active').length, icon: Globe, gradient: 'from-accent to-primary' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="relative overflow-hidden hover:shadow-elegant transition-shadow group cursor-default">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-[0.06] group-hover:opacity-[0.12] transition-opacity`} />
            <CardContent className="p-5 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-3xl font-bold mt-1">{card.value}</p>
                </div>
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                  <card.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
