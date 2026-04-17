/* static/js/components/PopoverManager.js */
import { el } from '../utils/dom.js';

/**
 * Gerenciador de Popovers flutuantes
 * Simplifica criação, posicionamento e fechamento de popovers
 */
export class PopoverManager {
    constructor(container) {
        this.container = container;
        this.active = null;
        this.activeTrigger = null;
        this._boundClickHandler = (e) => this._handleOutsideClick(e);
    }

    /**
     * Fecha o popover ativo
     */
    close() {
        if (this.active) {
            this.active.remove();
            this.active = null;
            this.activeTrigger = null;
            document.removeEventListener('click', this._boundClickHandler);
        }
    }

    /**
     * Trata cliques fora do popover
     */
    _handleOutsideClick(e) {
        if (this.active && !this.active.contains(e.target) && this.activeTrigger !== e.target) {
            this.close();
        }
    }

    /**
     * Abre/fecha popover de forma toggle
     * Se já está aberto no mesmo trigger, fecha
     * Caso contrário, abre no novo trigger
     */
    toggle(trigger, createPopoverFn) {
        if (this.active && this.activeTrigger === trigger) {
            this.close();
        } else {
            this.create(trigger, createPopoverFn);
        }
    }

    /**
     * Cria e exibe um novo popover
     * @param {HTMLElement} trigger - Elemento que dispara o popover
     * @param {Function} createPopoverFn - Função que retorna o elemento popover
     */
    create(trigger, createPopoverFn) {
        this.close();
        
        const popover = createPopoverFn();
        this.container.appendChild(popover);
        
        // Aguarda a próxima frame para garantir que o popover foi renderizado
        // antes de calcular suas dimensões
        requestAnimationFrame(() => {
            const triggerRect = trigger.getBoundingClientRect();
            const popoverRect = popover.getBoundingClientRect();
            
            let left = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2);
            let top = triggerRect.top - popoverRect.height - 10;
            
            // Garantir que o popover não saia da tela
            const padding = 10;
            if (left < padding) left = padding;
            if (left + popoverRect.width > window.innerWidth - padding) {
                left = window.innerWidth - popoverRect.width - padding;
            }
            
            if (top < padding) {
                // Se não couber acima, tentar abaixo do trigger
                top = triggerRect.bottom + 10;
            }
            
            popover.style.position = 'fixed';
            popover.style.left = left + 'px';
            popover.style.top = top + 'px';
            
            this.active = popover;
            this.activeTrigger = trigger;
            
            // Adiciona listener para click fora
            setTimeout(() => {
                document.addEventListener('click', this._boundClickHandler);
            }, 0);
        });
    }

    /**
     * Cria um popover padrão com título e grid de opções
     * @param {string} title - Título do popover
     * @param {Array} options - Array com valor, texto e callback opcional
     * @param {Function} getCurrentValue - Função que retorna o valor selecionado atual
     * @param {Object} positionConfig - Config com top, left, iconColor (para calculatePopoverPosition)
     * @param {Function} calculatePosition - Função para calcular posição (opcional)
     */
    createStandardPopover(title, options, getCurrentValue, positionConfig, calculatePosition) {
        const popover = el('div', { className: 'pulse-popover' });
        popover.appendChild(el('h5', { className: 'pulse-popover-title', text: title }));

        const grid = el('div', { className: 'pulse-options-grid' });
        const currentVal = String(getCurrentValue());

        options.forEach(({ value, text, onSelect }) => {
            const btn = el('button', {
                className: 'btn-pulse-option',
                text: text || value,
                dataset: { val: value },
                onclick: (e) => {
                    e.stopPropagation();
                    if (onSelect) onSelect(value);
                    this.close();
                }
            });

            if (value === currentVal) btn.classList.add('selected');
            grid.appendChild(btn);
        });

        popover.appendChild(grid);

        // Aplica posição (se calculatePosition foi fornecido)
        if (calculatePosition) {
            const pos = calculatePosition(positionConfig);
            Object.assign(popover.style, pos);
        }

        return popover;
    }
}
