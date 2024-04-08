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

interface Query<TProp> {
  sort?: "asc" | "desc";
  matches(val: TProp): boolean; // replace "any" with "TProp"
}

// Mapped Types
export type ContactQuery = {
  // Optional Contact Properties -> Query of Contact Property Type
  [TProp in keyof Contact]?: Query<Contact[TProp]>;
};

export function searchContacts(contacts: Contact[], query: ContactQuery) {
  return contacts.filter((contact) => {
    for (const property of Object.keys(contact) as (keyof Contact)[]) {
      // get the query object for this property
      const propertyQuery = query[property] as Query<Contact[keyof Contact]>;
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
