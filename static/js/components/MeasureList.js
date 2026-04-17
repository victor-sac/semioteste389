/* static/js/components/MeasureList.js */
import { el } from '../utils/dom.js';
import { Card } from './Card.js';
import { Fab } from './Fab.js';

export const MeasureList = {
    create({ availableItems, renderItem, onItemRemove }) {
        const container = el('div', { className: 'measure-list-container' });
        const cardsContainer = el('div', { className: 'cards-wrapper' });
        const activeIds = new Set();
        
        // Instância do FAB (agora recebemos o objeto de controle)
        const fab = Fab.create({
            options: availableItems.map(i => ({ 
                label: i.label, 
                value: i.id,
                // O getter permite que o FAB consulte o estado atual ao abrir o menu
                get disabled() { return activeIds.has(i.id); }
            })),
            onSelect: (id) => addItem(id)
        });

        // Função Central de Verificação
        const checkFull = () => {
            const isFull = activeIds.size >= availableItems.length;
            // Se estiver cheio, esconde o botão (visible = false)
            fab.toggle(!isFull);
        };

        const addItem = (id, initialData = null) => {
            if (activeIds.has(id)) return;
            activeIds.add(id);

            const config = availableItems.find(i => i.id === id);
            const { card, content } = Card.create({
                title: config.label,
                deletable: true,
                onRemove: () => {
                    activeIds.delete(id);
                    if (onItemRemove) onItemRemove(id);
                    // Ao remover, verifica novamente (vai reaparecer o botão)
                    checkFull();
                }
            });

            renderItem(config, content, initialData);
            cardsContainer.appendChild(card);
            
            // Verifica se completou a lista
            checkFull();
            
            setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
        };

        container.appendChild(cardsContainer);
        container.appendChild(fab.element); // Nota: agora usamos fab.element

        return { element: container, add: addItem };
    }
};