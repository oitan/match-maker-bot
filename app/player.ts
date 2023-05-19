export interface Player {
  name: string;
  rating: number;
}

export function sumPlayersRating(players: Player[]) {
  return players.reduce((total, player) => total + player.rating, 0);
}
