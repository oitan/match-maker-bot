import { load } from "./deps.deno.ts";

await load({ export: true });
export default {
  bot: { token: Deno.env.get("BOT_TOKEN") ?? "" },
};
