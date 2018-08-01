"use strict";

const { validate } = require("./ISBN.js");
const { ISBN10, ISBN13, nonStrings } = require("./fixtures");

describe("ISBN", () => {
  describe("validate", () => {
    it("should throw a TypeError when called with a non string argument", () => {
      nonStrings.forEach(arg => {
        expect(() => validate(arg)).toThrowError(TypeError);
      });
    });

    it("should return false when passed a string with all invalid ISBN characters", () => {
      expect(validate("abc#ef!hijklm")).toBe(false);
    });

    it("should return false when passed a string with a single invalid ISBN character", () => {
      let invalidISBNStr = `${
        ISBN13.standard[0]
      }#${ISBN13.standard[0].substring(2)}`;
      expect(validate(invalidISBNStr)).toBe(false);
    });

    it("should return false when passed an ISBN-13 string with an invalid check digit", () => {
      ISBN13.invalid.forEach(str => {
        expect(validate(str)).toBe(false);
      });
    });

    it("should validate standard ISBN-13 strings", () => {
      ISBN13.standard.forEach(str => {
        expect(validate(str)).toBe(true);
      });
    });

    it("should validate ISBN-13 strings with hyphens", () => {
      ISBN13.hyphens.forEach(str => {
        expect(validate(str)).toBe(true);
      });
    });

    it("should validate ISBN-13 strings with spaces", () => {
      ISBN13.spaces.forEach(str => {
        expect(validate(str)).toBe(true);
      });
    });

    it("should return false when passed an ISBN-10 string with an invalid check digit", () => {
      ISBN10.invalid.forEach(str => {
        expect(validate(str)).toBe(false);
      });
    });

    it("should validate standard ISBN-10 strings", () => {
      ISBN10.standard.forEach(str => {
        expect(validate(str)).toBe(true);
      });
    });

    it("should validate ISBN-10 strings with hyphens", () => {
      ISBN10.hyphens.forEach(str => {
        expect(validate(str)).toBe(true);
      });
    });

    it("should validate ISBN-10 strings with spaces", () => {
      ISBN10.spaces.forEach(str => {
        expect(validate(str)).toBe(true);
      });
    });
  });
});
