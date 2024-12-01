export const translations = {
  ar: {
    // Common
    search: 'بحث...',
    add: 'إضافة',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    save: 'حفظ',
    cancel: 'إلغاء',
    logout: 'تسجيل الخروج',
    loading: 'جاري التحميل...',
    
    // Navigation
    dashboard: 'لوحة التحكم',
    clients: 'العملاء',
    properties: 'العقارات',
    tasks: 'المهام',
    notifications: 'الإشعارات',
    reports: 'التقارير',
    settings: 'الإعدادات',
    help: 'المساعدة',
    profile: 'الملف الشخصي',
    users: 'المستخدمون',

    // Dashboard
    totalClients: 'إجمالي العملاء',
    activeProperties: 'العقارات النشطة',
    todayMeetings: 'المتابعات اليوم',
    expectedDeals: 'الصفقات المتوقعة',
    salesPerformance: 'أداء المبيعات',
    monthlyStats: 'إحصائيات شهرية',
    recentActivities: 'النشاطات الأخيرة',

    // Client Status
    newClient: 'عميل جديد',
    potential: 'محتمل',
    interested: 'مهتم',
    responded: 'تم الرد',
    notResponded: 'لم يتم الرد',
    appointmentSet: 'موعد محدد',
    postMeeting: 'ما بعد الاجتماع',
    reserved: 'محجوز',
    cancelled: 'ملغي',
    sold: 'تم البيع',
    postponed: 'مؤجل',
    resale: 'إعادة بيع',

    // Properties
    addProperty: 'إضافة عقار',
    editProperty: 'تعديل عقار',
    propertyDetails: 'تفاصيل العقار',
    location: 'الموقع',
    price: 'السعر',
    area: 'المساحة',
    type: 'النوع',
    status: 'الحالة',
    features: 'المميزات',

    // Settings
    appearance: 'المظهر',
    light: 'فاتح',
    dark: 'داكن',
    language: 'اللغة',
    arabic: 'العربية',
    english: 'English',
    emailNotifications: 'إشعارات البريد الإلكتروني',
    browserNotifications: 'إشعارات المتصفح',
    mobileNotifications: 'إشعارات الجوال',
    security: 'الأمان',
    changePassword: 'تغيير كلمة المرور',

    // Profile
    editProfile: 'تعديل الملف الشخصي',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    department: 'القسم',
    role: 'الدور',
    joinDate: 'تاريخ الانضمام',
  },
  en: {
    // Common
    search: 'Search...',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    save: 'Save',
    cancel: 'Cancel',
    logout: 'Logout',
    loading: 'Loading...',

    // Navigation
    dashboard: 'Dashboard',
    clients: 'Clients',
    properties: 'Properties',
    tasks: 'Tasks',
    notifications: 'Notifications',
    reports: 'Reports',
    settings: 'Settings',
    help: 'Help',
    profile: 'Profile',
    users: 'Users',

    // Dashboard
    totalClients: 'Total Clients',
    activeProperties: 'Active Properties',
    todayMeetings: "Today's Meetings",
    expectedDeals: 'Expected Deals',
    salesPerformance: 'Sales Performance',
    monthlyStats: 'Monthly Statistics',
    recentActivities: 'Recent Activities',

    // Client Status
    newClient: 'New Client',
    potential: 'Potential',
    interested: 'Interested',
    responded: 'Responded',
    notResponded: 'Not Responded',
    appointmentSet: 'Appointment Set',
    postMeeting: 'Post Meeting',
    reserved: 'Reserved',
    cancelled: 'Cancelled',
    sold: 'Sold',
    postponed: 'Postponed',
    resale: 'Resale',

    // Properties
    addProperty: 'Add Property',
    editProperty: 'Edit Property',
    propertyDetails: 'Property Details',
    location: 'Location',
    price: 'Price',
    area: 'Area',
    type: 'Type',
    status: 'Status',
    features: 'Features',

    // Settings
    appearance: 'Appearance',
    light: 'Light',
    dark: 'Dark',
    language: 'Language',
    arabic: 'Arabic',
    english: 'English',
    emailNotifications: 'Email Notifications',
    browserNotifications: 'Browser Notifications',
    mobileNotifications: 'Mobile Notifications',
    security: 'Security',
    changePassword: 'Change Password',

    // Profile
    editProfile: 'Edit Profile',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    department: 'Department',
    role: 'Role',
    joinDate: 'Join Date',
  }
};

export type TranslationKey = keyof typeof translations.ar;