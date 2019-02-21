import React from "react";
import Map from './Map';
import ApiControl from './ApiControl';
import { Switch, Route } from 'react-router';
import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Lato');
    font-family: 'Lato', sans-serif;
  }
`;


function App(){

  return (
    <div>
      <GlobalStyles />
      <Switch>
        <Route exact path='/' component={Map} />
        <Route path='/api' component={ApiControl} />
      </Switch>
    </div>
  );
}

export default App;
