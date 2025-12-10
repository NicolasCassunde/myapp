import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/db";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { magicLink } from "better-auth/plugins";
import * as schema from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, ctx) => {
        console.log(url);
      },
    }),
    tanstackStartCookies(),
  ],
});
