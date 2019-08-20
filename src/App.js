import React from 'react';
import Board from './components/Board';
import styled from 'styled-components';

const TetrisContainer = styled.div`
  margin: 50px auto;
`

const App = () => {
  return ( 
      <TetrisContainer>
        <Board /> 
      </TetrisContainer>
    );
}
 
export default App;