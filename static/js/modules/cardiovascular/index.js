/* static/js/modules/cardiovascular/index.js */
import { store } from '../../core/store.js';
import { Report } from '../../core/report.js';
import { CardiovascularView } from './view.js';

// Importa a lógica específica de cada sub-módulo
import { PulsosLogic } from './pulsos/logic.js';
import { JugularLogic } from './jugular/logic.js';
import { PrecordioLogic } from './precordio/logic.js';
import { AuscultaLogic } from './ausculta/logic.js';

export const Cardiovascular = {
    
    render() {
        return CardiovascularView.create({
            onUpdateSection: (subSection, data) => {
                const currentCardio = store.getState().paciente.cardiovascular || {};
                const currentSub = currentCardio[subSection] || {};

                store.update('cardiovascular', {
                    [subSection]: { ...currentSub, ...data }
                });
            }
        }).element;
    }
};

// --- Gerador de Relatório Modularizado ---
Report.register((state) => {
    const cardio = state.paciente.cardiovascular;
    if (!cardio) return null;
    
    // Captura a preferência de texto simplificado
    const { usarSiglas } = state.config; 

    const parts = [];

    // 1. Pulsos (Agora passa 'usarSiglas')
    const txtPulsos = PulsosLogic.generateReport(cardio.pulsos, usarSiglas);
    if (txtPulsos) parts.push(txtPulsos);

    // 2. Jugular
    const txtJugular = JugularLogic.generateReport(cardio.jugular);
    if (txtJugular) parts.push(txtJugular);

    // 3. Precordio
    const txtPrecordio = PrecordioLogic.generateReport(cardio.precordio);
    if (txtPrecordio) parts.push(txtPrecordio);

    // 4. Ausculta
    const txtAusculta = AuscultaLogic.generateReport(cardio.ausculta);
    if (txtAusculta) parts.push(txtAusculta);

    if (parts.length === 0) return null;

    return `CARDIOVASCULAR: ${parts.join(' | ')}.`;
});