export interface UserAction {
  id: string;
  userId: string;
  type: UserActionType;
  clientId?: string;
  propertyId?: string;
  timestamp: string;
  details?: Record<string, any>;
}

export type UserActionType = 
  | 'client_contact'
  | 'client_meeting'
  | 'property_showing'
  | 'deal_negotiation'
  | 'deal_closed'
  | 'follow_up'
  | 'document_processing';

export interface UserPerformance {
  userId: string;
  period: 'daily' | 'weekly' | 'monthly';
  metrics: {
    totalActions: number;
    clientContacts: number;
    meetings: number;
    showings: number;
    closedDeals: number;
    followUps: number;
    documents: number;
  };
  rating: number;
  startDate: string;
  endDate: string;
}