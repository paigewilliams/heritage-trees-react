import React, { useContext, useState, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { AppContext } from '../context/ContextProvider';
import ScatterplotMap from './ScatterplotMap';
import BarChart from './BarChart';
import AddressForm from './AddressForm';
import LayerToggle from './LayerToggle';
import Tabs from './Tabs';
import Modal from './Modal';

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
  grid-template-rows: 25% 40% 8% 27%;
`;

const FormContainer = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: fit-content;
  h1 {
    padding: 1rem 0 1rem 1rem;
    margin: 0;
    font-weight: lighter;
  }
  h3 {
    padding 0 1rem 1rem;
    margin: 0;
    font-weight: normal;
  }
`;

const InnerContainer = styled.div`
  background: whitesmoke;
  opacity: 0.9;
`;

const TAB_LABELS = [
  { property: 'HEIGHT', label: 'Height' },
  { property: 'CIRCUMF', label: 'Circumference' },
];

const App = () => {
  const [showAllData, setShowAllData] = useState(true);
  const { state } = useContext(AppContext);
  const { mapTreeData, filteredTreeData, chartTreeData } = state;
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
    if (Object.entries(mapTreeData).length !== 0) {
      if (showAllData === true) {
        renderedContent = <ScatterplotMap data={mapTreeData} />;
      } else if (
        (Object.entries(filteredTreeData).length !== 0) &
        (showAllData === false)
      ) {
        renderedContent = <ScatterplotMap data={filteredTreeData} />;
      } else {
        renderedContent = <ScatterplotMap data={mapTreeData} />;
      }
    }
    return renderedContent;
  };

  return (
    <Fragment>
      <GlobalStyles />
      <AppStyles>
        <FormContainer>
          <InnerContainer>
            <h1>Portland's Heritage Trees</h1>
            <h3>Find trees within a mile of an address</h3>
            <AddressForm onFormSubmit={handleShowFilteredData} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <LayerToggle onToggle={handleToggle} showAllData={showAllData} filteredTreeData={filteredTreeData} />
              <Modal />
            </div>
          </InnerContainer>
        </FormContainer>
        {handleRenderData()}
        <Tabs selectedTab={selectedTab} onClick={handleSelectedTab} labels={TAB_LABELS} />
        <BarChart data={chartTreeData} selectedTab={selectedTab} />
      </AppStyles>
    </Fragment>
  );
};

export default App;
