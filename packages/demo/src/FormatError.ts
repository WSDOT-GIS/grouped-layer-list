/**
 * An error to be used when a string is not in the format that was expected.
 */
export class FormatError extends Error {
  /**
   * Creates a new instance
   * @param value The string that generated the error.
   * @param expectedFormat The format that was expected.
   */
  constructor(value: string, expectedFormat: RegExp) {
    super(`"${value}" does not match expected format: "${expectedFormat}".`);
  }
}
