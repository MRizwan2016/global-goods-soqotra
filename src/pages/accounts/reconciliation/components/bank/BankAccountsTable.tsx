
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { BankAccount } from "./BankDetailsForm";

// Props
interface Props {
  accounts: BankAccount[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  getCountryName: (code: string) => string;
  getAccountTypeName: (type: string) => string;
}

const BankAccountsTable: React.FC<Props> = ({
  accounts,
  onEdit,
  onDelete,
  getCountryName,
  getAccountTypeName
}) => (
  <div className="border rounded-md overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bank Name</TableHead>
          <TableHead>Account Number</TableHead>
          <TableHead>Account Name</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.id}>
            <TableCell className="font-medium">{account.bankName}</TableCell>
            <TableCell>{account.accountNumber}</TableCell>
            <TableCell>{account.accountName}</TableCell>
            <TableCell>{getCountryName(account.country)}</TableCell>
            <TableCell>{account.currency}</TableCell>
            <TableCell>{getAccountTypeName(account.accountType)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(account.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(account.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default BankAccountsTable;
