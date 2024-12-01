import { supabase } from '../client';
import { db } from '../../db/instance';
import { DatabaseError } from '../errors';

export async function migrateData() {
  try {
    const [clients, properties, developers, projects, tasks] = await Promise.all([
      db.clients.toArray(),
      db.properties.toArray(),
      db.developers.toArray(),
      db.projects.toArray(),
      db.tasks.toArray()
    ]);

    // Migrate in sequence to maintain data integrity
    await migrateTable('clients', clients);
    await migrateTable('properties', properties);
    await migrateTable('developers', developers);
    await migrateTable('projects', projects);
    await migrateTable('tasks', tasks);

    return true;
  } catch (error) {
    console.error('Migration error:', error);
    throw new DatabaseError('Failed to migrate data', 'MIGRATION_ERROR');
  }
}

async function migrateTable(table: string, data: any[]) {
  if (data.length === 0) return;

  const { error } = await supabase
    .from(table)
    .upsert(
      data.map(item => ({
        ...item,
        created_at: new Date(item.createdAt).toISOString(),
        updated_at: new Date(item.updatedAt).toISOString()
      }))
    );

  if (error) throw error;
}