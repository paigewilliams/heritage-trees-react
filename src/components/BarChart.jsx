import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

const BarChart = ({data}) => {
  const ref = useRef(null);

  useEffect(() => {
    createBarChart();
  }, [data]);

  const createBarChart = () => {
    const treeHeights = Object.keys(data).map(id => data[id].properties.HEIGHT);
    const dataMax = max(treeHeights);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, 300]);

    select(ref.current)
      .selectAll('rect')
      .data(treeHeights)
      .enter()
      .append('rect');

    select(ref.current)
      .selectAll('rect')
      .data(treeHeights)
      .exit()
      .remove();

    select(ref.current)
      .selectAll('rect')
      .data(treeHeights)
      .style('fill', '#fe9922')
      .attr('x', (d, i) => i * 5)
      .attr('y', d => 500 - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 3);
  };

  return (
    <svg ref={ref} width={2000} height={500}></svg>
  );
};

const mapStateToProps = state => {
  return {
    data: state.treeData
  };
};

BarChart.propTypes = {
  data: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(BarChart);
