import React, { useContext, useState, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { AppContext } from '../context/ContextProvider';
import ScatterplotMap from './ScatterplotMap';
import BarChart from './BarChart';
import AddressForm from './AddressForm';
import LayerToggle from './LayerToggle';
import Tabs from './Tabs';

const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Lato');
    font-family: 'Lato', sans-serif;
    margin: 0;
  }
  input {
    font-family: 'Lato', sans-serif;
  }
  button {
    font-family: 'Lato', sans-serif;
  }
  g {
    font-family: 'Lato', sans-serif;
  }
`;

const AppStyles = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 25% 40% 5% 30%;
`;

const FormContainer = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 33%;
  
  h2 {
    background: whitesmoke;
    padding: 1rem 0 1rem 1rem;
    margin: 0;
    opacity: 0.8;
  }

  div:not(:first-child) {
    background: whitesmoke;
    opacity: 0.8;
  }
  
`;

const TAB_LABELS = [
  { property: 'HEIGHT', label: 'Height' },
  { property: 'CIRCUMF', label: 'Circumference' },
];

const App = () => {
  const [showAllData, setShowAllData] = useState(true);
  const { state } = useContext(AppContext);
  const { treeData, filteredTreeData } = state;
  const [selectedTab, setSelectedTab] = useState({ property: 'HEIGHT', label: 'Height' });

  const handleToggle = event => {
    event.target.checked === true
      ? setShowAllData(false)
      : setShowAllData(true);
  };

  const handleShowFilteredData = () => setShowAllData(false);

  const handleSelectedTab = (tab) => setSelectedTab(tab);

  const handleRenderData = () => {
    let renderedContent;
    if (Object.entries(treeData).length !== 0) {
      if (showAllData === true) {
        renderedContent = <ScatterplotMap data={treeData} />;
      } else if (
        (Object.entries(filteredTreeData).length !== 0) &
        (showAllData === false)
      ) {
        renderedContent = <ScatterplotMap data={filteredTreeData} />;
      } else {
        renderedContent = <ScatterplotMap data={treeData} />;
      }
    }
    return renderedContent;
  };

  return (
    <Fragment>
      <GlobalStyles />
      <AppStyles>
        <FormContainer>
          <div>
            <h2>Portland's Heritage Trees</h2>
            <AddressForm onFormSubmit={handleShowFilteredData} />
            <LayerToggle onToggle={handleToggle} showAllData={showAllData} filteredTreeData={filteredTreeData} />
          </div>
        </FormContainer>
        {handleRenderData()}
        <Tabs selectedTab={selectedTab} onClick={handleSelectedTab} labels={TAB_LABELS} />
        <BarChart data={treeData} selectedTab={selectedTab} />
      </AppStyles>
    </Fragment>
  );
};

export default App;
