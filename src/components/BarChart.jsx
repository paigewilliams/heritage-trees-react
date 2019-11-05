import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext, selectData } from '../context/ContextProvider';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

const BarChart = ({ data }) => {
  const ref = useRef(null);
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    createBarChart();
  }, [data]);

  const handleClick = tree => {
    dispatch(selectData(tree));
  };

  const createBarChart = () => {
    const treeHeights = Object.keys(data).map(id => data[id].properties.HEIGHT);
    const treeData = Object.keys(data).map(id => data[id]);
    const dataMax = max(treeHeights);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, 180]);

    select(ref.current)
      .selectAll('rect')
      .data(treeData)
      .enter()
      .append('rect')
      .on('click', (d) => handleClick(d));

    select(ref.current)
      .selectAll('rect')
      .data(treeData)
      .exit()
      .remove();

    select(ref.current)
      .selectAll('rect')
      .data(treeData)
      .style('fill', '#5B965B')
      .attr('x', (d, i) => i * 5)
      .attr('y', (d) => 150 - yScale(d.properties.HEIGHT))
      .attr('height', d => yScale(d.properties.HEIGHT))
      .attr('width', 3);
  };

  return (
    <svg ref={ref} width={1270} height={200}></svg>
  );
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired
};

export default BarChart;
