import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppContext } from '../context/ContextProvider';

const FormStyles = styled.div`
  z-index: 3;
`;

const AddressForm = ({ onFormSubmit }) => {
  const { fetchCoords } = useContext(AppContext);
  let _address = null;

  const handleNewAddressFormSubmission = (e) => {
    e.preventDefault();
    const formattedAddress = _address.value.replace(/\s/g, '+');
    fetchCoords(formattedAddress);
    onFormSubmit();
  };

  return (
    <FormStyles>
      <form onSubmit={handleNewAddressFormSubmission}>
        <input
          type="text"
          id="address"
          placeholder="500 NE Broadway Ave"
          ref={input => {
            _address = input;
          }}
        />
        <button type="submit">Find Trees</button>
      </form>
    </FormStyles>
  );
};

AddressForm.propTypes = {
  onFormSubmit: PropTypes.func,
};


export default AddressForm;
