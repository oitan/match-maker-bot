import { WrongPlayerInput } from "./error.ts";
import { Player } from "./player.ts";
import { Team } from "./team.ts";

export function getMessagePlayers(message: string): Player[] {
  // ignores first line, which must be a command
  const lines = message.split("\n").slice(1);
  return lines.map((line) => {
    const words = line.split(" ");
    const name = words.slice(0, -1).join(" ");
    const rating = words[words.length - 1];
    const isNumber = new RegExp("^[0-9]+(.[0-9]+)?$");
    if (!isNumber.test(rating)) {
      console.error(`[Parsed rating:${rating}]`);
      throw new WrongPlayerInput(line);
    }
    return {
      name,
      rating: Number(rating),
    };
  });
}

export function getTeamInfo(team: Team, index: number) {
  let info = `team ${index + 1}: rating ${team.rating}`;
  for (let i = 0; i < team.players.length; i += 1) {
    const { name, rating } = team.players[i];
    info += `\n  ${i + 1}. ${name}: ${rating}`;
  }

  return info;
}
