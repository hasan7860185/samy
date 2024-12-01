import { UserAction, UserPerformance, UserMetrics } from './types';

export class PerformanceService {
  private static instance: PerformanceService;
  private actions: UserAction[] = [];

  private constructor() {}

  static getInstance(): PerformanceService {
    if (!PerformanceService.instance) {
      PerformanceService.instance = new PerformanceService();
    }
    return PerformanceService.instance;
  }

  static async getTopPerformers(timeRange: 'daily' | 'weekly' | 'monthly'): Promise<UserPerformance[]> {
    const instance = PerformanceService.getInstance();
    const now = new Date();
    const performers: UserPerformance[] = [];

    // Calculate metrics for each user
    const userMetrics = instance.calculateUserMetrics(timeRange);

    // Convert to performers array
    for (const [userId, metrics] of Object.entries(userMetrics)) {
      performers.push({
        userId,
        period: timeRange,
        metrics,
        rating: instance.calculateRating(metrics),
        startDate: instance.getStartDate(timeRange).toISOString(),
        endDate: now.toISOString()
      });
    }

    // Sort by total actions and return top performers
    return performers
      .sort((a, b) => b.metrics.total_actions - a.metrics.total_actions)
      .slice(0, 10);
  }

  private calculateUserMetrics(timeRange: 'daily' | 'weekly' | 'monthly'): Record<string, UserMetrics> {
    const startDate = this.getStartDate(timeRange);
    const userMetrics: Record<string, UserMetrics> = {};

    this.actions
      .filter(action => new Date(action.timestamp) >= startDate)
      .forEach(action => {
        if (!userMetrics[action.userId]) {
          userMetrics[action.userId] = {
            total_actions: 0,
            client_contact: 0,
            client_meeting: 0,
            property_showing: 0,
            deal_closed: 0,
            follow_up: 0,
            document_processing: 0
          };
        }

        userMetrics[action.userId].total_actions++;
        if (action.type in userMetrics[action.userId]) {
          userMetrics[action.userId][action.type as keyof UserMetrics]++;
        }
      });

    return userMetrics;
  }

  private calculateRating(metrics: UserMetrics): number {
    const score = 
      metrics.deal_closed * 5 +
      metrics.property_showing * 3 +
      metrics.client_meeting * 2 +
      metrics.client_contact +
      metrics.follow_up +
      metrics.document_processing;

    if (metrics.total_actions === 0) return 0;
    if (score >= 100) return 5;
    if (score >= 80) return 4;
    if (score >= 60) return 3;
    if (score >= 40) return 2;
    return 1;
  }

  private getStartDate(timeRange: 'daily' | 'weekly' | 'monthly'): Date {
    const now = new Date();
    switch (timeRange) {
      case 'daily':
        return new Date(now.setHours(0, 0, 0, 0));
      case 'weekly':
        now.setDate(now.getDate() - 7);
        return now;
      case 'monthly':
        now.setMonth(now.getMonth() - 1);
        return now;
    }
  }
}

export const performanceService = PerformanceService.getInstance();