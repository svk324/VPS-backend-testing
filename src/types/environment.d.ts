declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      DATABASE_URL: string;
      NODE_ENV?: "development" | "production";
    }
  }
}

export {};
