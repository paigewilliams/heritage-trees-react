import React from 'react'
import PropTypes from 'prop-types';

function MarkerData(props){
  console.log(props)
  return (
    <div>
      <h1>Marker data works</h1>
    </div>
  )
}

MarkerData.propTypes = {
  apiResponse: PropTypes.array
}

export default MarkerData;
