import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppContext } from '../context/ContextProvider';

const FormStyles = styled.div`
  z-index: 3;
  input {
    font-weight: bold;
    width: 200px;
    margin: 0 0 0 1rem;
    height: 35px;
    padding: 6px 15px;
    border-radius: 5px;
    outline: none;
    border: none;
    background: #bebebe;
    font-size: 14px;
    ::placeholder {
      color: white;
    }
  }
  button {
    font-weight: bold;
    width: 8rem;
    margin: 0 35px 20px ;
    height: 45px;
    padding: 6px 15px;
    border-radius: 5px;
    outline: none;
    border: none;
    background: tomato;
    color: white;
    font-size: 14px;
  }
`;

const AddressForm = ({ onFormSubmit }) => {
  const { fetchCoords } = useContext(AppContext);
  let _address = null;

  const handleNewAddressFormSubmission = (e) => {
    e.preventDefault();
    const formattedAddress = encodeURI(_address.value);
    fetchCoords(formattedAddress);
    onFormSubmit();
  };

  return (
    <FormStyles>
      <form onSubmit={handleNewAddressFormSubmission}>
        <input
          type="text"
          id="address"
          placeholder="Address City State Zip"
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
