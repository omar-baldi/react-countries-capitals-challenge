import { createButtonsPairData } from "@/helpers/buttons";

describe("Buttons", () => {
  describe("createButtonsPairData", () => {
    it("should throw an error if labels provided are not a pair", () => {
      expect(() => {
        createButtonsPairData(["Denmark", "Copenhagen", "Norway", "Oslo"]);
      }).toThrow(new Error("Labels need to be a pair"));
    });

    it("should return buttons pair with correct configuration and same pair id", () => {
      const buttonsPair = createButtonsPairData(["Denmark", "Copenhagen"]);
      const [countryButtonData, capitalButtonData] = buttonsPair;

      expect(countryButtonData.pairId).toBe(capitalButtonData.pairId);

      expect(countryButtonData).toEqual({
        id: expect.any(String),
        pairId: expect.any(String),
        label: "Denmark",
      });

      expect(capitalButtonData).toEqual({
        id: expect.any(String),
        pairId: expect.any(String),
        label: "Copenhagen",
      });
    });
  });
});
