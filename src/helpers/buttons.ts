import { v4 as uuidv4 } from "uuid";
import type { ButtonData } from "../types";

export function createButtonsPairData(labels: string[]): ButtonData[] {
  if (labels.length !== 2) {
    throw new Error("Labels need to be a pair");
  }

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
