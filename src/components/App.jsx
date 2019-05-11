import React from 'react';
import MapContainer from './MapContainer';
import AddressForm from './AddressForm';
import { createGlobalStyle } from 'styled-components';
import { fetchTreeData } from './../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';


const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Lato');
    font-family: 'Lato', sans-serif;
  }

`;

const BodyStyles = styled.div`

`;

const MapContainerStyles = styled.div`
  width: 50%;
  height: 50%;
  margin-top: 200px;
  margin-left: 300px;
`;

export class App extends React.Component{
  constructor(props){
    super(props);
    const { dispatch } = props;
    dispatch(fetchTreeData());
  }




  render(){
    let renderedContent;
    if (this.props.treeData !== {}) {
      renderedContent = <MapContainer treeData={this.props.treeData} />;
    }
    return (
      <BodyStyles>
        <GlobalStyles />
        <MapContainerStyles>
          {renderedContent}
        </MapContainerStyles>
        <div>
          <AddressForm />
        </div>


      </BodyStyles>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    treeData: state.treeData,
    currentCoords: state.currentCoords
  };
};

export default connect(mapStateToProps)(App);
