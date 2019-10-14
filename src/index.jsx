import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppContextProvider from './context/ContextProvider';

const render = Component => {
  ReactDOM.render(
    <AppContextProvider>
      <Component />
    </AppContextProvider>
    ,
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
