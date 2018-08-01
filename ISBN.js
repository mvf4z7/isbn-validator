"use strict";

const {
  destructureDigits,
  normalize,
  parseISBN10Digit,
  parseISBN13Digit
} = require("./utils.js");

/*
 * Validates ISBN-10 and ISBN-13 strings. The string may contain spaces and
 * hyphens.
 */
function validate(isbnStr) {
  if (typeof isbnStr !== "string") {
    throw new TypeError("argument must be a string");
  }

  const normalized = normalize(isbnStr);

  switch (normalized.length) {
    case 10:
      return validateNormalizedISBN10(normalized);
    case 13:
      return validateNormalizedISBN13(normalized);
    default:
      return false;
  }
}

/**
 * Validates whether the provided normalized string is a valid ISBN-10 identifier
 */
function validateNormalizedISBN10(normalized) {
  if (normalized.length !== 10) {
    return false;
  }

  const parsed = normalized.map(parseISBN10Digit);
  if (parsed.includes(NaN)) {
    false;
  }

  const [leadingDigits, checkDigit] = destructureDigits(parsed);
  const sum = leadingDigits.reduce((acc, digit, idx) => {
    acc += digit * (10 - idx);
    return acc;
  }, 0);

  const calculatedCheckDigit = (11 - (sum % 11)) % 11;

  return checkDigit === calculatedCheckDigit;
}

/*
 * Validates whether the provided normalized string is a valid ISBN-13 identifier
 */
function validateNormalizedISBN13(normalized) {
  if (normalized.length !== 13) {
    return false;
  }

  const parsed = normalized.map(parseISBN13Digit);
  if (parsed.includes(NaN)) {
    return false;
  }

  const [leadingDigits, checkDigit] = destructureDigits(parsed);
  const sum = leadingDigits.reduce((accum, digit, idx) => {
    // Alternating multipliers of 1 and 3, with the zeroth element having a
    // multiplier of 1.
    const multiplier = idx % 2 === 0 ? 1 : 3;
    accum += digit * multiplier;
    return accum;
  }, 0);

  // The outer modulo ensures that the check digit is always a single digit.
  // Without it, the check digit would equal 10 when sum is divisible by 10.
  // e.g. 10 - (100 % 10) = 10 - 0 = 10
  const calculatedCheckDigit = (10 - (sum % 10)) % 10;

  return checkDigit === calculatedCheckDigit;
}

module.exports = {
  validate
};
