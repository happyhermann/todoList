import React from 'react';
import { createGlobalStyle } from 'styled-components';
import ToDoList from './ToDoList';

const GlobalStyle = createGlobalStyle`
  body {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 20px;
      font-weight: 300;
      background-color:${(props) => props.theme.bgColor};
      color:${(props) => props.theme.textColor};
      line-height: 1.2;
  }
  a {
      text-decoration: none;
      color: inherit;
      /* inherit 부모 색깔 받아옴 */
    }

`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <ToDoList />
    </div>
  );
}

export default App;
