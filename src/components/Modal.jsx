import React, { useState } from 'react';
import styled from 'styled-components';
import Info from './Info-svg';

const Root = styled.div`
  position: relative;
  button {
    border: none;
    padding: 0;
    background: none;
  }
`;

const OuterModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  div {
    background: whitesmoke;
    border-radius: 5px;
    padding: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }
`;


const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Root>
      <button type={'button'} onClick={() => setIsOpen(true)}>
        <Info />
      </button>
      {
        isOpen && (
          <OuterModal>
            <div>
              <button onClick={() => setIsOpen(false)}>X</button>
              <h4>About the Heritage Trees</h4>
              <p>Heritage Trees are trees that have been formally recognized by City Council for their unique size, age, historical or horticultural significance. Once accepted by Council, Heritage Trees are designated with a small plaque so they can be identified by the public and listed in the Heritage Tree database.</p>
              <p>For mor information about the Heritage trees, vist the <a href='https://www.portlandoregon.gov/parks/40280'> City of Portland site.</a></p>
            </div>
          </OuterModal>
        )

      }
    </Root >



  );
};

export default Modal;