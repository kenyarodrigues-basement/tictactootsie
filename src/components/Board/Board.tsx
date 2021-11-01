import { useState } from "react";
import { Button } from "../Button/Button";
import { RestartButton } from "../RestartButton/RestartButton";
import './Board.css'

const results = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function Board() {
  //States needed to control players and symbols on"boardButton
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
  const [symbols, setSymbols] = useState<Array<'X' | 'O' | null>>([null, null, null, null, null, null, null, null, null])
  const [turn, setTurn] = useState(0)
  const [winner, setWinner] = useState<'X' | 'O' | 'DRAW' | null>(null)
  //const [clickDisable, setClickDisable] = useState(false)

  //Function receives index from symbols array as parameter
  function markOnButton(index: number) {
    if (winner) return;
    //To update symbols[], map method is used
    const updatedSymbols = symbols.map((currentSymbol, idx) => {
      //if the index being mapped is equals to the received index parameter, the element is changed in updatedSymbols[]
      if (idx === index) {
        return currentPlayer;
      }
      //if mapped index is different, keep currentSymbol
      return currentSymbol;
    })
    setSymbols(updatedSymbols);

    //To set current player, if current player is equal to X, change to 'O', else change it to 'X'
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    setTurn(turn + 1);
    checkWinner(updatedSymbols, index);
  }

  function checkWinner(symbols: Array<'X' | 'O' | null>, index: number) {
    const currentTurn = turn + 1;
    if (currentTurn < 5) return;

    const filteredResults = results.filter((combination) => {
      if (combination.includes(index)) return true;

      return false;
    });

    filteredResults.forEach((combination) => {
      const [a, b, c] = combination;

      if (symbols[a] && symbols[a] === symbols[b] && symbols[b] === symbols[c]) {
        setWinner(currentPlayer);
      }
      else if (currentTurn === 9 && (symbols[a] !== symbols[b] || symbols[b] !== symbols[c])){
        setWinner('DRAW');
      }
    })
  }

  function RestartGame() {
    setSymbols(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    setTurn(0)
  }

  function declareWinner() {
    if (winner === 'X' || winner === 'O') return 'The winner is ' + winner;
    if (winner === 'DRAW') return 'Nobody won this round'
  }

  return (
    <div className="Container">
      <div className="BoardContainer">
        <Button className="boardButton" onClick={() => markOnButton(0)} symbol={symbols[0]} />
        <Button className="boardButton" onClick={() => markOnButton(1)} symbol={symbols[1]} />
        <Button className="boardButton" onClick={() => markOnButton(2)} symbol={symbols[2]} />
        <Button className="boardButton" onClick={() => markOnButton(3)} symbol={symbols[3]} />
        <Button className="boardButton" onClick={() => markOnButton(4)} symbol={symbols[4]} />
        <Button className="boardButton" onClick={() => markOnButton(5)} symbol={symbols[5]} />
        <Button className="boardButton" onClick={() => markOnButton(6)} symbol={symbols[6]} />
        <Button className="boardButton" onClick={() => markOnButton(7)} symbol={symbols[7]} />
        <Button className="boardButton" onClick={() => markOnButton(8)} symbol={symbols[8]} />
      </div>
      <div className="ResultsContainer">
        <h3>{declareWinner()}</h3>
        <RestartButton className="restartButton" onClick={() => RestartGame()} />
      </div>
    </div>
  )
}