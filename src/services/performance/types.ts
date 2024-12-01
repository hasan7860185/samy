export type UserActionType = 
  | 'login'
  | 'logout'
  | 'create_client'
  | 'update_client'
  | 'delete_client'
  | 'create_task'
  | 'complete_task'
  | 'update_task'
  | 'client_contact'
  | 'client_meeting'
  | 'property_showing'
  | 'deal_closed'
  | 'follow_up'
  | 'document_processing'
  | 'total_actions';

export interface UserMetrics {
  total_actions: number;
  client_contact: number;
  client_meeting: number;
  property_showing: number;
  deal_closed: number;
  closedDeals: number;
  follow_up: number;
  document_processing: number;
}

export interface UserAction {
  id: string;
  userId: string;
  type: UserActionType;
  timestamp: string;
  details?: Record<string, any>;
}

export interface UserPerformance {
  userId: string;
  period: 'daily' | 'weekly' | 'monthly';
  metrics: UserMetrics;
  rating: number;
  startDate: string;
  endDate: string;
}