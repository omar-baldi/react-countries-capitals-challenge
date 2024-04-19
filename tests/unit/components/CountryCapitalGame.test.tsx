import CountryCapitalGame from "@/components/CountryCapitalGame";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("CountryCapitalGame", () => {
  it("should all buttons have correct background color property on component mount", () => {
    const wrapper = render(
      <CountryCapitalGame
        data={{
          Denmark: "Copenhagen",
          Italy: "Rome",
        }}
      />
    );

    const buttonsElements = wrapper.queryAllByTestId("btn-game", { exact: false });
    expect(buttonsElements.length).toBe(4);
    for (const buttonElement of buttonsElements) {
      expect(buttonElement).toHaveStyle({ backgroundColor: "initial" });
    }
  });
});
