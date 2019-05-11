const middlewareLogger = store => next => action => {
  /* eslint-disable no-console */
  console.log('original state', store.getState());
  console.log('current action', action);
  next(action);
  console.log('new state', store.getState());
  /* eslint-enable no-console */
};

export default middlewareLogger;
