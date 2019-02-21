import React from 'react';
import MarkerData from './MarkerData';

class ApiControl extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      treeData: []
    }
    this.handleApiRequest = this.handleApiRequest.bind(this);
  }

  handleApiRequest(){
    const url = `https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        treeData: data.features
      })
    })
    // console.log(this.state.treeData)
  }

  componentDidMount(){
    this.handleApiRequest();
  }

  render(){


    return (

      <div>
        <h1>Api Works</h1>
        <MarkerData apiResponse={this.state.treeData} />
      </div>
    )
  }

}

export default ApiControl;
