import { load } from "https://deno.land/std/dotenv/mod.ts";

await load({ export: true });
export default {
  bot: { token: Deno.env.get("BOT_TOKEN") ?? "" },
};
