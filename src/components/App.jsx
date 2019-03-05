import React from "react";
import Map from './Map';
import { Switch, Route } from 'react-router';
import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Lato');
    font-family: 'Lato', sans-serif;
  }
`;

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      treeData: []
    };
    this.handleApiRequest = this.handleApiRequest.bind(this);
  }



  componentDidMount(){
    this.handleApiRequest();
  }

  render(){
    return (
      <div>
        <GlobalStyles />
        <Switch>
          <Route exact path='/' render={()=> <Map treeData={this.state.treeData} />}  />
        </Switch>
      </div>
    );
  }
}

export default App;
