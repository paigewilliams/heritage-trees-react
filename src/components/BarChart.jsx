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
    const treeData = Object.keys(data).map(id => data[id])
    const dataMax = max(treeHeights);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, 300]);

    select(ref.current)
      .selectAll('rect')
      .data(treeData)
      .enter()
      .append('rect')
      .on('click', (d) => console.log('d', d));

    select(ref.current)
      .selectAll('rect')
      .data(treeData)
      .exit()
      .remove();

    select(ref.current)
      .selectAll('rect')
      .data(treeData)
      .style('fill', '#5B965B')
      .attr('x', (d, i) => i * 4)
      .attr('y', (d) => 500 - yScale(d.properties.HEIGHT))
      .attr('height', d => yScale(d.properties.HEIGHT))
      .attr('width', 3);
  };

  return (
    <svg ref={ref} width={1290} height={500}></svg>
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
