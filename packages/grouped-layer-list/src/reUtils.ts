const trueStrings = ["true", "on", "✓", "✔", "🗸", "🗹", "☑", "✅"];
const falseStrings = ["false", "off", "⍻", "X"];

/**
 * Creates a regular expression that will match if tested against a string
 * containing any of the strings in the input array.
 * @param strings An array of strings
 * @param exclusive Set to true to start regex with "^" and end with "$", false (or omit) otherwise.
 * @example
 * const trueStrings = ["true", "on", "1", "✓", "✔", "🗸", "🗹", "☑", "✅"];
 * const falseStrings = ["false", "off", "0", "⍻", "X"];
 * const trueRe = makeReGroup(trueStrings);
 * // /(?:true)|(?:on)|(?:1)|(?:✓)|(?:✔)|(?:🗸)|(?:🗹)|(?:☑)|(?:✅)/
 * const falseRe = makeReGroup(falseStrings);
 * // /(?:false)|(?:off)|(?:0)|(?:⍻)|(?:X)/
 */
export function makeReGroup(strings: string[], exclusive?: boolean) {
  let pattern = strings.map(s => `(?:${s})`).join("|");
  if (exclusive) {
    pattern = `^(?:${pattern})$`;
  }
  return new RegExp(`${pattern}`, "i");
}

/**
 * Creates a RegExp that will match boolean values.
 * @param matchOnly Set to true to only match true value strings.
 * Set to false to only match false value strings.
 * Set to non-boolean (e.g., undefined or null) to match either true or false.
 * @param exclusive
 */
export function makeBooleanRe(matchOnly?: boolean | null, exclusive?: boolean) {
  const parts =
    matchOnly === true
      ? trueStrings
      : matchOnly === false
        ? falseStrings
        : trueStrings.concat(...falseStrings);
  return makeReGroup(parts, exclusive);
}
