import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { RiskSummaryCards } from '@/components/risk/RiskSummaryCards';
import { SupplierRiskTable } from '@/components/risk/SupplierRiskTable';
import { IncidentFeed } from '@/components/risk/IncidentFeed';
import { GlobalRiskPanel } from '@/components/risk/GlobalRiskPanel';
import { SupplierDetailPanel } from '@/components/risk/SupplierDetailPanel';
import { RiskTrendCharts, RiskDistributionChart } from '@/components/risk/RiskTrendCharts';
import { riskApi, mockSuppliers, mockTrends, type RiskSupplier, type RiskIncident, type GlobalDisruption } from '@/services/riskApi';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export default function SupplierRisk() {
  const [suppliers] = useState<RiskSupplier[]>(mockSuppliers);
  const [incidents, setIncidents] = useState<RiskIncident[]>([]);
  const [disruptions, setDisruptions] = useState<GlobalDisruption[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<RiskSupplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchLiveData = useCallback(async () => {
    setLoading(true);
    const [inc, dis] = await Promise.all([riskApi.getRecentEvents(), riskApi.getGlobalRisk()]);
    setIncidents(inc);
    setDisruptions(dis);
    setLastRefresh(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 30000);
    return () => clearInterval(interval);
  }, [fetchLiveData]);

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <div className="p-6 space-y-6 overflow-auto h-screen">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <ShieldAlert className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Supplier Risk Monitoring</h1>
                  <p className="text-sm text-muted-foreground">AI-powered real-time risk intelligence</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Updated {lastRefresh.toLocaleTimeString()}</span>
                <Badge variant="outline" className="ml-1">Live</Badge>
              </div>
            </motion.div>

            {/* Summary Cards */}
            <RiskSummaryCards suppliers={suppliers} incidents={incidents} disruptions={disruptions} />

            {/* Table + Side Panels */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <SupplierRiskTable suppliers={suppliers} onSelectSupplier={setSelectedSupplier} />
              </div>
              <div className="space-y-6">
                <IncidentFeed incidents={incidents} loading={loading} />
              </div>
            </div>

            {/* Charts + Global Disruptions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RiskTrendCharts trends={mockTrends} />
              </div>
              <RiskDistributionChart suppliers={suppliers} />
            </div>

            {/* Global Disruptions */}
            <GlobalRiskPanel disruptions={disruptions} loading={loading} />

            {/* Supplier Detail Drawer */}
            <SupplierDetailPanel supplier={selectedSupplier} open={!!selectedSupplier} onClose={() => setSelectedSupplier(null)} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
