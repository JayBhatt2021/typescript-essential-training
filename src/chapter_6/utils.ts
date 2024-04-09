// To share a function or variable from one module to another, we export it.

/**
 * Formats the given date into a string representation using the medium date style.
 * @param date - The date to format.
 * @returns A string representation of the formatted date.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
}
