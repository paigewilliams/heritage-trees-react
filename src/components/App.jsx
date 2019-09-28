import React, { useEffect, useState } from 'react';
import Map from './MapContainer';
import AddressForm from './AddressForm';
import LayerToggle from './LayerToggle';
import BarChart from './BarChart';
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

const AppStyles = styled.div`
  display: flex;
  flex-direction: justify-content;
`;

const App = ({ dispatch, treeData, filteredTreeData }) => {
  useEffect(() => {
    dispatch(fetchTreeData());
  }, []);

  const [showAllData, setShowAllData] = useState(true);

  const handleToggle = event => {
    event.target.checked === true
      ? setShowAllData(false)
      : setShowAllData(true);
  };

  const handleShowFilteredData = () => setShowAllData(false);

  const handleRenderData = () => {
    let renderedContent;
    if (Object.entries(treeData).length !== 0) {
      if (showAllData === true) {
        renderedContent = <Map treeData={treeData} />;
      } else if (
        (Object.entries(filteredTreeData).length !== 0) &
        (showAllData === false)
      ) {
        renderedContent = <Map treeData={filteredTreeData} />;
      } else {
        renderedContent = <Map treeData={treeData} />;
      }
    }
    return renderedContent;
  };

  return (
    <div>
      <AppStyles>
        <GlobalStyles />
        <div>{handleRenderData()}</div>
        <div>
          <div>
            <h1>Portland Heritage Trees</h1>
          </div>
          <AddressForm onFormSubmit={handleShowFilteredData} />
          <LayerToggle onToggle={handleToggle} showAllData={showAllData} />
        </div>
      </AppStyles>
      <BarChart />
    </div>
  );
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  treeData: PropTypes.object,
  filteredTreeData: PropTypes.object
};

App.defaultProps = {
  treeData: {},
  filteredTreeData: {}
};

const mapStateToProps = state => {
  return {
    treeData: state.treeData,
    filteredTreeData: state.filteredTreeData
  };
};

export default connect(mapStateToProps)(App);
