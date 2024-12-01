import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function syncToCloud(userId: string, data: any) {
  try {
    const { error } = await supabase
      .from('user_data')
      .upsert({ 
        user_id: userId,
        data: data,
        updated_at: new Date().toISOString()
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error syncing to cloud:', error);
    throw error;
  }
}

export async function syncFromCloud(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_data')
      .select('data')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.data;
  } catch (error) {
    console.error('Error syncing from cloud:', error);
    throw error;
  }
}