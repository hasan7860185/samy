import { db } from '../db/instance';
import type { SyncData } from './types';

export async function getAllLocalData(): Promise<SyncData['data']> {
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

export async function updateLocalData(data: any): Promise<void> {
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

      // Add new data
      if (data.users) await db.users.bulkAdd(data.users);
      if (data.clients) await db.clients.bulkAdd(data.clients);
      if (data.properties) await db.properties.bulkAdd(data.properties);
      if (data.developers) await db.developers.bulkAdd(data.developers);
      if (data.projects) await db.projects.bulkAdd(data.projects);
      if (data.tasks) await db.tasks.bulkAdd(data.tasks);
  });
}