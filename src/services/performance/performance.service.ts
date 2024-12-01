import { db } from '../db/instance';
import { UserAction, UserPerformance, UserActionType } from './types';

export class PerformanceService {
  static async recordAction(action: Omit<UserAction, 'id'>) {
    try {
      const newAction = {
        ...action,
        id: `action-${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      await db.transaction('rw', db.userActions, db.users, async () => {
        // Record the action
        await db.userActions.add(newAction);

        // Update user's performance metrics
        const user = await db.users.get(action.userId);
        if (user) {
          const performance = user.performance || {
            actions: 0,
            rating: 0,
            lastUpdated: new Date().toISOString()
          };

          performance.actions++;
          performance.lastUpdated = new Date().toISOString();

          // Calculate new rating based on action type
          performance.rating = await this.calculateNewRating(action.userId);

          await db.users.update(action.userId, { performance });
        }
      });

      return newAction;
    } catch (error) {
      console.error('Error recording action:', error);
      throw error;
    }
  }

  static async calculateNewRating(userId: string): Promise<number> {
    const actions = await db.userActions
      .where('userId')
      .equals(userId)
      .toArray();

    // Weight different actions
    const weights: Record<UserActionType, number> = {
      client_contact: 1,
      client_meeting: 2,
      property_showing: 2,
      deal_negotiation: 3,
      deal_closed: 5,
      follow_up: 1,
      document_processing: 1
    };

    // Calculate weighted score
    let totalScore = 0;
    let totalWeight = 0;

    actions.forEach(action => {
      const weight = weights[action.type];
      totalScore += weight;
      totalWeight += 1;
    });

    // Convert to 1-5 scale
    const rating = Math.min(5, Math.max(1, Math.round((totalScore / totalWeight) * 2)));
    return rating;
  }

  static async getTopPerformers(period: 'daily' | 'weekly' | 'monthly'): Promise<UserPerformance[]> {
    const users = await db.users.toArray();
    const performances = await Promise.all(
      users.map(user => this.getUserPerformance(user.id, period))
    );

    return performances
      .sort((a, b) => {
        // Sort by closed deals first
        if (b.metrics.closedDeals !== a.metrics.closedDeals) {
          return b.metrics.closedDeals - a.metrics.closedDeals;
        }
        // Then by total actions
        return b.metrics.totalActions - a.metrics.totalActions;
      })
      .slice(0, 5); // Top 5 performers
  }

  static async getUserPerformance(userId: string, period: 'daily' | 'weekly' | 'monthly'): Promise<UserPerformance> {
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case 'daily':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'weekly':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'monthly':
        startDate.setMonth(now.getMonth() - 1);
        break;
    }

    const actions = await db.userActions
      .where('userId')
      .equals(userId)
      .and(action => new Date(action.timestamp) >= startDate)
      .toArray();

    const metrics = {
      totalActions: actions.length,
      clientContacts: actions.filter(a => a.type === 'client_contact').length,
      meetings: actions.filter(a => a.type === 'client_meeting').length,
      showings: actions.filter(a => a.type === 'property_showing').length,
      closedDeals: actions.filter(a => a.type === 'deal_closed').length,
      followUps: actions.filter(a => a.type === 'follow_up').length,
      documents: actions.filter(a => a.type === 'document_processing').length
    };

    const rating = await this.calculateNewRating(userId);

    return {
      userId,
      period,
      metrics,
      rating,
      startDate: startDate.toISOString(),
      endDate: now.toISOString()
    };
  }
}