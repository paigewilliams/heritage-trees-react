import React from 'react';
import MapContainer from './MapContainer';
import AddressForm from './AddressForm';
import LayerToggle from './LayerToggle';
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

const MapContainerStyles = styled.div`
  width: 50%;
  height: 50%;
  margin-top: 5rem;
  margin-left: 30rem;
`;

export class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      allData: true
    }
    dispatch(fetchTreeData());
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.state.allData === true ? this.setState({allData: false}) : this.setState({allData: true});
  };

  render() {
    let renderedContent;
    Object.entries(this.props.treeData).length !== 0 ?
      renderedContent = <MapContainer treeData={Object.entries(this.props.filteredTreeData).length !== 0 ? this.props.filteredTreeData : this.props.treeData} />
      : null;

    return (
      <div>
        <GlobalStyles />
        <MapContainerStyles>
          {renderedContent}
        </MapContainerStyles>
        <div>
          <div>
            <h1>Portland Heritage Trees</h1>
          </div>
          <AddressForm />
          <LayerToggle onToggle={this.handleToggle} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  treeData: PropTypes.object,
  filteredTreeData: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    treeData: state.treeData,
    filteredTreeData: state.filteredTreeData
  };
};

export default connect(mapStateToProps)(App);
