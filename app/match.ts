import { WrongNumberOfPlayers } from "./error.ts";
import { Player } from "./player.ts";
import { Team, calcTeamRating } from "./team.ts";

export function sortPlayers(players: Player[]): Team[] {
  if (players.length % 3) {
    throw new WrongNumberOfPlayers(players.length, 3);
  }

  // Sort players based on their skill rating in descending order
  players.sort((a, b) => b.rating - a.rating);

  const teams: Team[] = [
    { rating: 0, players: [] },
    { rating: 0, players: [] },
    { rating: 0, players: [] },
  ];

  // Distribute players using sorted position fair division
  for (let i = 0; i < players.length; i++) {
    const player = players[i];

    // Find the team with the lowest total skill rating so far
    let minTeamIndex = 0;
    let minTotalRating = calcTeamRating(teams[0]);
    for (let j = 1; j < teams.length; j++) {
      const totalRating = calcTeamRating(teams[j]);
      if (totalRating < minTotalRating) {
        minTeamIndex = j;
        minTotalRating = totalRating;
      }
    }

    teams[minTeamIndex].players.push(player);
    teams[minTeamIndex].rating += player.rating;
  }

  const [maxTeam, _, minTeam] = teams.sort((a, b) => b.rating - a.rating);

  const newDiff = minimizeDifference(maxTeam, minTeam);

  console.log(maxTeam.rating, minTeam.rating, newDiff);

  return teams;
}

export function minimizeDifference(team1: Team, team2: Team): number {
  const { rating: rating1, players: players1 } = team1;
  const { rating: rating2, players: players2 } = team2;
  let index1 = -1;
  let index2 = -1;

  // Calculate the initial difference
  let minDiff = Math.abs(rating1 - rating2);

  // Iterate through each pair of numbers (one from each list)
  for (const [i1, p1] of players1.entries()) {
    for (const [i2, p2] of players2.entries()) {
      // Calculate the difference if the numbers are swapped
      const tempSum1 = rating1 - p1.rating + p2.rating;
      const tempSum2 = rating2 - p2.rating + p1.rating;
      const tempDiff = Math.abs(tempSum1 - tempSum2);

      // Update the minimum difference if a smaller difference is found
      if (tempDiff < minDiff) {
        minDiff = tempDiff;
        index1 = i1;
        index2 = i2;
      }
    }
  }

  if (index1 !== -1 && index2 !== -1) {
    const pRating1 = players1[index1].rating;
    const pRating2 = players2[index2].rating;
    team1.rating = rating1 - pRating1 + pRating2;
    team2.rating = rating2 - pRating2 + pRating1;

    const temp = players1[index1];
    players1[index1] = players2[index2];
    players2[index2] = temp;
  }

  return minDiff;
}
