export type Translations = {
  [key: string]: {
    ar: string;
    en: string;
  };
};

export const translations: Translations = {
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
  taskStatuses: {
    ar: 'حالات المهام',
    en: 'Task Statuses'
  },
  priorityLevels: {
    ar: 'مستويات الأولوية',
    en: 'Priority Levels'
  },
  userRoles: {
    ar: 'أدوار المستخدم',
    en: 'User Roles'
  }
};
