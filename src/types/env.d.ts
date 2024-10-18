declare namespace NodeJS {
  interface ProcessEnv {
    DISCORD_BOT_TOKEN: string;
    PORT: number;
    BOT_TEST_CHANNEL_ID: string;
    BOT_LOG_CHANNEL_ID: string;
  }
}
