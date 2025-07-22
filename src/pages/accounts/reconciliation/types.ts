
export interface BaseEntity {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Vendor extends BaseEntity {
  vendorType: string;
  contactPerson: string;
  taxId: string;
  serviceCategory: string[];
}

export interface ShippingLine extends BaseEntity {
  registrationNumber: string;
  fleetSize: number;
  vesselTypes: string[];
  operatingCountries: string[];
  contactPerson: string;
}

export interface FreightForwarder extends BaseEntity {
  licenseNumber: string;
  serviceAreas: string[];
  specializations: string[];
  contactPerson: string;
  operatingCountries: string[];
}

export interface Customer extends BaseEntity {
  customerType: 'export' | 'import' | 'both';
  taxId: string;
  industryType: string;
  contactPerson: string;
  creditLimit?: number;
  paymentTerms?: string;
  shippingPreferences?: string[];
}

export interface BankDetails {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  branchName: string;
  swiftCode: string;
  ibanNumber?: string;
  country: string;
  currency: string;
  entityId: string;
  entityType: 'vendor' | 'shipping-line' | 'freight-forwarder' | 'customer' | 'company';
  isPrimary: boolean;
  status: 'active' | 'inactive';
}

export interface FinancialInstitution extends BaseEntity {
  institutionType: 'bank' | 'investment' | 'credit';
  licenseNumber: string;
  serviceOfferings: string[];
  relationshipManager?: string;
}

export interface InsuranceInstitution extends BaseEntity {
  licenseNumber: string;
  coverageTypes: string[];
  policyTypes: string[];
  relationshipManager?: string;
}

export interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  timezone: string;
}

// List of supported countries with their codes
export const SUPPORTED_COUNTRIES: Country[] = [
  { 
    code: 'lk', 
    name: 'Sri Lanka', 
    currency: 'LKR',
    currencySymbol: 'Rs',
    timezone: 'Asia/Colombo'
  },
  { 
    code: 'ke', 
    name: 'Kenya', 
    currency: 'KES',
    currencySymbol: 'KSh',
    timezone: 'Africa/Nairobi'
  },
  { 
    code: 'er', 
    name: 'Eritrea', 
    currency: 'ERN',
    currencySymbol: 'Nfk',
    timezone: 'Africa/Asmara'
  },
  { 
    code: 'sd', 
    name: 'Sudan', 
    currency: 'SDG',
    currencySymbol: 'ج.س.',
    timezone: 'Africa/Khartoum'
  },
  { 
    code: 'tn', 
    name: 'Tunisia', 
    currency: 'TND',
    currencySymbol: 'د.ت',
    timezone: 'Africa/Tunis'
  },
  { 
    code: 'ph', 
    name: 'Philippines', 
    currency: 'PHP',
    currencySymbol: '₱',
    timezone: 'Asia/Manila'
  },
  { 
    code: 'mz', 
    name: 'Mozambique', 
    currency: 'MZN',
    currencySymbol: 'MT',
    timezone: 'Africa/Maputo'
  },
  { 
    code: 'sa', 
    name: 'Saudi Arabia', 
    currency: 'SAR',
    currencySymbol: '﷼',
    timezone: 'Asia/Riyadh'
  },
  { 
    code: 'ae', 
    name: 'United Arab Emirates', 
    currency: 'AED',
    currencySymbol: 'د.إ',
    timezone: 'Asia/Dubai'
  },
  { 
    code: 'om', 
    name: 'Oman', 
    currency: 'OMR',
    currencySymbol: 'ر.ع.',
    timezone: 'Asia/Muscat'
  },
  { 
    code: 'bi', 
    name: 'Burundi', 
    currency: 'BIF',
    currencySymbol: 'FBu',
    timezone: 'Africa/Bujumbura'
  },
  { 
    code: 'dz', 
    name: 'Algeria', 
    currency: 'DZD',
    currencySymbol: 'د.ج',
    timezone: 'Africa/Algiers'
  },
  { 
    code: 'gh', 
    name: 'Ghana', 
    currency: 'GHS',
    currencySymbol: '₵',
    timezone: 'Africa/Accra'
  }
];

export const getCountryByCode = (code: string): Country | undefined => {
  return SUPPORTED_COUNTRIES.find(country => country.code === code);
};

export const getCountryNameByCode = (code: string): string => {
  const country = getCountryByCode(code);
  return country ? country.name : 'Unknown';
};
