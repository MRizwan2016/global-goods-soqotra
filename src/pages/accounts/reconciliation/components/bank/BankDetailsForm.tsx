
// Types and utility
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import BankDetailsFormFields from "./BankDetailsFormFields";
import BankAccountsTable from "./BankAccountsTable";

export const bankDetailsFormSchema = z.object({
  bankName: z.string().min(2, { message: "Bank name is required" }),
  accountNumber: z.string().min(5, { message: "Account number is required" }),
  accountName: z.string().min(2, { message: "Account holder name is required" }),
  swiftCode: z.string().min(8, { message: "Valid SWIFT code is required" }).max(11),
  branchName: z.string().min(2, { message: "Branch name is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  accountType: z.string().min(1, { message: "Account type is required" }),
  notes: z.string().optional(),
});

export type BankDetailsFormValues = z.infer<typeof bankDetailsFormSchema>;
export interface BankAccount {
  id: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  swiftCode: string;
  branchName: string;
  country: string;
  currency: string;
  accountType: string;
  notes?: string;
}

const defaultValues: Partial<BankDetailsFormValues> = {
  country: "",
  currency: "",
  accountType: "",
  notes: "",
};

const mockBankAccounts: BankAccount[] = [
  {
    id: 1,
    bankName: "HSBC Bank",
    accountNumber: "1234567890",
    accountName: "Soqotra Shipping LLC",
    swiftCode: "HSBCUS33",
    branchName: "Dubai Main Branch",
    country: "ae",
    currency: "AED",
    accountType: "checking",
    notes: "",
  },
  {
    id: 2,
    bankName: "Standard Chartered",
    accountNumber: "9876543210",
    accountName: "Soqotra Shipping LLC",
    swiftCode: "SCBLUS33",
    branchName: "Nairobi CBD",
    country: "ke",
    currency: "KES",
    accountType: "current",
    notes: "",
  },
];

const BankDetailsForm = () => {
  const [bankAccounts, setBankAccounts] = React.useState<BankAccount[]>(mockBankAccounts);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentEditId, setCurrentEditId] = React.useState<number | null>(null);

  const form = useForm<BankDetailsFormValues>({
    resolver: zodResolver(bankDetailsFormSchema),
    defaultValues,
  });

  const onSubmit = (data: BankDetailsFormValues) => {
    if (isEditing && currentEditId) {
      setBankAccounts(prev =>
        prev.map(account =>
          account.id === currentEditId
            ? { ...account, ...data, id: currentEditId }
            : account
        )
      );
      toast({
        title: "Bank details updated",
        description: `${data.bankName} account details have been updated.`,
      });
      setIsEditing(false);
      setCurrentEditId(null);
    } else {
      const newAccount: BankAccount = {
        ...data,
        id: Date.now(),
      };
      setBankAccounts(prev => [...prev, newAccount]);
      toast({
        title: "Bank details added",
        description: `${data.bankName} account details have been added.`,
      });
    }
    form.reset(defaultValues);
  };

  const handleEdit = (id: number) => {
    const accountToEdit = bankAccounts.find(account => account.id === id);
    if (accountToEdit) {
      form.reset(accountToEdit);
      setIsEditing(true);
      setCurrentEditId(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = (id: number) => {
    setBankAccounts(prev => prev.filter(account => account.id !== id));
    toast({
      title: "Bank details removed",
      description: "The bank account has been removed from the system.",
    });
    if (currentEditId === id) {
      form.reset(defaultValues);
      setIsEditing(false);
      setCurrentEditId(null);
    }
  };

  const getCountryName = (code: string): string => {
    const countries: Record<string, string> = {
      ae: "United Arab Emirates",
      er: "Eritrea",
      ke: "Kenya",
      lk: "Sri Lanka",
      mz: "Mozambique",
      om: "Oman",
      ph: "Philippines",
      sa: "Saudi Arabia",
      sd: "Sudan",
      tn: "Tunisia",
    };
    return countries[code] || code;
  };

  const getAccountTypeName = (type: string): string => {
    const types: Record<string, string> = {
      checking: "Checking Account",
      savings: "Savings Account",
      current: "Current Account",
      business: "Business Account",
    };
    return types[type] || type;
  };

  return (
    <div className="space-y-8">
      <div className="p-4 bg-green-50 border border-green-100 rounded-md mb-6">
        <h3 className="text-sm font-medium text-green-800">Bank Account Management</h3>
        <p className="text-sm text-green-600">
          Add and manage bank accounts for financial reconciliation. All fields marked with * are required.
        </p>
      </div>

      <BankDetailsFormFields
        form={form}
        isEditing={isEditing}
        onCancelEdit={() => {
          form.reset(defaultValues);
          setIsEditing(false);
          setCurrentEditId(null);
        }}
        onReset={() => form.reset(defaultValues)}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      />

      <div className="mt-10">
        <h3 className="text-lg font-medium mb-4">Registered Bank Accounts</h3>
        {bankAccounts.length > 0 ? (
          <BankAccountsTable
            accounts={bankAccounts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            getCountryName={getCountryName}
            getAccountTypeName={getAccountTypeName}
          />
        ) : (
          <div className="text-center p-8 border border-dashed rounded-md">
            <p className="text-gray-500">No bank accounts have been added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankDetailsForm;
