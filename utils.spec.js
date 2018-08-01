"use strict";

const {
  destructureDigits,
  normalize,
  parseISBN10Int,
  parseISBN13Int
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

  describe("parseISBN10Int", () => {
    it("should parse each string digit into the corresponding number", () => {
      digits.forEach((digit, idx) => {
        const parsed = parseISBN10Int(digit);
        expect(typeof parsed).toBe("number");
        expect(parsed).toBe(idx);
      });
    });

    it("should parse the character 'X' into the nubmer 10", () => {
      expect(parseISBN10Int("X")).toBe(10);
    });
  });

  describe("parseISBN13Int", () => {
    it("should parse each string digit into the corresponding number", () => {
      digits.forEach((digit, idx) => {
        const parsed = parseISBN13Int(digit);
        expect(typeof parsed).toBe("number");
        expect(parsed).toBe(idx);
      });
    });
  });
});
