import React from 'react'
import Square from './Square'
import styled from 'styled-components'
const Grid = styled.div`
grid-column-start:1;
grid-column-end:13;
	display: grid;
  height:350px;
  width:350px;
  grid-column-gap:0;
  grid-template-columns: auto auto auto;
  @media (min-width:320px) and (max-width:480px){
    height:290px;
    width:290px;
    margin:0;
  }
`
const Board = ({ squares, onClick }) => (
	<Grid>
    {squares.map((square,i)=>(
      <Square key = {i} value = {square} onClick = {() => onClick(i)}/>
    ))}
  </Grid>
);
export default Board;
