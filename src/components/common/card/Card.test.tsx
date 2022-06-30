import React from "react";
import { screen, render } from "@testing-library/react";
import Card from "./Card";

describe("Card Component", () => {
  it("renders Card", () => {
    render(<Card />);
  });

  it("renders Card with title", () => {
    render(<Card title={"this is title"} />);

    expect(screen.getByRole("heading")).toHaveTextContent("this is title");
  });

  it("renders Card with children", () => {
    render(
      <Card>
        <p data-testid="child">child!</p>
      </Card>
    );

    const child = screen.getByTestId("child");
    expect(screen.getByTestId("card")).toContainElement(child);
  });
});
