/* static/js/app.js */
import { Router } from './core/router.js';
import { store } from './core/store.js';
import { UIManager } from './core/UIManager.js';
import { ReferenceDataService } from './services/referenceDataService.js';

// ---> IMPORTA O GERENCIADOR DE TEMAS <---
import { ThemeManager } from './core/theme.js'; 

// Função auxiliar para simplificar o Lazy Loading
const loadModule = (path, moduleName) => {
    // Agora aceita um aviso de "forçar recarregamento"
    return (forceReload = false) => {
        // Se for uma tentativa após erro, adiciona o tempo atual na URL para burlar o cache do navegador
        const url = forceReload ? `${path}?t=${Date.now()}` : path;
        return import(url).then(m => ({ default: m[moduleName] }));
    };
};

// ========================================
// LAZY LOADING: Módulos carregados sob demanda
// ========================================
const LAZY_MODULES = [
    {
        id: 'dados-gerais',
        label: 'Dados Gerais',
        icon: 'person',
        loader: loadModule('./modules/dados-gerais/index.js', 'DadosGerais')
    },
    {
        id: 'antropometria',
        label: 'Antropometria',
        icon: 'accessibility',
        loader: loadModule('./modules/antropometria/index.js', 'Antropometria')
    },
    {
        id: 'sinais-vitais',
        label: 'Sinais Vitais',
        icon: 'monitor_heart',
        loader: loadModule('./modules/sinais-vitais/index.js', 'SinaisVitais')
    },
    {
        id: 'ectoscopia',
        label: 'Ectoscopia',
        icon: 'visibility',
        loader: loadModule('./modules/placeholders.js', 'Ectoscopia')
    },
    {
        id: 'cabeca-pescoco',
        label: 'Cabeça e Pescoço',
        icon: 'face',
        loader: loadModule('./modules/placeholders.js', 'CabecaPescoco')
    },
    {
        id: 'cardiovascular',
        label: 'Cardiovascular',
        icon: 'favorite',
        loader: loadModule('./modules/cardiovascular/index.js', 'Cardiovascular')
    },
    {
        id: 'respiratorio',
        label: 'Respiratório',
        icon: 'air',
        loader: loadModule('./modules/placeholders.js', 'Respiratorio')
    },
    {
        id: 'digestorio',
        label: 'Digestório',
        icon: 'restaurant',
        loader: loadModule('./modules/placeholders.js', 'Digestorio')
    },
    {
        id: 'finalizar',
        label: 'Relatório',
        icon: 'description',
        location: 'footer',
        loader: loadModule('./modules/finalizar/index.js', 'Finalizar')
    }
];

document.addEventListener('DOMContentLoaded', () => {
    
    // Inicia os temas através do gerenciador isolado (Isso fará o botão funcionar)
    ThemeManager.init();
    
    // Pré-carrega dados de referência centralizados
    ReferenceDataService.initialize();
    
    // Inicia a UI
    setupUI();
    
    // Registrar Módulos no Router (com lazy loading)
    LAZY_MODULES.forEach(mod => Router.register(mod));
    Router.init();
});

function setupUI() {
    const uiManager = new UIManager();

    uiManager.registerToggle('open-sidebar', 'sidebar', 'add', 'open');
    uiManager.registerToggle('close-sidebar', 'sidebar', 'remove', 'open');
    
    uiManager.registerClickOutside('sidebar', ['open-sidebar', 'close-sidebar'], 'open');

    uiManager.setupToggleWithClickOutside({
        triggerId: 'settings-btn',
        targetId: 'settings-popover',
        className: 'hidden'
    });
}