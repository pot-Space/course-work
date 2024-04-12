import { writable } from 'svelte/store';

function createRollStore() {
  const rolls = [];
  const { subscribe, set, update } = writable(rolls);

  return {
    subscribe,
    addNewRoll: (attack) => {
      update($rolls => [...$rolls, attack])
    },
    reset: () => set([])
  };
};

export const rollStore = createRollStore();