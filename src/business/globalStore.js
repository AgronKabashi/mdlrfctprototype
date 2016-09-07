const store = new Map();

window.store = store;

export const GlobalStore = {
  add: (id, model) => store.set(id, model),
  get: (id) => store.get(id),
  has: (id) => store.get(id) !== undefined
};