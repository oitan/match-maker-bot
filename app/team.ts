import { Player, sumPlayersRating } from "./player.ts";

export interface Team {
  rating: number;
  players: Player[];
}

export function calcTeamRating({ players }: Team) {
  return sumPlayersRating(players);
}
