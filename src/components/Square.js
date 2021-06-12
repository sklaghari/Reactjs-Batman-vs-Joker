import React from 'react'
import styled from 'styled-components'
const Button = styled.button`
background-color: rgba(255, 255, 255, 0.8);
border: 5px solid black;
box-shadow: 0 0 10px #9ecaed;
text-align: center;
@media (min-width:320px) and (max-width:480px){
  width: 100px; 
  height: 100px; 
  margin:0;
}
`
const Img = styled.img`
border: 0;
@media (min-width:320px) and (max-width:480px){
  width: 80px; 
  height: 80px; 
  margin:0  
}
`
function Square(props) {
  return (
       <Button onClick={props.onClick}>
          <Img height="100px" width="100px" src={props.value}/>
       </Button>
  );
}
export default Square;