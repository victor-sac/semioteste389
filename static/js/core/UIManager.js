/* static/js/core/UIManager.js */

export class UIManager {
    constructor() {
        this.toggles = [];
        this.clickOutsideHandlers = [];
    }

    _inferClassName(element) {
        return element.classList.contains('hidden') ? 'hidden' : 'open';
    }

    _applyAction(target, className, action) {
        if (action === 'toggle') {
            target.classList.toggle(className);
        } else if (action === 'add') {
            target.classList.add(className);
        } else if (action === 'remove') {
            target.classList.remove(className);
        }
    }

    /**
     * Registra um botão que alterna/abre/fecha um elemento
     */
    registerToggle(triggerId, targetId, action = 'toggle', className = null) {
        const trigger = document.getElementById(triggerId);
        const target = document.getElementById(targetId);
        
        if (!trigger || !target) return;

        className ??= this._inferClassName(target);

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this._applyAction(target, className, action);
        });

        this.toggles.push({ trigger, target, className, action });
    }

    /**
     * Registra um elemento para fechar quando clicado fora.
     * Diferencia entre remover 'open' ou adicionar 'hidden'.
     */
    registerClickOutside(elementId, exemptIds = [], className = null) {
        const element = document.getElementById(elementId);
        if (!element) return;

        className ??= this._inferClassName(element);

        const closeCondition = (target) => {
            // Se o clique foi dentro do próprio elemento, não fecha
            if (element.contains(target)) return false;
            
            // Se o clique foi em um dos IDs isentos (como o botão que abre), não fecha
            if (exemptIds.some(id => {
                const el = document.getElementById(id);
                return el && (target === el || el.contains(target));
            })) {
                return false;
            }
            
            return true;
        };

        document.addEventListener('click', (e) => {
            if (closeCondition(e.target)) {
                if (className === 'open') {
                    element.classList.remove('open');
                } else {
                    element.classList.add(className);
                }
            }
        });

        this.clickOutsideHandlers.push({ element, exemptIds, className });
    }

    /**
     * Setup padrão: botão alterna e clique fora fecha
     */
    setupToggleWithClickOutside(config) {
        const { triggerId, targetId, exemptIds = [], className = null } = config;
        
        this.registerToggle(triggerId, targetId, 'toggle', className);
        this.registerClickOutside(targetId, [triggerId, ...exemptIds], className);
    }
}