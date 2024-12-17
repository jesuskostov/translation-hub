export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          updated_at?: string;
        };
      };
      translations: {
        Row: {
          id: string;
          project_id: string;
          key: string;
          en: string;
          fr: string;
          it: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          key: string;
          en: string;
          fr: string;
          it: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          project_id?: string;
          key?: string;
          en?: string;
          fr?: string;
          it?: string;
          updated_at?: string;
        };
      };
    };
  };
}