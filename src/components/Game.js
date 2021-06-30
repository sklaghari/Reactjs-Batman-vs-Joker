import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import Board from './Board';
import joker from '../../public/images/joker.png'
import batman from '../../public/images/Batman.png'
import CalculateWinner from './helperFunction'
import useAudio from '../newhooks/useAudio'
import jokerLaugh from '../../public/sounds/joker.wav'
import batmanVictory from '../../public/sounds/batman.wav'
import backgroundMusic from '../../public/sounds/background.mp3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faFacebook,faYoutube,faGithub,faTwitter,faInstagram } from '@fortawesome/free-brands-svg-icons' 
import Audio from './Audio'

const Wrapper = styled.div`
display: grid;
grid-column-gap:0;
grid-row-gap:0;

`
const TopContainer = styled.div`
display: grid;
grid-template-columns: repeat(12, 1fr);
grid-column-gap:0;
`
const SocialMediaDiv = styled.div`
grid-column-start:1;
grid-column-end:3;
margin:0;
display: flex;
align-items: center; 
justify-content: center;
@media (min-width:320px) and (max-width:480px){
  grid-column-start:1;
  grid-column-end:12;
}
`
const SpeakerButtonDivSmall = styled.div`
@media (min-width:480px){
  display:none;
}
@media (min-width:320px) and (max-width:480px){
grid-column-start:12;
grid-column-end:13;
margin:0;
display: flex;
align-items: center; 
justify-content: center;
}
`
const H2 = styled.h2`
grid-column-start:3;
grid-column-end:11;
display: flex;
align-items: center; 
justify-content: center;
background: -webkit-linear-gradient(#cb218e, #333);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-family: 'Raleway',sans-serif; 
font-size: 62px; 
font-weight: 800;
margin:0;
text-transform: uppercase;
margin:0;
@media (min-width:320px) and (max-width:480px){
  grid-column-start:1;
  grid-column-end:13;
  font-size: 32px; 
  font-weight: 800;
}
`
const SpeakerButtonDiv = styled.div`
grid-column-start:11;
grid-column-end:13;
margin:0;
display: flex;
align-items: center; 
justify-content: center;
@media (min-width:320px) and (max-width:480px){
  display:none;
}
`

const MidContainer = styled.div`
display: grid;
grid-template-columns: repeat(12, 1fr);
grid-column-gap:0;
`
const H5 = styled.h5`
grid-column-start:1;
grid-column-end:13;
background: -webkit-linear-gradient(#cb218e, #333);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent; 
font-family: 'Raleway',sans-serif; 
font-size: 28px; 
font-weight: 800;
text-transform: uppercase;
align-self:center;
justify-self:center;
@media (min-width:320px) and (max-width:480px){
  font-size: 16px; 
  font-weight: 800;
}
@media (min-width:411px) and (max-width:823px){
  font-size: 22px; 
  font-weight: 800;
}
`
const BoardDiv = styled.div`
display:grid;
grid-column-gap:0;
grid-row-gap:0;
align-self:center;
justify-self:center;
`
const BottomDiv = styled.div`
display:grid;
grid-template-columns: repeat(12, 1fr);
grid-column-gap:0;
grid-row-gap:0;
@media (min-width:320px) and (max-width:480px){
  grid-template-columns: repeat(3, 1fr);
}
`
const Ul = styled.ul`
list-style-type: none;
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
border-radius: 10px;
@media (min-width:320px) and (max-width:480px){
width: 50px;
height: 20px;
font-size : 8px;
border-radius: 0px;
margin:0;
}
@media (min-width:375px) and (max-width:823px){
width: 80px;
height: 30px;
font-size : 12px;
border-radius: 0px;
margin:0;
}
@media (min-width:375px) and (max-width:823px){
  width: 80px;
  height: 30px;
  font-size : 12px;
  border-radius: 0px;
  margin:0;
  }
`
const SocialButton = styled.a`
padding: 8px;
font-size: 20px;
margin: 5px;
width:16px;
height:16px;
text-decoration: none;
border-radius: 20%;
color:white;
display: flex;
align-items: center; 
justify-content: center;
  ${props =>
    props.facebook &&
    css`
      background: #3B5998;
      color: white;
    `};
  ${props =>
    props.twitter &&
      css`
      background: #55ACEE;
      color: white;
    `};
  ${props =>
    props.youtube &&
      css`
      background: #bb0000;
      color: white;
    `};
  ${props=>
    props.instagram && 
      css`
      background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
      -webkit-text-fill-color: transparent;
      color: white;
    `}    
  ${props =>
      props.github &&
        css`
        background: #333;
        color: white;
      `};
`
const SpeakerButtonSmall = styled(FontAwesomeIcon)`
@media (min-width:320px) and (max-width:480px){
  display:flex;
}
@media (min-width:481px){
  display:none;
}
`
const Game = () => {
  const [playing ,toggle] = useAudio(backgroundMusic)
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)
  const winner = CalculateWinner(history[stepNumber])
  let status;
  if (winner && winner!='Draw'){
    status = winner + ' Wins'
  }
  else if(winner && winner==='Draw'){
    status = 'It is ' + winner
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
              <Button onClick={() => jumpTo(move)}>{destination}</Button>
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
      <div >
        <Wrapper>
          <TopContainer>
            <SocialMediaDiv>
              <SocialButton facebook href= 'https://www.facebook.com/sklaghari/' target='_blank' >
                <FontAwesomeIcon icon={faFacebook}/>
              </SocialButton>
              <SocialButton twitter href= 'https://twitter.com/sklaghari' target='_blank' >
                <FontAwesomeIcon icon={faTwitter}/>
              </SocialButton>
              <SocialButton youtube href= 'https://youtu.be/rEyEAwhdyxc' target='_blank' >
                <FontAwesomeIcon icon={faYoutube}/>
              </SocialButton>
              <SocialButton instagram href='https://www.instagram.com/sklaghari/' target ='_blank'>
                <FontAwesomeIcon icon={faInstagram}/>
              </SocialButton>
              <SocialButton  github href= 'https://github.com/sklaghari' target='_blank' >
                <FontAwesomeIcon  icon={faGithub}/>
              </SocialButton>
            </SocialMediaDiv>
            <SpeakerButtonDivSmall onClick={toggle}>
              {playing ? <FontAwesomeIcon icon={faVolumeUp} size = '1x' color='white'/> :
                <FontAwesomeIcon icon={faVolumeMute} size = '1x' color='white'/>
              }
            </SpeakerButtonDivSmall>
            <H2>Arkham city</H2>
            <SpeakerButtonDiv onClick={toggle}>
              {playing ? <FontAwesomeIcon icon={faVolumeUp} size = '2x' color='white'/> :
                <FontAwesomeIcon icon={faVolumeMute} size = '2x' color='white'/>
              }
            </SpeakerButtonDiv>
          </TopContainer>
          <MidContainer><H5>{status}</H5></MidContainer>
          <BoardDiv><Board squares={history[stepNumber]} onClick={ i =>handleClick(i)}/></BoardDiv>
          <BottomDiv>{renderMoves()}</BottomDiv>
          <div>{renderSound()}</div>
        </Wrapper>
      </div>
    );
}
export default Game