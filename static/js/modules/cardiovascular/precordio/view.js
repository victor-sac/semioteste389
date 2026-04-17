import { el } from '../../../utils/dom.js';
import { Card } from '../../../components/Card.js';

export const PrecordioView = {
    create() {
        return Card.create({
            title: '3. Inspeção e Palpação do Tórax',
            children: [
                el('p', { text: 'Conteúdo de Tórax Anterior aqui...', style: 'color: var(--text-muted);' })
            ]
        });
    }
};