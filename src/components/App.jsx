import React from "react";
import Map from './Map';
import { createGlobalStyle } from "styled-components";
import { fetchTreeData } from './../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Lato');
    font-family: 'Lato', sans-serif;
  }
`;

function App({ dispatch }){

  return (
    <div>
      {dispatch(fetchTreeData())}
      <GlobalStyles />
    </div>
  );
}

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(App);
