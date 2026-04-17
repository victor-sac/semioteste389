import { store } from '../../core/store.js';
import { Report } from '../../core/report.js';
import { Validators, Format } from '../../utils/logic.js'; 
import { AntropometriaView } from './view.js';

export const Antropometria = {
    _view: null,

    render() {
        this._view = AntropometriaView.create({
            onUpdateBasics: (campo, valor) => {
                store.update('antropometria', { [campo]: parseFloat(valor) });
                this.calcIMC();
            },
            onUpdateMeasures: (list) => store.update('antropometria', { circunferencias: list })
        });
        return this._view.element;
    },

    calcIMC() {
        const { peso, altura } = store.getState().paciente.antropometria || {};
        const res = Validators.imc(peso, altura);
        
        if (res) {
            store.update('antropometria', { imc: res.valor, classificacao: res.classificacao });
            this._view.updateIMC(res);
        } else {
            store.update('antropometria', { imc: null, classificacao: null });
            this._view.updateIMC({ valor: null });
        }
    }
};

Report.register((state) => {
    const d = state.paciente.antropometria;
    if (!d) return null;
    const { usarSiglas } = state.config;

    const parts = [];
    if (d.peso) parts.push(`Peso: ${d.peso}kg`);
    if (d.altura) parts.push(Format.term(`Altura: ${d.altura}cm`, `Alt: ${d.altura}cm`, usarSiglas));
    if (d.imc) parts.push(usarSiglas ? `IMC: ${d.imc}` : `IMC: ${d.imc} (${d.classificacao})`);

    let medidas = '';
    if (d.circunferencias?.length) {
        const lista = d.circunferencias.map(m => {
            let nome = m.nome;
            let lado = '';
            if (m.lado) lado = usarSiglas ? ` (${m.lado})` : (m.lado === 'D' ? ' Dir.' : ' Esq.');
            if (usarSiglas) nome = nome.replace('Circunferência', 'Circ.').replace(/ d[oa] /g, ' ');
            return `${nome}${lado}: ${m.valor}cm`;
        });
        medidas = usarSiglas ? ` | Medidas: ${lista.join(' | ')}` : `. Medidas: ${lista.join('; ')}`;
    }

    if (!parts.length && !medidas) return null;
    return `ANTROPOMETRIA: ${parts.join(' | ')}${medidas}.`;
});