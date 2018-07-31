const ISBN10 = {
  standard: ["0471958697", "043942089X"],
  hyphens: ["0-470-84525-2", "0-321-14653-0"],
  spaces: ["0 471 60695 2"],
  invalid: ["0471958699"]
};

const ISBN13 = {
  standard: ["9780470059029"],
  hyphens: ["978-0596809485", "978-0-13-149505-0", "978-0-262-13472-9"],
  spaces: ["978 0 471 48648 0"],
  invalid: [
    "9780470059021",
    "9780-470059-022",
    "978 0470059 023",
    "9780-47005 9024"
  ]
};

const nonStrings = [1, 1.0, undefined, null, {}, [], () => undefined, true];

module.exports = {
  ISBN10,
  ISBN13,
  nonStrings
};
