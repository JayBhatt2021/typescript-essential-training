export type ContactStatus = "active" | "inactive" | "new";

export interface Address {
  street: string;
  province: string;
  postalCode: string;
}

export interface Contact {
  id: number;
  name: string;
  status: ContactStatus;
  address: Address;
}

// Indexed Access Type
type Awesome = Contact["address"]["postalCode"];

export interface ContactEvent {
  contactId: Contact["id"];
}

export interface ContactDeletedEvent extends ContactEvent {}

export interface ContactStatusChangedEvent extends ContactEvent {
  oldStatus: Contact["status"];
  newStatus: Contact["status"];
}

export interface ContactEvents {
  deleted: ContactDeletedEvent;
  statusChanged: ContactStatusChangedEvent;
  // ... and so on
}

export function getValue<T, U extends keyof T>(
  source: T,
  propertyName: U
): T[U] {
  return source[propertyName];
}

function handleEvent<T extends keyof ContactEvents>(
  eventName: T,
  handler: (evt: ContactEvents[T]) => void
) {
  if (eventName === "statusChanged") {
    handler({ contactId: 1, oldStatus: "active", newStatus: "inactive" });
  }
}

handleEvent("statusChanged", (evt) => evt);
