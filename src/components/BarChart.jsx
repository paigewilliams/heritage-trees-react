/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import styled from 'styled-components';
import { AppContext, selectData } from '../context/ContextProvider';

const SVG = styled.svg`
  z-index: 2;
  background: whitesmoke;
  opacity: 0.8;
`;

const ChartContainer = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: whitesmoke;
  opacity: 0.9;
`;

const HEIGHT = 200;
const WIDTH = 1400;

const BarChart = ({ data, selectedTab }) => {
  const ref = useRef(null);
  const { dispatch, state } = useContext(AppContext);
  const { selectedData } = state;
  useEffect(() => {
    draw();
  }, [data, selectedTab, selectedData]);

  const handleClick = tree => {
    tree !== selectedData && dispatch(selectData(tree));
  };

  const handleColor = (d) =>
    selectedData.properties && d.properties.OBJECTID === selectedData.properties.OBJECTID ? 'tomato' : '#5B965B';


  const draw = () => {
    // const sortedTrees = data.length && data.sort((a, b) =>
    //   a.properties[selectedTab.property] > b.properties[selectedTab.property] ? 1 : -1
    // );

    const treeValue = Object.keys(data).map(id => data[id].properties[selectedTab.property]);
    const maxValue = d3.max(treeValue);

    const xScale = d3
      .scaleBand()
      .domain(d3.range(0, data.length))
      .range([0, WIDTH])
      .paddingInner(0.25);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([0, HEIGHT]);

    d3.select(ref.current)
      .selectAll('rect')
      .data(data)
      .on('mouseenter', (d) => handleClick(d))
      .on('mouseover', () => d3.select(event.currentTarget).style('fill', '#ff6347'))
      .on('mouseout', () => d3.select(event.currentTarget).style('fill', '#5B965B'))
      .transition()
      .duration(1000)
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => yScale(d.properties[selectedTab.property]))
      .attr('width', xScale.bandwidth())
      .attr('height', d => HEIGHT - yScale(d.properties[selectedTab.property]))
      .style('fill', (d) => handleColor(d));
  };

  const bars = data.map(d => <rect key={d.properties.OBJECTID} />);

  return (
    <ChartContainer>
      <SVG ref={ref} width={WIDTH} height={HEIGHT}>{bars}</SVG>
    </ChartContainer>
  );
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  selectedTab: PropTypes.shape({
    property: PropTypes.string,
    label: PropTypes.string
  }).isRequired,
};

export default BarChart;
