/**
 * This class defines a Customer.
 */
class Customer {}
const customer = new Customer();

// To extend a class, define an interface with the same name as the class, whether you own
// it or not (e.g. third-party library).
// Declaration merging extends existing interfaces in TS (classes are interfaces in TS).

/**
 * This interface extends the class definition of Customer.
 * It adds a method to save a customer.
 */
interface Customer {
  /**
   * Saves a customer somewhere.
   */
  save(): void;
}

// Declaration merging allows instances of the intended class to adopt new behavior.
customer.save = function () {};

// Declaration merging is commonly used to strongly-type global variables in web applications.
const myVar = window.MY_VAR;
