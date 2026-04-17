import { store } from './store.js';

const generators = [];

export const Report = {
    register(fn) { generators.push(fn); },

    generate() {
        const state = store.getState();
        return generators
            .map(fn => fn(state))
            .filter(text => text && text.trim().length > 0)
            .join('\n\n');
    }
};