import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import AppContextProvider from './context/ContextProvider';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>

  </StrictMode>,
);


