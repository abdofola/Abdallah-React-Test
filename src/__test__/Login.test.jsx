import React from "react";
import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import Login from "../components/Login";

function buildLoginForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides
  };
}
describe("Login", () => {
  test("submitting the form calls onSubmit with username and password", async () => {
    const { username, password } = buildLoginForm();
    const props = {
      onSubmit({ username, password }) {},
    };
    const handleSubmit = vi.spyOn(props, "onSubmit");
    render(<Login onSubmit={handleSubmit} />);
    // you should await, otherwise unexpected behavior will happen.
    await userEvent.type(screen.getByLabelText(/username/i), username);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(handleSubmit).toHaveBeenCalledWith({
      username,
      password,
    });
  });
});
