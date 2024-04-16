/* eslint-disable */
import { useMemo, useState } from "react";
import { createButtonsPairData } from "../helpers/buttons";
import type { ButtonData } from "../types";
import { shuffleArray } from "../utils/array";

type Props = {
  /**
   * @description Object containing the names of the
   * countries as keys, and the value of each key
   * correspond to the associated capital.
   */
  data: Record<string, string>;
};

export default function CountryCapitalGame({ data }: Props) {
  const [selectedButtonsIds, setSelectedButtonsIds] = useState(new Map<string, string>());
  const [guessedPairsIds, setGuessedPairsIds] = useState<string[]>([]);

  function handleButtonGameClick(id: string, pairId: string) {
    setSelectedButtonsIds((prevSelectedButtonsIds) => {
      if (prevSelectedButtonsIds.size === 1) {
        const buttonsIds = [...prevSelectedButtonsIds.entries()];
        const [buttonIds] = buttonsIds;
        const [_, prevPairId] = buttonIds;

        if (pairId === prevPairId) {
          setGuessedPairsIds((prevPairsIds) => [...prevPairsIds, pairId]);
          return new Map();
        }
      }

      const updatedButtonsIds = new Map(prevSelectedButtonsIds);

      if (updatedButtonsIds.size === 2) {
        updatedButtonsIds.clear();
      }

      updatedButtonsIds.set(id, pairId);

      return updatedButtonsIds;
    });
  }

  const randomizedButtonsData = useMemo(() => {
    const buttonsData = Object.entries(data).reduce<ButtonData[]>((acc, labels) => {
      const d = createButtonsPairData(labels);
      acc.push(...d);
      return acc;
    }, []);

    return shuffleArray(buttonsData);
  }, [data]);

  const remainingButtonsData = useMemo(() => {
    return randomizedButtonsData.filter((btn) => !guessedPairsIds.includes(btn.pairId));
  }, [randomizedButtonsData, guessedPairsIds]);

  const isGameFinished = remainingButtonsData.length <= 0;

  if (isGameFinished) {
    return <h3>Congratulations!</h3>;
  }

  return (
    <div>
      {remainingButtonsData.map((btn) => {
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
            onClick={() => handleButtonGameClick(btn.id, btn.pairId)}
          >
            {btn.label}
          </button>
        );
      })}
    </div>
  );
}
