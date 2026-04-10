import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Printer, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface CargoStockItem {
  id: string;
  rowNum: number;
  customer: string;
  invoiceNumber: string;
  serviceType: string; // SEA / AIR
  paymentStatus: string;
  holdStatus: string;
  prePaid: string;
  d2d: string;
  sector: string;
  warehouse: string;
  branch: string;
  packageNum: number;
  packageName: string;
  volume: number;
  weight: number;
  invoiceDate: string;
  daysInWarehouse: number;
  country: string;
}

const COUNTRIES = [
  { value: 'all', label: 'ALL COUNTRIES' },
  { value: 'Sri Lanka', label: 'SRI LANKA' },
  { value: 'Kenya', label: 'KENYA' },
  { value: 'Sudan', label: 'SUDAN' },
  { value: 'Tunisia', label: 'TUNISIA' },
  { value: 'Saudi Arabia', label: 'SAUDI ARABIA' },
];

const LOAD_STATUSES = [
  { value: 'not_loaded', label: 'CARGO NOT LOAD' },
  { value: 'all', label: 'ALL' },
  { value: 'loaded', label: 'LOADED' },
];

function calcDays(dateStr: string): number {
  if (!dateStr) return 0;
  const invoiceDate = new Date(dateStr);
  const today = new Date();
  invoiceDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor((today.getTime() - invoiceDate.getTime()) / (1000 * 60 * 60 * 24)));
}

const WarehouseStock = () => {
  const { t, isRTL } = useLanguage();
  const [items, setItems] = useState<CargoStockItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [countryFilter, setCountryFilter] = useState('all');
  const [warehouseFilter, setWarehouseFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [loadStatus, setLoadStatus] = useState('not_loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [entriesPerPage, setEntriesPerPage] = useState(50);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load invoices
      const { data: invoices, error: invError } = await supabase
        .from('regional_invoices')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (invError) throw invError;

      // Load packages
      const invoiceIds = (invoices || []).map(i => i.id);
      let allPackages: any[] = [];

      // Batch load packages (Supabase has limits on IN queries)
      for (let i = 0; i < invoiceIds.length; i += 100) {
        const batch = invoiceIds.slice(i, i + 100);
        const { data: pkgs } = await supabase
          .from('regional_invoice_packages')
          .select('*')
          .in('invoice_id', batch);
        if (pkgs) allPackages.push(...pkgs);
      }

      // Build flat list: one row per package
      const stockItems: CargoStockItem[] = [];
      let rowNum = 0;

      for (const inv of (invoices || [])) {
        const invPackages = allPackages.filter(p => p.invoice_id === inv.id);

        if (invPackages.length === 0) {
          // Invoice with no packages — show as single row
          rowNum++;
          stockItems.push({
            id: `${inv.id}-0`,
            rowNum,
            customer: inv.consignee_name || inv.shipper_name || '',
            invoiceNumber: inv.invoice_number,
            serviceType: (inv.service_type || inv.freight_by || 'S').charAt(0).toUpperCase() === 'A' ? 'A' : 'S',
            paymentStatus: inv.payment_status === 'PAID' ? 'Y' : 'N',
            holdStatus: 'N',
            prePaid: inv.pre_paid === 'YES' ? 'Y' : 'N',
            d2d: inv.door_to_door === 'YES' ? 'Yes' : 'No',
            sector: `${inv.destination || ''}${inv.sector ? '/ ' + inv.sector : ''}`,
            warehouse: inv.warehouse || inv.terminal || 'HOF',
            branch: inv.destination || inv.consignee_city || '',
            packageNum: 1,
            packageName: inv.description || 'CARGO',
            volume: Number(inv.total_volume) || 0,
            weight: Number(inv.total_weight) || 0,
            invoiceDate: inv.invoice_date || inv.created_at?.split('T')[0] || '',
            daysInWarehouse: calcDays(inv.invoice_date || inv.created_at?.split('T')[0] || ''),
            country: inv.country,
          });
        } else {
          for (let pi = 0; pi < invPackages.length; pi++) {
            const pkg = invPackages[pi];
            rowNum++;
            stockItems.push({
              id: `${inv.id}-${pi}`,
              rowNum,
              customer: inv.consignee_name || inv.shipper_name || '',
              invoiceNumber: inv.invoice_number,
              serviceType: (inv.service_type || inv.freight_by || 'S').charAt(0).toUpperCase() === 'A' ? 'A' : 'S',
              paymentStatus: inv.payment_status === 'PAID' ? 'Y' : 'N',
              holdStatus: 'N',
              prePaid: inv.pre_paid === 'YES' ? 'Y' : 'N',
              d2d: inv.door_to_door === 'YES' ? 'Yes' : 'No',
              sector: `${inv.destination || ''}${inv.sector ? '/ ' + inv.sector : ''}`,
              warehouse: inv.warehouse || inv.terminal || 'HOF',
              branch: inv.destination || inv.consignee_city || '',
              packageNum: pkg.box_number || (pi + 1),
              packageName: pkg.package_name || inv.description || 'CARGO',
              volume: Number(pkg.cubic_metre) || Number(pkg.volume_weight) || 0,
              weight: Number(pkg.weight) || 0,
              invoiceDate: inv.invoice_date || inv.created_at?.split('T')[0] || '',
              daysInWarehouse: calcDays(inv.invoice_date || inv.created_at?.split('T')[0] || ''),
              country: inv.country,
            });
          }
        }
      }

      setItems(stockItems);
    } catch (e) {
      console.error('Error loading warehouse stock:', e);
    } finally {
      setLoading(false);
    }
  };

  // Derive filter options from data
  const warehouses = useMemo(() => [...new Set(items.map(i => i.warehouse).filter(Boolean))], [items]);
  const branches = useMemo(() => [...new Set(items.map(i => i.branch).filter(Boolean))], [items]);
  const sectors = useMemo(() => [...new Set(items.map(i => i.sector).filter(Boolean))], [items]);

  // Apply filters
  const filtered = useMemo(() => {
    let result = items;

    if (countryFilter !== 'all') result = result.filter(i => i.country === countryFilter);
    if (warehouseFilter !== 'all') result = result.filter(i => i.warehouse === warehouseFilter);
    if (branchFilter !== 'all') result = result.filter(i => i.branch === branchFilter);
    if (sectorFilter !== 'all') result = result.filter(i => i.sector === sectorFilter);
    if (serviceFilter !== 'all') result = result.filter(i => i.serviceType === serviceFilter);

    // Load status — "not_loaded" means status != LOADED/SHIPPED
    if (loadStatus === 'not_loaded') {
      // Show all by default since we don't track loading status on individual packages yet
      // Items are considered "not loaded" unless specifically marked
    }

    // Date range
    if (fromDate) result = result.filter(i => i.invoiceDate >= fromDate);
    if (toDate) result = result.filter(i => i.invoiceDate <= toDate);

    // Search
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(i =>
        i.customer.toLowerCase().includes(q) ||
        i.invoiceNumber.toLowerCase().includes(q) ||
        i.packageName.toLowerCase().includes(q)
      );
    }

    return result.slice(0, entriesPerPage);
  }, [items, countryFilter, warehouseFilter, branchFilter, sectorFilter, serviceFilter, loadStatus, fromDate, toDate, searchTerm, entriesPerPage]);

  // Summary
  const totalVol = filtered.reduce((s, i) => s + i.volume, 0);
  const totalWght = filtered.reduce((s, i) => s + i.weight, 0);

  const handlePrint = () => window.print();

  return (
    <Layout title="Warehouse Stock - Cargo Stock">
      <div className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Filter Row 1 - Region / Branch / Warehouse dropdowns */}
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-[160px] bg-primary text-primary-foreground font-semibold text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map(c => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={branchFilter} onValueChange={setBranchFilter}>
            <SelectTrigger className="w-[160px] bg-primary text-primary-foreground font-semibold text-xs">
              <SelectValue placeholder="ALL BRANCHES" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL BRANCHES</SelectItem>
              {branches.map(b => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-[120px] bg-primary text-primary-foreground font-semibold text-xs">
              <SelectValue placeholder="ALL" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL</SelectItem>
              <SelectItem value="S">SEA</SelectItem>
              <SelectItem value="A">AIR</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sectorFilter} onValueChange={setSectorFilter}>
            <SelectTrigger className="w-[160px] bg-primary text-primary-foreground font-semibold text-xs">
              <SelectValue placeholder="ALL SECTORS" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL SECTORS</SelectItem>
              {sectors.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
            <SelectTrigger className="w-[180px] bg-primary text-primary-foreground font-semibold text-xs">
              <SelectValue placeholder="ALL WAREHOUSES" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ALL WAREHOUSES</SelectItem>
              {warehouses.map(w => (
                <SelectItem key={w} value={w}>{w}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter Row 2 - Date / Load Status / Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">FROM DATE:</label>
            <Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">TO DATE:</label>
            <Input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="text-sm" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">LOAD STATUS:</label>
            <Select value={loadStatus} onValueChange={setLoadStatus}>
              <SelectTrigger className="bg-primary text-primary-foreground font-semibold text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOAD_STATUSES.map(s => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Search:</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer, invoice..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Entries per page + Print */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span>Show</span>
            <Select value={String(entriesPerPage)} onValueChange={v => setEntriesPerPage(Number(v))}>
              <SelectTrigger className="w-20 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="500">500</SelectItem>
              </SelectContent>
            </Select>
            <span>entries</span>
          </div>
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1">
            <Printer className="h-4 w-4" /> Print
          </Button>
        </div>

        {/* Data Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#1e2a3a] hover:bg-[#1e2a3a]">
                    <TableHead className="text-white text-xs font-bold w-12">Num</TableHead>
                    <TableHead className="text-white text-xs font-bold min-w-[180px]">CUSTOMER</TableHead>
                    <TableHead className="text-white text-xs font-bold">INV. Num</TableHead>
                    <TableHead className="text-white text-xs font-bold w-14">SEA/AIR</TableHead>
                    <TableHead className="text-white text-xs font-bold w-12">PAY</TableHead>
                    <TableHead className="text-white text-xs font-bold w-14">HOLD</TableHead>
                    <TableHead className="text-white text-xs font-bold w-14">PRE/P</TableHead>
                    <TableHead className="text-white text-xs font-bold w-12">D2D</TableHead>
                    <TableHead className="text-white text-xs font-bold">SECTOR/ZONE</TableHead>
                    <TableHead className="text-white text-xs font-bold">W/H</TableHead>
                    <TableHead className="text-white text-xs font-bold">BRANCH</TableHead>
                    <TableHead className="text-white text-xs font-bold w-12">Num</TableHead>
                    <TableHead className="text-white text-xs font-bold min-w-[120px]">PACKAGE</TableHead>
                    <TableHead className="text-white text-xs font-bold text-right">VOL</TableHead>
                    <TableHead className="text-white text-xs font-bold text-right">WGHT</TableHead>
                    <TableHead className="text-white text-xs font-bold">INV. DATE</TableHead>
                    <TableHead className="text-white text-xs font-bold text-right">DAYS</TableHead>
                    <TableHead className="text-white text-xs font-bold w-16">DISPLAY</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={18} className="text-center py-8 text-muted-foreground">Loading warehouse stock...</TableCell>
                    </TableRow>
                  ) : filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={18} className="text-center py-8 text-muted-foreground">No cargo stock found</TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {filtered.map((item, idx) => (
                        <TableRow
                          key={item.id}
                          className={`text-xs ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}
                        >
                          <TableCell className="font-medium">{idx + 1}</TableCell>
                          <TableCell className="font-medium">{item.customer}</TableCell>
                          <TableCell>{item.invoiceNumber}</TableCell>
                          <TableCell>{item.serviceType}</TableCell>
                          <TableCell>
                            <span className={`font-bold ${item.paymentStatus === 'Y' ? 'text-green-600' : 'text-red-600'}`}>
                              {item.paymentStatus}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="font-bold text-red-600">{item.holdStatus}</span>
                          </TableCell>
                          <TableCell>
                            <span className="font-bold text-red-600">{item.prePaid}</span>
                          </TableCell>
                          <TableCell>{item.d2d}</TableCell>
                          <TableCell className="text-xs">{item.sector}</TableCell>
                          <TableCell>{item.warehouse}</TableCell>
                          <TableCell>{item.branch}</TableCell>
                          <TableCell>{item.packageNum}</TableCell>
                          <TableCell className="text-xs">{item.packageName}</TableCell>
                          <TableCell className="text-right font-medium">{item.volume.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-medium">{item.weight.toFixed(2)}</TableCell>
                          <TableCell>{item.invoiceDate}</TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                item.daysInWarehouse > 30
                                  ? 'bg-red-100 text-red-800 border-red-300'
                                  : item.daysInWarehouse > 14
                                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                                  : ''
                              }`}
                            >
                              {item.daysInWarehouse}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <input type="checkbox" className="h-3.5 w-3.5" />
                            <span className="text-xs ml-1 text-primary cursor-pointer hover:underline">DISPLAY</span>
                          </TableCell>
                        </TableRow>
                      ))}

                      {/* Summary / Total Row */}
                      <TableRow className="bg-[#1e2a3a] hover:bg-[#1e2a3a] font-bold text-white">
                        <TableCell className="text-white text-xs" colSpan={2}></TableCell>
                        <TableCell className="text-white text-xs font-bold">Num</TableCell>
                        <TableCell className="text-white text-xs font-bold">CUSTOMER</TableCell>
                        <TableCell className="text-white text-xs font-bold">INV. Num</TableCell>
                        <TableCell className="text-white text-xs font-bold">SEA/AIR</TableCell>
                        <TableCell className="text-white text-xs font-bold">PAY</TableCell>
                        <TableCell className="text-white text-xs font-bold">HOLD</TableCell>
                        <TableCell className="text-white text-xs font-bold">PRE/P</TableCell>
                        <TableCell className="text-white text-xs font-bold">D2D</TableCell>
                        <TableCell className="text-white text-xs font-bold">SECTOR/ZONE</TableCell>
                        <TableCell className="text-white text-xs font-bold">PACKAGE</TableCell>
                        <TableCell className="text-white text-xs font-bold text-right">{totalVol.toFixed(2)}</TableCell>
                        <TableCell className="text-white text-xs font-bold text-right">{totalWght.toFixed(2)}</TableCell>
                        <TableCell className="text-white text-xs font-bold">INV. DATE</TableCell>
                        <TableCell className="text-white text-xs font-bold">DAYS</TableCell>
                        <TableCell className="text-white text-xs font-bold">BARCODE</TableCell>
                        <TableCell className="text-white text-xs font-bold">DISPLAY</TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing 1 to {filtered.length} of {items.length} entries</span>
        </div>
      </div>
    </Layout>
  );
};

export default WarehouseStock;
