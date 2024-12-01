export const SUPABASE_CONFIG = {
  STORAGE: {
    BUCKETS: {
      AVATARS: 'avatars',
      PROPERTIES: 'properties',
      DOCUMENTS: 'documents'
    },
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  },
  TABLES: {
    USERS: 'users',
    CLIENTS: 'clients',
    PROPERTIES: 'properties',
    DEVELOPERS: 'developers',
    PROJECTS: 'projects',
    TASKS: 'tasks'
  },
  REALTIME: {
    CHANNELS: {
      DATABASE_CHANGES: 'database-changes',
      USER_PRESENCE: 'user-presence'
    }
  }
};