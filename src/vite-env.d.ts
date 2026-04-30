/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** `mvp` loads leaner auth/shell pages; omit or any other value = full product */
  readonly VITE_APP_VARIANT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
