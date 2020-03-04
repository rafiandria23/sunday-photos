const initialState = {
  photos: []
};

const photos = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PHOTOS':
      return { ...state, photos: action.payload };

    case 'ADD_PHOTO':
      return { ...state, photos: state.photos.concat(action.payload) };

    default:
      return state;
  }
};

export default photos;
