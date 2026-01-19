/**
 * Tipos generados automáticamente para la base de datos de Supabase
 * Estos tipos se generan a partir del esquema de la base de datos
 * 
 * Para generar estos tipos automáticamente:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          long_description: string;
          image: string;
          images: string[];
          technologies: string[];
          category: 'BackEnd' | 'FrontEnd' | 'Mobile' | 'FullStack' | 'DevOps';
          documentation_url: string | null;
          repository_url: string;
          live_url: string | null;
          featured: boolean;
          created_at: string;
          updated_at: string;
          order: number;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          long_description: string;
          image: string;
          images?: string[];
          technologies: string[];
          category: 'BackEnd' | 'FrontEnd' | 'Mobile' | 'FullStack' | 'DevOps';
          documentation_url?: string | null;
          live_url?: string | null;
          repository_url: string;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
          order?: number;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          long_description?: string;
          image?: string;
          images?: string[];
          technologies?: string[];
          category?: 'BackEnd' | 'FrontEnd' | 'Mobile' | 'FullStack' | 'DevOps';
          documentation_url?: string | null;
          live_url?: string | null;
          repository_url?: string;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
          order?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      project_category: 'BackEnd' | 'FrontEnd' | 'Mobile' | 'FullStack' | 'DevOps';
    };
  };
}
