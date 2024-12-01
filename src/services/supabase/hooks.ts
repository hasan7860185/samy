import { useState, useEffect } from 'react';
import { supabase } from './client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from './config';

export function useRealtimeSubscription<T>(
  table: string,
  callback: (payload: T) => void
) {
  useEffect(() => {
    let channel: RealtimeChannel;

    const subscribe = async () => {
      channel = supabase
        .channel(SUPABASE_CONFIG.REALTIME.CHANNELS.DATABASE_CHANGES)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table },
          payload => callback(payload as T)
        )
        .subscribe();
    };

    subscribe();

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [table, callback]);
}

export function useSupabaseQuery<T>(
  query: () => Promise<T>,
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await query();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, deps);

  return { data, error, loading };
}