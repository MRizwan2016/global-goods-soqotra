
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

const financialInstitutionFormSchema = z.object({
  institutionName: z.string().min(2, { message: "Institution name is required" }),
  type: z.string().min(1, { message: "Institution type is required" }),
  registrationNumber: z.string().min(2, { message: "Registration number is required" }),
  contactPerson: z.string().min(2, { message: "Contact person name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  notes: z.string().optional(),
});

type FinancialInstitutionFormValues = z.infer<typeof financialInstitutionFormSchema>;

const defaultValues: Partial<FinancialInstitutionFormValues> = {
  country: "",
  type: "",
  website: "",
  notes: "",
};

const FinancialInstitutionsForm = () => {
  const form = useForm<FinancialInstitutionFormValues>({
    resolver: zodResolver(financialInstitutionFormSchema),
    defaultValues,
  });

  const onSubmit = (data: FinancialInstitutionFormValues) => {
    // In a real app, this would send the data to your backend
    console.log("Financial institution form submitted:", data);
    toast({
      title: "Financial institution registered",
      description: `${data.institutionName} has been registered successfully.`,
    });
    form.reset(defaultValues);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-md mb-6">
        <h3 className="text-sm font-medium text-indigo-800">Financial Institution Details</h3>
        <p className="text-sm text-indigo-600">
          Register financial institutions for reconciliation purposes. All fields marked with * are required.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="institutionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter institution name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select institution type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bank">Bank</SelectItem>
                      <SelectItem value="credit_union">Credit Union</SelectItem>
                      <SelectItem value="investment_firm">Investment Firm</SelectItem>
                      <SelectItem value="insurance_company">Insurance Company</SelectItem>
                      <SelectItem value="leasing_company">Leasing Company</SelectItem>
                      <SelectItem value="microfinance">Microfinance Institution</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter registration/license number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact person name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Address *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter institution address" {...field} />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.example.com" {...field} />
                  </FormControl>
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
            <Button variant="outline" type="button" onClick={() => form.reset(defaultValues)}>
              Reset
            </Button>
            <Button type="submit">Register Institution</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FinancialInstitutionsForm;
