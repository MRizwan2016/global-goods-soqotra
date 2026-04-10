
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Plus, Wrench, Trash2 } from "lucide-react";
import { format, isPast } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const VEHICLES = ["41070", "41073", "41067", "415004", "112279"];
const DRIVERS = ["Ashoka Udesh", "Salih", "Bakeeth", "Kanaya", "Johny Venakady", "Idries Karar"];
const SERVICE_TYPES = ["Oil Change", "Tyre Change", "Brake Service", "Engine Repair", "AC Service", "General Inspection", "Battery Replacement", "Transmission Service", "Other"];

const VehicleMaintenance = () => {
  const queryClient = useQueryClient();
  const [vehicle, setVehicle] = useState("");
  const [driver, setDriver] = useState("");
  const [serviceDate, setServiceDate] = useState<Date>(new Date());
  const [nextServiceDue, setNextServiceDue] = useState<Date | undefined>();
  const [serviceType, setServiceType] = useState("Oil Change");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  const { data: records = [], isLoading } = useQuery({
    queryKey: ["vehicle-maintenance"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicle_maintenance")
        .select("*")
        .order("service_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("vehicle_maintenance").insert({
        vehicle_number: vehicle,
        driver_name: driver,
        service_date: format(serviceDate, "yyyy-MM-dd"),
        next_service_due: nextServiceDue ? format(nextServiceDue, "yyyy-MM-dd") : null,
        service_type: serviceType,
        description: description || null,
        cost: parseFloat(cost) || 0,
        status: "completed",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle-maintenance"] });
      toast.success("Maintenance record saved");
      setVehicle(""); setDriver(""); setDescription(""); setCost(""); setNextServiceDue(undefined);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("vehicle_maintenance").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle-maintenance"] });
      toast.success("Record deleted");
    },
  });

  return (
    <Layout title="Vehicle Maintenance">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5" /> Log Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Vehicle</Label>
                <Select value={vehicle} onValueChange={setVehicle}>
                  <SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger>
                  <SelectContent>{VEHICLES.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Driver</Label>
                <Select value={driver} onValueChange={setDriver}>
                  <SelectTrigger><SelectValue placeholder="Select driver" /></SelectTrigger>
                  <SelectContent>{DRIVERS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Service Type</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{SERVICE_TYPES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Service Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start"><CalendarIcon className="mr-2 h-4 w-4" />{format(serviceDate, "PPP")}</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={serviceDate} onSelect={(d) => d && setServiceDate(d)} className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Next Service Due</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start", !nextServiceDue && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />{nextServiceDue ? format(nextServiceDue, "PPP") : "Pick date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={nextServiceDue} onSelect={setNextServiceDue} className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Cost (QAR)</Label>
                <Input type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder="0.00" />
              </div>
              <div className="md:col-span-3">
                <Label>Description / Notes</Label>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Details about the service..." />
              </div>
              <div className="md:col-span-3">
                <Button onClick={() => addMutation.mutate()} disabled={!vehicle || addMutation.isPending} className="gap-2">
                  <Plus className="h-4 w-4" /> Save Record
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Maintenance History</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? <p>Loading...</p> : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Service Date</TableHead>
                      <TableHead>Next Due</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((r: any) => {
                      const overdue = r.next_service_due && isPast(new Date(r.next_service_due));
                      return (
                        <TableRow key={r.id} className={overdue ? "bg-red-50" : ""}>
                          <TableCell className="font-bold">{r.vehicle_number}</TableCell>
                          <TableCell>{r.driver_name || "-"}</TableCell>
                          <TableCell>{r.service_date}</TableCell>
                          <TableCell>
                            {r.next_service_due ? (
                              <span className={overdue ? "text-red-600 font-bold" : ""}>{r.next_service_due}</span>
                            ) : "-"}
                          </TableCell>
                          <TableCell>{r.service_type}</TableCell>
                          <TableCell>{r.cost ? `QAR ${r.cost}` : "-"}</TableCell>
                          <TableCell>
                            {overdue ? <Badge variant="destructive">OVERDUE</Badge> : <Badge className="bg-green-100 text-green-800">OK</Badge>}
                          </TableCell>
                          <TableCell>
                            <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(r.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {records.length === 0 && <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground">No records yet</TableCell></TableRow>}
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

export default VehicleMaintenance;
