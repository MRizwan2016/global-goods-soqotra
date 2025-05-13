
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import JobNumberService from '@/services/JobNumberService';

// Form schema
const formSchema = z.object({
  jobNumber: z.string().nonempty('Job number is required'),
  invoiceNumber: z.string().optional(),
  category: z.enum(['import', 'export', 'local']),
  customerName: z.string().nonempty('Customer name is required'),
  contactNumber: z.string().optional(),
  country: z.string().nonempty('Country is required'),
  destination: z.string().optional(),
  description: z.string().optional(),
  urgent: z.boolean().default(false),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

type FormValues = z.infer<typeof formSchema>;

const JobForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Generate initial job number
  const initialJobNumber = JobNumberService.peekNextJobNumber();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobNumber: initialJobNumber,
      category: 'export',
      priority: 'medium',
      urgent: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Generate a final job number if needed
      if (data.jobNumber === initialJobNumber) {
        data.jobNumber = JobNumberService.generateJobNumber(data.country);
      }
      
      // Link job number to invoice if provided
      if (data.invoiceNumber) {
        JobNumberService.linkJobToInvoice(data.jobNumber, data.invoiceNumber);
      }
      
      console.log('Submitting job:', data);
      
      // Save to localStorage for demo purposes
      const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      jobs.push({
        ...data,
        id: `job-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'new',
      });
      localStorage.setItem('jobs', JSON.stringify(jobs));
      
      toast.success('Job created successfully!');
      form.reset({
        jobNumber: JobNumberService.peekNextJobNumber(),
        category: 'export',
        priority: 'medium',
        urgent: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="bg-slate-50">
        <CardTitle>Create New Job</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="jobNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Number</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="invoiceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter invoice number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="import">Import</SelectItem>
                        <SelectItem value="export">Export</SelectItem>
                        <SelectItem value="local">Local</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter customer name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter contact number" />
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
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Qatar">Qatar</SelectItem>
                        <SelectItem value="UAE">UAE</SelectItem>
                        <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                        <SelectItem value="Bahrain">Bahrain</SelectItem>
                        <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter destination" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter job description" rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="urgent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Mark as Urgent</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={() => form.reset()}>
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Create Job'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JobForm;
