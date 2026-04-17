export const store = {
    state: {
        config: { usarSiglas: true, darkMode: false },
        paciente: {}
    },
    listeners: [],

    update(section, data) {
        this.state.paciente[section] = {
            ...(this.state.paciente[section] || {}),
            ...data
        };
        this.notify();
    },

    setConfig(key, value) {
        this.state.config[key] = value;
        this.notify();
    },

    getState() { return this.state; },
    
    subscribe(fn) { 
        this.listeners.push(fn); 
        // Retorna função para desinscrever
        return () => {
            this.listeners = this.listeners.filter(listener => listener !== fn);
        };
    },
    
    notify() { this.listeners.forEach(fn => fn(this.state)); }
};