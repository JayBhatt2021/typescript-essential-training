// String type alias
export type ContactName = string;

// Union types
export type ContactBirthDate = Date | number | string;

// Alternative to enums
export type ContactStatus = "active" | "inactive" | "new";

export interface Contact {
  id: number;
  name: ContactName;
  birthDate?: ContactBirthDate;
  status?: ContactStatus;
  email: string;
}

export interface Address {
  line1: string;
  line2: string;
  province: string;
  region: string;
  postalCode: string;
}

// Intersection types
type AddressableContact = Contact & Address;

export function getBirthDate(contact: Contact) {
  if (typeof contact.birthDate === "number") {
    return new Date(contact.birthDate);
  } else if (typeof contact.birthDate === "string") {
    return Date.parse(contact.birthDate);
  } else {
    return contact.birthDate;
  }
}

export let primaryContact: Contact = {
  id: 12345,
  name: "Jamie Johnson",
  status: "active",
  email: "jamie@gmail.com",
};

// keyof operator
export type ContactFields = keyof Contact;

export function getValue<T, U extends keyof T>(
  source: T,
  propertyName: U
): T[U] {
  return source[propertyName];
}

const value: number = getValue({ min: 1, max: 200 }, "max");
