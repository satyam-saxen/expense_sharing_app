import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./form";

jest.mock('axios');

describe("Form", () => {
  it("should render the basic fields", () => {
    render(<Form></Form>);
    expect(
      screen.getByRole("heading", { name: "SignUp" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();

    expect(
        screen.getByRole("spinbutton", { name: /phone/i })
      ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/Password/i)
    ).toBeInTheDocument();

    expect(
        screen.getByPlaceholderText(/Confirm/i)
      ).toBeInTheDocument();
    
    expect(screen.getByRole("button")).toBeInTheDocument();

  });
});

