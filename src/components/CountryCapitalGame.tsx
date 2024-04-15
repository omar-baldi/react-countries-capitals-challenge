/* eslint-disable */
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  /**
   * @description Object containing the names of the
   * countries as keys, and the value of each key
   * correspond to the associated capital.
   */
  data: Record<string, string>;
};

type ButtonData = {
  id: string;
  pairId: string;
  label: string;
};

export default function CountryCapitalGame({ data }: Props) {
  const [selectedButtonsIds, setSelectedButtonsIds] = useState(new Map<string, string>());
  const [, setGuessedPairsIds] = useState<string[]>([]);

  //!NOTE: move to "helpers" folder
  function createButtonsPairData(labels: string[]): ButtonData[] {
    const pairId = uuidv4();
    const buttonsPairData = [] as ButtonData[];

    for (const label of labels) {
      buttonsPairData.push({
        id: uuidv4(),
        pairId,
        label,
      });
    }

    return buttonsPairData;
  }

  //!NOTE: move to "utils" folder
  function shuffleArray<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  const randomizedButtonsData = useMemo(() => {
    const buttonsData = Object.entries(data).reduce<ButtonData[]>((acc, labels) => {
      const d = createButtonsPairData(labels);
      acc.push(...d);
      return acc;
    }, []);

    return shuffleArray(buttonsData);
  }, [data]);

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

  return (
    <div>
      {randomizedButtonsData.map((btn) => {
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
