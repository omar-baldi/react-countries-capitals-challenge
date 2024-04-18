import CountryCapitalGame from "@/components/CountryCapitalGame";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

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

  it("should update button background color when triggering a click", () => {
    const wrapper = render(
      <CountryCapitalGame
        data={{
          Denmark: "Copenhagen",
          Italy: "Rome",
        }}
      />
    );

    const buttonDenmark = wrapper.getByTestId("btn-denmark", { exact: false });
    fireEvent.click(buttonDenmark);
    expect(buttonDenmark).toHaveStyle({ backgroundColor: "#4009FF" });
  });
});
