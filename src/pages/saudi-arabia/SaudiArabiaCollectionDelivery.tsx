import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Truck, Package, MapPin, Calendar, Eye, Edit, Clock } from "lucide-react";
import { toast } from "sonner";

const SaudiArabiaCollectionDelivery = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [activeTab, setActiveTab] = useState("collections");

  // Load jobs from localStorage
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    try {
      const storedJobs = JSON.parse(localStorage.getItem('saudiArabiaJobs') || '[]');
      setJobs(storedJobs);
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
  }, []);

  const mockCollections = [
    { id: "SAC-001", date: "17/03/2026", customer: "ABDULLAH HASSAN M", city: "Riyadh", packages: 3, weight: "125.50", status: "scheduled", driver: "Ali Mohammed", type: "collection" },
    { id: "SAC-002", date: "17/03/2026", customer: "MOHAMMED OMAR K", city: "Jeddah", packages: 5, weight: "340.00", status: "in-progress", driver: "Khalid Ahmed", type: "collection" },
    { id: "SAC-003", date: "16/03/2026", customer: "FATIMA AHMED S", city: "Dammam", packages: 2, weight: "85.00", status: "completed", driver: "Ali Mohammed", type: "collection" },
  ];

  const mockDeliveries = [
    { id: "SAD-001", date: "17/03/2026", customer: "SARAH KHALID A", city: "Riyadh", packages: 4, weight: "210.00", status: "out-for-delivery", driver: "Khalid Ahmed", type: "delivery" },
    { id: "SAD-002", date: "16/03/2026", customer: "OMAR SALEH M", city: "Tabuk", packages: 1, weight: "45.00", status: "delivered", driver: "Ali Mohammed", type: "delivery" },
  ];

  const allJobs = [...mockCollections, ...mockDeliveries, ...jobs];
  const collections = allJobs.filter(j => j.type === "collection");
  const deliveries = allJobs.filter(j => j.type === "delivery");

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      scheduled: { variant: "outline", label: "Scheduled" },
      "in-progress": { variant: "default", label: "In Progress" },
      completed: { variant: "secondary", label: "Completed" },
      "out-for-delivery": { variant: "default", label: "Out for Delivery" },
      delivered: { variant: "secondary", label: "Delivered" },
      pending: { variant: "destructive", label: "Pending" },
    };
    const c = config[status] || config.pending;
    return <Badge variant={c.variant}>{c.label}</Badge>;
  };

  const filterJobs = (list: any[]) => list.filter(item => {
    const matchesSearch = item.customer?.toLowerCase().includes(searchTerm.toLowerCase()) || item.id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "all" || item.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const stats = [
    { title: "Today's Collections", value: collections.filter(j => j.status !== "completed").length.toString(), icon: Package, color: "bg-emerald-500" },
    { title: "Today's Deliveries", value: deliveries.filter(j => j.status !== "delivered").length.toString(), icon: Truck, color: "bg-blue-500" },
    { title: "Completed", value: allJobs.filter(j => j.status === "completed" || j.status === "delivered").length.toString(), icon: Clock, color: "bg-green-600" },
    { title: "Active Drivers", value: "2", icon: MapPin, color: "bg-amber-500" },
  ];

  const renderJobTable = (data: any[]) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#006c35] hover:bg-[#006c35]">
            <TableHead className="text-white font-medium">JOB #</TableHead>
            <TableHead className="text-white font-medium">DATE</TableHead>
            <TableHead className="text-white font-medium">CUSTOMER</TableHead>
            <TableHead className="text-white font-medium">CITY</TableHead>
            <TableHead className="text-white font-medium">PKGS</TableHead>
            <TableHead className="text-white font-medium">WEIGHT (KG)</TableHead>
            <TableHead className="text-white font-medium">DRIVER</TableHead>
            <TableHead className="text-white font-medium">STATUS</TableHead>
            <TableHead className="text-white font-medium">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">No records found</TableCell></TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-[#006c35]">{item.id}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell className="font-medium">{item.customer}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.packages}</TableCell>
                <TableCell>{item.weight}</TableCell>
                <TableCell>{item.driver}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="text-blue-600 p-1"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" className="text-green-600 p-1"><Edit className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Layout title="Saudi Arabia - Collection & Delivery">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-r from-green-600 to-green-800 rounded flex items-center justify-center">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Collection & Delivery - Saudi Arabia</h1>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2 bg-[#006c35] hover:bg-[#005a2d]" onClick={() => navigate("/saudi-arabia/schedules")}>
              <Calendar className="h-4 w-4" />
              View Schedules
            </Button>
            <Button className="gap-2 bg-[#006c35] hover:bg-[#005a2d]" onClick={() => navigate("/saudi-arabia/new-job")}>
              <Plus className="h-4 w-4" />
              Add New Job
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger>
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="Riyadh">Riyadh</SelectItem>
              <SelectItem value="Jeddah">Jeddah</SelectItem>
              <SelectItem value="Dammam">Dammam</SelectItem>
              <SelectItem value="Mecca">Mecca</SelectItem>
              <SelectItem value="Medina">Medina</SelectItem>
              <SelectItem value="Tabuk">Tabuk</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by customer or job #..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="collections">Collections ({collections.length})</TabsTrigger>
            <TabsTrigger value="deliveries">Deliveries ({deliveries.length})</TabsTrigger>
            <TabsTrigger value="all">All Jobs ({allJobs.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="collections">{renderJobTable(filterJobs(collections))}</TabsContent>
          <TabsContent value="deliveries">{renderJobTable(filterJobs(deliveries))}</TabsContent>
          <TabsContent value="all">{renderJobTable(filterJobs(allJobs))}</TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SaudiArabiaCollectionDelivery;
