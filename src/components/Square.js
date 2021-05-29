import React from 'react'
import styled from 'styled-components'
const Button = styled.button`
background-color: rgba(255, 255, 255, 0.8);
border: 5px solid black;
box-shadow: 0 0 10px #9ecaed;
text-align: center;
`
const Img = styled.img`
border: 0;
`
function Square(props) {
  return (
       <Button onClick={props.onClick}>
          <Img height="100px" width="100px" src={props.value}/>
       </Button>
  );
}
export default Square;