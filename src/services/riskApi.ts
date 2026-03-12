const API_BASE = '/api';

export interface RiskSupplier {
  id: string;
  name: string;
  country: string;
  industry: string;
  financialRisk: 'Low' | 'Medium' | 'High';
  inherentRisk: 'Low' | 'Medium' | 'High';
  integratedRisk: 'Low' | 'Medium' | 'High';
  financialRiskScore: number;
  inherentRiskScore: number;
  integratedRiskScore: number;
  recentIncident: string;
  lastUpdated: string;
  connectedMaterials: string[];
}

export interface RiskIncident {
  id: string;
  supplier: string;
  country: string;
  type: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  timestamp: string;
  description: string;
}

export interface GlobalDisruption {
  id: string;
  title: string;
  severity: 'Medium' | 'High' | 'Critical';
  region: string;
  description: string;
  affectedSuppliers: number;
  status: 'Active' | 'Monitoring' | 'Resolved';
}

export interface RiskExplanation {
  summary: string;
  details: string[];
}

export interface SupplierTimeline {
  date: string;
  event: string;
  type: 'incident' | 'update' | 'resolution';
}

export interface RiskTrend {
  month: string;
  financial: number;
  inherent: number;
  integrated: number;
}

async function fetchWithFallback<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${url}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    return fallback;
  }
}

export const riskApi = {
  getRecentEvents: () =>
    fetchWithFallback<RiskIncident[]>('/risk-events/recent', mockIncidents),

  getGlobalRisk: () =>
    fetchWithFallback<GlobalDisruption[]>('/global-risk', mockDisruptions),

  getRiskFeed: (supplierId: string) =>
    fetchWithFallback<{ explanation: RiskExplanation; timeline: SupplierTimeline[] }>(
      `/risk-feed/${supplierId}`,
      { explanation: mockExplanations[supplierId] || mockExplanations.default, timeline: mockTimelines[supplierId] || mockTimelines.default }
    ),

  getIntegratedRisk: (supplierId: string) =>
    fetchWithFallback<{ trends: RiskTrend[] }>(
      `/integrated-risk/${supplierId}`,
      { trends: mockTrends }
    ),
};

// ── Mock Data ──

export const mockSuppliers: RiskSupplier[] = [
  { id: 'basf', name: 'BASF SE', country: 'Germany', industry: 'Chemicals', financialRisk: 'Medium', inherentRisk: 'High', integratedRisk: 'High', financialRiskScore: 55, inherentRiskScore: 82, integratedRiskScore: 76, recentIncident: 'Factory Fire – Ludwigshafen', lastUpdated: '2026-03-12', connectedMaterials: ['Polyethylene', 'Isocyanates', 'Nylon 6'] },
  { id: 'dow', name: 'Dow Inc.', country: 'USA', industry: 'Chemicals', financialRisk: 'Low', inherentRisk: 'Medium', integratedRisk: 'Medium', financialRiskScore: 28, inherentRiskScore: 54, integratedRiskScore: 48, recentIncident: 'Chemical Spill – Midland', lastUpdated: '2026-03-11', connectedMaterials: ['Silicones', 'Polyurethane', 'Epoxy Resins'] },
  { id: 'mitsubishi', name: 'Mitsubishi Chemical', country: 'Japan', industry: 'Materials', financialRisk: 'Low', inherentRisk: 'Medium', integratedRisk: 'Low', financialRiskScore: 22, inherentRiskScore: 45, integratedRiskScore: 35, recentIncident: 'Labor Strike – Yokohama', lastUpdated: '2026-03-10', connectedMaterials: ['Carbon Fiber', 'Acrylic Resins', 'MMA'] },
  { id: 'tata-steel', name: 'Tata Steel', country: 'India', industry: 'Steel', financialRisk: 'Medium', inherentRisk: 'Medium', integratedRisk: 'Medium', financialRiskScore: 48, inherentRiskScore: 52, integratedRiskScore: 50, recentIncident: 'Logistics Delay – Mumbai Port', lastUpdated: '2026-03-09', connectedMaterials: ['Hot Rolled Steel', 'Cold Rolled Steel', 'Galvanized Steel'] },
  { id: 'sabic', name: 'SABIC', country: 'Saudi Arabia', industry: 'Petrochemicals', financialRisk: 'Low', inherentRisk: 'High', integratedRisk: 'Medium', financialRiskScore: 30, inherentRiskScore: 78, integratedRiskScore: 58, recentIncident: 'Geopolitical Tensions – Red Sea', lastUpdated: '2026-03-12', connectedMaterials: ['Polypropylene', 'Polyethylene', 'EG'] },
  { id: 'arcelor', name: 'ArcelorMittal', country: 'Luxembourg', industry: 'Steel', financialRisk: 'Medium', inherentRisk: 'Low', integratedRisk: 'Low', financialRiskScore: 42, inherentRiskScore: 30, integratedRiskScore: 32, recentIncident: 'None', lastUpdated: '2026-03-08', connectedMaterials: ['Flat Steel', 'Long Steel', 'Tubular Products'] },
  { id: 'lg-chem', name: 'LG Chem', country: 'South Korea', industry: 'Chemicals', financialRisk: 'Low', inherentRisk: 'Low', integratedRisk: 'Low', financialRiskScore: 20, inherentRiskScore: 25, integratedRiskScore: 22, recentIncident: 'None', lastUpdated: '2026-03-11', connectedMaterials: ['ABS', 'PVC', 'Battery Materials'] },
  { id: 'covestro', name: 'Covestro AG', country: 'Germany', industry: 'Polymers', financialRisk: 'High', inherentRisk: 'Medium', integratedRisk: 'High', financialRiskScore: 74, inherentRiskScore: 58, integratedRiskScore: 70, recentIncident: 'Supply Shortage – MDI', lastUpdated: '2026-03-12', connectedMaterials: ['Polycarbonate', 'MDI', 'TDI'] },
];

export const mockIncidents: RiskIncident[] = [
  { id: '1', supplier: 'BASF SE', country: 'Germany', type: 'Factory Fire', severity: 'Critical', timestamp: '2026-03-12T08:30:00Z', description: 'Major fire at Ludwigshafen complex, production halted on 3 lines.' },
  { id: '2', supplier: 'Dow Inc.', country: 'USA', type: 'Chemical Spill', severity: 'High', timestamp: '2026-03-11T14:15:00Z', description: 'Chemical spill at Midland facility, EPA investigation initiated.' },
  { id: '3', supplier: 'Mitsubishi Chemical', country: 'Japan', type: 'Labor Strike', severity: 'Medium', timestamp: '2026-03-10T06:00:00Z', description: 'Workers strike at Yokohama plant affecting carbon fiber output.' },
  { id: '4', supplier: 'Covestro AG', country: 'Germany', type: 'Supply Shortage', severity: 'High', timestamp: '2026-03-09T11:45:00Z', description: 'MDI supply shortage due to maintenance outage at key reactor.' },
  { id: '5', supplier: 'Tata Steel', country: 'India', type: 'Logistics Delay', severity: 'Medium', timestamp: '2026-03-08T09:20:00Z', description: 'Port congestion at Mumbai delaying steel shipments by 5-7 days.' },
];

export const mockDisruptions: GlobalDisruption[] = [
  { id: '1', title: 'Red Sea Shipping Disruption', severity: 'Critical', region: 'Middle East / Suez Canal', description: 'Houthi attacks forcing vessels to reroute via Cape of Good Hope, adding 10-14 days transit.', affectedSuppliers: 8, status: 'Active' },
  { id: '2', title: 'Russia Sanctions Impact', severity: 'High', region: 'Eastern Europe', description: 'Ongoing sanctions limiting access to Russian raw materials including palladium and titanium.', affectedSuppliers: 4, status: 'Active' },
  { id: '3', title: 'Port Strike – Los Angeles', severity: 'Medium', region: 'US West Coast', description: 'Dockworkers union threatening strike action, potential 2-week port closure.', affectedSuppliers: 6, status: 'Monitoring' },
];

const mockExplanations: Record<string, RiskExplanation> = {
  basf: { summary: 'High integrated risk due to recent factory fire.', details: ['High inherent risk due to factory fire reported at Ludwigshafen complex.', 'Financial risk moderate – strong balance sheet but insurance claims pending.', 'Integrated risk classified as High due to production impact on 3 product lines.'] },
  covestro: { summary: 'High integrated risk driven by financial instability.', details: ['Financial risk elevated due to declining margins and debt concerns.', 'MDI supply shortage compounding operational risk.', 'Integrated risk classified as High – recommend diversifying polymer sourcing.'] },
  default: { summary: 'Risk profile within acceptable parameters.', details: ['Financial risk remains stable.', 'No significant inherent risk factors identified.', 'Integrated risk within normal range.'] },
};

const mockTimelines: Record<string, SupplierTimeline[]> = {
  basf: [
    { date: '2026-03-12', event: 'Factory fire at Ludwigshafen', type: 'incident' },
    { date: '2026-02-28', event: 'Q4 earnings below forecast', type: 'update' },
    { date: '2026-02-15', event: 'New safety protocols implemented', type: 'resolution' },
    { date: '2026-01-22', event: 'Logistics delay – Rhine flooding', type: 'incident' },
    { date: '2026-01-10', event: 'Labor dispute resolved', type: 'resolution' },
  ],
  default: [
    { date: '2026-03-01', event: 'Quarterly review completed', type: 'update' },
    { date: '2026-02-15', event: 'Compliance audit passed', type: 'resolution' },
    { date: '2026-01-20', event: 'Minor logistics delay', type: 'incident' },
  ],
};

export const mockTrends: RiskTrend[] = [
  { month: 'Oct', financial: 35, inherent: 42, integrated: 40 },
  { month: 'Nov', financial: 38, inherent: 48, integrated: 44 },
  { month: 'Dec', financial: 40, inherent: 55, integrated: 50 },
  { month: 'Jan', financial: 42, inherent: 60, integrated: 55 },
  { month: 'Feb', financial: 48, inherent: 70, integrated: 62 },
  { month: 'Mar', financial: 55, inherent: 82, integrated: 76 },
];
