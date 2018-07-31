"use strict";

/**
 * Used to remove optional seperator characters from an ISBN string and break it
 * into the remaining constituent characters.
 * @param {String} str
 */
function normalize(str) {
  if (typeof str !== "string") {
    throw new TypeError("argument must be a string");
  }

  const normalized = str.replace(/[ -]/g, "");

  return Array.from(normalized);
}

function destructureDigits(digitsArray) {
  const leadingDigits = digitsArray.slice(0, -1);
  const [checkDigit] = digitsArray.slice(-1);
  return [leadingDigits, checkDigit];
}

function parseISBN10Int(str) {
  if (str === "X") {
    return 10;
  }

  return parseInt(str, 10);
}

function parseISBN13Int(str) {
  return parseInt(str, 10);
}

module.exports = {
  destructureDigits,
  normalize,
  parseISBN10Int,
  parseISBN13Int
};
