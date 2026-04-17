/* static/js/modules/cardiovascular/view.js */
import { el } from '../../utils/dom.js';
import { PulsosView } from './pulsos/view.js';
import { JugularView } from './jugular/view.js';
import { PrecordioView } from './precordio/view.js';
import { AuscultaView } from './ausculta/view.js';

export const CardiovascularView = {
    // Recebe a função genérica 'onUpdateSection'
    create({ onUpdateSection }) {
        const container = el('div');

        // 1. Pulsos (Passamos uma função que já avisa: "Sou a seção 'pulsos'")
        container.appendChild(PulsosView.create({
            onUpdate: (data) => onUpdateSection('pulsos', data)
        }));

        // 2. Jugular (Futuramente)
        container.appendChild(JugularView.create({
            onUpdate: (data) => onUpdateSection('jugular', data) // Exemplo futuro
        }));

        // 3. Precordio
        container.appendChild(PrecordioView.create({
            onUpdate: (data) => onUpdateSection('precordio', data)
        }));

        // 4. Ausculta
        container.appendChild(AuscultaView.create({
            onUpdate: (data) => onUpdateSection('ausculta', data)
        }));

        return { element: container };
    }
};