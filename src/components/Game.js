import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Board from './Board';
import joker from '../../public/images/joker.png'
import batman from '../../public/images/Batman.png'
import CalculateWinner from './helperFunction'
const Ul = styled.ul`
list-style-type: none;
`
const Div = styled.div`
display: flex;
justify-content: center;
color: white;
font-size: 20px;
font-weight: bold;
margin-top:2px;
`
const StartButton = styled.button`
  background-color: #d387ab;
  background-image: linear-gradient(315deg, #d387ab 0%, #b279a7 74%);
  border: none;
  font-weight: bold;
  color: black;
  padding: 5px;
  margin:1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
`
const Button = styled.button`
  background-color #ff4e00;
  background-image linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);
  border: none;
  font-weight: bold;
  color: black;
  padding: 5px;
  margin:1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
`
const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)
  const winner = CalculateWinner(history[stepNumber])
  let status = winner ? 'Winner: ' +winner : "Next player: " +(xIsNext ? "Joker" : "Batman")
  const handleClick = (i) => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber]
    const squares = [...current]
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? joker: batman;
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = step => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0) 
  }
  const renderMoves = () => (
    history.map((_step, move) => {
      const destination = move ?'Go to move #' + move : 'Go to game start'
        return (
          <Ul>
            <li key={move}>
              <Div><Button onClick={() => jumpTo(move)}>{destination}</Button></Div>
            </li>
          </Ul>
        )
      }) 
  )
    return (
      <div className="game">
        <div>
          <Board
            squares={history[stepNumber]}
            onClick={i => handleClick(i)}
          />
        </div>
        <div>
          <Div>{status}</Div>
          <Div>{renderMoves()}</Div>
        </div>
      </div>
    );
}
export default Game