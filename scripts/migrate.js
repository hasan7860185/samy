#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { deployToSupabase } from '../src/services/supabase/deploy/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadEnv() {
  try {
    dotenv.config({ path: join(__dirname, '..', '.env') });
    
    if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
      throw new Error('Missing required Supabase environment variables');
    }
  } catch (error) {
    console.error('Error loading environment variables:', error);
    throw error;
  }
}

async function migrate() {
  try {
    console.log('Starting migration...');
    await loadEnv();
    await deployToSupabase();
    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();