export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Login
    welcomeBack: 'Welcome Back',
    signInToTrack: 'Sign in to track your cargo shipments',
    email: 'Email Address',
    password: 'Password',
    signIn: 'Sign In',
    signingIn: 'Signing In...',
    noAccount: "Don't have an account?",
    registerHere: 'Register Here',
    forgotPassword: 'Forgot Password?',
    
    // Register
    createAccount: 'Create Account',
    registerToTrack: 'Register to track your cargo with Global Goods Soqotra',
    fullName: 'Full Name',
    mobileNumber: 'Mobile Number',
    country: 'Country',
    confirmPassword: 'Confirm Password',
    register: 'Register',
    registering: 'Creating Account...',
    haveAccount: 'Already have an account?',
    signInHere: 'Sign In Here',
    registrationSuccess: 'Registration successful! Please check your email to verify your account. Once verified, an admin will activate your account.',
    passwordMismatch: 'Passwords do not match',
    
    // Dashboard
    trackYourCargo: 'Track Your Cargo',
    cargoTracking: 'Cargo Tracking',
    searchByInvoice: 'Search by invoice number...',
    invoiceNumber: 'Invoice Number',
    customerName: 'Customer Name',
    collectionDate: 'Collection Date',
    loadedDate: 'Loaded Date',
    inTransit: 'In Transit',
    arrivalDate: 'Arrival Date',
    clearanceDate: 'Clearance Date',
    processing: 'Processing',
    deliveryDate: 'Delivery Date',
    status: 'Status',
    noShipmentsFound: 'No shipments found',
    noShipmentsDesc: 'Your cargo tracking information will appear here once available.',
    
    // Statuses
    collected: 'Collected',
    loaded: 'Loaded',
    in_transit: 'In Transit',
    arrived: 'Arrived',
    clearance: 'Clearance',
    processing_status: 'Processing',
    delivered: 'Delivered',
    
    // Account
    accountPending: 'Account Pending Activation',
    accountPendingDesc: 'Your account is registered but not yet activated. An administrator will review and activate your account shortly.',
    changePassword: 'Change Password',
    newPassword: 'New Password',
    updatePassword: 'Update Password',
    passwordUpdated: 'Password updated successfully!',
    signOut: 'Sign Out',
    myAccount: 'My Account',
    accountInfo: 'Account Information',
    
    // Company
    companyName: 'SOQOTRA LOGISTICS SERVICES',
    companySubName: 'TRANSPORTATION & TRADING WLL',
    customerPortal: 'Customer Tracking Portal',
    
    // General
    search: 'Search',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    back: 'Back',
    pending: 'Pending',
    notAvailable: 'N/A',
  },
  ar: {
    // Login
    welcomeBack: 'مرحباً بعودتك',
    signInToTrack: 'سجل الدخول لتتبع شحناتك',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    signIn: 'تسجيل الدخول',
    signingIn: 'جاري تسجيل الدخول...',
    noAccount: 'ليس لديك حساب؟',
    registerHere: 'سجل هنا',
    forgotPassword: 'نسيت كلمة المرور؟',
    
    // Register
    createAccount: 'إنشاء حساب',
    registerToTrack: 'سجل لتتبع شحناتك مع جلوبال جودز سقطرى',
    fullName: 'الاسم الكامل',
    mobileNumber: 'رقم الهاتف',
    country: 'الدولة',
    confirmPassword: 'تأكيد كلمة المرور',
    register: 'تسجيل',
    registering: 'جاري إنشاء الحساب...',
    haveAccount: 'لديك حساب بالفعل؟',
    signInHere: 'سجل الدخول هنا',
    registrationSuccess: 'تم التسجيل بنجاح! يرجى التحقق من بريدك الإلكتروني لتفعيل حسابك. بعد التحقق، سيقوم المسؤول بتفعيل حسابك.',
    passwordMismatch: 'كلمات المرور غير متطابقة',
    
    // Dashboard
    trackYourCargo: 'تتبع شحنتك',
    cargoTracking: 'تتبع الشحنات',
    searchByInvoice: 'البحث برقم الفاتورة...',
    invoiceNumber: 'رقم الفاتورة',
    customerName: 'اسم العميل',
    collectionDate: 'تاريخ التجميع',
    loadedDate: 'تاريخ التحميل',
    inTransit: 'في الطريق',
    arrivalDate: 'تاريخ الوصول',
    clearanceDate: 'تاريخ التخليص',
    processing: 'المعالجة',
    deliveryDate: 'تاريخ التسليم',
    status: 'الحالة',
    noShipmentsFound: 'لم يتم العثور على شحنات',
    noShipmentsDesc: 'ستظهر معلومات تتبع شحنتك هنا بمجرد توفرها.',
    
    // Statuses
    collected: 'تم التجميع',
    loaded: 'تم التحميل',
    in_transit: 'في الطريق',
    arrived: 'وصلت',
    clearance: 'تخليص',
    processing_status: 'معالجة',
    delivered: 'تم التسليم',
    
    // Account
    accountPending: 'الحساب في انتظار التفعيل',
    accountPendingDesc: 'تم تسجيل حسابك ولكنه لم يتم تفعيله بعد. سيقوم المسؤول بمراجعة وتفعيل حسابك قريباً.',
    changePassword: 'تغيير كلمة المرور',
    newPassword: 'كلمة المرور الجديدة',
    updatePassword: 'تحديث كلمة المرور',
    passwordUpdated: 'تم تحديث كلمة المرور بنجاح!',
    signOut: 'تسجيل الخروج',
    myAccount: 'حسابي',
    accountInfo: 'معلومات الحساب',
    
    // Company
    companyName: 'خدمات سقطرى اللوجستية',
    companySubName: 'للنقل والتجارة ش.م.م',
    customerPortal: 'بوابة تتبع العملاء',
    
    // General
    search: 'بحث',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجاح',
    back: 'رجوع',
    pending: 'قيد الانتظار',
    notAvailable: 'غير متوفر',
  }
} as const;

export const useTranslation = (lang: Language) => {
  return translations[lang];
};
