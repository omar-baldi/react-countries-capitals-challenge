/* eslint-disable */

import { useMemo } from "react";

type Props = {
  /**
   * @description Object containing the names of the
   * countries as keys, and the value of each key
   * correspond to the associated capital.
   */
  data: Record<string, string>;
};

type ButtonData = {
  id: number;
  paidId: number;
  label: string;
};

export default function CountryCapitalGame({ data }: Props) {
  const buttonsData = useMemo(() => {
    return Object.entries(data).reduce<ButtonData[]>(
      (acc, [countryLabel, capitalLabel]) => {
        const countryData = {
          id: 0,
          paidId: 0,
          label: countryLabel,
        };

        const capitalData = {
          id: 0,
          paidId: 0,
          label: capitalLabel,
        };

        acc.push(...[countryData, capitalData]);

        return acc;
      },
      []
    );
  }, [data]);

  return (
    <div>
      {buttonsData.map((btn) => {
        return <button key={btn.id}>{btn.label}</button>;
      })}
    </div>
  );
}
