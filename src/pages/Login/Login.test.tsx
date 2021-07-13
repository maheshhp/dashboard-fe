import React from "react";
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Login from "./Login";

describe("Testing login page", () => {
  test("renders login page", () => {
    const mockStoreAuthTokenFn = jest.fn();
    const mockToken = null;
    render(
      <Login authToken={mockToken} storeAuthToken={mockStoreAuthTokenFn} />
    );
    const loginElements = screen.getAllByText("Login");
    expect(loginElements.length).toEqual(2);
  });

  test("stores token on successful login", async () => {
    enableFetchMocks();
    const mockStoreAuthTokenFn = jest.fn();
    const mockToken = null;
    const historyMock = createMemoryHistory();
    const hsitorySpy = jest.spyOn(historyMock, "push");
    fetchMock.mockOnce(JSON.stringify({ accessToken: "mock-token" }));
    render(
      <Router history={historyMock}>
        <Login authToken={mockToken} storeAuthToken={mockStoreAuthTokenFn} />
      </Router>
    );
    const inputField = screen.getByRole("textbox");
    const loginButton = screen.getByRole("button");

    // login button disabled without valid email entered
    expect(loginButton).toHaveAttribute("disabled");
    act(() => {
      // enter valid email
      fireEvent.change(inputField, { target: { value: "a@b.com" } });
    });

    // login button enabled
    expect(loginButton).not.toHaveAttribute("disabled");

    // simulate login click
    act(() => {
      fireEvent.click(loginButton);
    });

    await waitFor(() => expect(hsitorySpy).toHaveBeenCalledWith("/dashboard"));
    await waitFor(() =>
      expect(mockStoreAuthTokenFn).toHaveBeenCalledWith("mock-token")
    );
  });
});
