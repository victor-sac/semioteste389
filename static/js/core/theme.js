/* static/js/core/theme.js */
import { store } from './store.js';

export const ThemeManager = {
    init() {
        this.setupBaseTheme();
        this.setupDynamicThemes();
    },

    // 1. Gerencia o Modo Claro/Escuro (Checkbox Switch)
    setupBaseTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        // Verifica preferência guardada ou do sistema
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Define se deve iniciar escuro
        const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        if (isDark) {
            body.classList.add('dark-mode');
            store.setConfig('darkMode', true); // Atualiza na Store
        }

        // Configura o comportamento do checkbox
        if (themeToggle) {
            themeToggle.checked = isDark;

            // Escuta a mudança de estado (change) do checkbox
            themeToggle.addEventListener('change', (e) => {
                const isChecked = e.target.checked;
                
                // Aplica a classe CSS
                body.classList.toggle('dark-mode', isChecked);
                
                // Salva no LocalStorage e na Store
                localStorage.setItem('theme', isChecked ? 'dark' : 'light');
                store.setConfig('darkMode', isChecked);
            });
        }
    },

    // 2. Gerencia os Temas Dinâmicos via Estado Global
    setupDynamicThemes() {
        store.subscribe((state) => {
            const dados = state.paciente.dadosGerais;
            if (!dados) return;

            const body = document.body;

            // Tema Sexo
            if (dados.sexo === 'Feminino') {
                body.classList.add('theme-female');
            } else {
                body.classList.remove('theme-female');
            }

            // Tema Idade
            if (dados.dataNascimento) {
                const parts = dados.dataNascimento.split('/');
                
                if (parts.length === 3) {
                    const birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
                    const today = new Date();
                    
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const m = today.getMonth() - birthDate.getMonth();
                    const d = today.getDate() - birthDate.getDate();
                    
                    if (m < 0 || (m === 0 && d < 0)) {
                        age--;
                    }
                    
                    // Limpa as classes antes de reavaliar
                    body.classList.remove('theme-pediatric', 'theme-adolescent');
                    
                    if (age < 18) {
                        body.classList.add('theme-pediatric');
                        
                        // Se for maior ou igual a 12, também é adolescente
                        if (age >= 12) {
                            body.classList.add('theme-adolescent');
                        }
                    }
                }
            } else {
                body.classList.remove('theme-pediatric', 'theme-adolescent');
            }
        });
    }
};