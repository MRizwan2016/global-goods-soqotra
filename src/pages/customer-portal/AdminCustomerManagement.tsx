import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserCheck, UserX, Users, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import BackButton from '@/components/ui/back-button';

interface CustomerRow {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  mobile_number: string;
  country: string;
  is_active: boolean;
  created_at: string;
}

const AdminCustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [filtered, setFiltered] = useState<CustomerRow[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFiltered(customers);
    } else {
      const term = searchTerm.toLowerCase();
      setFiltered(customers.filter(c =>
        c.full_name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.mobile_number.includes(term)
      ));
    }
  }, [searchTerm, customers]);

  const fetchCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('customer_accounts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCustomers(data as CustomerRow[]);
      setFiltered(data as CustomerRow[]);
    }
    setLoading(false);
  };

  const toggleActivation = async (customer: CustomerRow) => {
    setToggling(customer.id);
    const { error } = await supabase
      .from('customer_accounts')
      .update({ is_active: !customer.is_active, activated_at: !customer.is_active ? new Date().toISOString() : null })
      .eq('id', customer.id);

    if (error) {
      toast.error('Failed to update customer: ' + error.message);
    } else {
      toast.success(`Customer ${!customer.is_active ? 'activated' : 'deactivated'} successfully`);
      fetchCustomers();
    }
    setToggling(null);
  };

  const activeCount = customers.filter(c => c.is_active).length;
  const pendingCount = customers.filter(c => !c.is_active).length;

  return (
    <Layout title="Customer Management">
      <div className="space-y-6">
        <div>
          <BackButton to="/admin/control-panel" />
          <h1 className="text-2xl font-bold mt-2">Customer Portal Management</h1>
          <p className="text-muted-foreground">Manage customer registrations and access to the tracking portal</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{customers.length}</p>
                <p className="text-xs text-muted-foreground">Total Customers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCount}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <UserX className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Pending Activation</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Registered Customers</CardTitle>
              <Button variant="outline" size="sm" onClick={fetchCustomers}>
                <RefreshCw className="h-4 w-4 mr-1" />Refresh
              </Button>
            </div>
            <div className="relative max-w-sm mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 text-center text-muted-foreground">Loading customers...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No customers found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map(customer => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.full_name}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.mobile_number}</TableCell>
                          <TableCell>{customer.country}</TableCell>
                          <TableCell>
                            <Badge variant={customer.is_active ? 'default' : 'secondary'}
                              className={customer.is_active ? 'bg-green-100 text-green-800 border-green-200' : 'bg-amber-100 text-amber-800 border-amber-200'}>
                              {customer.is_active ? 'Active' : 'Pending'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(customer.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant={customer.is_active ? 'destructive' : 'default'}
                              onClick={() => toggleActivation(customer)}
                              disabled={toggling === customer.id}
                            >
                              {customer.is_active ? (
                                <><UserX className="h-3 w-3 mr-1" />Deactivate</>
                              ) : (
                                <><UserCheck className="h-3 w-3 mr-1" />Activate</>
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminCustomerManagement;
