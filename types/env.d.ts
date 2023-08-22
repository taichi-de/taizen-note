declare namespace NodeJS {
  interface ProcessEnv {
    readonly SERVICE_DOMAIN: string;
    readonly MICROCMS_API_KEY: string;
  }
}
