import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./form";

jest.mock('axios');

describe("Form", () => {
  it("renders all the fields", () => {
    render(<Form></Form>);
    expect(
      screen.getByRole("heading", { name: "Log In" })
    ).toBeInTheDocument();
    
    expect(
      screen.getByPlaceholderText(/Password/i)
    ).toBeInTheDocument();

    // expect(
    //     screen.getByRole("spinbutton", { name: /phone/i })
    //   ).toBeInTheDocument();
    
    expect(
        screen.getByPlaceholderText(/10 digit Phone Number/i)
      ).toBeInTheDocument();

    expect(screen.getByRole("button")).toBeInTheDocument();

  });
});
