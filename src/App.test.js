import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render, getAllByTestId, fireEvent } from "@testing-library/react";
import axios from "axios";

import { fetchAllPhotos } from "./fetchData";
import store from "./stores";
import App from "./App";

jest.mock("axios");

function renderWithRedux(element) {
  return render(
    <Provider store={store}>
      <BrowserRouter>{element}</BrowserRouter>
    </Provider>
  );
}

describe("Header Tests", () => {
  const { getByTestId } = renderWithRedux(<App />);
  const headerTitle = getByTestId("header-title");

  test("Header title element should appear", () => {
    expect(headerTitle).toBeInTheDocument();
  });

  test("Header title element should appear as 'Sunday Photos'", () => {
    const headerTitleText = headerTitle.textContent;
    expect(headerTitleText).toMatch(/sunday photos/i);
  });
});

describe("Photos Tests", () => {
  test("Should fetch all photos from Pixabay API", async () => {
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
    axios.get.mockResolvedValueOnce(() => Promise.resolve(response));
  });
});
