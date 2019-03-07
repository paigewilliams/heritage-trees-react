import React from 'react';
import { fetchCoords, findTreesWithinAMile } from './../actions';
import styled from 'styled-components';
import { connect } from 'react-redux';

const FormStyles = styled.div`
  z-index: 3;
`


function AddressForm({ dispatch, treeData, currentCoords }){
  let _address = null;

  function handleNewAddressFormSubmission(event){
    event.preventDefault();
    const formattedAddress = _address.value.replace(/\s/g, '+');
    dispatch(fetchCoords(formattedAddress, treeData));
  }


  return(
    <FormStyles>
      <form onSubmit={handleNewAddressFormSubmission}>
        <input
        type='text'
        id='address'
        placeholder='Input Address'
        ref={(input) => {_address = input;}}/>
      <button type='submit'>Find Trees</button>
      </form>
    </FormStyles>
  );
}

const mapStateToProps = state => {
  return {
    treeData: state.treeData,
    currentCoords: state.currentCoords
  }
}

export default connect(mapStateToProps)(AddressForm);
