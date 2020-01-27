import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TabStyle = styled.div`
  z-index: 4;
  background: whitesmoke;
  opacity: 0.8;
  ul {
    border-bottom: 1px solid #ccc;
    padding-left: 0;
    width: 100%;
    z-index: 5;
  }
`;

const Tab = styled.li`
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  padding: 0.5rem 0.75rem;
  background-color: ${props => props.active && 'whitesmoke'};
  border: ${props => props.active && 'solid #ccc'};
  border-width: ${props => props.active && '1px 1px 0 1px'};
`;

const Tabs = ({ labels, selectedTab, onClick }) => {
  return (
    <TabStyle>
      <ul>
        {labels.map(label => (
          <Tab active={label.label === selectedTab.label} onClick={() => onClick(label)} key={label.property}>{label.label}</Tab>
        ))}

      </ul>
    </TabStyle>
  );
};

Tabs.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    property: PropTypes.string,
    label: PropTypes.string
  })).isRequired,
  selectedTab: PropTypes.shape({
    property: PropTypes.string,
    label: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Tabs;