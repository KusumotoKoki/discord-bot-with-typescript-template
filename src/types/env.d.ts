declare namespace NodeJS {
  interface ProcessEnv {
    DISCORD_BOT_TOKEN: string;
    PORT: number;
    BOT_TEST_CHANNEL_ID: string;
    OPENAI_API_KEY: string;
  }
}
