import { GlobalState } from '../state.js';

export default {
    id: 'sinais_vitais',
    title: '2. Sinais Vitais',

    render() {
        return `
            <div class="exam-section">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                    <h3 style="margin: 0;">1. Pressão Arterial</h3>
                    <button id="btn-info-ref" style="background: #e9ecef; border: 1px solid #ced4da; border-radius: 50%; width: 22px; height: 22px; font-size: 0.8rem; color: #555; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: serif; font-weight: bold; padding: 0;">i</button>
                </div>

                <div id="ref-pa-box" style="display: none; font-size: 0.8rem; color: #555; margin-bottom: 15px; background: #fff3cd; padding: 8px; border-radius: 4px; border: 1px solid #ffeeba;">
                    <strong>Referência:</strong> Diretriz Brasileira de Hipertensão Arterial 2025.
                </div>

                <div style="text-align: center; margin-bottom: 5px;">
                    <label style="font-size: 0.85rem; color: #555; display: block; margin-bottom: 5px;">Valores (mmHg)</label>
                    <div style="display: grid; grid-template-columns: 1fr 20px 1fr; align-items: center; max-width: 300px; margin: 0 auto;">
                        <input type="number" id="pa_sis" placeholder="PAS" style="text-align: center; font-weight: bold; font-size: 1.1rem; height: 40px;">
                        <span style="font-weight: bold; color: #aaa; font-size: 1.2rem;">/</span>
                        <input type="number" id="pa_dia" placeholder="PAD" style="text-align: center; font-weight: bold; font-size: 1.1rem; height: 40px;">
                    </div>
                </div>

                <div id="pa-feedback" style="margin-bottom: 10px; font-size: 0.85rem; font-weight: 600; text-align: center; min-height: 20px; padding: 2px;"></div>

                <div style="text-align: center; border-top: 1px solid #eee; padding-top: 8px;">
                    <button id="btn-toggle-advanced" style="background: none; border: none; color: var(--primary-blue); font-weight: 600; cursor: pointer; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 5px;">
                        + Dados Adicionais / Múltiplas Aferições
                    </button>
                </div>

                <div id="pa-advanced-area" class="conditional-field" style="margin-top: 10px; background: #f8f9fa; border: 1px solid #e9ecef;">
                    
                    <h4 style="margin-top: 0; color: #495057; font-size: 0.85rem; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Configuração da Aferição</h4>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                        <div>
                            <label style="font-size:0.8rem;">Membro</label>
                            <select id="pa_membro" style="width: 100%; height: 35px; border: 1px solid #ced4da; border-radius: 4px; background: white;">
                                <option value="MSE">Braço Esq. (MSE)</option>
                                <option value="MSD">Braço Dir. (MSD)</option>
                                <option value="MIE">Perna Esq. (MIE)</option>
                                <option value="MID">Perna Dir. (MID)</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size:0.8rem;">Posição</label>
                            <select id="pa_posicao" style="width: 100%; height: 35px; border: 1px solid #ced4da; border-radius: 4px; background: white;">
                                <option value="Sentado">Sentado</option>
                                <option value="Deitado">Deitado</option>
                                <option value="Em pé">Em pé</option>
                            </select>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; align-items: end;">
                        <div>
                            <label style="font-size:0.8rem;">Tempo (min)</label>
                            <input type="number" id="pa_tempo" placeholder="Após anterior" style="height: 35px;">
                        </div>
                        <div style="height: 35px; display: flex; align-items: center;">
                            <input type="checkbox" id="pa_k_zero" style="width: 18px; height: 18px; margin-right: 8px;">
                            <label for="pa_k_zero" style="margin:0; font-size: 0.8rem;">Sons inaudíveis (/0)</label>
                        </div>
                    </div>

                    <button id="btn-add-pa" class="btn-primary-large" style="width: 100%; padding: 8px; font-size: 0.9rem; background-color: #6c757d; margin-bottom: 10px;">
                        Adicionar Medida à Lista
                    </button>

                    <div style="background: white; border: 1px solid #dee2e6; border-radius: 4px; overflow: hidden;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
                            <thead style="background: #e9ecef;">
                                <tr>
                                    <th style="padding: 8px; text-align: left;">Valor</th>
                                    <th style="padding: 8px; text-align: left;">Contexto</th>
                                    <th style="padding: 8px; text-align: right;">Excluir</th>
                                </tr>
                            </thead>
                            <tbody id="pa-list-body">
                                <tr><td colspan="3" style="padding:10px; text-align:center; color:#aaa;">Nenhuma medida na lista.</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="exam-section">
                <h3>2. Frequência Cardíaca e Respiratória</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label>Frequência Cardíaca (bpm)</label>
                        <input type="number" id="fc" placeholder="Ex: 80">
                        <div id="fc-feedback" class="vital-feedback"></div>
                    </div>
                    <div>
                        <label>Freq. Respiratória (irpm)</label>
                        <input type="number" id="fr" placeholder="Ex: 16">
                        <div id="fr-feedback" class="vital-feedback"></div>
                    </div>
                </div>
            </div>

            <div class="exam-section">
                <h3>3. Temperatura e Oxigenação</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label>Tax (°C)</label>
                        <input type="number" id="tax" placeholder="36.0 - 37.2" step="0.1">
                        <div id="tax-feedback" class="vital-feedback"></div>
                    </div>
                    <div>
                        <label>SatO₂ (%)</label>
                        <input type="number" id="sat" placeholder="> 95%">
                        <div id="sat-feedback" class="vital-feedback"></div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        const els = {
            // PA Ref
            btnInfo: document.getElementById('btn-info-ref'),
            refBox: document.getElementById('ref-pa-box'),
            
            // PA Inputs Principais
            sis: document.getElementById('pa_sis'),
            dia: document.getElementById('pa_dia'),
            feedback: document.getElementById('pa-feedback'),
            
            // PA Avançado
            btnToggle: document.getElementById('btn-toggle-advanced'),
            advArea: document.getElementById('pa-advanced-area'),
            membro: document.getElementById('pa_membro'),
            posicao: document.getElementById('pa_posicao'),
            tempo: document.getElementById('pa_tempo'),
            kzero: document.getElementById('pa_k_zero'),
            btnAdd: document.getElementById('btn-add-pa'),
            listBody: document.getElementById('pa-list-body'),

            // Cardíaca/Outros
            fc: document.getElementById('fc'),
            fcFeed: document.getElementById('fc-feedback'),
            fr: document.getElementById('fr'),
            frFeed: document.getElementById('fr-feedback'),
            tax: document.getElementById('tax'),
            taxFeed: document.getElementById('tax-feedback'),
            sat: document.getElementById('sat'),
            satFeed: document.getElementById('sat-feedback')
        };

        // --- LÓGICA DO ÍCONE DE INFO (REFERÊNCIA) ---
        els.btnInfo.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita bugs de clique
            const isHidden = els.refBox.style.display === 'none';
            els.refBox.style.display = isHidden ? 'block' : 'none';
            els.btnInfo.style.background = isHidden ? '#d1e7dd' : '#e9ecef';
            els.btnInfo.style.color = isHidden ? '#0f5132' : '#555';
        });

        // --- LÓGICA DE TOGGLE AVANÇADO ---
        let isAdvancedOpen = GlobalState.get('vitais_pa_advanced_open') || false;
        
        const updateToggleUI = () => {
            if (isAdvancedOpen) {
                els.advArea.classList.add('visible');
                els.btnToggle.innerHTML = '- Ocultar Detalhes';
                els.btnToggle.style.color = '#666';
            } else {
                els.advArea.classList.remove('visible');
                els.btnToggle.innerHTML = '+ Dados Adicionais / Múltiplas Aferições';
                els.btnToggle.style.color = 'var(--primary-blue)';
            }
        };
        updateToggleUI();

        els.btnToggle.addEventListener('click', () => {
            isAdvancedOpen = !isAdvancedOpen;
            GlobalState.set('vitais_pa_advanced_open', isAdvancedOpen);
            updateToggleUI();
        });

        // --- LÓGICA DA LISTA DE PA ---
        let paLista = GlobalState.get('vitais_pa_lista') || [];

        const renderList = () => {
            els.listBody.innerHTML = '';
            if (paLista.length === 0) {
                els.listBody.innerHTML = `<tr><td colspan="3" style="padding:10px; text-align:center; color:#aaa;">Nenhuma medida na lista.</td></tr>`;
                return;
            }

            paLista.forEach((item, index) => {
                const tr = document.createElement('tr');
                tr.style.borderBottom = '1px solid #eee';
                
                let tempoStr = item.tempo && item.tempo > 0 ? `(${item.tempo}min)` : '';
                let valorStr = `${item.sis}x${item.dia}`;
                if (item.kzero) valorStr += '/0';

                tr.innerHTML = `
                    <td style="padding: 8px; font-weight: bold;">${valorStr}</td>
                    <td style="padding: 8px; color: #555; font-size: 0.8rem;">
                        ${item.membro}, ${item.posicao} ${tempoStr}
                    </td>
                    <td style="padding: 8px; text-align: right;">
                        <button class="btn-remove" data-index="${index}" style="border:none; background:none; color:#dc3545; font-weight:bold; cursor:pointer;">✕</button>
                    </td>
                `;
                els.listBody.appendChild(tr);
            });

            document.querySelectorAll('.btn-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    paLista.splice(idx, 1);
                    GlobalState.set('vitais_pa_lista', paLista);
                    renderList();
                });
            });
        };

        els.btnAdd.addEventListener('click', () => {
            const sis = els.sis.value;
            const dia = els.dia.value;
            if (!sis || !dia) {
                alert("Insira os valores de PAS e PAD nos campos principais.");
                els.sis.focus();
                return;
            }

            const novoItem = {
                sis: sis,
                dia: dia,
                membro: els.membro.value,
                posicao: els.posicao.value,
                tempo: els.tempo.value,
                kzero: els.kzero.checked
            };

            paLista.push(novoItem);
            GlobalState.set('vitais_pa_lista', paLista);
            
            els.sis.value = '';
            els.dia.value = '';
            els.tempo.value = '';
            els.feedback.innerHTML = '';
            els.sis.focus();

            renderList();
        });

        // --- RESTAURAÇÃO DE VALORES ---
        const restoreAll = () => {
            els.sis.value = GlobalState.get('vitais_pa_sis') || '';
            els.dia.value = GlobalState.get('vitais_pa_dia') || '';
            els.fc.value = GlobalState.get('vitais_fc') || '';
            els.fr.value = GlobalState.get('vitais_fr') || '';
            els.tax.value = GlobalState.get('vitais_tax') || '';
            els.sat.value = GlobalState.get('vitais_sat') || '';
            
            renderList();
            if(els.sis.value && els.dia.value) analyzePAVisual(els.sis.value, els.dia.value, els.feedback);
        };
        restoreAll();

        // --- LISTENERS ---
        const updateSimple = () => {
            GlobalState.set('vitais_pa_sis', els.sis.value);
            GlobalState.set('vitais_pa_dia', els.dia.value);
            const s = parseInt(els.sis.value);
            const d = parseInt(els.dia.value);
            if (s && d) analyzePAVisual(s, d, els.feedback);
            else els.feedback.innerHTML = '';
        };

        els.sis.addEventListener('input', updateSimple);
        els.dia.addEventListener('input', updateSimple);

        const updateOthers = () => {
            GlobalState.set('vitais_fc', els.fc.value);
            GlobalState.set('vitais_fr', els.fr.value);
            GlobalState.set('vitais_tax', els.tax.value);
            GlobalState.set('vitais_sat', els.sat.value);
            
            checkRange(els.fc, els.fcFeed, 60, 100, 'Bradicardia', 'Taquicardia');
            checkRange(els.fr, els.frFeed, 12, 20, 'Bradipneia', 'Taquipneia');
            checkTemp(els.tax, els.taxFeed);
            checkSat(els.sat, els.satFeed);
        };

        [els.fc, els.fr, els.tax, els.sat].forEach(el => el.addEventListener('input', updateOthers));
        
        updateOthers();
    },

    // --- GERAÇÃO DE TEXTO ---
    generateText() {
        const s = GlobalState.getAll();
        const parts = [];
        const listaPA = s.vitais_pa_lista || [];
        
        // 1. Pressão Arterial
        if (listaPA.length > 0) {
            const paTexts = listaPA.map(item => {
                let v = `${item.sis}x${item.dia}`;
                if (item.kzero) v += '/0';
                let det = [];
                if (item.posicao) det.push(item.posicao);
                if (item.membro) det.push(item.membro);
                if (item.tempo && item.tempo > 0) det.push(`${item.tempo}min`);
                return `${v} mmHg (${det.join(', ')})`;
            });
            parts.push(`PA: ${paTexts.join('; ')}`);
        } else if (s.vitais_pa_sis && s.vitais_pa_dia) {
            parts.push(`PA: ${s.vitais_pa_sis}x${s.vitais_pa_dia} mmHg`);
        }

        // 2. Outros
        if (s.vitais_fc) parts.push(`FC: ${s.vitais_fc} bpm`);
        if (s.vitais_fr) parts.push(`FR: ${s.vitais_fr} irpm`);
        if (s.vitais_tax) parts.push(`Tax: ${s.vitais_tax}°C`);
        if (s.vitais_sat) parts.push(`SatO2: ${s.vitais_sat}%`);

        if (parts.length === 0) return '';
        return `SINAIS VITAIS: ${parts.join('. ')}.`;
    }
};

// --- HELPERS (Sem Emojis) ---
function analyzePAVisual(sis, dia, el) {
    let text = '', color = '#28a745';
    // Critérios 2025
    if (sis >= 180 || dia >= 110) { text = 'Hipertensão Estágio 3'; color = '#721c24'; }
    else if (sis >= 160 || dia >= 100) { text = 'Hipertensão Estágio 2'; color = '#856404'; }
    else if (sis >= 140 || dia >= 90) { text = 'Hipertensão Estágio 1'; color = '#856404'; }
    else if ((sis >= 120 && sis <= 139) || (dia >= 80 && dia <= 89)) { text = 'Pré-hipertensão'; color = '#856404'; }
    else if (sis < 120 && dia < 80) { text = 'PA Ótima'; color = '#155724'; }
    if (sis < 90) { text = 'Hipotensão'; color = '#0c5460'; }

    el.innerHTML = `<span style="color:${color}">${text}</span>`;
}

function checkRange(input, feed, min, max, lLow, lHigh) {
    const v = parseFloat(input.value);
    if (!v) { feed.innerHTML = ''; return; }
    if (v < min) feed.innerHTML = `<span style="color:#17a2b8">↓ ${lLow}</span>`;
    else if (v > max) feed.innerHTML = `<span style="color:#dc3545">↑ ${lHigh}</span>`;
    else feed.innerHTML = `<span style="color:#28a745">Normal</span>`;
}

function checkTemp(input, feed) {
    const v = parseFloat(input.value);
    if (!v) { feed.innerHTML = ''; return; }
    if (v >= 37.8) feed.innerHTML = `<span style="color:#dc3545">Febre</span>`;
    else if (v >= 37.3) feed.innerHTML = `<span style="color:#ffc107">Febrícula</span>`;
    else if (v < 35) feed.innerHTML = `<span style="color:#17a2b8">Hipotermia</span>`;
    else feed.innerHTML = `<span style="color:#28a745">Afebril</span>`;
}

function checkSat(input, feed) {
    const v = parseFloat(input.value);
    if (!v) { feed.innerHTML = ''; return; }
    if (v < 90) feed.innerHTML = `<span style="color:#dc3545">Hipoxemia Grave</span>`;
    else if (v < 94) feed.innerHTML = `<span style="color:#ffc107">Atenção</span>`;
    else feed.innerHTML = `<span style="color:#28a745">Normal</span>`;
}