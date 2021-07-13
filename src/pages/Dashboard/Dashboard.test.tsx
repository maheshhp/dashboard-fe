import React from "react";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Dashboard from "./Dashboard";
import { mockGqlData } from "./dashboard.mocks";

describe("Testing dashboard page", () => {
  test("renders dashboard page", () => {
    render(<Dashboard />);
    // Checking one element from every component to make sure everything renders
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Search & Add Countries")).toBeInTheDocument();
    expect(
      screen.getByText("Enter Value in SEK to convert")
    ).toBeInTheDocument();
    expect(screen.getByText("Official Currencies")).toBeInTheDocument();
  });

  test("basic functionality works in dashboard", async () => {
    render(
      <MockedProvider mocks={mockGqlData}>
        <Dashboard />
      </MockedProvider>
    );

    const searchInput = screen.getByRole("textbox");
    const currencyInput = screen.getByDisplayValue("0");
    const searchButton = screen.getByText("Search");
    const convertButton = screen.getByText("Convert");

    // search button disabled without text in country field
    expect(searchButton.closest("button")).toHaveAttribute("disabled");
    act(() => {
      // enter country search text
      fireEvent.change(searchInput, { target: { value: "test" } });
    });

    // click the now enabled search button
    expect(searchButton).not.toHaveAttribute("disabled");
    fireEvent.click(searchButton);

    // verify that countries search list is loaded
    expect(await screen.findByText("Test Country")).toBeVisible();

    act(() => {
      // add the country to the list
      fireEvent.click(screen.getByText("Add to list"));
    });

    // verify that the country is added to the list
    expect(await screen.findByText("3,000")).toBeVisible();
    expect(await screen.findByText("TMY")).toBeVisible();

    // verify convery button is disabled at start
    expect(convertButton.closest("button")).toHaveAttribute("disabled");
    act(() => {
      // enter a value to currency input
      fireEvent.change(currencyInput, { target: { value: "100" } });
    });

    expect(convertButton.closest("button")).not.toHaveAttribute("disabled");

    act(() => {
      // simulate convert button click
      fireEvent.click(convertButton);
    });

    //   verify converted value for TMY is present
    expect(await screen.findByText("11.65")).toBeVisible();
  });
});
