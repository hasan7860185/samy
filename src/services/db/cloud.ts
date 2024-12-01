import { db } from './instance';

export class CloudStorage {
  static async syncToCloud(userId: string, data: any) {
    try {
      const response = await fetch('/.netlify/functions/store-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          data
        })
      });

      if (!response.ok) {
        throw new Error('Failed to sync data to cloud');
      }

      return true;
    } catch (error) {
      console.error('Error syncing to cloud:', error);
      throw error;
    }
  }

  static async syncFromCloud(userId: string) {
    try {
      const response = await fetch(`/.netlify/functions/get-data?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data from cloud');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error syncing from cloud:', error);
      throw error;
    }
  }
}