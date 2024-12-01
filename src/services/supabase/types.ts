export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          email: string;
          role: string;
          created_at: string;
        };
        Insert: {
          username: string;
          email: string;
          role: string;
        };
        Update: {
          username?: string;
          email?: string;
          role?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string;
          facebook_id?: string;
          status: string;
          notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          phone: string;
          email?: string;
          facebook_id?: string;
          status: string;
          notes?: string;
        };
        Update: {
          name?: string;
          phone?: string;
          email?: string;
          facebook_id?: string;
          status?: string;
          notes?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          title: string;
          title_en: string;
          description?: string;
          description_en?: string;
          type: string;
          status: string;
          price: number;
          area: number;
          location: any;
          features?: any;
          media?: any;
          owner: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          title_en: string;
          description?: string;
          description_en?: string;
          type: string;
          status: string;
          price: number;
          area: number;
          location: any;
          features?: any;
          media?: any;
          owner: any;
        };
        Update: {
          title?: string;
          title_en?: string;
          description?: string;
          description_en?: string;
          type?: string;
          status?: string;
          price?: number;
          area?: number;
          location?: any;
          features?: any;
          media?: any;
          owner?: any;
        };
      };
      developers: {
        Row: {
          id: string;
          name: string;
          name_en: string;
          description?: string;
          description_en?: string;
          logo_url?: string;
          website?: string;
          email?: string;
          phone?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          name_en: string;
          description?: string;
          description_en?: string;
          logo_url?: string;
          website?: string;
          email?: string;
          phone?: string;
        };
        Update: {
          name?: string;
          name_en?: string;
          description?: string;
          description_en?: string;
          logo_url?: string;
          website?: string;
          email?: string;
          phone?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          developer_id: string;
          name: string;
          name_en: string;
          description?: string;
          description_en?: string;
          location: any;
          type: string;
          status: string;
          start_date: string;
          completion_date: string;
          total_units: number;
          price: any;
          features?: any;
          media?: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          developer_id: string;
          name: string;
          name_en: string;
          description?: string;
          description_en?: string;
          location: any;
          type: string;
          status: string;
          start_date: string;
          completion_date: string;
          total_units: number;
          price: any;
          features?: any;
          media?: any;
        };
        Update: {
          developer_id?: string;
          name?: string;
          name_en?: string;
          description?: string;
          description_en?: string;
          location?: any;
          type?: string;
          status?: string;
          start_date?: string;
          completion_date?: string;
          total_units?: number;
          price?: any;
          features?: any;
          media?: any;
        };
      };
      tasks: {
        Row: {
          id: string;
          title: string;
          title_en: string;
          description?: string;
          description_en?: string;
          due_date: string;
          status: string;
          priority: string;
          assigned_to?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          title_en: string;
          description?: string;
          description_en?: string;
          due_date: string;
          status: string;
          priority: string;
          assigned_to?: string;
        };
        Update: {
          title?: string;
          title_en?: string;
          description?: string;
          description_en?: string;
          due_date?: string;
          status?: string;
          priority?: string;
          assigned_to?: string;
        };
      };
    };
  };
}
