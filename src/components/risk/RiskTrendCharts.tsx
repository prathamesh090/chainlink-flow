import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';
import type { RiskTrend, RiskSupplier } from '@/services/riskApi';

interface TrendProps {
  trends: RiskTrend[];
  compact?: boolean;
}

export function RiskTrendCharts({ trends, compact }: TrendProps) {
  return (
    <Card>
      <CardHeader className={compact ? 'pb-2' : 'pb-3'}>
        <CardTitle className={compact ? 'text-sm' : 'text-lg flex items-center gap-2'}>
          {!compact && <TrendingUp className="h-5 w-5 text-primary" />}
          Risk Trend Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={compact ? 180 : 280}>
          <LineChart data={trends}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8 }} />
            <Line type="monotone" dataKey="financial" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ r: 3 }} name="Financial" />
            <Line type="monotone" dataKey="inherent" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 3 }} name="Inherent" />
            <Line type="monotone" dataKey="integrated" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} name="Integrated" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Distribution pie chart for the main page
interface DistributionProps {
  suppliers: RiskSupplier[];
}

const COLORS = ['hsl(142, 71%, 45%)', 'hsl(45, 93%, 47%)', 'hsl(0, 84%, 60%)'];

export function RiskDistributionChart({ suppliers }: DistributionProps) {
  const data = [
    { name: 'Low', value: suppliers.filter(s => s.integratedRisk === 'Low').length },
    { name: 'Medium', value: suppliers.filter(s => s.integratedRisk === 'Medium').length },
    { name: 'High', value: suppliers.filter(s => s.integratedRisk === 'High').length },
  ].filter(d => d.value > 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
