const middlewareLogger = store => next => action => {
  console.log('original state', store.getState());
  console.log('current action', action);
  next(action);
  console.log('new state', store.getState());
};

export default middlewareLogger;
