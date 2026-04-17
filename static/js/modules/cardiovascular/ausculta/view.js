import { el } from '../../../utils/dom.js';
import { Card } from '../../../components/Card.js';

export const AuscultaView = {
    create() {
        return Card.create({
            title: '4. Ausculta Cardíaca',
            children: [
                el('p', { text: 'Conteúdo de Ausculta aqui...', style: 'color: var(--text-muted);' })
            ]
        });
    }
};