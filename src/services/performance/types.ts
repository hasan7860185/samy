export type UserActionType = 
  | 'login'
  | 'logout'
  | 'create_client'
  | 'update_client'
  | 'delete_client'
  | 'create_task'
  | 'complete_task'
  | 'update_task';

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