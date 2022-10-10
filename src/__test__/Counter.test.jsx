import { describe, test, expect, beforeAll, afterAll } from "vitest";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Counter from "../Counter";

describe("Counter", () => {
  test("initial value", () => {
    render(<Counter />);
    const counter = screen.getByText(/Count is:/i);

    expect(counter.textContent).toBe("Count is: 0");
  });

  test("increment", () => {
    render(<Counter />);
    const counter = screen.getByText(/Count is:/i);
    const increment = screen.getByRole("button", { name: /increment/i });

    fireEvent.click(increment);
    expect(counter.textContent).toBe("Count is: 1");
  });

  test("decrement", () => {
    render(<Counter />);
    const counter = screen.getByText(/Count is:/i);
    const decrement = screen.getByRole("button", { name: /decrement/i });

    fireEvent.click(decrement);
    expect(counter.textContent).toBe("Count is: -1");
  });
});
