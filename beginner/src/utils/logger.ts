/**
 * 🪵 Simple Logger
 * Why? console.log is great, but sometimes we want to know WHEN something happened.
 * This util adds a timestamp to your logs.
 */
export const logger = {
  info: (message: string) => {
    console.log(`[INFO] ${new Date().toLocaleTimeString()} - ${message}`);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${new Date().toLocaleTimeString()} - ${message}`, error);
  },
};
