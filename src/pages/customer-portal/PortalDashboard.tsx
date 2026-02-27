import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Package, Clock, LogOut, User, Lock, AlertTriangle, CheckCircle2, Truck, Ship, FileCheck, Box, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { usePortalAuth } from './hooks/usePortalAuth';
import { useTranslation, Language } from './i18n/translations';
import PortalHeader from './components/PortalHeader';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface CargoItem {
  id: string;
  invoice_number: string;
  customer_name: string;
  cargo_description: string | null;
  origin: string;
  destination: string;
  collection_date: string | null;
  loaded_date: string | null;
  in_transit_date: string | null;
  arrival_date: string | null;
  clearance_date: string | null;
  processing_date: string | null;
  delivery_date: string | null;
  current_status: string;
  notes: string | null;
}

const statusConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
  collected: { icon: Box, color: 'text-amber-700', bgColor: 'bg-amber-50 border-amber-200' },
  loaded: { icon: Package, color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200' },
  in_transit: { icon: Ship, color: 'text-indigo-700', bgColor: 'bg-indigo-50 border-indigo-200' },
  arrived: { icon: Truck, color: 'text-purple-700', bgColor: 'bg-purple-50 border-purple-200' },
  clearance: { icon: FileCheck, color: 'text-orange-700', bgColor: 'bg-orange-50 border-orange-200' },
  processing: { icon: Clock, color: 'text-cyan-700', bgColor: 'bg-cyan-50 border-cyan-200' },
  delivered: { icon: CheckCircle2, color: 'text-green-700', bgColor: 'bg-green-50 border-green-200' },
};

const PortalDashboard: React.FC = () => {
  const [shipments, setShipments] = useState<CargoItem[]>([]);
  const [filteredShipments, setFilteredShipments] = useState<CargoItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [shipmentsLoading, setShipmentsLoading] = useState(true);
  const [lang, setLang] = useState<Language>('en');
  const [newPassword, setNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const t = useTranslation(lang);
  
  const { user, customerAccount, loading, isActive, signOut, changePassword } = usePortalAuth();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/customer-portal');
      return;
    }
    if (user) fetchShipments();
  }, [user, loading]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredShipments(shipments);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredShipments(shipments.filter(s =>
        s.invoice_number.toLowerCase().includes(term) ||
        s.customer_name.toLowerCase().includes(term)
      ));
    }
  }, [searchTerm, shipments]);

  const fetchShipments = async () => {
    setShipmentsLoading(true);
    const { data, error } = await supabase
      .from('cargo_tracking')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setShipments(data as CargoItem[]);
      setFilteredShipments(data as CargoItem[]);
    }
    setShipmentsLoading(false);
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) return;
    setChangingPassword(true);
    const { error } = await changePassword(newPassword);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t.passwordUpdated);
      setNewPassword('');
    }
    setChangingPassword(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/customer-portal');
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status] || statusConfig.collected;
    const StatusIcon = config.icon;
    const label = t[status as keyof typeof t] || status;
    return (
      <Badge variant="outline" className={`${config.bgColor} ${config.color} border font-medium gap-1`}>
        <StatusIcon className="h-3 w-3" />
        {label as string}
      </Badge>
    );
  };

  // Tracking timeline for a shipment
  const getTimelineSteps = (cargo: CargoItem) => {
    const steps = [
      { key: 'collected', date: cargo.collection_date, label: t.collectionDate },
      { key: 'loaded', date: cargo.loaded_date, label: t.loadedDate },
      { key: 'in_transit', date: cargo.in_transit_date, label: t.inTransit },
      { key: 'arrived', date: cargo.arrival_date, label: t.arrivalDate },
      { key: 'clearance', date: cargo.clearance_date, label: t.clearanceDate },
      { key: 'processing', date: cargo.processing_date, label: t.processing },
      { key: 'delivered', date: cargo.delivery_date, label: t.deliveryDate },
    ];
    return steps;
  };

  const statusOrder = ['collected', 'loaded', 'in_transit', 'arrived', 'clearance', 'processing', 'delivered'];

  if (!user) return null;

  // Account pending activation
  if (!isActive && customerAccount) {
    return (
      <div className="min-h-screen bg-muted/30" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <PortalHeader
          lang={lang}
          onToggleLang={() => setLang(l => l === 'en' ? 'ar' : 'en')}
          rightContent={
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-primary-foreground hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-1" />{t.signOut}
            </Button>
          }
        />
        <div className="flex items-center justify-center px-4 py-16">
          <Card className="max-w-md w-full text-center shadow-xl border-0">
            <CardContent className="pt-8 space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
              </div>
              <h2 className={`text-xl font-bold ${lang === 'ar' ? 'font-arabic' : ''}`}>{t.accountPending}</h2>
              <p className="text-muted-foreground text-sm">{t.accountPendingDesc}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <PortalHeader
        lang={lang}
        onToggleLang={() => setLang(l => l === 'en' ? 'ar' : 'en')}
        rightContent={
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10 gap-1.5">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            )}
            {/* Change Password Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
                  <User className="h-4 w-4 mr-1" />{t.myAccount}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.myAccount}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {customerAccount && (
                    <div className="space-y-2 text-sm">
                      <p><strong>{t.fullName}:</strong> {customerAccount.full_name}</p>
                      <p><strong>{t.email}:</strong> {customerAccount.email}</p>
                      <p><strong>{t.mobileNumber}:</strong> {customerAccount.mobile_number}</p>
                      <p><strong>{t.country}:</strong> {customerAccount.country}</p>
                    </div>
                  )}
                  <hr />
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Lock className="h-4 w-4" />{t.changePassword}</Label>
                    <Input
                      type="password"
                      placeholder={t.newPassword}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      minLength={6}
                    />
                    <Button onClick={handleChangePassword} disabled={changingPassword || newPassword.length < 6} size="sm">
                      {t.updatePassword}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-primary-foreground hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-1" />{t.signOut}
            </Button>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Welcome Banner */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="py-6">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <h2 className={`text-xl font-bold ${lang === 'ar' ? 'font-arabic' : ''}`}>
                  {t.trackYourCargo}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {customerAccount ? `${lang === 'ar' ? 'مرحباً' : 'Welcome'}, ${customerAccount.full_name}` : ''}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.searchByInvoice}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Shipments */}
        {shipmentsLoading ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">{t.loading}</CardContent></Card>
        ) : filteredShipments.length === 0 ? (
          <Card className="border-0 shadow-md">
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
              <h3 className="font-semibold text-lg">{t.noShipmentsFound}</h3>
              <p className="text-muted-foreground text-sm mt-1">{t.noShipmentsDesc}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredShipments.map(cargo => {
              const steps = getTimelineSteps(cargo);
              const currentIdx = statusOrder.indexOf(cargo.current_status);
              
              return (
                <Card key={cargo.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <CardTitle className="text-base font-semibold">
                          {t.invoiceNumber}: {cargo.invoice_number}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{cargo.customer_name}</p>
                      </div>
                      {getStatusBadge(cargo.current_status)}
                    </div>
                    {cargo.cargo_description && (
                      <p className="text-sm text-muted-foreground mt-1">{cargo.cargo_description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {cargo.origin} → {cargo.destination}
                    </p>
                  </CardHeader>
                  <CardContent>
                    {/* Timeline */}
                    <div className="flex items-center justify-between mt-2 overflow-x-auto pb-2">
                      {steps.map((step, idx) => {
                        const isCompleted = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;
                        const config = statusConfig[step.key];
                        const StepIcon = config.icon;
                        
                        return (
                          <div key={step.key} className="flex flex-col items-center min-w-[80px] relative">
                            {idx > 0 && (
                              <div className={`absolute top-4 -left-1/2 w-full h-0.5 ${
                                idx <= currentIdx ? 'bg-primary' : 'bg-border'
                              }`} style={{ zIndex: 0 }} />
                            )}
                            <div className={`relative z-10 h-8 w-8 rounded-full flex items-center justify-center ${
                              isCurrent ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                              isCompleted ? 'bg-primary text-primary-foreground' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              <StepIcon className="h-4 w-4" />
                            </div>
                            <span className={`text-[10px] mt-1 text-center leading-tight ${
                              isCompleted ? 'font-medium text-foreground' : 'text-muted-foreground'
                            }`}>
                              {step.label}
                            </span>
                            <span className="text-[9px] text-muted-foreground mt-0.5">
                              {step.date ? formatDate(step.date) : '—'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      
      <footer className="text-center py-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Soqotra Logistics Services, Transportation & Trading WLL
      </footer>
    </div>
  );
};

export default PortalDashboard;
