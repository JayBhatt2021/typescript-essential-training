/**
 * Represents a contact with an ID.
 */
export interface Contact {
  id: number;
}

/**
 * Represents the current user with ID, roles, and authentication status.
 */
export const currentUser = {
  id: 1234,
  roles: ["ContactEditor"],
  /**
   * Checks if the current user is authenticated.
   * @returns True if the user is authenticated, otherwise false.
   */
  isAuthenticated(): boolean {
    return true;
  },
  /**
   * Checks if the current user is in the specified role.
   * @param role - The role to check.
   * @returns True if the user is in the specified role, otherwise false.
   */
  isInRole(role: string): boolean {
    return this.roles.includes(role);
  },
};

/**
 * Method decorator that authorizes access based on the user's role.
 * @description The method decorator must be structured this way to accept custom parameters.
 * @param role - The role of the current user.
 * @returns A method decorator function.
 */
export function authorize(role: string) {
  /**
   * Method decorator FACTORY that authorizes access based on the user's role.
   * @description A decorator factory is a function that creates decorators.
   * @param target - The object that the decorator is being applied to (in the case of a
   *                 method decorator, it's the instance of the object that the method belongs
   *                 to).
   * @param property - The name of the property that the decorator is applied to.
   * @param descriptor - An object containing the current metadata about the property.
   * @returns A method decorator FACTORY function.
   */
  return function authorizeDecorator(
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    // Make the copy of the current method before overriding it
    const wrapped = descriptor.value;

    descriptor.value = function () {
      // Throw an error if the current user is not authenticated
      if (!currentUser.isAuthenticated()) {
        throw Error("User is not authenticated.");
      }

      // Throw an error if the current user doesn't have the desired role
      if (!currentUser.isInRole(role)) {
        throw Error(`User is not a ${role}.`);
      }

      try {
        // Call the original method (aka. the copy that was created earlier)
        return wrapped.apply(this, arguments);
      } catch (ex) {
        // TODO: Some fancy logging logic here
        throw ex;
      }
    };
  };
}

/**
 * Class decorator that freezes the constructor and its prototype so that they cannot be
 * modifed after they're defined.
 * @param constructor - The constructor function of the class that the decorator is
 *                      being applied to.
 */
export function freeze(constructor: Function) {
  Object.freeze(constructor);
  // A prototype is an object, where it can add new variables and methods to the existing
  // object. It is part of the prototype chain.
  Object.freeze(constructor.prototype);
}

/**
 * Singleton class decorator that ensures only one instance of the class can be created.
 * @description This class decorator creates a whole new class that extends the class that
 *              was passed in.
 * @param constructor - The constructor function of the class that the decorator is being
 *                      applied to.
 * @returns A new class that extends the original class with singleton behavior.
 */
export function singleton<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class Singleton extends constructor {
    static _instance = null;

    // Accept all parameters being passed to the original constructor
    constructor(...args: any) {
      // Pass these parameters to the base constructor as well
      super(...args);

      // Checks to see if another instance of Singleton has been created
      if (Singleton._instance) {
        throw Error("Duplicate instance of Singleton has been created.");
      }

      // Save a reference to the newly-constructed instance
      Singleton._instance = this;
    }
  };
}

/**
 * Property decorator that logs changes to the property value.
 * @description Property decorators are decorators that are applied to the properties of
 *              a class.
 * @param target - The object that the decorator is applied to (in the case of a property
 *                 decorator, it's the instance of the object that the property belongs to).
 * @param key - The name of the property that the decorator is applied to.
 */
export function auditable(target: any, key: string | symbol) {
  // Get the initial property value before the decorator is applied.
  let val = target[key];

  // Then, overwrite the property with a custom getter and setter
  Object.defineProperty(target, key, {
    get: () => val,
    set: (newVal) => {
      console.log(`${key.toString()} changed: `, newVal);
      val = newVal;
    },
    enumerable: true,
    configurable: true,
  });
}

/**
 * Repository class for managing contacts.
 */
@freeze
@singleton
export class ContactRepository {
  @auditable
  private contacts: Contact[] = [];

  /**
   * Retrieves a contact by its ID.
   * @param id - The ID of the contact.
   * @returns The contact object if found, otherwise null.
   */
  @authorize("ContactViewer")
  getContactById(id: number): Contact | null {
    return this.contacts.find((c) => c.id === id);
  }

  /**
   * Saves a contact.
   * @param contact - The contact to save.
   */
  @authorize("ContactEditor")
  save(contact: Contact): void {
    const existing = this.getContactById(contact.id);

    if (existing) {
      Object.assign(existing, contact);
    } else {
      this.contacts.push(contact);
    }
  }
}
