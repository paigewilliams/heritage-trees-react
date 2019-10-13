import React from 'react';
import { AppContext } from './ContextProvider';

const ContextConsumer = Component => props => (
  <AppContext.Consumer>
    {([state]) => (
      <Component {...state} {...props} />
    )}
  </AppContext.Consumer>
);


export default ContextConsumer;