import { useButtonsHandler } from "@/hooks/useButtonsHandler";
import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("uuid", () => {
  return {
    v4: vi.fn(),
  };
});

vi.mock("@/helpers/buttons", () => {
  return {
    createButtonsPairData: vi.fn().mockImplementation((labels: string[]) => {
      const [country] = labels;

      if (country === "Denmark") {
        return [
          { id: "1_1", pairId: "1", label: "Denmark" },
          { id: "1_2", pairId: "1", label: "Copenhagen" },
        ];
      }

      return [
        { id: "2_1", pairId: "2", label: "Norway" },
        { id: "2_2", pairId: "2", label: "Oslo" },
      ];
    }),
  };
});

describe("useButtonsHandler", () => {
  const mockData = {
    Denmark: "Copenhagen",
    Norway: "Oslo",
  } satisfies Parameters<typeof useButtonsHandler>[0];

  it("should custom hook be initialized with default values", () => {
    const { result } = renderHook(() => useButtonsHandler(mockData));
    const { isGameFinished, remainingButtons, selectedButtonsIds } = result.current;

    expect(isGameFinished).toBe(false);
    expect(selectedButtonsIds.size).not.toBeGreaterThan(0);
    expect(remainingButtons).toEqual(
      expect.arrayContaining([
        { id: "1_1", pairId: "1", label: "Denmark" },
        { id: "1_2", pairId: "1", label: "Copenhagen" },
        { id: "2_1", pairId: "2", label: "Norway" },
        { id: "2_2", pairId: "2", label: "Oslo" },
      ])
    );
  });

  it("should remaining buttons be updated when selecting correct buttons pair", () => {
    const { result } = renderHook(() => useButtonsHandler(mockData));

    act(() => {
      const { handleButtonClick } = result.current;
      handleButtonClick("1_1", "1");
      handleButtonClick("1_2", "1");
    });

    expect(result.current.remainingButtons).toEqual(
      expect.arrayContaining([
        { id: "2_1", pairId: "2", label: "Norway" },
        { id: "2_2", pairId: "2", label: "Oslo" },
      ])
    );
  });
});
