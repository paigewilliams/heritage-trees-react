import React from 'react';
import { fetchCoords } from './../actions';
import styled from 'styled-components';
import { connect } from 'react-redux';

const FormStyles = styled.div`
  z-index: 3;
`


function AddressForm({ dispatch }){
  let _address = null;
  function handleNewAddressFormSubmission(event){
    event.preventDefault();
    const formattedAddress = _address.value.replace(/\s/g, '+');
    console.log(formattedAddress);
    dispatch(fetchCoords(formattedAddress));
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

export default connect()(AddressForm);
