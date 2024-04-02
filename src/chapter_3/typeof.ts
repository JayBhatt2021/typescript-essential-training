const x: string = "string";
const y: boolean = true;
console.log(typeof x); // --> "string"
console.log(typeof y); // --> "boolean"

export type ContactName = string;
export type ContactBirthDate = Date | number | string;
export type ContactStatus = "active" | "inactive" | "new";

export interface Contact {
  id: number;
  name: ContactName;
  birthDate?: ContactBirthDate;
  status?: ContactStatus;
}

export function toContact(nameOrContact: string | Contact): Contact {
  if (typeof nameOrContact === "object") {
    return {
      id: nameOrContact.id,
      name: nameOrContact.name,
      status: nameOrContact.status,
    };
  } else {
    return {
      id: 0,
      name: nameOrContact,
      status: "active",
    };
  }
}

// Alternative (shortcut) to interfaces
export const myType = { min: 1, max: 200 };

function save(source: typeof myType) {}
