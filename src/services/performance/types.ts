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
  | 'deal_negotiation'
  | 'total_actions';

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
  metrics: Record<UserActionType, number>;
  rating: number;
  startDate: string;
  endDate: string;
}

export interface UserMetrics {
  totalActions: number;
  clientContacts: number;
  meetings: number;
  showings: number;
  closedDeals: number;
  followUps: number;
  documents: number;
}