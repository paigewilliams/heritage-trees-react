import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import middlewareLogger from './middleware/middleware-logger';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import thunkMiddleware from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(middlewareLogger, thunkMiddleware));

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component/>
    </Provider>,
    document.getElementById('react-app-root')
  );
};

render(App);

/*eslint-disable */
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
/*eslint-enable */
