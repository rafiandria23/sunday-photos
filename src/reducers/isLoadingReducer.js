const initialState = {
  isLoading: false
};

const isLoading = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IS_LOADING':
      return { ...state, isLoading: !state.isLoading };

    default:
      return state;
  }
};

export default isLoading;
