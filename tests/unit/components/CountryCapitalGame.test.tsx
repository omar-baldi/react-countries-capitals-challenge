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

  it("should update background color to 'red' for selected buttons when pair is invalid", () => {
    const wrapper = render(
      <CountryCapitalGame
        data={{
          Denmark: "Copenhagen",
          Italy: "Rome",
        }}
      />
    );

    const buttonDenmark = wrapper.getByTestId("btn-denmark", { exact: false });
    const buttonRome = wrapper.getByTestId("btn-rome", { exact: false });

    fireEvent.click(buttonDenmark);
    fireEvent.click(buttonRome);

    expect(buttonDenmark).toHaveStyle({ backgroundColor: "red" });
    expect(buttonRome).toHaveStyle({ backgroundColor: "red" });
  });

  it("should remove selected buttons from view if pair is valid", () => {
    const wrapper = render(
      <CountryCapitalGame
        data={{
          Denmark: "Copenhagen",
          Italy: "Rome",
        }}
      />
    );

    const buttonDenmark = wrapper.getByTestId("btn-denmark", { exact: false });
    const buttonCopenhagen = wrapper.getByTestId("btn-copenhagen", { exact: false });

    fireEvent.click(buttonDenmark);
    fireEvent.click(buttonCopenhagen);

    expect(
      wrapper.queryByTestId("btn-denmark", { exact: false })
    ).not.toBeInTheDocument();

    expect(
      wrapper.queryByTestId("btn-copenhagen", { exact: false })
    ).not.toBeInTheDocument();
  });

  it("should render label when there are no more buttons rendered in the view", () => {
    const wrapper = render(
      <CountryCapitalGame
        data={{
          Denmark: "Copenhagen",
          Italy: "Rome",
        }}
      />
    );

    const buttonDenmark = wrapper.getByTestId("btn-denmark", { exact: false });
    const buttonCopenhagen = wrapper.getByTestId("btn-copenhagen", { exact: false });
    fireEvent.click(buttonDenmark);
    fireEvent.click(buttonCopenhagen);

    const buttonItaly = wrapper.getByTestId("btn-italy", { exact: false });
    const buttonRome = wrapper.getByTestId("btn-rome", { exact: false });
    fireEvent.click(buttonItaly);
    fireEvent.click(buttonRome);

    expect(
      wrapper.queryAllByTestId("btn-game", { exact: false }).length
    ).not.toBeGreaterThan(0);
  });
});
