```typescript
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
  | 'client_contact'        // Called/messaged client
  | 'client_meeting'        // Met with client
  | 'property_showing'      // Showed property to client
  | 'deal_negotiation'      // Negotiated deal terms
  | 'deal_closed'          // Closed a deal
  | 'follow_up'           // Followed up with client
  | 'document_processing'; // Processed client documents

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
  rating: number; // 1-5 stars
  startDate: string;
  endDate: string;
}
```