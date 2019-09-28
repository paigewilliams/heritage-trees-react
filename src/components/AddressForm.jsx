import React from 'react';
import PropTypes from 'prop-types';
import { fetchCoords } from './../actions';
import styled from 'styled-components';
import { connect } from 'react-redux';

const FormStyles = styled.div`
  z-index: 3;
`;

function AddressForm({ dispatch, treeData, onFormSubmit }) {
  let _address = null;

  function handleNewAddressFormSubmission(e) {
    e.preventDefault();
    const formattedAddress = _address.value.replace(/\s/g, '+');
    dispatch(fetchCoords(formattedAddress, treeData));
    onFormSubmit();
  }

  return (
    <FormStyles>
      <form onSubmit={handleNewAddressFormSubmission}>
        <input
          type="text"
          id="address"
          placeholder="Input Address"
          ref={input => {
            _address = input;
          }}
        />
        <button type="submit">Find Trees</button>
      </form>
    </FormStyles>
  );
}

const mapStateToProps = state => {
  return {
    treeData: state.treeData
  };
};

AddressForm.propTypes = {
  dispatch: PropTypes.func,
  treeData: PropTypes.object,
  onFormSubmit: PropTypes.func
};

export default connect(mapStateToProps)(AddressForm);
