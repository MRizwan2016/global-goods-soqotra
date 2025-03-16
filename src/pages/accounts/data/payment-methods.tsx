
import { ReactNode } from "react";
import { Banknote, CreditCard, Building, CheckSquare, Wallet } from "lucide-react";
import { PaymentMethodType } from "../types/payment-types";

export const PAYMENT_METHODS: PaymentMethodType[] = [
  {
    id: "cash",
    name: "Cash",
    icon: <Banknote className="h-6 w-6" />,
    color: "bg-green-100 text-green-700",
    description: "Accept cash payments from customers directly.",
    features: [
      "No processing fees",
      "Immediate payment settlement",
      "Available for in-person transactions only",
      "Manual reconciliation required"
    ]
  },
  {
    id: "credit_card",
    name: "Credit Cards",
    icon: <CreditCard className="h-6 w-6" />,
    color: "bg-blue-100 text-blue-700",
    description: "Accept Visa, Mastercard, American Express and other major credit cards.",
    features: [
      "2.9% + $0.30 processing fee per transaction",
      "1-2 business days for settlement",
      "Available for online and in-person transactions",
      "Automatic reconciliation"
    ]
  },
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    icon: <Building className="h-6 w-6" />,
    color: "bg-purple-100 text-purple-700",
    description: "Accept direct bank transfers from customers to your bank account.",
    features: [
      "Low processing fees",
      "2-3 business days for settlement",
      "Manual verification required",
      "Suitable for large transactions"
    ]
  },
  {
    id: "check",
    name: "Check/Cheque",
    icon: <CheckSquare className="h-6 w-6" />,
    color: "bg-yellow-100 text-yellow-700",
    description: "Accept personal or business checks from customers.",
    features: [
      "No immediate processing fees",
      "5-7 business days for clearance",
      "Risk of bounced checks",
      "Manual processing and reconciliation"
    ]
  },
  {
    id: "mobile_payment",
    name: "Mobile Payment",
    icon: <Wallet className="h-6 w-6" />,
    color: "bg-red-100 text-red-700",
    description: "Accept payments via mobile payment apps and digital wallets.",
    features: [
      "1.5-2.5% processing fee per transaction",
      "Immediate to 1 business day settlement",
      "Works with major digital wallets",
      "Automatic reconciliation"
    ]
  }
];
