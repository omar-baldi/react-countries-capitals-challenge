import { useButtonsHandler } from "../hooks/useButtonsHandler";

type Props = {
  /**
   * @description Object containing the names of the
   * countries as keys, and the value of each key
   * correspond to the associated capital.
   */
  data: Record<string, string>;
};

export default function CountryCapitalGame({ data }: Props) {
  const { remainingButtons, selectedButtonsIds, isGameFinished, handleButtonClick } =
    useButtonsHandler(data);

  if (isGameFinished) {
    return <h3>Congratulations!</h3>;
  }

  return (
    <div>
      {remainingButtons.map((btn) => {
        const isButtonSelected = selectedButtonsIds.has(btn.id);
        const isButtonIncorrect = isButtonSelected && selectedButtonsIds.size === 2;
        const buttonBackgroundColor = isButtonIncorrect
          ? "red"
          : isButtonSelected
          ? "#4009FF"
          : "initial";

        return (
          <button
            key={btn.id}
            style={{ backgroundColor: buttonBackgroundColor }}
            onClick={() => handleButtonClick(btn.id, btn.pairId)}
          >
            {btn.label}
          </button>
        );
      })}
    </div>
  );
}
