import { GlobalState } from '../state.js';

export default {
    id: 'digestorio',
    title: '7. Sistema Digestório',

    render() {
        return `
            <div class="exam-section">
                <h3>1. Inspeção</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label>Forma do Abdome</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="abd_forma" data-val="Plano/Arredondado" onclick="window.abdDispatch('abd_forma', 'Plano/Arredondado', this)">Plano / Arredondado</button>
                            <button class="btn-toggle" data-key="abd_forma" data-val="Alterado" onclick="window.abdDispatch('abd_forma', 'Alterado', this)">Alterado</button>
                        </div>
                        <div id="forma-detalhes" class="conditional-field" style="margin-top: 5px;">
                            <select id="abd_forma_tipo">
                                <option value="Globoso (Adiposo/Ascítico)">Globoso</option>
                                <option value="Batráquio">Batráquio</option>
                                <option value="Pendular">Pendular</option>
                                <option value="Escavado">Escavado</option>
                                <option value="Assimétrico">Assimétrico</option>
                                <option value="Distendido">Distendido</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label>Pele e Cicatrizes</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="abd_pele" data-val="Sem Cicatrizes" onclick="window.abdDispatch('abd_pele', 'Sem Cicatrizes', this)">Sem Cicatrizes</button>
                            <button class="btn-toggle" data-key="abd_pele" data-val="Alterações" onclick="window.abdDispatch('abd_pele', 'Alterações', this)">Cicatrizes / Sinais</button>
                        </div>
                        <div id="pele-detalhes" class="conditional-field" style="margin-top: 5px;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                <label class="checkbox-label"><input type="checkbox" class="abd-pele-check" value="Kocher (Subcostal D)"> Kocher</label>
                                <label class="checkbox-label"><input type="checkbox" class="abd-pele-check" value="McBurney"> McBurney</label>
                                <label class="checkbox-label"><input type="checkbox" class="abd-pele-check" value="Pfannenstiel"> Pfannenstiel</label>
                                <label class="checkbox-label"><input type="checkbox" class="abd-pele-check" value="Mediana"> Mediana</label>
                                <label class="checkbox-label"><input type="checkbox" class="abd-pele-check" value="Sinal de Cullen"> Cullen</label>
                                <label class="checkbox-label"><input type="checkbox" class="abd-pele-check" value="Sinal de Grey-Turner"> Grey-Turner</label>
                                <label class="checkbox-label"><input type="checkbox" class="abd-pele-check" value="Circ. Colateral (Porta)"> Circ. Porta</label>
                                <label class="checkbox-label"><input type="checkbox" class="abd-pele-check" value="Circ. Colateral (Cava)"> Circ. Cava</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label>Hérnias / Abaulamentos</label>
                            <select id="abd_hernia">
                                <option value="">Ausentes</option>
                                <option value="Hérnia Umbilical">Hérnia Umbilical</option>
                                <option value="Hérnia Epigástrica">Hérnia Epigástrica</option>
                                <option value="Hérnia Incisional">Hérnia Incisional</option>
                                <option value="Hérnia Inguinal">Hérnia Inguinal</option>
                                <option value="Diástase de Retos">Diástase de Retos</option>
                            </select>
                        </div>
                        <div>
                            <label>Peristaltismo Visível</label>
                            <div class="toggle-group">
                                <button class="btn-toggle" data-key="abd_peristaltismo" data-val="Ausente" onclick="window.abdDispatch('abd_peristaltismo', 'Ausente', this)">Ausente</button>
                                <button class="btn-toggle" data-key="abd_peristaltismo" data-val="Presente (Luta)" onclick="window.abdDispatch('abd_peristaltismo', 'Presente (Luta)', this)">Presente (Luta)</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="exam-section">
                <h3>2. Ausculta Abdominal</h3>
                
                <div style="margin-bottom: 15px;">
                    <label>Ruídos Hidroaéreos (RHA)</label>
                    <div class="toggle-group">
                        <button class="btn-toggle" data-key="abd_rha" data-val="Normoativos" onclick="window.abdDispatch('abd_rha', 'Normoativos', this)">Normoativos</button>
                        <button class="btn-toggle" data-key="abd_rha" data-val="Alterados" onclick="window.abdDispatch('abd_rha', 'Alterados', this)">Alterados</button>
                    </div>
                    <div id="rha-detalhes" class="conditional-field">
                        <select id="abd_rha_tipo">
                            <option value="Hipoativos">Hipoativos</option>
                            <option value="Hiperativos">Hiperativos</option>
                            <option value="Metálicos">Metálicos (Obstrução)</option>
                            <option value="Abolidos (Silêncio)">Abolidos (Silêncio)</option>
                            <option value="Borborigmos aumentados">Borborigmos aumentados</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label>Sopros Vasculares</label>
                    <div class="toggle-group">
                        <button class="btn-toggle" data-key="abd_sopro" data-val="Ausentes" onclick="window.abdDispatch('abd_sopro', 'Ausentes', this)">Ausentes</button>
                        <button class="btn-toggle" data-key="abd_sopro" data-val="Presentes" onclick="window.abdDispatch('abd_sopro', 'Presentes', this)">Presentes</button>
                    </div>
                    <div id="sopro-detalhes" class="conditional-field">
                        <select id="abd_sopro_loc">
                            <option value="Aorta Abdominal">Foco Aórtico</option>
                            <option value="Artérias Renais">Artérias Renais</option>
                            <option value="Artérias Ilíacas">Artérias Ilíacas</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="exam-section">
                <h3>3. Percussão</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label>Som Predominante</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="abd_som" data-val="Timpanismo" onclick="window.abdDispatch('abd_som', 'Timpanismo', this)">Timpanismo</button>
                            <button class="btn-toggle" data-key="abd_som" data-val="Alterado" onclick="window.abdDispatch('abd_som', 'Alterado', this)">Alterado</button>
                        </div>
                        <div id="som-detalhes" class="conditional-field">
                            <select id="abd_som_tipo">
                                <option value="Hipertimpanismo">Hipertimpanismo</option>
                                <option value="Macicez Difusa">Macicez Difusa</option>
                                <option value="Sinal de Jobert (Perda Macicez Hepática)">Sinal de Jobert (+)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label>Ascite e Fígado</label>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <label class="checkbox-label"><input type="checkbox" class="abd-perc-check" value="Macicez Móvel"> Macicez Móvel</label>
                            <label class="checkbox-label"><input type="checkbox" class="abd-perc-check" value="Sinal de Piparote (+)"> Sinal de Piparote (+)</label>
                            <label class="checkbox-label"><input type="checkbox" class="abd-perc-check" value="Hepatometria > 12cm"> Hepatometria Aumentada</label>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px;">
                    <label>Sinal de Giordano (Percussão Lombar)</label>
                    <div class="toggle-group">
                        <button class="btn-toggle" data-key="abd_giordano" data-val="Negativo" onclick="window.abdDispatch('abd_giordano', 'Negativo', this)">Negativo</button>
                        <button class="btn-toggle" data-key="abd_giordano" data-val="Positivo" onclick="window.abdDispatch('abd_giordano', 'Positivo', this)">Positivo</button>
                    </div>
                    <div id="giordano-detalhes" class="conditional-field">
                        <select id="abd_giordano_lado">
                            <option value="à Direita">à Direita</option>
                            <option value="à Esquerda">à Esquerda</option>
                            <option value="Bilateral">Bilateral</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="exam-section">
                <h3>4. Palpação (Superficial e Profunda)</h3>
                
                <div style="margin-bottom: 20px;">
                    <label>Tensão e Sensibilidade</label>
                    <div class="toggle-group">
                        <button class="btn-toggle" data-key="abd_palp" data-val="Flácido/Indolor" onclick="window.abdDispatch('abd_palp', 'Flácido/Indolor', this)">Flácido / Indolor</button>
                        <button class="btn-toggle" data-key="abd_palp" data-val="Alterado" onclick="window.abdDispatch('abd_palp', 'Alterado', this)">Dor / Defesa</button>
                    </div>
                    
                    <div id="palp-detalhes" class="conditional-field">
                        <label style="font-size:0.85rem; color:#666;">Característica:</label>
                        <select id="abd_palp_tipo" style="margin-bottom: 10px;">
                            <option value="Doloroso à palpação profunda">Doloroso à palpação profunda</option>
                            <option value="Defesa muscular voluntária">Defesa muscular voluntária</option>
                            <option value="Abdome em Tábua (Defesa Involuntária)">Abdome em Tábua</option>
                            <option value="Plastão palpável">Plastão palpável</option>
                        </select>
                        <input type="text" id="abd_palp_loc" placeholder="Localização (Ex: FIE, Epigastro...)" style="width:100%;">
                    </div>
                </div>

                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #e9ecef; margin-bottom: 20px;">
                    <label style="display:block; margin-bottom: 10px;">Sinais de Inflamação / Irritação:</label>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <label class="checkbox-label"><input type="checkbox" class="abd-sinal-check" value="Blumberg (+)"> Blumberg (Descompressão)</label>
                        <label class="checkbox-label"><input type="checkbox" class="abd-sinal-check" value="Rovsing (+)"> Rovsing</label>
                        <label class="checkbox-label"><input type="checkbox" class="abd-sinal-check" value="Murphy (+)"> Murphy (Cístico)</label>
                        <label class="checkbox-label"><input type="checkbox" class="abd-sinal-check" value="Sinal do Psoas (+)"> Psoas</label>
                        <label class="checkbox-label"><input type="checkbox" class="abd-sinal-check" value="Sinal do Obturador (+)"> Obturador</label>
                        <label class="checkbox-label"><input type="checkbox" class="abd-sinal-check" value="Onda Líquida (+)"> Onda Líquida</label>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label>Fígado</label>
                        <select id="abd_figado">
                            <option value="Impalpável/Normal">Impalpável / Borda fina</option>
                            <option value="Hepatomegalia (Borda romba)">Hepatomegalia (Romba)</option>
                            <option value="Hepatomegalia (Nodular)">Hepatomegalia (Nodular)</option>
                            <option value="Hepatomegalia (Dolorosa)">Hepatomegalia (Dolorosa)</option>
                        </select>
                    </div>
                    <div>
                        <label>Baço</label>
                        <select id="abd_baco">
                            <option value="Impalpável">Impalpável</option>
                            <option value="Esplenomegalia (Boyd I)">Grau I (Rebordo)</option>
                            <option value="Esplenomegalia (Boyd II)">Grau II (Umbigo)</option>
                            <option value="Esplenomegalia (Boyd III)">Grau III (FIE)</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // --- DISPATCHER ---
        window.abdDispatch = (key, value, btn) => {
            const current = GlobalState.get(key);
            if (current === value) {
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

        const els = {
            // Selects
            formaTipo: document.getElementById('abd_forma_tipo'),
            hernia: document.getElementById('abd_hernia'),
            rhaTipo: document.getElementById('abd_rha_tipo'),
            soproLoc: document.getElementById('abd_sopro_loc'),
            somTipo: document.getElementById('abd_som_tipo'),
            giordanoLado: document.getElementById('abd_giordano_lado'),
            palpTipo: document.getElementById('abd_palp_tipo'),
            figado: document.getElementById('abd_figado'),
            baco: document.getElementById('abd_baco'),
            
            // Input Text
            palpLoc: document.getElementById('abd_palp_loc'),

            // Checkbox Groups
            peleChecks: document.querySelectorAll('.abd-pele-check'),
            percChecks: document.querySelectorAll('.abd-perc-check'),
            sinalChecks: document.querySelectorAll('.abd-sinal-check'),

            // Containers (Visibilidade)
            formaDet: document.getElementById('forma-detalhes'),
            peleDet: document.getElementById('pele-detalhes'),
            rhaDet: document.getElementById('rha-detalhes'),
            soproDet: document.getElementById('sopro-detalhes'),
            somDet: document.getElementById('som-detalhes'),
            giordanoDet: document.getElementById('giordano-detalhes'),
            palpDet: document.getElementById('palp-detalhes')
        };

        this.restoreState(els);

        // Listeners Selects
        const inputs = [
            ['abd_forma_tipo', els.formaTipo], ['abd_hernia', els.hernia],
            ['abd_rha_tipo', els.rhaTipo], ['abd_sopro_loc', els.soproLoc],
            ['abd_som_tipo', els.somTipo], ['abd_giordano_lado', els.giordanoLado],
            ['abd_palp_tipo', els.palpTipo], ['abd_figado', els.figado],
            ['abd_baco', els.baco]
        ];
        inputs.forEach(([k, el]) => el.addEventListener('change', (e) => GlobalState.set(k, e.target.value)));
        if(els.palpLoc) els.palpLoc.addEventListener('input', (e) => GlobalState.set('abd_palp_loc', e.target.value));

        // Listeners Checkboxes
        const bindCheck = (nodeList, key) => {
            nodeList.forEach(chk => {
                chk.addEventListener('change', () => {
                    const checked = Array.from(nodeList).filter(c => c.checked).map(c => c.value);
                    GlobalState.set(key, checked);
                });
            });
        };
        bindCheck(els.peleChecks, 'abd_pele_list');
        bindCheck(els.percChecks, 'abd_perc_list');
        bindCheck(els.sinalChecks, 'abd_sinal_list');

        GlobalState.subscribe((state) => this.updateVisibility(state.lastUpdatedKey, state, els));
    },

    restoreState(els) {
        const s = GlobalState.getAll();
        
        // Restore Inputs
        if(s.abd_forma_tipo) els.formaTipo.value = s.abd_forma_tipo;
        if(s.abd_hernia) els.hernia.value = s.abd_hernia;
        if(s.abd_rha_tipo) els.rhaTipo.value = s.abd_rha_tipo;
        if(s.abd_sopro_loc) els.soproLoc.value = s.abd_sopro_loc;
        if(s.abd_som_tipo) els.somTipo.value = s.abd_som_tipo;
        if(s.abd_giordano_lado) els.giordanoLado.value = s.abd_giordano_lado;
        if(s.abd_palp_tipo) els.palpTipo.value = s.abd_palp_tipo;
        if(s.abd_palp_loc) els.palpLoc.value = s.abd_palp_loc;
        if(s.abd_figado) els.figado.value = s.abd_figado;
        if(s.abd_baco) els.baco.value = s.abd_baco;

        // Restore Checkboxes
        const restoreCheck = (nodeList, list) => {
            if(!list) return;
            nodeList.forEach(c => c.checked = list.includes(c.value));
        };
        restoreCheck(els.peleChecks, s.abd_pele_list);
        restoreCheck(els.percChecks, s.abd_perc_list);
        restoreCheck(els.sinalChecks, s.abd_sinal_list);

        // Restore Toggles
        document.querySelectorAll('button[data-key]').forEach(btn => {
            const key = btn.getAttribute('data-key');
            const val = btn.getAttribute('data-val');
            btn.classList.remove('selected');
            if (s[key] === val) btn.classList.add('selected');
        });

        // Visibility
        ['abd_forma', 'abd_pele', 'abd_rha', 'abd_sopro', 'abd_som', 'abd_giordano', 'abd_palp'].forEach(k => {
            this.updateVisibility(k, s, els);
        });
    },

    updateVisibility(key, s, els) {
        if(key === 'abd_forma') els.formaDet.classList.toggle('visible', s.abd_forma === 'Alterado');
        if(key === 'abd_pele') els.peleDet.classList.toggle('visible', s.abd_pele === 'Alterações');
        if(key === 'abd_rha') els.rhaDet.classList.toggle('visible', s.abd_rha === 'Alterados');
        if(key === 'abd_sopro') els.soproDet.classList.toggle('visible', s.abd_sopro === 'Presentes');
        if(key === 'abd_som') els.somDet.classList.toggle('visible', s.abd_som === 'Alterado');
        if(key === 'abd_giordano') els.giordanoDet.classList.toggle('visible', s.abd_giordano === 'Positivo');
        if(key === 'abd_palp') els.palpDet.classList.toggle('visible', s.abd_palp === 'Alterado');
    },

    generateText() {
        const s = GlobalState.getAll();
        const parts = [];

        // 1. Inspeção
        if(s.abd_forma) {
            if(s.abd_forma === 'Plano/Arredondado') parts.push("Abdome plano/arredondado, simétrico");
            else parts.push(`Abdome: ${s.abd_forma_tipo || 'atípico'}`);
        }

        if(s.abd_pele === 'Sem Cicatrizes') parts.push("sem cicatrizes ou circulação colateral");
        else {
            const peleList = s.abd_pele_list || [];
            if(peleList.length > 0) parts.push(`presença de: ${peleList.join(', ')}`);
        }

        if(s.abd_hernia) parts.push(s.abd_hernia);
        if(s.abd_peristaltismo === 'Presente (Luta)') parts.push("peristaltismo de luta visível");

        // 2. Ausculta
        if(s.abd_rha) {
            if(s.abd_rha === 'Normoativos') parts.push("RHA presentes e normoativos");
            else parts.push(`RHA: ${s.abd_rha_tipo || 'alterados'}`);
        }
        if(s.abd_sopro === 'Presentes') parts.push(`Sopro audível em ${s.abd_sopro_loc}`);

        // 3. Percussão
        if(s.abd_som) {
            if(s.abd_som === 'Timpanismo') parts.push("timpanismo preservado");
            else parts.push(`Percussão: ${s.abd_som_tipo || 'alterada'}`);
        }
        
        const percList = s.abd_perc_list || [];
        if(percList.length > 0) parts.push(percList.join(', '));

        if(s.abd_giordano === 'Positivo') parts.push(`Giordano positivo ${s.abd_giordano_lado}`);

        // 4. Palpação
        if(s.abd_palp) {
            if(s.abd_palp === 'Flácido/Indolor') parts.push("abdome flácido, depressível e indolor à palpação");
            else {
                let txt = `Palpação: ${s.abd_palp_tipo || 'alterada'}`;
                if(s.abd_palp_loc) txt += ` em ${s.abd_palp_loc}`;
                parts.push(txt);
            }
        }

        const sinais = s.abd_sinal_list || [];
        if(sinais.length > 0) parts.push(`Sinais positivos: ${sinais.join(', ')}`);

        // Visceromegalias
        if(s.abd_figado && s.abd_figado !== 'Impalpável/Normal') parts.push(`Fígado: ${s.abd_figado}`);
        if(s.abd_baco && s.abd_baco !== 'Impalpável') parts.push(`Baço: ${s.abd_baco}`);

        if(parts.length === 0) return '';
        return `ABDOME: ${parts.join('. ')}.`;
    }
};