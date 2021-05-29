import React, { Fragment } from 'react';
import GlobalStyle from './theme/globalStyles';
import Game from './components/Game'
function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Game/>
    </Fragment>
  );
}
export default App;