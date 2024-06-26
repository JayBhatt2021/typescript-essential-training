// Record<Keys, Type>
export let x: Record<string, string | number | boolean | Function> = {
  name: "Bruce Wayne", // string type
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
}

interface Query {
  sort?: "asc" | "desc";
  matches(val: any): boolean;
}

// Partial<T>: Make all properties in T optional
// Pick<T, K extends keyof T>: From T, pick a set of properties whose keys are in the union K
export type ContactQuery = Partial<
  Pick<Record<keyof Contact, Query>, "id" | "name">
>;

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
