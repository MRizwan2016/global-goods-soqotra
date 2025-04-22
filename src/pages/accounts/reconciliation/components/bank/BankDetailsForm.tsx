
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";

const bankDetailsFormSchema = z.object({
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

type BankDetailsFormValues = z.infer<typeof bankDetailsFormSchema>;

const defaultValues: Partial<BankDetailsFormValues> = {
  country: "",
  currency: "",
  accountType: "",
  notes: "",
};

// Sample data for the table
const mockBankAccounts = [
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
  },
];

const BankDetailsForm = () => {
  const [bankAccounts, setBankAccounts] = React.useState(mockBankAccounts);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentEditId, setCurrentEditId] = React.useState<number | null>(null);

  const form = useForm<BankDetailsFormValues>({
    resolver: zodResolver(bankDetailsFormSchema),
    defaultValues,
  });

  const onSubmit = (data: BankDetailsFormValues) => {
    if (isEditing && currentEditId) {
      // Update existing bank account
      setBankAccounts(prev => 
        prev.map(account => 
          account.id === currentEditId ? { ...data, id: currentEditId } : account
        )
      );
      toast({
        title: "Bank details updated",
        description: `${data.bankName} account details have been updated.`,
      });
      setIsEditing(false);
      setCurrentEditId(null);
    } else {
      // Add new bank account
      setBankAccounts(prev => [...prev, { ...data, id: Date.now() }]);
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
      
      // Scroll to the form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = (id: number) => {
    setBankAccounts(prev => prev.filter(account => account.id !== id));
    toast({
      title: "Bank details removed",
      description: "The bank account has been removed from the system.",
    });
    
    // If we're currently editing this account, reset the form
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter bank name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account holder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="swiftCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SWIFT / BIC Code *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter SWIFT code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="branchName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter branch name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ae">United Arab Emirates</SelectItem>
                      <SelectItem value="er">Eritrea</SelectItem>
                      <SelectItem value="ke">Kenya</SelectItem>
                      <SelectItem value="lk">Sri Lanka</SelectItem>
                      <SelectItem value="mz">Mozambique</SelectItem>
                      <SelectItem value="om">Oman</SelectItem>
                      <SelectItem value="ph">Philippines</SelectItem>
                      <SelectItem value="sa">Saudi Arabia</SelectItem>
                      <SelectItem value="sd">Sudan</SelectItem>
                      <SelectItem value="tn">Tunisia</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                      <SelectItem value="ERN">ERN - Eritrean Nakfa</SelectItem>
                      <SelectItem value="KES">KES - Kenyan Shilling</SelectItem>
                      <SelectItem value="LKR">LKR - Sri Lankan Rupee</SelectItem>
                      <SelectItem value="MZN">MZN - Mozambican Metical</SelectItem>
                      <SelectItem value="OMR">OMR - Omani Rial</SelectItem>
                      <SelectItem value="PHP">PHP - Philippine Peso</SelectItem>
                      <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                      <SelectItem value="SDG">SDG - Sudanese Pound</SelectItem>
                      <SelectItem value="TND">TND - Tunisian Dinar</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="checking">Checking Account</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="current">Current Account</SelectItem>
                      <SelectItem value="business">Business Account</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter any additional information" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-2">
            {isEditing && (
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => {
                  form.reset(defaultValues);
                  setIsEditing(false);
                  setCurrentEditId(null);
                }}
              >
                Cancel Edit
              </Button>
            )}
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => form.reset(defaultValues)}
            >
              Reset
            </Button>
            <Button type="submit">{isEditing ? "Update Bank Details" : "Add Bank Details"}</Button>
          </div>
        </form>
      </Form>

      <div className="mt-10">
        <h3 className="text-lg font-medium mb-4">Registered Bank Accounts</h3>
        {bankAccounts.length > 0 ? (
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
                {bankAccounts.map((account) => (
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
                          onClick={() => handleEdit(account.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(account.id)}
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
