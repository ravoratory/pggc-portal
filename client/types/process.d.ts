declare namespace NodeJS {
  export interface ProcessEnv {
    AUTH_SECRET: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    PGRIT_URL: string
    CLIENT_ID: string
    CLIENT_SECRET: string
  }
}
