import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

class BarChart extends Component {
  constructor(props){
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
    console.log(data);
  }

  render() {
    return <svg ref={node => this.node}
    width={1000} height={500}></svg>
  }

}

const mapStateToProps = state => {
  return {
    data: state.treeData
  };
}

export default connect(mapStateToProps)(BarChart);