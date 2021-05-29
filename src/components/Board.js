import React from 'react'
import Square from './Square'
import styled from 'styled-components'
const Grid = styled.div`
	margin: 0 auto;
	display: grid;
  margin-top: 70px;
  height:350px;
  width:350px;
  grid-template-columns: auto auto auto;
`
const Board = ({ squares, onClick }) => (
	<Grid>
    {squares.map((square,i)=>(
      <Square key = {i} value = {square} onClick = {() => onClick(i)}/>
    ))}
  </Grid>
);
export default Board;
