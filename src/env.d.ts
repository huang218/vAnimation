interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string
  readonly VITE_BASE_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
