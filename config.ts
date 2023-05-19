import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();
export default {
  bot: { token: env["BOT_TOKEN"] },
};
