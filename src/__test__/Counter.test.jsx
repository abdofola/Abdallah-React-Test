import { describe, test, expect, beforeAll, afterAll } from "vitest";
import React from "react";
import { createRoot } from "react-dom/client";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import Counter from "../Counter";
const { JSDOM } = require("jsdom");

const { document } = new JSDOM().window;
let container = null;
let root = null;
// to use act in react ^18
global.IS_REACT_ACT_ENVIRONMENT = true;

beforeAll(() => {
  // Set up a dom element as a render target.
  console.log("--------mount--------");
  document.body.innerHTML = "";
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterAll(() => {
  // cleanup on exiting
  act(() => {
    console.log("--------unmount--------");
    root.unmount();
    container.remove();
    root = null;
    container = null;
  });
});

describe("Counter", () => {
  test("initial value", () => {
    act(() => {
      root = createRoot(container);
      root.render(<Counter />);
    });
    const counter = container.querySelector(".counter>div:first-child");

    expect(counter.textContent).toBe("Count is: 0");
  });

  test("increment", () => {
    const counter = container.querySelector(".counter>div:first-child");
    const increment = container.querySelector(".counter button");
    act(() => {
      increment.click();
    });

    expect(counter.textContent).toBe("Count is: 1");
  });

  test("decrement", () => {
    const counter = container.querySelector(".counter>div:first-child");
    const decrement = container.querySelector(".counter button:last-of-type");

    act(() => {
      decrement.click();
    });

    expect(counter.textContent).toBe("Count is: 0");
  });
});
