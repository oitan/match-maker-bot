export class BaseError extends Error {}

export class WrongPlayerInput extends BaseError {
  constructor(line: string) {
    super(`Something wrong with line ${line}
Please check there is nothing after rating,
and make sure it follows the next formats:
    Name 5.5
    Name Surname 5
    Name (comments) 4.9`);
  }
}

export class WrongNumberOfPlayers extends BaseError {
  constructor(count: number, divider: number) {
    super(
      `There are ${count} players, but it must to be divisible by ${divider}`
    );
  }
}
