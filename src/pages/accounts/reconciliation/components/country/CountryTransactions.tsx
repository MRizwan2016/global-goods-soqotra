
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCountryByCode } from "../../types";
import { Search, Filter, ArrowUpDown, CheckCircle, Clock, AlertCircle, Download } from "lucide-react";

interface CountryTransactionsProps {
  countryCode: string;
}

const CountryTransactions: React.FC<CountryTransactionsProps> = ({ countryCode }) => {
  const country = getCountryByCode(countryCode);
  
  if (!country) {
    return <div>Country not found</div>;
  }
  
  // Mock transactions data
  const transactions = [
    {
      id: "TR-001",
      date: "2023-04-15",
      type: "Payment",
      entity: "Global Shipping Ltd.",
      amount: 5750.00,
      status: "reconciled",
      reference: "INV-2023-001"
    },
    {
      id: "TR-002",
      date: "2023-04-18",
      type: "Invoice",
      entity: "ABC Export Company",
      amount: 8240.00,
      status: "pending",
      reference: "INV-2023-002"
    },
    {
      id: "TR-003",
      date: "2023-04-20",
      type: "Payment",
      entity: "FastFreight Forwarders",
      amount: 3120.00,
      status: "reconciled",
      reference: "INV-2023-003"
    },
    {
      id: "TR-004",
      date: "2023-04-22",
      type: "Invoice",
      entity: "Ocean Transport Inc.",
      amount: 6890.00,
      status: "variance",
      reference: "INV-2023-004"
    },
    {
      id: "TR-005",
      date: "2023-04-25",
      type: "Payment",
      entity: "East-West Importers",
      amount: 4350.00,
      status: "pending",
      reference: "INV-2023-005"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{country.name} Transactions</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm">New Transaction</Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search transactions..." 
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.entity}</TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                  <TableCell className="text-right">
                    {country.currencySymbol} {transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {transaction.status === "reconciled" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Reconciled
                      </span>
                    ) : transaction.status === "pending" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="mr-1 h-3 w-3" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Variance
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm">Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  );
};

export default CountryTransactions;
