/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_ADMIN_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv & {
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly MODE: string;
  };
}
