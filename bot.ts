import { Bot } from "./deps.deno.ts";
import config from "./config.ts";

export const bot = new Bot(config.bot.token);

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));
