import React, { useContext, useState, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { AppContext } from '../context/ContextProvider';
// import Map from './MapContainer';
import ScatterplotMap from './ScatterplotMap';
import BarChart from './BarChart';
import AddressForm from './AddressForm';
import LayerToggle from './LayerToggle';
import Tabs from './Tabs';

const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Lato');
    font-family: 'Lato', sans-serif;
  }
`;

const AppStyles = styled.div`
  display: flex;
  flex-direction: justify-content;
  div {
    div {
      display: flex;
    }
  }
`;

const TAB_LABELS = [
  { property: 'HEIGHT', label: 'Height' },
  { property: 'CIRCUMF', label: 'Circumference' },
  { property: 'SCIENTIFIC', label: 'Species' }
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
      <AppStyles>
        <GlobalStyles />
        <div>
          {handleRenderData()}
          <div>
            <AddressForm onFormSubmit={handleShowFilteredData} />
            <LayerToggle onToggle={handleToggle} showAllData={showAllData} />
          </div>
          <Tabs selectedTab={selectedTab} onClick={handleSelectedTab} labels={TAB_LABELS} />
          <BarChart data={treeData} selectedTab={selectedTab} />
        </div>
      </AppStyles>
    </Fragment>
  );
};

export default App;
