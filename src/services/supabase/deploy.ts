import { supabase } from './client';
import { db } from '../db/instance';

export async function migrateDataToSupabase() {
  try {
    // Get all local data
    const [clients, properties, developers, projects, tasks] = await Promise.all([
      db.clients.toArray(),
      db.properties.toArray(),
      db.developers.toArray(),
      db.projects.toArray(),
      db.tasks.toArray()
    ]);

    // Upload data to Supabase
    await Promise.all([
      supabase.from('clients').upsert(clients),
      supabase.from('properties').upsert(properties),
      supabase.from('developers').upsert(developers),
      supabase.from('projects').upsert(projects),
      supabase.from('tasks').upsert(tasks)
    ]);

    return true;
  } catch (error) {
    console.error('Migration error:', error);
    throw error;
  }
}