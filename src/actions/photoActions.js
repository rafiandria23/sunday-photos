import axios from 'axios';

const fetchPhotosCompleted = photos => ({
  type: 'FETCH_PHOTOS',
  payload: { photos }
});

export const fetchPhotos = () => {
  return dispatch => {
    axios
      .get(
        'https://pixabay.com/api/?key=15451477-5b6f0ff8bb3e146f960b22a5f&editors_choice=true&order=latest'
      )
      .then(({ data }) => {
        console.log(data.hits);
        dispatch(fetchPhotosCompleted(data.hits));
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export const addPhoto = photo => ({
  type: 'ADD_PHOTO',
  payload: { photo }
});

const photoDetailCompleted = photo => ({
  type: 'PHOTO_DETAIL',
  payload: { photo }
});

export const getPhotoDetail = photoId => {
  return dispatch => {
    axios
      .get(
        `https://pixabay.com/api/?key=15451477-5b6f0ff8bb3e146f960b22a5f&id=${photoId}`
      )
      .then(({ data }) => {
        const photo = data.hits[0];
        dispatch(photoDetailCompleted(photo));
      })
      .catch(err => {
        console.log(err.response);
      });
  };
};

export const addPhotoFavorites = photoId => ({
  type: 'ADD_PHOTO_FAVORITES',
  payload: {
    photoId
  }
});

export const removePhotoFavorites = photoId => ({
  type: 'REMOVE_PHOTO_FAVORITES',
  payload: {
    photoId
  }
});
