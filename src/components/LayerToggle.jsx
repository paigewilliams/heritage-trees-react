import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LayerToggleContainter = styled.div`
  padding-left: 1rem;
  display: flex;
  div {
    position: relative;
  }
  h3 {
    margin-top: 0;
    padding-right: 1rem;
  }
  
`;
const LayerToggleLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    transition: 0.2s;
  }
`;
const Toggle = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${LayerToggleLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

const LayerToggle = ({ onToggle, showAllData, filteredTreeData }) => {
  return (
    <LayerToggleContainter>
      <h3>Show trees within a mile of address</h3>
      <div>
        <Toggle
          id="checkbox"
          type="checkbox"
          checked={showAllData ? false : true}
          onChange={onToggle}
          disabled={filteredTreeData.length ? false : true}
        />
        <LayerToggleLabel htmlFor="checkbox" />
      </div>
    </LayerToggleContainter>
  );
};

LayerToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  showAllData: PropTypes.bool.isRequired,
  filteredTreeData: PropTypes.array.isRequired
};

export default LayerToggle;
