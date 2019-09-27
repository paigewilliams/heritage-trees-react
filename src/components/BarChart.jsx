import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount() {
    this.createBarChart();
  }

  componentDidUpdate() {
    this.createBarChart();
  }

  createBarChart() {
    const node = this.node;
    const { data } = this.props;
    const treeHeights = Object.keys(data).map(id => {
      const height = data[id].properties.HEIGHT;
      return height;
    });
    const dataMax = max(treeHeights);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, 300])

    select(node)
      .selectAll('rect')
      .data(treeHeights)
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(treeHeights)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(treeHeights)
      .style('fill', '#fe9922')
      .attr('x', (d, i) => i * 5)
      .attr('y', d => 500 - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 3)
  }

  render() {
    return <svg ref={node => this.node = node}
      width={2000} height={500}></svg>
  }

}

const mapStateToProps = state => {
  return {
    data: state.treeData
  };
}

export default connect(mapStateToProps)(BarChart);