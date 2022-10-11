import React from "react";
import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Login";

describe("Login", () => {
  test("submitting the form calls onSubmit with username and password", async () => {
    let submittedData = null;
    const handleSubmit = (data) => (submittedData = data);
    render(<Login onSubmit={handleSubmit} />);
    // you should await, otherwise unexpected behavior will happen. 
    await userEvent.type(screen.getByLabelText(/username/i), "fola");
    await userEvent.type(screen.getByLabelText(/password/i), "123");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(submittedData).toEqual({ username: "fola", password: "123" });
  });
});
