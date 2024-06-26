import { beforeEach, describe, expect, test } from "vitest";
import { Game, GameState, PlayerTurn } from "./game";

let _game: Game;
function game() {
  return _game;
}

beforeEach(() => {
  _game = new Game();
});

describe("state", () => {
  test("human win", () => {
    run([
      { pos: 4, state: GameState.Playing },
      { pos: 5, state: GameState.Playing },
      { pos: 0, state: GameState.Playing },
      { pos: 8, state: GameState.Playing },
      { pos: 2, state: GameState.Playing },
      { pos: 6, state: GameState.Playing },
      { pos: 1, state: GameState.P1Won },
    ]);
  })

  test("ai win", () => {
    run([
      { pos: 0, state: GameState.Playing },
      { pos: 3, state: GameState.Playing },
      { pos: 1, state: GameState.Playing },
      { pos: 2, state: GameState.Playing },
      { pos: 6, state: GameState.Playing },
      { pos: 4, state: GameState.Playing },
      { pos: 7, state: GameState.Playing },
      { pos: 5, state: GameState.P2Won },
    ]);
  })

  test("draw", () => {
    run([
      { pos: 4, state: GameState.Playing },
      { pos: 0, state: GameState.Playing },
      { pos: 2, state: GameState.Playing },
      { pos: 6, state: GameState.Playing },
      { pos: 3, state: GameState.Playing },
      { pos: 5, state: GameState.Playing },
      { pos: 7, state: GameState.Playing },
      { pos: 1, state: GameState.Playing },
      { pos: 8, state: GameState.Draw },
    ]);
  })

  function run(scenario: { pos: number, state: GameState }[]) {
    const a = scenario.map(({ pos }) => {
      game().place(pos);
      return {
        pos,
        state: game().state,
      }
    })
    const b = scenario.map(({ pos, state }) => {
      return {
        pos,
        state,
      }
    })
    expect(a).toStrictEqual(b);
  }
});

test("place", () => {
  expect(game().board.state).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  game().place(4);
  expect(game().board.state).toStrictEqual([0, 0, 0, 0, 1, 0, 0, 0, 0]);
  game().place(4);
  expect(game().board.state).toStrictEqual([0, 0, 0, 0, 1, 0, 0, 0, 0]);
});

describe("howToWin", () => {
  test("human win", () => {
    run([4, 5, 0, 8, 2, 6, 1,]);
    expect(game().howToWin()).toBe(7);
  })

  test("ai win", () => {
    run([0, 3, 1, 2, 6, 4, 7, 5,]);
    expect(game().howToWin()).toBe(56);
  })

  test("draw", () => {
    run([4, 0, 2, 6, 3, 5, 7, 1, 8,]);
    expect(game().howToWin()).toBeUndefined();
  })

  function run(scenario: number[]) {
    scenario.forEach((pos) => {
      game().place(pos);
    });
  }
})