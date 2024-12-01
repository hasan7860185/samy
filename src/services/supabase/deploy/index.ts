import { createSchema } from './schema';
import { migrateData } from './migrate';
import { DatabaseError } from '../errors';

export async function deployToSupabase() {
  try {
    console.log('Creating database schema...');
    await createSchema();

    console.log('Migrating data...');
    await migrateData();

    console.log('Deployment completed successfully');
    return true;
  } catch (error) {
    console.error('Deployment failed:', error);
    throw new DatabaseError(
      'Deployment failed',
      'DEPLOY_ERROR',
      error instanceof Error ? error.message : undefined
    );
  }
}