import React from 'react';
import styled from 'styled-components';

const TabStyle = styled.div`
  ul {
    border-bottom: 1px solid #ccc;
    padding-left: 0;
    width: 100%;
  }
`;

const Tab = styled.li`
display: inline-block;
list-style: none;
margin-bottom: -1px;
padding: 0.5rem 0.75rem;
background-color: ${props => props.active && 'white'};
border: ${props => props.active && 'solid #ccc'};
border-width: ${props => props.active && '1px 1px 0 1px'};
`;

const Tabs = ({ labels, selectedTab, onClick }) => {
  console.log('selectedTab', selectedTab);
  return (
    <TabStyle>
      <ul>
        {labels.map(label => (
          <Tab active={label === selectedTab} onClick={() => onClick(label)} key={label}>{label}</Tab>
        ))}

      </ul>
    </TabStyle>
  );
};

export default Tabs;