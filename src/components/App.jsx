import React from 'react';
import MapContainer from './MapContainer';
import { createGlobalStyle } from 'styled-components';
import { fetchTreeData } from './../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Lato');
    font-family: 'Lato', sans-serif;
  }
`;
export class App extends React.Component{
  constructor(props){
    super(props);
    const { dispatch } = props;
    dispatch(fetchTreeData())
  }

  // componentDidMount(){
  //   console.log('in app')
  //   dispatch(fetchTreeData());
  // }

  render(){
    let renderedContent;
    if (this.props.treeData['0']) {
      console.log('in condition')
      renderedContent = <MapContainer treeData={this.props.treeData} />
    }
    return (
      <div>
        <GlobalStyles />
        <h1>Hello</h1>
        {renderedContent}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    treeData: state.masterTreeData
  }
}

export default connect(mapStateToProps)(App);
