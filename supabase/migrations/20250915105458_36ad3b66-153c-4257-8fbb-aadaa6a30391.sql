-- Make the existing user an admin
UPDATE public.profiles 
SET 
  is_admin = true,
  permissions = '{
    "masterData": true,
    "dataEntry": true,
    "reports": true,
    "downloads": true,
    "accounting": true,
    "controlPanel": true,
    "cargoDelivery": true,
    "accountFunctions": true,
    "accountRegistrations": true,
    "accountFinancialEntities": true,
    "accountCountryReconciliations": true,
    "files": {
      "salesRep": true,
      "town": true,
      "item": true,
      "packageOptions": true,
      "sellingRates": true,
      "container": true,
      "vessel": true,
      "invoiceBook": true,
      "driverHelper": true,
      "invoicing": true,
      "paymentReceivable": true,
      "loadContainer": true,
      "loadVessel": true,
      "loadAirCargo": true,
      "packingList": true,
      "cargoReports": true,
      "financialReports": true,
      "shippingReports": true,
      "paymentMethods": true,
      "reconciliation": true,
      "profitLoss": true
    }
  }'::jsonb,
  full_name = 'System Administrator',
  mobile_number = '+974 1234 5678',
  country = 'Qatar'
WHERE email = 'mzmrizwan2016@gmail.com';