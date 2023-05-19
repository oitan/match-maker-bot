import { Bot, Context } from "../deps.deno.ts";
import config from "../config.ts";
import { getMessagePlayers } from "./formatter.ts";
import { sortPlayers } from "./match.ts";
import { BaseError } from "./error.ts";
import { getTeamInfo } from "./formatter.ts";

export const bot = new Bot(config.bot.token);

console.log("bot is listening");

function handlerError(ctx: Context, err: Error) {
  if (err instanceof BaseError) {
    return ctx.reply(err.message);
  }
  return ctx.reply(`Unknown error, please report to @oitan. ${new Date()}`);
}

bot.command("start", (ctx) => {
  ctx.reply(
    "Try something like next and don't forget to include the /match command on the top"
  );
  return ctx.reply(exampleMatchMessage);
});

bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));

bot.command("match", (ctx) => {
  try {
    const players = getMessagePlayers(ctx.message?.text!);

    console.log("input of match command:");
    console.log(players);

    if (players.length !== 15) {
      return ctx.reply("Number of players must be 15");
    }

    ctx.reply("creating a match for these players ...");
    const balancedTeams = sortPlayers(players);
    return ctx.reply(balancedTeams.map(getTeamInfo).join("\n\n"));
  } catch (err) {
    handlerError(ctx, err);
  }
});

const exampleMatchMessage = `/match
Темир 3
Дінмухаммед 4.5
Аян 5
Anuar 5.5
Alikhan 6.5
Тамир 4
Дамир Елдар 4
Sultanbek 5
Doni 5.5
Амир 6
Алишер 3
Ораз 4.5
Даниял 5
Саламат 5.5
yeldar 6.5`;
