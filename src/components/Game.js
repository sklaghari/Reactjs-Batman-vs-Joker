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
const Button = styled.button`
  width: 110px;
  height: 50px;
  font-size : 14px;
  border: none;
  outline: none;
  color: #fff;
  background-color #3f0d12;
  background-image linear-gradient(315deg, #3f0d12 0%, #a71d31 74%);  
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
`
const H2 = styled.h2`
background: -webkit-linear-gradient(#cb218e, #333);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-family: 'Raleway',sans-serif; 
font-size: 62px; 
font-weight: 800; 
line-height: 72px; 
margin: 0 0 24px; 
text-align: center; 
text-transform: uppercase;
`
const H5 = styled.h5`
background: -webkit-linear-gradient(#cb218e, #333);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent; 
font-family: 'Raleway',sans-serif; 
font-size: 28px; 
font-weight: 800; 
margin: 0; 
text-align: center; 
text-transform: uppercase;
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
    status = winner + ' Wins'
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
      const destination = move ?'Go to move ' + move : 'Start Game'
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
        <H2>Arkham city</H2>
        <Div onClick={toggle}>
            {playing ? <FontAwesomeIcon 
              icon={faVolumeUp} size = '2x' 
              color='#656e72'/> :
              <FontAwesomeIcon icon={faVolumeMute} size = '2x' color='#656e72'/>
            }
        </Div>
        <div>
          <br/>
        <H5>{status}</H5>
          <Board
            squares={history[stepNumber]}
            onClick={i => handleClick(i)}
          />
        </div>
        <div>
          <Div>{renderMoves()}</Div>
          <div>{renderSound()}</div>
        </div>
      </div>
    );
}
export default Game