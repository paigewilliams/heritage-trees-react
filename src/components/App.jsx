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
    this.state = {
      showAllData: true
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleShowFilteredData = this.handleShowFilteredData.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchTreeData());
  }

  handleToggle() {
    this.state.showAllData === true ? this.setState({ showAllData: false }) : this.setState({ showAllData: true });
  }

  handleShowFilteredData() {
    this.setState({ showAllData: false });
  }

  render() {
    let renderedContent;
    if (Object.entries(this.props.treeData).length !== 0) {
      if (this.state.showAllData === true) {
        renderedContent = <MapContainer treeData={this.props.treeData} />;
      } else if (Object.entries(this.props.filteredTreeData).length !== 0 & this.state.showAllData === false) {
        renderedContent = <MapContainer treeData={this.props.filteredTreeData} />;
      } else {
        renderedContent = <MapContainer treeData={this.props.treeData} />;
      }
    }
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
          <AddressForm onFormSubmit={this.handleShowFilteredData} />
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
