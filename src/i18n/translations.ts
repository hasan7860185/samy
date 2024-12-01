export type TranslationKey = keyof typeof translations;

export const translations = {
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
    ar: 'تم الرد',
    en: 'Responded'
  },
  reserved: {
    ar: 'محجوز',
    en: 'Reserved'
  },
  cancelled: {
    ar: 'ملغي',
    en: 'Cancelled'
  },
  sold: {
    ar: 'تم البيع',
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
  }
} as const;