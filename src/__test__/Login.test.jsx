// all vitest functions are available globally as configured in vite.config.js file
import React from "react";
import {
  userEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "../utils/test-utils";
import { faker } from "@faker-js/faker";
import Login from "../components/Login";
import LogginSubmission from "../components/LogginSubmission";

function buildLoginForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  };
}
describe("Login", () => {
  test("submitting the form calls onSubmit with username and password", async () => {
    const { username, password } = buildLoginForm();
    const handleSubmit = vi.fn();
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

  test("loading in display the user's name", async () => {
    const { username, password } = buildLoginForm();
    render(<LogginSubmission />);
    await userEvent.type(screen.getByLabelText(/username/i), username);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitForElementToBeRemoved(screen.getByText(/loading/i));
    expect(screen.getByText(username)).toBeInTheDocument();
  });

  test("omitting the password results in an error", async () => {
    const { username } = buildLoginForm();
    render(<LogginSubmission />);
    await userEvent.type(screen.getByLabelText(/username/i), username);
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitForElementToBeRemoved(screen.getByText(/loading/i));

    expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot('"password required"');
  });
});
