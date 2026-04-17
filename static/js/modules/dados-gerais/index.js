/* static/js/modules/dados-gerais/index.js */
import { store } from '../../core/store.js';
import { DadosGeraisView } from './view.js';

export const DadosGerais = {
    _view: null,

    render() {
        this._view = DadosGeraisView.create({
            onUpdateData: (campo, valor) => {
                // A informação é salva no estado global silenciosamente
                store.update('dadosGerais', { [campo]: valor });
            },
            onPediatricDetected: (isPediatric) => {
                // Notifica ao estado que detectou pediátrico
                store.update('dadosGerais', { isPediatric });
            }
        });
        return this._view.element;
    }
};