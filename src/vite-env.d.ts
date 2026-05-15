/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY: string | undefined;
  readonly VITE_SITE_URL: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
