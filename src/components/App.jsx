import React, { useContext, useState, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { AppContext } from '../context/ContextProvider';
import Map from './MapContainer';
import BarChart from './BarChart';
import AddressForm from './AddressForm';
import LayerToggle from './LayerToggle';

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

const App = () => {
  const [showAllData, setShowAllData] = useState(true);
  const { state } = useContext(AppContext);
  const { treeData, filteredTreeData } = state;

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
    <Fragment>
      <AppStyles>
        <GlobalStyles />
        <div>
          {handleRenderData()}
          <BarChart data={treeData} />
          <AddressForm onFormSubmit={handleShowFilteredData} />
          <LayerToggle onToggle={handleToggle} showAllData={showAllData} />
        </div>
      </AppStyles>
    </Fragment>
  );
};

export default App;
