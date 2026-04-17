import { GlobalState } from './state.js';

// Imports dos Módulos
import Antropometria from './modules/antropometria.js';
import SinaisVitais from './modules/sinais_vitais.js';
import Ectoscopia from './modules/ectoscopia.js';
import CabecaPescoco from './modules/cabeca_pescoco.js';
import Respiratorio from './modules/respiratorio.js';
import Cardiovascular from './modules/cardiovascular.js';
import Digestorio from './modules/digestorio.js';
import RelatorioFinal from './modules/relatorio_final.js';

const modules = [
    Antropometria,
    SinaisVitais,
    Ectoscopia,
    CabecaPescoco,
    Respiratorio,
    Cardiovascular,
    Digestorio,
    RelatorioFinal
];

class App {
    constructor() {
        this.landingLayer = document.getElementById('landing-layer');
        this.appLayer = document.getElementById('app-layer');
        this.contentArea = document.getElementById('content-area');
        this.navMenu = document.getElementById('nav-menu');
        
        this.btnStart = document.getElementById('btn-start-exam');
        this.btnReturn = document.getElementById('btn-return-home');
        
        // Mobile
        this.sidebar = document.getElementById('sidebar');
        this.btnMenu = document.getElementById('btn-menu-toggle');
        this.overlay = document.getElementById('sidebar-overlay');

        // Dark Mode Buttons
        this.btnThemeDesktop = document.getElementById('btn-theme-desktop');
        this.btnThemeMobile = document.getElementById('btn-theme-mobile');

        this.currentModuleId = null;

        this.init();
    }

    init() {
        this.initTheme();

        if(this.btnStart) this.btnStart.addEventListener('click', () => this.startExam());
        if(this.btnReturn) this.btnReturn.addEventListener('click', () => this.returnHome());
        
        if(this.btnMenu) this.btnMenu.addEventListener('click', () => this.toggleSidebar());
        if(this.overlay) this.overlay.addEventListener('click', () => this.closeSidebar());

        if(this.btnThemeDesktop) this.btnThemeDesktop.addEventListener('click', () => this.toggleTheme());
        if(this.btnThemeMobile) this.btnThemeMobile.addEventListener('click', () => this.toggleTheme());

        this.renderSidebar();
        
        window.semioDispatch = (key, value, btnElement) => {
            GlobalState.set(key, value);
            GlobalState.set('lastUpdatedKey', key);
            if (btnElement && btnElement.parentElement) {
                Array.from(btnElement.parentElement.children).forEach(child => child.classList.remove('selected'));
                btnElement.classList.add('selected');
            }
        };

        window.addEventListener('request-generate-text', (e) => {
            const fullText = this.aggregateTexts();
            if (e.detail && e.detail.callback) e.detail.callback(fullText);
        });
    }

    // --- DARK MODE LOGIC ---
    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const icon = theme === 'dark' ? '☀️' : '🌙';
        if(this.btnThemeDesktop) this.btnThemeDesktop.textContent = icon;
        if(this.btnThemeMobile) this.btnThemeMobile.textContent = icon;
    }

    // --- NAVIGATION ---
    toggleSidebar() {
        this.sidebar.classList.toggle('open');
        this.overlay.classList.toggle('visible');
    }

    closeSidebar() {
        this.sidebar.classList.remove('open');
        this.overlay.classList.remove('visible');
    }

    startExam() {
        this.landingLayer.classList.add('hidden');
        this.appLayer.classList.remove('hidden');
        if (!this.currentModuleId) this.loadModule(modules[0].id);
    }

    returnHome() {
        if (confirm("Deseja encerrar o exame? Dados não salvos serão perdidos.")) {
            window.location.reload();
        }
    }

    renderSidebar() {
        this.navMenu.innerHTML = '';
        modules.forEach(mod => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            li.dataset.id = mod.id;
            li.textContent = mod.title;
            li.onclick = () => {
                this.loadModule(mod.id);
                if (window.innerWidth <= 768) this.closeSidebar();
            };
            this.navMenu.appendChild(li);
        });
    }

    loadModule(id) {
        const module = modules.find(m => m.id === id);
        if (!module) return;

        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        const activeItem = document.querySelector(`.nav-item[data-id="${id}"]`);
        if (activeItem) activeItem.classList.add('active');

        this.contentArea.innerHTML = module.render();
        if (module.init) module.init();
        this.currentModuleId = id;
    }

    // --- CORREÇÃO DO ESPAÇAMENTO ---
    aggregateTexts() {
        return modules
            .map(m => {
                if (typeof m.generateText === 'function') return m.generateText();
                return '';
            })
            .filter(text => text && text.trim().length > 0)
            .map(text => text.trim()) // <--- NOVO: Remove espaços/quebras sobrando no início/fim de cada bloco
            .join('\n\n'); // <--- Junta com APENAS UMA linha vazia entre eles
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});