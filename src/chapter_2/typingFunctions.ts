interface Individual {
  id: number;
  name: string;
  // clone(): Individual
}

interface User<TExternalId> {
  id: number; // satisfies T2 extends T1
  name: string; // satisfies T2 extends T1
  username: string;
  externalId: TExternalId;
  loadExternalId(): TExternalId;
}

// Generics
function clone<T1, T2 extends T1>(source: T1): T2 {
  return Object.apply({}, source);
}

const homer: Individual = {
  id: 123,
  name: "Homer Simpson",
};
const homerClone = clone<Individual, User<Number>>(homer);

const dateRange = {
  startDate: Date.now(),
  endDate: Date.now(),
};
const dateRangeClone = clone(dateRange);
