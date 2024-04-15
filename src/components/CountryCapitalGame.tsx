/* eslint-disable */
import { useMemo } from "react";
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

  const buttonsData = useMemo(() => {
    return Object.entries(data).reduce<ButtonData[]>((acc, labels) => {
      const d = createButtonsPairData(labels);
      acc.push(...d);
      return acc;
    }, []);
  }, [data]);

  return (
    <div>
      {buttonsData.map((btn) => {
        return <button key={btn.id}>{btn.label}</button>;
      })}
    </div>
  );
}
