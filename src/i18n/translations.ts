export type TranslationKey =
  | 'light'
  | 'dark'
  | 'potential'
  | 'interested'
  | 'responded'
  | 'reserved'
  | 'cancelled'
  | 'sold'
  | 'postponed'
  | 'resale'
  | 'search'
  | 'add'
  | 'edit'
  | 'delete'
  | 'view'
  | 'save'
  | 'clientStatuses'
  | 'showMore'
  | 'showLess'
  | 'joinDate'
  | 'totalClients'
  | 'activeProperties'
  | 'tasks'
  | 'properties'
  | 'addProperty'
  | 'editProperty'
  | 'post_meeting';

export const translations: Record<TranslationKey, { ar: string; en: string }> = {
  light: {
    ar: 'فاتح',
    en: 'Light'
  },
  dark: {
    ar: 'داكن',
    en: 'Dark'
  },
  potential: {
    ar: 'محتمل',
    en: 'Potential'
  },
  interested: {
    ar: 'مهتم',
    en: 'Interested'
  },
  responded: {
    ar: 'رد',
    en: 'Responded'
  },
  reserved: {
    ar: 'محجوز',
    en: 'Reserved'
  },
  cancelled: {
    ar: 'ملغى',
    en: 'Cancelled'
  },
  sold: {
    ar: 'مباع',
    en: 'Sold'
  },
  postponed: {
    ar: 'مؤجل',
    en: 'Postponed'
  },
  resale: {
    ar: 'إعادة بيع',
    en: 'Resale'
  },
  search: {
    ar: 'بحث',
    en: 'Search'
  },
  add: {
    ar: 'إضافة',
    en: 'Add'
  },
  edit: {
    ar: 'تعديل',
    en: 'Edit'
  },
  delete: {
    ar: 'حذف',
    en: 'Delete'
  },
  view: {
    ar: 'عرض',
    en: 'View'
  },
  save: {
    ar: 'حفظ',
    en: 'Save'
  },
  clientStatuses: {
    ar: 'حالات العملاء',
    en: 'Client Statuses'
  },
  showMore: {
    ar: 'عرض المزيد',
    en: 'Show More'
  },
  showLess: {
    ar: 'عرض أقل',
    en: 'Show Less'
  },
  joinDate: {
    ar: 'تاريخ الانضمام',
    en: 'Join Date'
  },
  totalClients: {
    ar: 'إجمالي العملاء',
    en: 'Total Clients'
  },
  activeProperties: {
    ar: 'العقارات النشطة',
    en: 'Active Properties'
  },
  tasks: {
    ar: 'المهام',
    en: 'Tasks'
  },
  properties: {
    ar: 'العقارات',
    en: 'Properties'
  },
  addProperty: {
    ar: 'إضافة عقار',
    en: 'Add Property'
  },
  editProperty: {
    ar: 'تعديل العقار',
    en: 'Edit Property'
  },
  post_meeting: {
    ar: 'بعد الاجتماع',
    en: 'Post Meeting'
  }
};
