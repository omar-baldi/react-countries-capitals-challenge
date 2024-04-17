import { createButtonsPairData } from "@/helpers/buttons";

describe("Buttons", () => {
  describe("createButtonsPairData", () => {
    it("should throw an error if labels provided are not a pair", () => {
      expect(() => {
        createButtonsPairData(["Denmark", "Copenhagen", "Norway", "Oslo"]);
      }).toThrow(new Error("Labels need to be a pair"));
    });
  });
});
