import { writable } from 'svelte/store';
import { v4 as uuid } from 'uuid';

function createTodoStore() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,

    add: (text) => {
      update(items => {
        return [...items, {
          id: uuid(),
          text,
          done: false,
        }]
      })
    },

    setDone: (id, done) => {
      update(items => {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, done };
          } else {
            return item;
          }
        })
      })
    },

    remove: (id) => {
      update(items => {
        return items.filter((item) => {
          return item.id !== id;
        })
      })
    }
  }
}

export const todoItems = createTodoStore();