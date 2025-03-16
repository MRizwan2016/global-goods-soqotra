
import PaymentMethod from "./PaymentMethod";
import AddPaymentMethod from "./AddPaymentMethod";
import { PAYMENT_METHODS } from "../data/payment-methods";

const PaymentMethodsTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {PAYMENT_METHODS.map((method) => (
        <PaymentMethod key={method.id} method={method} />
      ))}
      <AddPaymentMethod />
    </div>
  );
};

export default PaymentMethodsTab;
