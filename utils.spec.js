"use strict";

const { destructureDigits, normalize } = require("./utils.js");
const { nonStrings } = require("./fixtures");

describe("utils", () => {
  describe("destructureDigits", () => {
    it("should destructure the leading digits into an array the check digit by itself", () => {
      expect(destructureDigits([1, 2, 3, 4, 5])).toEqual([[1, 2, 3, 4], 5]);
    });
  });

  describe("normalize", () => {
    it("should throw an Error if the provided argument is not a string", () => {
      nonStrings.forEach(arg => {
        expect(() => normalize(arg)).toThrowError(TypeError);
      });
    });

    it("should remove spaces from the provided string", () => {
      expect(normalize(" abc def  gh ")).toEqual([
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h"
      ]);
    });

    it("should remove hyphens from the provided string", () => {
      expect(normalize("-abc-def--gh-")).toEqual([
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h"
      ]);
    });

    it("should normalize a string without spaces or hyphens", () => {
      expect(normalize("abcdefgh")).toEqual([
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h"
      ]);
    });
  });
});
