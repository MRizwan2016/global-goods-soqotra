
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Types for props
import { UseFormReturn } from "react-hook-form";
import { BankDetailsFormValues } from "./BankDetailsForm";

interface Props {
  form: UseFormReturn<BankDetailsFormValues>;
  isEditing: boolean;
  onCancelEdit: () => void;
  onReset: () => void;
  onSubmit: (values: BankDetailsFormValues) => void;
  defaultValues: Partial<BankDetailsFormValues>;
}

const BankDetailsFormFields: React.FC<Props> = ({
  form,
  isEditing,
  onCancelEdit,
  onReset,
  onSubmit,
  defaultValues
}) => (
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
            onClick={onCancelEdit}
          >
            Cancel Edit
          </Button>
        )}
        <Button
          variant="outline"
          type="button"
          onClick={onReset}
        >
          Reset
        </Button>
        <Button type="submit">{isEditing ? "Update Bank Details" : "Add Bank Details"}</Button>
      </div>
    </form>
  </Form>
);

export default BankDetailsFormFields;
