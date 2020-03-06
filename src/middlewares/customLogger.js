const customLogger = store => next => action => {
  console.log('Action Type', action.type);
  console.log('========================');
  console.table(action);
  next(action);
};

export default customLogger;
