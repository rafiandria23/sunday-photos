import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render, getAllByTestId, fireEvent } from "@testing-library/react";

import store from "./stores";
import App from "./App";

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
