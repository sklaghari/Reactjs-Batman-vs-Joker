import React, {useState} from 'react'
import styled from 'styled-components'
import Board from './Board';
import joker from '../../public/images/joker.png'
import batman from '../../public/images/Batman.png'
import CalculateWinner from './helperFunction'
import useAudio from '../newhooks/useAudio'
import useSound from 'use-sound'
import jokerLaugh from '../../public/sounds/joker.wav'
import batmanVictory from '../../public/sounds/batman.wav'
import backgroundMusic from '../../public/sounds/background.mp3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import Audio from './Audio'


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
  const [playing ,toggle] = useAudio(backgroundMusic)
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)
  const [jokerSound] = useSound(jokerLaugh)
  const winner = CalculateWinner(history[stepNumber])
  let status;
  if (winner && winner!='Draw'){
    status = 'Winner: ' + winner
  }
  else if(winner && winner==='Draw'){
    status = 'It is ' + winner +" Batman Vs Joker"
  }
  else{
    status = "Next player: " + (xIsNext ? "Joker" : "Batman")
  }
 // let status = winner ? 'Winner: ' + winner : "Next player: " +(xIsNext ? "Joker" : "Batman")
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
  const renderSound =()=>{
    if(winner ==='Joker'){
      return(
        <Audio sound={jokerLaugh}/>
      )
    }
    else if(winner === 'Batman'){
      return(
        <Audio sound={batmanVictory}/>
      )
    }
  }
    return (
      <div className="game">
        <div><h2>Arkham city</h2></div>
        <div onClick={toggle}>
            {playing ? <FontAwesomeIcon 
              icon={faVolumeUp} size = '2x' 
              color='#656e72'/> :
              <FontAwesomeIcon icon={faVolumeMute} size = '2x' color='#656e72'/>
            }
        </div>
        <div>
          <Board
            squares={history[stepNumber]}
            onClick={i => handleClick(i)}
          />
        </div>
        <div>
          <Div>{status}</Div>
          <Div>{renderMoves()}</Div>
          <div>{renderSound()}</div>
        </div>
      </div>
    );
}
export default Game