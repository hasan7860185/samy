import { supabase } from './client';
import { RealtimeChannel } from '@supabase/supabase-js';

export class RealtimeService {
  private channels: Map<string, RealtimeChannel> = new Map();

  subscribeToTable(
    table: string,
    callback: (payload: any) => void
  ) {
    if (this.channels.has(table)) {
      return;
    }

    const channel = supabase
      .channel(`public:${table}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        payload => callback(payload)
      )
      .subscribe();

    this.channels.set(table, channel);
  }

  unsubscribeFromTable(table: string) {
    const channel = this.channels.get(table);
    if (channel) {
      channel.unsubscribe();
      this.channels.delete(table);
    }
  }

  unsubscribeAll() {
    this.channels.forEach(channel => channel.unsubscribe());
    this.channels.clear();
  }
}

export const realtime = new RealtimeService();