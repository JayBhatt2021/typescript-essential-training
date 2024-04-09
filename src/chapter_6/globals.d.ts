/*
 * globals.d.ts is a type declaration file.
 * - describes the shape of an existing module
 * - only contains type information used for type checking
 */

// Ambient modules are used to declare external modules or third-party libraries.
// Everything inside "declare global" should be available to the global namespace.
declare global {
  /**
   * Formats the given date into a string representation.
   * @param date - The date to format.
   * @returns A string representation of the formatted date.
   */
  // function formatDate(date: Date): string;

  /**
   * This interface extends the class definition of the TS Window class.
   */
  interface Window {
    /**
     * This is my custom global variable.
     */
    MY_VAR: string;
  }
}

// "declare global" must be inside a module; an empty export set signifies this file as a module.
export {};
