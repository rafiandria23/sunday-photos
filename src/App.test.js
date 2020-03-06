import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";

// import { fetchAllPhotos } from "./fetchData";
import store from "./stores";
import App from "./App";
import {
  fetchPhotos,
  addPhoto,
  getPhotoDetail,
  addPhotoFavorites,
  removePhotoFavorites
} from "./actions/photoActions";

jest.mock(`./actions/photoActions`);
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

const mockAddPhotoFavorites = addPhotoFavorites.mockImplementation(photoId => {
  return {
    type: "ADD_PHOTO_FAVORITES",
    payload: {
      photoId
    }
  };
});

// axios.get.mockResolvedValue(() => Promise.resolve(response));

function renderWithRedux(component) {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
}

describe("Header Tests", () => {
  test("Header title element should appear", () => {
    const { getByTestId } = renderWithRedux(<App />);
    const headerTitle = getByTestId("header-title");

    expect(headerTitle).toBeInTheDocument();
  });

  test("Header title element should appear as 'Sunday Photos'", () => {
    const { getByTestId } = renderWithRedux(<App />);
    const headerTitle = getByTestId("header-title");
    const headerTitleText = headerTitle.textContent;
    expect(headerTitleText).toMatch(/sunday photos/i);
  });
});

describe("Photo Feature Tests", () => {
  describe("Add to Favorite Feature", () => {
    test("Should add the photo ID into the Favorite Photos state", () => {
      const store = createStore(reducer, {photo: {}}, applyMiddleware())
      const { getByTestId } = renderWithRedux(<PhotoItem photo={{}}/>);
      const addFavoriteButton = getByTestId('add-favorite-button');
      fireEvent.click(addFavoriteButton);
      const favoritePhotos = store.getState().photosReducer.favoritePhotos;
      console.log(favoritePhotos);
      // expect(favoritePhotos.length).toBe(1);
    });
  });
});
