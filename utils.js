"use strict";

/*
 * Used to remove optional seperator characters from an ISBN string and break it
 * into the remaining constituent characters.
 */
function normalize(str) {
  if (typeof str !== "string") {
    throw new TypeError("argument must be a string");
  }

  const normalized = str.replace(/[ -]/g, "");

  return Array.from(normalized);
}

/*
 * Splits an array into an array of all the elements less the last element, and
 * the last element. The results are returned as a two element array.
 * e.g. [1, 2, 3, 4] => [[1, 2, 3], 4]
 */
function destructureDigits(digitsArray) {
  if (!Array.isArray(digitsArray)) {
    throw new TypeError("argument must be an array");
  }

  if (digitsArray.lenth === 0) {
    return [[], undefined];
  } else if (digitsArray.length === 1) {
    return [[], digitsArray[0]];
  }

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
