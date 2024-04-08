// Record<Keys, Type>
export let x: Record<string, string | number | boolean | Function> = {
  name: "Wruce Bayne", // string type
};
x.number = 1234; // number type
x.active = true; // boolean type
x.log = () => console.log("awesome!"); // Function type

////////////////////

export type ContactStatus = "active" | "inactive" | "new";

interface Address {
  street: string;
  province: string;
  postalCode: string;
}

interface Contact {
  id: number;
  name: string;
  status: ContactStatus;
  address: Address;
  email: string;
}

interface Query {
  sort?: "asc" | "desc";
  matches(val: any): boolean;
}

// Partial<T>: The "Partial" helper type creates a new type that looks exactly like the type it wraps,
//             but with all of its properties defined as optional.
// Required<T>: "Required" is the opposite of "Partial". It turns all properties of a type to required
//              properties, instead of optional.
// Omit<T, K extends keyof T>: Like "Partial", the "Omit" helper type is a generic type that wraps
//          another type and copies that type's definition, but it allows you to omit certain
//          properties from that cloned definition.
// Pick<T, K extends keyof T>: "Pick" is the opposite of "Omit". It creates a new type using only the
//                             properties named by its second generic parameter.
export type ContactQuery = Partial<
  Pick<Record<keyof Contact, Query>, "id" | "name">
>;

export type RequiredContactQuery = Required<ContactQuery>;

export function searchContacts(contacts: Contact[], query: ContactQuery) {
  return contacts.filter((contact) => {
    for (const property of Object.keys(contact) as (keyof Contact)[]) {
      // get the query object for this property
      const propertyQuery = query[property];
      // check to see if it matches
      if (propertyQuery && propertyQuery.matches(contact[property])) {
        return true;
      }
    }

    return false;
  });
}

export const filteredContacts = searchContacts(
  [
    /* contacts */
  ],
  {
    id: { matches: (id) => id === 123 },
    name: { matches: (name) => name === "Carol Weaver" },
  }
);
