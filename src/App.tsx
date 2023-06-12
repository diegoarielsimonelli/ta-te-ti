import {useState} from "react";

const GRID = Array.from<number>(Array(9).keys());

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const DRAW_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  [1, 5, 8],
  [0, 4, 7],
  [2, 4, 5],
  [0, 3, 8],
  [2, 3, 6],
  [1, 3, 7],
  [1, 2, 6],
  [0, 5, 6],
  [0, 2, 7],
  [0, 6, 8],
  [1, 2, 4],
  [1, 6, 8],
  [2, 3, 7],
  [2, 5, 7],
  [0, 1, 6],
  [0, 4, 5],
  [3, 5, 7],
  [3, 6, 8],
  [2, 4, 7],
  [1, 3, 6],
  [1, 4, 6],
];

export default function App() {
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [plays, setPlays] = useState<Map<number, "X" | "O">>(new Map());

  function resetGame() {
    setPlays(new Map());
    setPlayer("X");
  }
  function handleClick(cell: number) {
    if (plays.has(cell)) return;
    const draft = new Map(plays);

    draft.set(cell, player);
    const winner = WINNING_COMBINATIONS.find((comp) =>
      comp.every((cell) => draft.get(cell) === player),
    );
    const isDraw = DRAW_COMBINATIONS.every((comp) => comp.every((cell) => draft.get(cell)));

    if (winner) {
      alert("The Winner is " + (player == "X" ? "Player 1: ✖️" : "Player 2: ⭕"));
      resetGame();

      return;
    }
    if (isDraw) {
      alert("It's a draw");
      resetGame();

      return;
    }
    setPlays(draft);
    setPlayer((setplayer) => (setplayer === "X" ? "O" : "X"));
  }

  return (
    <>
      <div style={{display: "flex", gap: 10, placeContent: "center"}}>
        <h2>SHIFT- {player == "X" ? "Player 1: ✖️" : "Player 2: ⭕"}</h2>
        <button style={{margin: 5}} onClick={() => resetGame()}>
          Reset
        </button>
      </div>
      <main>
        {GRID.map((i) => (
          <button key={i} onClick={() => handleClick(i)}>
            {plays.get(i)}
          </button>
        ))}
      </main>
    </>
  );
}
