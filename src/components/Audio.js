import React from 'react'

const Audio = ({sound}) =>(
    <audio autoPlay>
        <source src={sound}/>
    </audio>
)

export default Audio