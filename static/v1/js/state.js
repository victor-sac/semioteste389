const state = {};
const listeners = [];

export const GlobalState = {
    set(key, value) {
        state[key] = value;
        // console.log(`[State] ${key} = ${value}`); // Descomente para debug
        this.notify();
    },

    get(key) {
        return state[key] || null;
    },

    getAll() {
        return { ...state };
    },

    subscribe(listener) {
        listeners.push(listener);
    },

    notify() {
        listeners.forEach(listener => listener(state));
    },
    
    // Função para limpar tudo ao encerrar o exame
    reset() {
        for (const key in state) delete state[key];
        this.notify();
    }
};