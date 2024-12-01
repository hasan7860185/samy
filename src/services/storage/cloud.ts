import { db } from '../db/instance';
import { UserProfile, Client, Property, Developer, Project, Task } from '../../types';

const API_URL = 'https://api.netlify.com/api/v1';
const SITE_ID = process.env.NETLIFY_SITE_ID;

export class CloudStorage {
  static async syncData(userId: string) {
    try {
      // Get all data from IndexedDB
      const data = await this.getAllData();
      
      // Upload to Netlify
      await this.uploadData(userId, data);
      
      console.log('Data synced successfully');
    } catch (error) {
      console.error('Error syncing data:', error);
      throw error;
    }
  }

  static async downloadData(userId: string) {
    try {
      // Get data from Netlify
      const data = await this.fetchData(userId);
      
      if (data) {
        // Update IndexedDB
        await this.updateLocalData(data);
      }
      
      console.log('Data downloaded successfully');
    } catch (error) {
      console.error('Error downloading data:', error);
      throw error;
    }
  }

  private static async getAllData() {
    const [clients, properties, developers, projects, tasks] = await Promise.all([
      db.clients.toArray(),
      db.properties.toArray(),
      db.developers.toArray(),
      db.projects.toArray(),
      db.tasks.toArray()
    ]);

    return {
      clients,
      properties,
      developers,
      projects,
      tasks,
      lastSync: new Date().toISOString()
    };
  }

  private static async uploadData(userId: string, data: any) {
    const response = await fetch(`${API_URL}/sites/${SITE_ID}/functions/store-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        data
      })
    });

    if (!response.ok) {
      throw new Error('Failed to upload data');
    }
  }

  private static async fetchData(userId: string) {
    const response = await fetch(`${API_URL}/sites/${SITE_ID}/functions/get-data?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  }

  private static async updateLocalData(data: any) {
    await db.transaction('rw', 
      [db.clients, db.properties, db.developers, db.projects, db.tasks], 
      async () => {
        // Clear existing data
        await Promise.all([
          db.clients.clear(),
          db.properties.clear(),
          db.developers.clear(),
          db.projects.clear(),
          db.tasks.clear()
        ]);

        // Add new data
        await Promise.all([
          db.clients.bulkAdd(data.clients),
          db.properties.bulkAdd(data.properties),
          db.developers.bulkAdd(data.developers),
          db.projects.bulkAdd(data.projects),
          db.tasks.bulkAdd(data.tasks)
        ]);
    });
  }
}