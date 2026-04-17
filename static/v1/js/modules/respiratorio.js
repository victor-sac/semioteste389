import { GlobalState } from '../state.js';

export default {
    id: 'respiratorio',
    title: '5. Tórax e Respiratório',

    render() {
        return `
            <div class="exam-section">
                <h3>1. Inspeção</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div>
                        <label>Forma e Simetria</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="resp_forma" data-val="Atípico/Simétrico" onclick="window.respDispatch('resp_forma', 'Atípico/Simétrico', this)">Atípico / Simétrico</button>
                            <button class="btn-toggle" data-key="resp_forma" data-val="Alterado" onclick="window.respDispatch('resp_forma', 'Alterado', this)">Alterado</button>
                        </div>
                        <div id="forma-detalhes" class="conditional-field" style="margin-top: 5px;">
                            <select id="resp_forma_tipo">
                                <option value="Tonel (Enfisematoso)">Tórax em Tonel</option>
                                <option value="Pectus Excavatum">Pectus Excavatum</option>
                                <option value="Pectus Carinatum">Pectus Carinatum</option>
                                <option value="Cifoescoliose">Cifoescoliose</option>
                                <option value="Instável (Trauma)">Tórax Instável</option>
                                <option value="Cicatriz Cirúrgica">Cicatriz Cirúrgica</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label>Expansibilidade</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="resp_expans" data-val="Preservada" onclick="window.respDispatch('resp_expans', 'Preservada', this)">Preservada</button>
                            <button class="btn-toggle" data-key="resp_expans" data-val="Reduzida" onclick="window.respDispatch('resp_expans', 'Reduzida', this)">Reduzida</button>
                        </div>
                        <div id="expans-detalhes" class="conditional-field" style="margin-top: 5px;">
                            <select id="resp_expans_tipo">
                                <option value="Globalmente">Globalmente reduzida</option>
                                <option value="Unilateral à Esquerda">Unilateral à Esquerda</option>
                                <option value="Unilateral à Direita">Unilateral à Direita</option>
                                <option value="Em Bases">Em Bases</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style="border-top: 1px solid #eee; padding-top: 15px;">
                    <label>Padrão Respiratório</label>
                    <div class="toggle-group" style="max-width: 450px;">
                        <button class="btn-toggle" data-key="resp_padrao" data-val="Eupneico" onclick="window.respDispatch('resp_padrao', 'Eupneico', this)">Eupneico</button>
                        <button class="btn-toggle" data-key="resp_padrao" data-val="Dispn/Alterado" onclick="window.respDispatch('resp_padrao', 'Dispn/Alterado', this)">Dispneico / Esforço</button>
                    </div>
                    
                    <div id="padrao-detalhes" class="conditional-field">
                        <div style="margin-bottom: 15px;">
                            <label style="font-size: 0.85rem; color: #666; margin-bottom: 5px; display:block;">Sinais de Esforço:</label>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                <label class="checkbox-label"><input type="checkbox" class="resp-esforco-check" value="Tiragem Intercostal"> Tiragem Intercostal</label>
                                <label class="checkbox-label"><input type="checkbox" class="resp-esforco-check" value="Tiragem Supraclavicular"> Tiragem Supraclavicular</label>
                                <label class="checkbox-label"><input type="checkbox" class="resp-esforco-check" value="Uso de M. Acessória"> Uso de M. Acessória</label>
                                <label class="checkbox-label"><input type="checkbox" class="resp-esforco-check" value="Respiração Paradoxal"> Respiração Paradoxal</label>
                            </div>
                        </div>

                        <div>
                            <label style="font-size: 0.85rem; color: #666;">Ritmo Patológico (Opcional):</label>
                            <select id="resp_ritmo_tipo" style="margin-top: 5px; max-width: 450px;">
                                <option value="">Selecione...</option>
                                <option value="Cheyne-Stokes">Cheyne-Stokes</option>
                                <option value="Kussmaul">Kussmaul</option>
                                <option value="Biot">Biot</option>
                                <option value="Gasping">Gasping</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="exam-section">
                <h3>2. Palpação e Percussão</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    
                    <div>
                        <label>Frêmito Toracovocal (FTV)</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="resp_ftv" data-val="Palpável/Simétrico" onclick="window.respDispatch('resp_ftv', 'Palpável/Simétrico', this)">Normal</button>
                            <button class="btn-toggle" data-key="resp_ftv" data-val="Alterado" onclick="window.respDispatch('resp_ftv', 'Alterado', this)">Alterado</button>
                        </div>
                        <div id="ftv-detalhes" class="conditional-field" style="margin-top: 5px;">
                            <select id="resp_ftv_tipo">
                                <option value="Aumentado (Consolidação)">Aumentado</option>
                                <option value="Diminuído">Diminuído</option>
                                <option value="Abolido (Derrame/Pneumotórax)">Abolido</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label>Percussão</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="resp_percussao" data-val="Som Claro Pulmonar" onclick="window.respDispatch('resp_percussao', 'Som Claro Pulmonar', this)">Claro Pulmonar</button>
                            <button class="btn-toggle" data-key="resp_percussao" data-val="Alterado" onclick="window.respDispatch('resp_percussao', 'Alterado', this)">Alterado</button>
                        </div>
                        <div id="percussao-detalhes" class="conditional-field" style="margin-top: 5px;">
                            <select id="resp_percussao_tipo">
                                <option value="Macicez">Macicez</option>
                                <option value="Submacicez">Submacicez</option>
                                <option value="Hipersonoridade">Hipersonoridade</option>
                                <option value="Timpanismo">Timpanismo</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="exam-section">
                <h3>3. Ausculta Pulmonar</h3>

                <div style="margin-bottom: 20px;">
                    <label>Murmúrio Vesicular (MV)</label>
                    <div class="toggle-group" style="max-width: 450px;">
                        <button class="btn-toggle" data-key="resp_mv" data-val="Universalmente Audível" onclick="window.respDispatch('resp_mv', 'Universalmente Audível', this)">Universal Audível</button>
                        <button class="btn-toggle" data-key="resp_mv" data-val="Alterado" onclick="window.respDispatch('resp_mv', 'Alterado', this)">Alterado</button>
                    </div>
                    <div id="mv-detalhes" class="conditional-field" style="margin-top: 5px; max-width: 450px;">
                        <select id="resp_mv_tipo">
                            <option value="Diminuído Globalmente">Diminuído Globalmente</option>
                            <option value="Diminuído em Bases">Diminuído em Bases</option>
                            <option value="Abolido">Abolido (Silêncio Respiratório)</option>
                        </select>
                    </div>
                </div>

                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #e9ecef; margin-bottom: 20px;">
                    <label style="margin-bottom: 10px; display:block;">Ruídos Adventícios</label>
                    
                    <div class="toggle-group" style="max-width: 450px;">
                        <button class="btn-toggle" id="btn-ra-ausente" onclick="window.respDispatchRA(false)">Ausentes</button>
                        <button class="btn-toggle" id="btn-ra-presente" onclick="window.respDispatchRA(true)">Presentes</button>
                    </div>

                    <div id="ra-detalhes" class="conditional-field">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                            <label class="checkbox-label"><input type="checkbox" class="resp-ra-check" value="Crepitações Finas"> Crepitações Finas</label>
                            <label class="checkbox-label"><input type="checkbox" class="resp-ra-check" value="Crepitações Grossas"> Crepitações Grossas</label>
                            <label class="checkbox-label"><input type="checkbox" class="resp-ra-check" value="Sibilos"> Sibilos</label>
                            <label class="checkbox-label"><input type="checkbox" class="resp-ra-check" value="Roncos"> Roncos</label>
                            <label class="checkbox-label"><input type="checkbox" class="resp-ra-check" value="Estridor"> Estridor</label>
                            <label class="checkbox-label"><input type="checkbox" class="resp-ra-check" value="Atrito Pleural"> Atrito Pleural</label>
                        </div>
                        <input type="text" id="resp_ra_obs" placeholder="Detalhes (Ex: em terço inferior direito...)" style="width:100%;">
                    </div>
                </div>

                <div>
                    <label>Ressonância Vocal</label>
                    <div class="toggle-group" style="max-width: 450px;">
                        <button class="btn-toggle" data-key="resp_vocal" data-val="Normal" onclick="window.respDispatch('resp_vocal', 'Normal', this)">Normal</button>
                        <button class="btn-toggle" data-key="resp_vocal" data-val="Alterada" onclick="window.respDispatch('resp_vocal', 'Alterada', this)">Alterada</button>
                    </div>
                    <div id="vocal-detalhes" class="conditional-field" style="margin-top: 5px; max-width: 450px;">
                        <select id="resp_vocal_tipo">
                            <option value="Broncofonia">Broncofonia</option>
                            <option value="Egofonia">Egofonia</option>
                            <option value="Pectorilóquia Fônica">Pectorilóquia Fônica</option>
                            <option value="Pectorilóquia Áfona">Pectorilóquia Áfona</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // --- DISPATCHERS ---
        window.respDispatch = (key, value, btn) => {
            const current = GlobalState.get(key);
            if (current === value) {
                // Desselecionar
                GlobalState.set(key, null);
                btn.classList.remove('selected');
            } else {
                GlobalState.set(key, value);
                if (btn.parentElement) {
                    Array.from(btn.parentElement.children).forEach(c => c.classList.remove('selected'));
                }
                btn.classList.add('selected');
            }
            GlobalState.set('lastUpdatedKey', key);
        };

        window.respDispatchRA = (isPresent) => {
            const current = GlobalState.get('resp_ra_presente');
            // Toggle Logic
            if (current === isPresent) {
                GlobalState.set('resp_ra_presente', null);
            } else {
                GlobalState.set('resp_ra_presente', isPresent);
            }
            GlobalState.set('lastUpdatedKey', 'resp_ra_presente');
        };

        const els = {
            // Selects
            formaTipo: document.getElementById('resp_forma_tipo'),
            expansTipo: document.getElementById('resp_expans_tipo'),
            ritmoTipo: document.getElementById('resp_ritmo_tipo'),
            ftvTipo: document.getElementById('resp_ftv_tipo'),
            percussaoTipo: document.getElementById('resp_percussao_tipo'),
            mvTipo: document.getElementById('resp_mv_tipo'),
            raObs: document.getElementById('resp_ra_obs'),
            vocalTipo: document.getElementById('resp_vocal_tipo'),

            // Checks
            esforcoChecks: document.querySelectorAll('.resp-esforco-check'),
            raChecks: document.querySelectorAll('.resp-ra-check'),

            // Buttons RA
            btnRaAus: document.getElementById('btn-ra-ausente'),
            btnRaPres: document.getElementById('btn-ra-presente'),

            // Containers
            formaDet: document.getElementById('forma-detalhes'),
            expansDet: document.getElementById('expans-detalhes'),
            padraoDet: document.getElementById('padrao-detalhes'),
            ftvDet: document.getElementById('ftv-detalhes'),
            percussaoDet: document.getElementById('percussao-detalhes'),
            mvDet: document.getElementById('mv-detalhes'),
            raDet: document.getElementById('ra-detalhes'),
            vocalDet: document.getElementById('vocal-detalhes')
        };

        this.restoreState(els);

        // Listeners
        const inputs = [
            ['resp_forma_tipo', els.formaTipo], ['resp_expans_tipo', els.expansTipo],
            ['resp_ritmo_tipo', els.ritmoTipo], ['resp_ftv_tipo', els.ftvTipo],
            ['resp_percussao_tipo', els.percussaoTipo], ['resp_mv_tipo', els.mvTipo],
            ['resp_ra_obs', els.raObs], ['resp_vocal_tipo', els.vocalTipo]
        ];
        inputs.forEach(([k, el]) => el.addEventListener('change', (e) => GlobalState.set(k, e.target.value)));
        if(els.raObs) els.raObs.addEventListener('input', (e) => GlobalState.set('resp_ra_obs', e.target.value));

        // Checkboxes Esforço
        els.esforcoChecks.forEach(chk => {
            chk.addEventListener('change', () => {
                const checked = Array.from(els.esforcoChecks).filter(c => c.checked).map(c => c.value);
                GlobalState.set('resp_esforco_list', checked);
            });
        });

        // Checkboxes RA
        els.raChecks.forEach(chk => {
            chk.addEventListener('change', () => {
                const checked = Array.from(els.raChecks).filter(c => c.checked).map(c => c.value);
                GlobalState.set('resp_ra_list', checked);
            });
        });

        GlobalState.subscribe((state) => this.updateVisibility(state.lastUpdatedKey, state, els));
    },

    restoreState(els) {
        const s = GlobalState.getAll();
        
        // Restore Inputs
        if(s.resp_forma_tipo) els.formaTipo.value = s.resp_forma_tipo;
        if(s.resp_expans_tipo) els.expansTipo.value = s.resp_expans_tipo;
        if(s.resp_ritmo_tipo) els.ritmoTipo.value = s.resp_ritmo_tipo;
        if(s.resp_ftv_tipo) els.ftvTipo.value = s.resp_ftv_tipo;
        if(s.resp_percussao_tipo) els.percussaoTipo.value = s.resp_percussao_tipo;
        if(s.resp_mv_tipo) els.mvTipo.value = s.resp_mv_tipo;
        if(s.resp_ra_obs) els.raObs.value = s.resp_ra_obs;
        if(s.resp_vocal_tipo) els.vocalTipo.value = s.resp_vocal_tipo;

        // Restore Checks
        const esfList = s.resp_esforco_list || [];
        els.esforcoChecks.forEach(c => c.checked = esfList.includes(c.value));
        const raList = s.resp_ra_list || [];
        els.raChecks.forEach(c => c.checked = raList.includes(c.value));

        // Restore Toggles
        document.querySelectorAll('button[data-key]').forEach(btn => {
            const key = btn.getAttribute('data-key');
            const val = btn.getAttribute('data-val');
            btn.classList.remove('selected');
            if (s[key] === val) btn.classList.add('selected');
        });

        // Restore RA Buttons
        els.btnRaPres.classList.remove('selected');
        els.btnRaAus.classList.remove('selected');
        if(s.resp_ra_presente === true) els.btnRaPres.classList.add('selected');
        else if(s.resp_ra_presente === false) els.btnRaAus.classList.add('selected');

        // Update Visibility
        ['resp_forma', 'resp_expans', 'resp_padrao', 'resp_ftv', 'resp_percussao', 'resp_mv', 'resp_ra_presente', 'resp_vocal'].forEach(k => {
            this.updateVisibility(k, s, els);
        });
    },

    updateVisibility(key, s, els) {
        if(key === 'resp_forma') els.formaDet.classList.toggle('visible', s.resp_forma === 'Alterado');
        if(key === 'resp_expans') els.expansDet.classList.toggle('visible', s.resp_expans === 'Reduzida');
        if(key === 'resp_padrao') els.padraoDet.classList.toggle('visible', s.resp_padrao === 'Dispn/Alterado');
        if(key === 'resp_ftv') els.ftvDet.classList.toggle('visible', s.resp_ftv === 'Alterado');
        if(key === 'resp_percussao') els.percussaoDet.classList.toggle('visible', s.resp_percussao === 'Alterado');
        if(key === 'resp_mv') els.mvDet.classList.toggle('visible', s.resp_mv === 'Alterado');
        if(key === 'resp_vocal') els.vocalDet.classList.toggle('visible', s.resp_vocal === 'Alterada');
        
        if(key === 'resp_ra_presente') {
            if(s.resp_ra_presente === true) {
                els.raDet.classList.add('visible');
                els.btnRaPres.classList.add('selected');
                els.btnRaAus.classList.remove('selected');
            } else if (s.resp_ra_presente === false) {
                els.raDet.classList.remove('visible');
                els.btnRaAus.classList.add('selected');
                els.btnRaPres.classList.remove('selected');
            } else {
                els.raDet.classList.remove('visible');
                els.btnRaAus.classList.remove('selected');
                els.btnRaPres.classList.remove('selected');
            }
        }
    },

    generateText() {
        const s = GlobalState.getAll();
        const parts = [];

        // 1. Inspeção
        if(s.resp_forma) {
            if(s.resp_forma === 'Atípico/Simétrico') parts.push("Tórax atípico e simétrico");
            else parts.push(`Tórax: ${s.resp_forma_tipo || 'Alterado'}`);
        }

        if(s.resp_expans) {
            if(s.resp_expans === 'Preservada') parts.push("expansibilidade preservada");
            else parts.push(`expansibilidade reduzida (${s.resp_expans_tipo || 'globalmente'})`);
        }

        if(s.resp_padrao) {
            if(s.resp_padrao === 'Eupneico') parts.push("eupneico");
            else {
                let p = "dispneico";
                const esforcos = s.resp_esforco_list || [];
                if(esforcos.length > 0) p += ` com ${esforcos.join(', ').toLowerCase()}`;
                if(s.resp_ritmo_tipo) p += `, ritmo de ${s.resp_ritmo_tipo}`;
                parts.push(p);
            }
        }

        // 2. Palpação
        if(s.resp_ftv) {
            if(s.resp_ftv === 'Palpável/Simétrico') parts.push("FTV palpável e simétrico");
            else parts.push(`FTV ${s.resp_ftv_tipo || 'alterado'}`);
        }

        // 3. Percussão
        if(s.resp_percussao) {
            if(s.resp_percussao === 'Som Claro Pulmonar') parts.push("som claro pulmonar");
            else parts.push(`${s.resp_percussao_tipo || 'percussão alterada'}`);
        }

        // 4. Ausculta
        const ausc = [];
        if(s.resp_mv) {
            if(s.resp_mv === 'Universalmente Audível') ausc.push("MV universalmente audível");
            else ausc.push(`MV ${s.resp_mv_tipo || 'alterado'}`);
        }

        if(s.resp_ra_presente === false) {
            ausc.push("sem ruídos adventícios");
        } else if (s.resp_ra_presente === true) {
            const ras = s.resp_ra_list || [];
            let txt = ras.length > 0 ? ras.join(', ') : "ruídos adventícios presentes";
            if(s.resp_ra_obs) txt += ` (${s.resp_ra_obs})`;
            ausc.push(txt);
        }

        if(s.resp_vocal) {
            if(s.resp_vocal === 'Normal') ausc.push("ressonância vocal normal");
            else ausc.push(`${s.resp_vocal_tipo}`);
        }

        if(ausc.length > 0) parts.push(ausc.join(', '));

        if(parts.length === 0) return '';
        return `RESPIRATÓRIO: ${parts.join('. ')}.`;
    }
};