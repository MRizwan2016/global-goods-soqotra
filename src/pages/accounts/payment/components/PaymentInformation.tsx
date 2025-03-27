
import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Banknote, CalendarIcon, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PaymentInformationProps {
  formState: {
    grossAmount: number;
    discount: number;
    netAmount: number;
    totalPaid: number;
    balanceToPay: number;
    amountPaid: number;
    receivableAccount: string;
  };
  currencySymbol: string;
  date: Date;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDateSelect: (selectedDate: Date | undefined) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({
  formState,
  currencySymbol,
  date,
  handleInputChange,
  handleDateSelect,
  handleSelectChange,
}) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="border-t border-dashed border-gray-200 pt-6 mt-6">
      <h3 className="font-medium text-lg mb-4 text-gray-800">Payment Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 bg-gray-50 p-4 rounded-lg">
        <motion.div variants={item} className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">GROSS AMOUNT:</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {currencySymbol}
            </span>
            <Input
              name="grossAmount"
              value={formState.grossAmount.toString()}
              onChange={handleInputChange}
              type="number"
              className="bg-white border-gray-200 pl-8"
              readOnly
            />
          </div>
        </motion.div>
        
        <motion.div variants={item} className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">DISCOUNT:</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {currencySymbol}
            </span>
            <Input
              name="discount"
              value={formState.discount.toString()}
              onChange={handleInputChange}
              type="number"
              className="bg-white border-gray-200 pl-8"
              readOnly
            />
          </div>
        </motion.div>
        
        <motion.div variants={item} className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">NET AMOUNT:</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600 font-bold">
              {currencySymbol}
            </span>
            <Input
              name="netAmount"
              value={formState.netAmount.toString()}
              onChange={handleInputChange}
              type="number"
              className="bg-indigo-50 border-indigo-100 font-bold text-indigo-800 pl-8"
              readOnly
            />
          </div>
        </motion.div>
        
        <motion.div variants={item} className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">TOTAL PAID:</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {currencySymbol}
            </span>
            <Input
              name="totalPaid"
              value={formState.totalPaid.toString()}
              onChange={handleInputChange}
              type="number"
              className="bg-white border-gray-200 pl-8"
              readOnly
            />
          </div>
        </motion.div>
        
        <motion.div variants={item} className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">BALANCE TO PAY:</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 font-bold">
              {currencySymbol}
            </span>
            <Input
              name="balanceToPay"
              value={formState.balanceToPay.toString()}
              onChange={handleInputChange}
              type="number"
              className="bg-amber-50 border-amber-100 font-bold text-amber-800 pl-8"
              readOnly
            />
          </div>
        </motion.div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-teal-100">
        <motion.div 
          variants={item} 
          className="flex flex-col"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="text-sm font-medium mb-1 text-gray-700 flex items-center gap-1">
            <Banknote className="h-4 w-4 text-green-600" />
            AMOUNT PAID:
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">
              {currencySymbol}
            </span>
            <Input
              name="amountPaid"
              value={formState.amountPaid.toString()}
              onChange={handleInputChange}
              type="number"
              className="border-green-200 focus-visible:ring-green-300 font-medium pl-8"
            />
          </div>
        </motion.div>
        
        <motion.div 
          variants={item} 
          className="flex flex-col"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm font-medium mb-1 text-gray-700 flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 text-teal-600" />
            PAYMENT DATE:
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-teal-200 hover:bg-teal-50",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-teal-500" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </motion.div>
        
        <motion.div 
          variants={item} 
          className="flex flex-col"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="text-sm font-medium mb-1 text-gray-700 flex items-center gap-1">
            <CreditCard className="h-4 w-4 text-purple-600" />
            PAYMENT METHOD:
          </label>
          <Select
            value={formState.receivableAccount}
            onValueChange={(value) => handleSelectChange("receivableAccount", value)}
          >
            <SelectTrigger className="border-purple-200 focus:ring-purple-300">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="CASH_IN_HAND" className="cursor-pointer">CASH IN HAND</SelectItem>
              <SelectItem value="BANK_TRANSFER" className="cursor-pointer">BANK TRANSFER</SelectItem>
              <SelectItem value="CREDIT_CARD" className="cursor-pointer">CREDIT CARD</SelectItem>
              <SelectItem value="CHEQUE" className="cursor-pointer">CHEQUE</SelectItem>
              <SelectItem value="MOBILE_MONEY" className="cursor-pointer">MOBILE MONEY</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentInformation;
