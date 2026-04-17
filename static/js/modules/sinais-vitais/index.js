/* static/js/modules/sinais-vitais/index.js */
import { store } from '../../core/store.js';
import { Router } from '../../core/router.js';
import { Report } from '../../core/report.js';
import { Validators } from '../../utils/logic.js';
import { SinaisView } from './view.js';

export const SinaisVitais = {
    _view: null,
    _unsubscribe: null,
    _isInitialized: false,

    async _validateAndUpdatePA() {
        if (!this._view || !this._view.element) return;

        const pasInput = this._view.element.querySelector('#sinais-pas');
        const padInput = this._view.element.querySelector('#sinais-pad');
        
        let pas = pasInput?.value;
        let pad = padInput?.value;
        
        const state = store.getState();
        
        // Repopular inputs (caso o componente tenha sido recriado mas o dado esteja no state)
        if ((!pas || !pad) && state.paciente.sinais) {
            pas = pas || state.paciente.sinais.pas;
            pad = pad || state.paciente.sinais.pad;
            if (pasInput && !pasInput.value && pas) pasInput.value = pas;
            if (padInput && !padInput.value && pad) padInput.value = pad;
        }

        if (!pas || !pad) return;
        
        // Coleta dados extras para a validação (o logic.js é quem decide se são necessários ou não)
        const { dataNascimento, sexo } = state.paciente.dadosGerais || {};
        const altura = state.paciente.antropometria?.altura;
        
        // Passa a responsabilidade 100% para o logic.js
        const res = await Validators.pressaoArterial(pas, pad, { dataNascimento, sexo, altura });
        if (!res) return;

        // Trata os casos de dados pendentes na pediatria identificados pelo logic.js
        let onClickCallback = null;
        if (res.missingData === 'sexo') {
            onClickCallback = () => Router.activate('dados-gerais');
        } else if (res.missingData === 'altura') {
            onClickCallback = () => {
                // Redireciona para Antropometria
                Router.activate('antropometria');
                
                // Aguarda um pequeno delay para a nova página renderizar no DOM
                setTimeout(() => {
                    const elAltura = document.getElementById('input-altura');
                    if (elAltura) {
                        elAltura.focus(); // Coloca o cursor piscando diretamente no campo
                        
                        // Opcional: Animação rápida na borda para chamar atenção
                        elAltura.style.transition = 'box-shadow 0.3s';
                        elAltura.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.5)';
                        setTimeout(() => elAltura.style.boxShadow = 'none', 1500);
                    }
                }, 100);
            };
        }

        this._view.setPAFeedback(res.label, res.status, res.referenceRule, 'pa', onClickCallback);
    },

    render() {
        this._view = SinaisView.create({
            onUpdatePA: async () => {
                const pas = this._view.element.querySelector('#sinais-pas')?.value;
                const pad = this._view.element.querySelector('#sinais-pad')?.value;
                if (pas && pad) store.update('sinais', { pas, pad });
                
                await this._validateAndUpdatePA();
            },
            onUpdateDetails: (d) => store.update('sinais', { membroAtual: d.membro, membroSiglaAtual: d.membroSigla, posicaoAtual: d.posicao }),
            
            onSavePA: ({ pas, pad, membro, membroSigla, posicao, tempo, isConfirming }) => {
                if (!pas || !pad) return alert('Informe os valores de pressão.');
                
                const prev = store.getState().paciente.sinais?.historicoPA || [];
                
                if (prev.length > 0 && !isConfirming) {
                    this._view.showTimeInput();
                    return;
                }

                const finalTempo = (tempo === '0' || !tempo) ? null : tempo;
                const next = [...prev, { id: Date.now(), pas, pad, membro, membroSigla, posicao, tempo: finalTempo }];
                
                store.update('sinais', { historicoPA: next });
                this._view.renderHistory(next);
                this._view.clearPAInputs();
                this._view.resetTimeInput();
            },
            
            onRemoveHistory: (id) => {
                const next = (store.getState().paciente.sinais?.historicoPA || []).filter(i => i.id !== id);
                store.update('sinais', { historicoPA: next });
                this._view.renderHistory(next);
            },
            onClearHistory: () => {
                if(confirm('Apagar todo o histórico de PA?')) {
                    store.update('sinais', { historicoPA: [] });
                    this._view.renderHistory([]);
                }
            },
            onUpdateSignal: async (id, val) => {
                store.update('sinais', { [id]: val });
                const { dataNascimento } = store.getState().paciente.dadosGerais || {};
                const res = await Validators.sinaisVitais(id, val, { dataNascimento });
                this._view.setSignalFeedback(id, res?.label, res?.status || 'normal', res?.referenceRule, id);
            }
        });

        if (!this._isInitialized) {
            this._initializeGlobalListener();
            this._isInitialized = true;
        }

        this._validateAndUpdatePA().catch(e => console.error('Erro ao validar PA:', e));

        return this._view.element;
    },

    _initializeGlobalListener() {
        this._unsubscribe = store.subscribe(async () => {
            if (!this._view) return;
            await this._validateAndUpdatePA();
        });
    }
};

// --- Lógica de Relatório ---
Report.register((state) => {
    const s = state.paciente.sinais;
    if (!s) return null;
    const { usarSiglas } = state.config;
    const parts = [];

    // 1. Pressão Arterial (Histórico)
    if (s.historicoPA?.length) {
        const lista = s.historicoPA.map(i => {
            let txt = `${i.pas}x${i.pad} mmHg`;
            const detalhes = [];
            
            if (i.membro) detalhes.push(usarSiglas ? i.membroSigla : i.membro);
            if (i.posicao) detalhes.push(i.posicao);
            if (i.tempo) detalhes.push(`após ${i.tempo} min`);
            
            if (detalhes.length) txt += ` (${detalhes.join(', ')})`;
            
            return txt;
        });
        
        const label = usarSiglas ? 'PA' : 'Pressão Arterial';
        parts.push(`${label}: ${lista.join('; ')}`);
    } 
    // 2. Pressão Arterial (Avulsa - não salva no histórico)
    else if (s.pas && s.pad) {
        let txt = `${s.pas}x${s.pad} mmHg`;
        const detalhes = [];
        
        if (s.membroAtual) detalhes.push(usarSiglas ? s.membroSiglaAtual : s.membroAtual);
        if (s.posicaoAtual) detalhes.push(s.posicaoAtual);
        
        if (detalhes.length) txt += ` (${detalhes.join(', ')})`;
        
        const label = usarSiglas ? 'PA' : 'Pressão Arterial';
        parts.push(`${label}: ${txt}`);
    }

    // 3. Outros Sinais
    if (s.fc) parts.push(`${usarSiglas ? 'FC' : 'Freq. Cardíaca'}: ${s.fc} bpm`);
    if (s.fr) parts.push(`${usarSiglas ? 'FR' : 'Freq. Respiratória'}: ${s.fr} irpm`);
    if (s.o2) parts.push(`${usarSiglas ? 'SatO2' : 'Saturação O2'}: ${s.o2}%`);
    if (s.temp) parts.push(`${usarSiglas ? 'Tax' : 'Temp. Axilar'}: ${s.temp}°C`);

    return parts.length ? `SINAIS VITAIS: ${parts.join(' | ')}.` : null;
});