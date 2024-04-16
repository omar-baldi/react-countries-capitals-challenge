import { useMemo, useState } from "react";
import { createButtonsPairData } from "../helpers/buttons";
import type { ButtonData } from "../types";
import { shuffleArray } from "../utils/array";

export const useButtonsHandler = (data: Record<string, string>) => {
  const [selectedButtonsIds, setSelectedButtonsIds] = useState(new Map<string, string>());
  const [guessedPairsIds, setGuessedPairsIds] = useState<string[]>([]);

  const randomizedButtons = useMemo(() => {
    const buttonsData = Object.entries(data).reduce<ButtonData[]>((acc, labels) => {
      const d = createButtonsPairData(labels);
      acc.push(...d);
      return acc;
    }, []);

    return shuffleArray(buttonsData);
  }, [data]);

  const remainingButtons = useMemo(() => {
    return randomizedButtons.filter((btn) => !guessedPairsIds.includes(btn.pairId));
  }, [randomizedButtons, guessedPairsIds]);

  const isGameFinished = remainingButtons.length <= 0;

  function handleButtonClick(id: string, pairId: string) {
    setSelectedButtonsIds((prevSelectedButtonsIds) => {
      if (prevSelectedButtonsIds.size === 1) {
        const buttonsIds = [...prevSelectedButtonsIds.entries()];
        const [buttonIds] = buttonsIds;
        const [, prevPairId] = buttonIds;

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

  return {
    selectedButtonsIds,
    remainingButtons,
    isGameFinished,
    handleButtonClick,
  };
};
