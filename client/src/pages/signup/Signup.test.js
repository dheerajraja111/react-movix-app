import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import Signup from "./Signup";

jest.mock("axios");

describe("Signup", () => {
  it("renders the Signup component correctly", () => {
    const { getByLabelText, getByText } = render(<Signup />);
    
    // Test rendering of form elements
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByText("Signup")).toBeInTheDocument();
  });

  it("submits the signup form successfully", async () => {
    const { getByLabelText, getByText, queryByText } = render(<Signup />);
    
    // Mock axios post request
    axios.post.mockResolvedValueOnce({ data: {} });

    // Fill in form inputs
    fireEvent.change(screen.getByLabelText("Username:"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "testpassword" } });

    // Submit the form
    fireEvent.click(screen.getByText("Signup"));

    // Ensure the form validation errors are not displayed
    await waitFor(() => {
      expect(screen.queryByText("Please set your username")).toBeNull();
    });

    // Ensure the signup success message is displayed
    expect(screen.getByText("User successfully registered. Please login to continue!")).toBeInTheDocument();
  });

  it("displays error message on signup failure", async () => {
    const { getByLabelText, getByText, queryByText } = render(<Signup />);
    
    // Mock axios post request to simulate signup failure
    axios.post.mockRejectedValueOnce(new Error("User already registered"));

    // Fill in form inputs
    fireEvent.change(screen.getByLabelText("Username:"), { target: { value: "existinguser" } });
    fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "testpassword" } });

    // Submit the form
    fireEvent.click(screen.getByText("Signup"));

    // Ensure the form validation errors are not displayed
    await waitFor(() => {
      expect(screen.queryByText("Please set your username")).toBeNull();
    });

    // Ensure the signup error message is displayed
    expect(screen.getByText("User already registered")).toBeInTheDocument();
  });
});
