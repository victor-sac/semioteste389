import { el } from '../../../utils/dom.js';
import { Card } from '../../../components/Card.js';

export const JugularView = {
    create() {
        return Card.create({
            title: '2. Pulso Venoso Jugular',
            children: [
                el('p', { text: 'Conteúdo de Jugular aqui...', style: 'color: var(--text-muted);' })
            ]
        });
    }
};