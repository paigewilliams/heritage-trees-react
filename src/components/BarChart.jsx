/* eslint-disable react/jsx-pascal-case */
import React, { useMemo, useEffect, useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import styled from 'styled-components';
import ResizeObserver from 'resize-observer-polyfill';
import { AppContext, selectData } from '../context/ContextProvider';

const SVG = styled.svg`
  z-index: 2;
  background: whitesmoke;
  opacity: 0.8;
  width: 100%;
  height: 100%;
  overflow: visible;
`;

const ChartContainer = styled.div`
  background: whitesmoke;
  opacity: 0.9;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem 1rem 1rem 3rem;
  div {
    width: 100%;
    height: 100%;
  }
`;

const useResizeObserver = ref => {
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => setDimensions(entry.contentRect));
    });

    resizeObserver.observe(observeTarget);
    return () => resizeObserver.unobserve(observeTarget);
  }, [ref]);

  return dimensions;
};

const BarChart = React.memo(({ data, selectedTab }) => {
  const ref = useRef();
  const containerRef = useRef();
  const dimensions = useResizeObserver(containerRef);
  const { dispatch, state } = useContext(AppContext);

  const { selectedData } = state;

  useMemo(() => {
    const svg = d3.select(ref.current);
    if (!dimensions) return;

    const treeValue = Object.keys(data).map(id => data[id].properties[selectedTab.property]);

    const maxValue = d3.max(treeValue);

    const handleClick = tree => {
      tree !== selectedData && dispatch(selectData(tree));
    };

    const handleColor = (d) =>
      selectedData.properties && d.properties.OBJECTID === selectedData.properties.OBJECTID ? 'tomato' : '#5B965B';

    const xScale = d3
      .scaleBand()
      .domain(treeValue.map((v, i) => i))
      .range([0, dimensions.width])
      .padding(0.25);

    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue + 10])
      .range([dimensions.height, 0]);

    const xAxis = d3.axisBottom(xScale).tickValues([]);
    svg.select('.x-axis')
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.select('.y-axis')
      .style('transform', `-translateX(${dimensions.width}px)`)
      .call(yAxis);

    svg.selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)')
      .on('mouseenter', (d) => handleClick(d))
      .on('mouseover', () => d3.select(event.currentTarget).style('fill', '#ff6347'))
      .on('mouseout', () => d3.select(event.currentTarget).style('fill', '#5B965B'))
      .transition()
      .duration(500)
      .attr('x', (d, i) => xScale(i))
      .attr('y', () => -dimensions.height)
      .attr('width', xScale.bandwidth())
      .attr('height', d => dimensions.height - yScale(d.properties[selectedTab.property]))
      .style('fill', (d) => handleColor(d));
  }, [data, selectedTab, selectedData, dimensions]);

  return (
    <ChartContainer ref={containerRef}>
      <div>
        <SVG ref={ref}>
          <g className="x-axis" />
          <g className="y-axis" />
        </SVG>
      </div>
    </ChartContainer>
  );
});

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  selectedTab: PropTypes.shape({
    property: PropTypes.string,
    label: PropTypes.string
  }).isRequired,
};

export default BarChart;
