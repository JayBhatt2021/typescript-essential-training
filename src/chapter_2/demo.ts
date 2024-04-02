// Built-In Types
let x: number;
let y: string;
let z: boolean;
let a: Date;
let b: any;

b = "Hello";
b = 1234;

// Custom Types
export interface Contact extends Address {
  id: number;
  name: ContactName;
  birthDate?: Date; // optional
  status: ContactStatus;
}

export interface Address {
  line1: string;
  line2: string;
  state: string;
  country: string;
  postalCode: string;
}

// Type Alias
export type ContactName = string;

// Enumerations
export enum ContactStatus {
  Active = "active",
  Inactive = "inactive",
  New = "new",
}

let primaryContact: Contact = {
  id: 12345,
  name: "Jack Fisher",
  status: ContactStatus.Active,
  line1: "Line 1",
  line2: "Line 2",
  state: "New York",
  country: "U.S.A.",
  postalCode: "Postal Code",
};
