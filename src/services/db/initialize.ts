import { db } from './instance';
import { defaultData } from './schema';

export async function initializeDatabase() {
  try {
    // Check if database exists
    const dbExists = await db.users.count();
    
    if (dbExists === 0) {
      console.log('Initializing database with default data...');
      
      // Add default data
      if (defaultData.users) {
        await db.users.bulkAdd(defaultData.users);
      }
      
      console.log('Database initialized successfully');
    }

    return true;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}