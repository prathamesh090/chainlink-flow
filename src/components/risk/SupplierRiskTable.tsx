import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { RiskSupplier } from '@/services/riskApi';

interface Props {
  suppliers: RiskSupplier[];
  onSelectSupplier: (supplier: RiskSupplier) => void;
}

type SortKey = 'name' | 'country' | 'financialRisk' | 'inherentRisk' | 'integratedRisk' | 'lastUpdated';
const riskOrder = { Low: 0, Medium: 1, High: 2 };

const riskBadge = (level: 'Low' | 'Medium' | 'High') => {
  const styles = {
    Low: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Medium: 'bg-amber-100 text-amber-800 border-amber-200',
    High: 'bg-red-100 text-red-800 border-red-200',
  };
  return <Badge variant="outline" className={styles[level]}>{level}</Badge>;
};

export function SupplierRiskTable({ suppliers, onSelectSupplier }: Props) {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('integratedRisk');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    let list = suppliers;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.country.toLowerCase().includes(q));
    }
    if (riskFilter !== 'all') list = list.filter(s => s.integratedRisk === riskFilter);
    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortKey === 'country') cmp = a.country.localeCompare(b.country);
      else if (sortKey === 'lastUpdated') cmp = a.lastUpdated.localeCompare(b.lastUpdated);
      else cmp = riskOrder[a[sortKey]] - riskOrder[b[sortKey]];
      return sortAsc ? cmp : -cmp;
    });
    return list;
  }, [suppliers, search, riskFilter, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const SortHeader = ({ label, field }: { label: string; field: SortKey }) => (
    <Button variant="ghost" size="sm" className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground" onClick={() => toggleSort(field)}>
      {label} <ArrowUpDown className="ml-1 h-3 w-3" />
    </Button>
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-lg">Supplier Risk Assessment</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search suppliers..." className="pl-9 w-56" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-32"><SelectValue placeholder="Filter" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risks</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><SortHeader label="Supplier" field="name" /></TableHead>
              <TableHead><SortHeader label="Country" field="country" /></TableHead>
              <TableHead><SortHeader label="Financial" field="financialRisk" /></TableHead>
              <TableHead><SortHeader label="Inherent" field="inherentRisk" /></TableHead>
              <TableHead><SortHeader label="Integrated" field="integratedRisk" /></TableHead>
              <TableHead>Recent Incident</TableHead>
              <TableHead><SortHeader label="Updated" field="lastUpdated" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No suppliers match your criteria.</TableCell></TableRow>
            ) : filtered.map(s => (
              <TableRow key={s.id} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => onSelectSupplier(s)}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.country}</TableCell>
                <TableCell>{riskBadge(s.financialRisk)}</TableCell>
                <TableCell>{riskBadge(s.inherentRisk)}</TableCell>
                <TableCell>{riskBadge(s.integratedRisk)}</TableCell>
                <TableCell className="text-sm max-w-[200px] truncate">{s.recentIncident}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{s.lastUpdated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
