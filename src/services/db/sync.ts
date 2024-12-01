import { db } from './instance';

export class DatabaseSync {
  static async syncToCloud(userId: string) {
    try {
      // Get all local data
      const data = await this.getAllLocalData();

      // Call Netlify function to store data
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

      console.log('Data synced to cloud successfully');
      return true;
    } catch (error) {
      console.error('Error syncing to cloud:', error);
      throw error;
    }
  }

  static async syncFromCloud(userId: string) {
    try {
      // Call Netlify function to get data
      const response = await fetch(`/.netlify/functions/get-data?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data from cloud');
      }

      const cloudData = await response.json();

      if (!cloudData) {
        console.log('No cloud data found for user');
        return false;
      }

      // Update local database
      await this.updateLocalData(cloudData);

      console.log('Data synced from cloud successfully');
      return true;
    } catch (error) {
      console.error('Error syncing from cloud:', error);
      throw error;
    }
  }

  private static async getAllLocalData() {
    const [users, clients, properties, developers, projects, tasks] = await Promise.all([
      db.users.toArray(),
      db.clients.toArray(),
      db.properties.toArray(),
      db.developers.toArray(),
      db.projects.toArray(),
      db.tasks.toArray()
    ]);

    return {
      users,
      clients,
      properties,
      developers,
      projects,
      tasks,
      lastSync: new Date().toISOString()
    };
  }

  private static async updateLocalData(cloudData: any) {
    await db.transaction('rw', 
      [db.users, db.clients, db.properties, db.developers, db.projects, db.tasks],
      async () => {
        // Clear existing data
        await Promise.all([
          db.users.clear(),
          db.clients.clear(),
          db.properties.clear(),
          db.developers.clear(),
          db.projects.clear(),
          db.tasks.clear()
        ]);

        // Add cloud data
        if (cloudData.users) await db.users.bulkAdd(cloudData.users);
        if (cloudData.clients) await db.clients.bulkAdd(cloudData.clients);
        if (cloudData.properties) await db.properties.bulkAdd(cloudData.properties);
        if (cloudData.developers) await db.developers.bulkAdd(cloudData.developers);
        if (cloudData.projects) await db.projects.bulkAdd(cloudData.projects);
        if (cloudData.tasks) await db.tasks.bulkAdd(cloudData.tasks);
    });
  }
}