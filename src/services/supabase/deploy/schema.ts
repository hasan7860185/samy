import { SUPABASE_CONFIG } from '../config';
import { supabase } from '../client';

export async function createSchema() {
  try {
    // Create tables if they don't exist
    for (const table of Object.values(SUPABASE_CONFIG.TABLES)) {
      const { error } = await supabase
        .from(table)
        .select('id')
        .limit(1);

      if (error && error.code === '42P01') { // Table doesn't exist
        console.log(`Creating table: ${table}`);
        const { error: createError } = await supabase.rpc('create_schema', { table });
        if (createError) throw createError;
      }
    }

    return true;
  } catch (error) {
    console.error('Schema creation error:', error);
    throw error;
  }
}