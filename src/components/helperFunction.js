import useSound from 'use-sound';
const CalculateWinner= (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        if (squares[a] ==='/static/media/joker.6f94deac.png'){
          return 'Joker';
        }
        else if(squares[a] === '/static/media/Batman.efc2222d.png'){
          return 'Batman';
        }
      }
      else if(!squares.includes(null)){
        return 'Draw';
    }
    }
    return null;
  }
  export default CalculateWinner
