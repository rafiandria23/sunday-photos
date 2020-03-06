import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";

// import { fetchAllPhotos } from "./fetchData";
import store from "./stores";
import App from "./App";
import PhotoItemMenu from "./components/PhotoItemMenu";

import {
  fetchPhotos,
  addPhoto,
  getPhotoDetail,
  addPhotoFavorites,
  removePhotoFavorites
} from "./actions/photoActions";
import { setSearchQuery } from "./actions/searchActions";

import isLoadingReducer from "./reducers/isLoadingReducer";
import photosReducer from "./reducers/photosReducer";
import searchReducer from "./reducers/searchReducer";

jest.mock(`./actions/photoActions`);
jest.mock(`./actions/searchActions.js`);
// jest.mock(`axios`);

const response = {
  data: {
    hits: [
      {
        id: 4897656,
        pageURL:
          "https://pixabay.com/photos/flaming-pink-pen-neck-exotic-4897656/",
        type: "photo",
        tags: "flaming, pink, pen",
        previewURL:
          "https://cdn.pixabay.com/photo/2020/03/03/06/40/flaming-4897656_150.jpg",
        previewWidth: 150,
        previewHeight: 112,
        webformatURL:
          "https://pixabay.com/get/52e8dc444c57aa14f6da8c7dda79367b113adfe154566c48702778d09748c35dbb_640.jpg",
        webformatWidth: 640,
        webformatHeight: 480,
        largeImageURL:
          "https://pixabay.com/get/,52e8dc444c57aa14f6da8c7dda79367b113adfe154566c48702778d09748c35dbb_1280.jpg",
        imageWidth: 5334,
        imageHeight: 3999,
        imageSize: 2370322,
        views: 694,
        downloads: 519,
        favorites: 11,
        likes: 28,
        comments: 30,
        user_id: 6355831,
        user: "pasja1000",
        userImageURL:
          "https://cdn.pixabay.com/user/2020/01/29/17-57-01-931_250x250.png"
      }
    ]
  }
};

fetchPhotos.mockImplementation(() => {
  return {
    type: "FETCH_PHOTOS",
    payload: { photos: response.data.hits }
  };
});

addPhotoFavorites.mockImplementation(photoId => {
  return {
    type: "ADD_PHOTO_FAVORITES",
    payload: {
      photoId
    }
  };
});

removePhotoFavorites.mockImplementation(
  photoId => {
    return {
      type: "REMOVE_PHOTO_FAVORITES",
      payload: {
        photoId
      }
    };
  }
);

// axios.get.mockResolvedValue(() => Promise.resolve(response));

function renderWithRedux(history, component) {
  return render(
    <Provider store={store}>
      <Router history={history}>{component}</Router>
    </Provider>
  );
}

describe("Header Tests", () => {
  test("Header title element should appear", () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRedux(history, <App />);
    const headerTitle = getByTestId("header-title");

    expect(headerTitle).toBeInTheDocument();
  });

  test("Header title element should appear as 'Sunday Photos'", () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRedux(history, <App />);
    const headerTitle = getByTestId("header-title");
    const headerTitleText = headerTitle.textContent;
    expect(headerTitleText).toMatch(/sunday photos/i);
  });
});

describe("Photo Feature Tests", () => {
  describe("Detail Feature", () => {
    test("Should redirect to /photos/:photoId", () => {
      const history = createMemoryHistory();
      const photoId = 4897656;
      const { getByTestId } = renderWithRedux(
        history,
        <PhotoItemMenu photoId={photoId} />
      );
      const viewDetailButton = getByTestId('view-detail-button');
      fireEvent.click(viewDetailButton);
      expect(history.location.pathname).toBe(`/photos/${photoId}`);
    });
  });

  describe("Favorite Feature", () => {
    test("Should add the photo ID into the Favorite Photos state", () => {
      // const store = createStore(reducer, { photo: {} }, applyMiddleware(thunk));
      const history = createMemoryHistory();
      const photoId = 4897656;
      const { getByTestId } = renderWithRedux(
        history,
        <PhotoItemMenu photoId={photoId} />
      );
      const addFavoriteButton = getByTestId("add-favorite-button");
      fireEvent.click(addFavoriteButton);
      const favoritePhotos = store.getState().photosReducer.favoritePhotos;
      console.log(favoritePhotos);
      expect(favoritePhotos.length).toBe(1);
    });

    test("Should remove the photo ID from the Favorite Photos state", () => {
      const history = createMemoryHistory();
      const photoId = 4897656;
      const { getByTestId } = renderWithRedux(
        history,
        <PhotoItemMenu photoId={photoId} />
      );
      const removeFavoriteButton = getByTestId("remove-favorite-button");
      fireEvent.click(removeFavoriteButton);
      const favoritePhotos = store.getState().photosReducer.favoritePhotos;
      console.log(favoritePhotos);
      expect(favoritePhotos.length).toBe(0);
    });
  });
});
