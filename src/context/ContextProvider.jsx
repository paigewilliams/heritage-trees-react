import React, { createContext, useContext } from 'react';

const initialState = {
  treeData: {},
  filteredTreeData: {}
}

export const AppContext = createContext(initialState);

const AppContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider
      value={{
        state
      }}
    >
      {children}
    </AppContext.Provider>
  );

};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;