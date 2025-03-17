
/**
 * Calculate net amount from gross and discount
 */
export const calculateNet = (gross: string, discount: string) => {
  const grossValue = parseFloat(gross) || 0;
  const discountValue = parseFloat(discount) || 0;
  return String(grossValue - discountValue);
};
