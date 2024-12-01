export * from './user';
export * from './client';
export * from './property';
export * from './task';
export * from './developer';
export * from './project';

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
  | 'cancel'
  | 'clientStatuses'
  | 'showMore'
  | 'showLess'
  | 'new'
  | 'not_responded'
  | 'appointment_set'
  | 'post_meeting'
  | 'totalClients'
  | 'activeProperties'
  | 'tasks'
  | 'properties'
  | 'addProperty'
  | 'editProperty'
  | 'contactPhone'
  | 'contactEmail';

export type Language = 'ar' | 'en';