
export interface User {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  country: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: string;
  permissions: {
    masterData: boolean;
    dataEntry: boolean;
    reports: boolean;
    downloads: boolean;
    accounting: boolean;
    controlPanel: boolean;
    cargoDelivery: boolean; // Default enabled for all users
    // Account section permissions
    accountFunctions: boolean;
    accountRegistrations: boolean;
    accountFinancialEntities: boolean;
    accountCountryReconciliations: boolean;
    files: {
      salesRep?: boolean;
      town?: boolean;
      item?: boolean;
      packageOptions?: boolean;
      sellingRates?: boolean;
      container?: boolean;
      vessel?: boolean;
      invoiceBook?: boolean;
      driverHelper?: boolean;
      invoicing?: boolean;
      paymentReceivable?: boolean;
      loadContainer?: boolean;
      loadVessel?: boolean;
      loadAirCargo?: boolean;
      packingList?: boolean;
      cargoReports?: boolean;
      financialReports?: boolean;
      shippingReports?: boolean;
      paymentMethods?: boolean;
      reconciliation?: boolean;
      profitLoss?: boolean;
      // Account section files
      accountFunctionFiles?: boolean;
      accountRegistrationFiles?: boolean;
      accountFinancialFiles?: boolean;
      accountCountryFiles?: boolean;
    };
  };
}

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean | string>;
  logout: () => void;
  register: (userData: Omit<User, "id" | "isActive" | "isAdmin" | "createdAt" | "permissions"> & { password: string }) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (userId: string, token: string, newPassword: string) => Promise<boolean>;
  users: User[];
  toggleUserStatus: (userId: string) => Promise<void>;
  sendActivationEmail: (user: User) => Promise<boolean>;
  toggleUserPermission: (userId: string, permissionType: keyof User['permissions']) => void;
  toggleFilePermission: (userId: string, fileKey: keyof User['permissions']['files']) => void;
  hasFilePermission: (user: User | null, fileKey: keyof User['permissions']['files']) => boolean;
}
