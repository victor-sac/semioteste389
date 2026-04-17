/* static/js/components/Card.js */
import { el, icon, ui } from '../utils/dom.js';

export const Card = {
    /**
     * Cria um card com suporte a modo deletável
     * @param {string} title - Título do card
     * @param {string} id - ID do elemento (opcional)
     * @param {string} className - Classes CSS adicionais (padrão: '')
     * @param {Array} children - Elementos filhos
     * @param {boolean} deletable - Se true, adiciona botão de remover (padrão: false)
     * @param {Function} onRemove - Callback ao remover (ignorado se deletable=false)
     * @returns {HTMLElement|Object} Element | {card, content} se deletable=true
     */
    create({ title, id, className = '', children = [], deletable = false, onRemove }) {
        const card = el('div', { id, className: `card ${className}` });

        if (deletable && title) {
            // Modo deletável: cria header com botão de fechar
            const header = el('div', { className: 'card-header' }, [
                el('h4', { text: title }),
                ui.btnIcon('close', 'Remover', () => {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.remove();
                        if (onRemove) onRemove();
                    }, 300);
                })
            ]);
            card.appendChild(header);
        } else if (title) {
            // Modo simples: apenas título
            card.appendChild(el('h3', { text: title }));
        }

        const content = el('div', {});
        children.forEach(child => content.appendChild(child));
        card.appendChild(content);

        // Retorna objeto se deletable, senão apenas o card
        return deletable ? { card, content } : card;
    }
};