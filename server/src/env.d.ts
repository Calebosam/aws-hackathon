declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      // Database variables
      HOST: string;
      PORT: number | string;
      DATABASE: string;
      USER: string;
      PASSWORD: string;

      // Server variables
      SERVER_PORT: number | string;
      CLIENT_PORT: number | string;
      SECRET: Key;

      // Misc variables
      EMAIL_SMTP: string;
      EMAIL_ADDRESS: string;
      EMAIL_PASSWORD: string;
      SMTP_PORT: number | undefined;
    }
  }
}

export {}
