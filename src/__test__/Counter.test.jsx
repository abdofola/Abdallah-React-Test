import { describe, test, expect, beforeAll, afterAll } from "vitest";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Counter from "../Counter";


describe("Counter", () => {
  test("initial value", () => {
    const { container } = render(<Counter />);
    const counter = container.querySelector(".counter>div:first-child");

    expect(counter.textContent).toBe("Count is: 0");
  });

  test("increment", () => {
    const { container } = render(<Counter />);
    const counter = container.querySelector(".counter>div:first-child");
    const increment = container.querySelector(".counter button");

    fireEvent.click(increment);
    expect(counter.textContent).toBe("Count is: 1");
  });

  test("decrement", () => {
    const { container } = render(<Counter />);
    const counter = container.querySelector(".counter>div:first-child");
    const decrement = container.querySelector(".counter button:last-of-type");

    fireEvent.click(decrement);
    expect(counter.textContent).toBe("Count is: -1");
  });
});
