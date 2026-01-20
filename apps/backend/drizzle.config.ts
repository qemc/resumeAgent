import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: "./src/db/schema.ts", // Point this to your actual file path
  dialect: "sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
});


// To do:
// Push DB
// implement password hash
// Create user login