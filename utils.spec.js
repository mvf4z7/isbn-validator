"use strict";

const {
  destructureDigits,
  normalize,
  parseISBN10Digit,
  parseISBN13Digit
} = require("./utils.js");
const { nonStrings } = require("./fixtures");

describe("utils", () => {
  describe("destructureDigits", () => {
    it("should throw a TypeError if passed a non array argument", () => {
      expect(() => destructureDigits(true)).toThrowError(TypeError);
    });

    it("should destructure the leading digits into an array the check digit by itself", () => {
      expect(destructureDigits([1, 2, 3, 4, 5])).toEqual([[1, 2, 3, 4], 5]);
    });

    it("should return an empty array and the zeroth element if passed an array of length 1", () => {
      expect(destructureDigits([1])).toEqual([[], 1]);
    });

    it("should return an empty array and undefined if passed an empty array", () => {
      expect(destructureDigits([])).toEqual([[], undefined]);
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

  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const nonDigits = ["a", "$", "!", "𝟙"];

  describe("parseISBN10Digit", () => {
    it("should throw a TypeError if the provided argument is not a string", () => {
      nonStrings.forEach(arg => {
        expect(() => parseISBN10Digit(arg)).toThrowError(TypeError);
      });
    });

    it("should return NaN if the provided argument is a string of length greater than one", () => {
      expect(parseISBN10Digit("11")).toBeNaN();
    });

    it("should return NaN if the provided character is not an ASCII number between 0 and 9 or 'X'", () => {
      nonDigits.forEach(arg => {
        expect(parseISBN10Digit(arg)).toBeNaN();
      });
    });

    it("should parse each string digit into the corresponding number", () => {
      digits.forEach((digit, idx) => {
        const parsed = parseISBN10Digit(digit);
        expect(typeof parsed).toBe("number");
        expect(parsed).toBe(idx);
      });
    });

    it("should parse the character 'X' into the nubmer 10", () => {
      expect(parseISBN10Digit("X")).toBe(10);
    });
  });

  describe("parseISBN13Digit", () => {
    it("should throw a TypeError if the provided argument is not a string", () => {
      nonStrings.forEach(arg => {
        expect(() => parseISBN13Digit(arg)).toThrowError(TypeError);
      });
    });

    it("should return NaN if the provided argument is a string of length greater than one", () => {
      expect(parseISBN13Digit("11")).toBeNaN();
    });

    it("should parse each string digit into the corresponding number", () => {
      digits.forEach((digit, idx) => {
        const parsed = parseISBN13Digit(digit);
        expect(typeof parsed).toBe("number");
        expect(parsed).toBe(idx);
      });
    });
  });
});
