#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

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

async function deploy() {
  try {
    console.log('Starting deployment...');
    
    await loadEnv();

    // Build the application
    console.log('Building application...');
    execSync('npm run build', { stdio: 'inherit' });

    // Run migrations
    console.log('Running migrations...');
    execSync('npm run migrate', { stdio: 'inherit' });

    console.log('Deployment completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deploy();