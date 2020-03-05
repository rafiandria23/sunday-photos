const initialState = {
  photos: [],
  currentPhoto: null,
  favoritePhotos: []
};

const photos = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PHOTOS":
      return { ...state, photos: action.payload.photos };

    case "ADD_PHOTO":
      return {
        ...state,
        photos: state.photos.concat(action.payload.photo)
      };

    case "PHOTO_DETAIL":
      return { ...state, currentPhoto: action.payload.photo };

    case "ADD_PHOTO_FAVORITES":
      return {
        ...state,
        favoritePhotos: state.favoritePhotos.concat(action.payload.photoId)
      };

    case "REMOVE_PHOTO_FAVORITES":
      const favoritePhotoIndex = state.favoritePhotos.indexOf(action.payload.photoId);
      if (favoritePhotoIndex === 0) {
        return {
          ...state,
          favoritePhotos: state.favoritePhotos.splice(1)
        };
      }
      return {
        ...state,
        favoritePhotos: state.favoritePhotos.splice(0, favoritePhotoIndex)
      };

    default:
      return state;
  }
};

export default photos;
