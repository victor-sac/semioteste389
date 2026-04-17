import { GlobalState } from '../state.js';

export default {
    id: 'ectoscopia',
    title: '3. Ectoscopia',

    render() {
        return `
            <div class="exam-section">
                <h3>1. Estado Geral e Consciência</h3>
                
                <label>Estado Geral</label>
                <div class="toggle-group">
                    <button class="btn-toggle" data-key="ecto_estado" data-val="BEG" onclick="window.ectoDispatch('ecto_estado', 'BEG', this)">Bom (BEG)</button>
                    <button class="btn-toggle" data-key="ecto_estado" data-val="REG" onclick="window.ectoDispatch('ecto_estado', 'REG', this)">Regular (REG)</button>
                    <button class="btn-toggle" data-key="ecto_estado" data-val="MEG" onclick="window.ectoDispatch('ecto_estado', 'MEG', this)">Mau (MEG)</button>
                </div>

                <label>Nível de Consciência</label>
                <div class="toggle-group">
                    <button class="btn-toggle" data-key="ecto_consciencia_status" data-val="LOTE" onclick="window.ectoDispatch('ecto_consciencia_status', 'LOTE', this)">LOTE (Normal)</button>
                    <button class="btn-toggle" data-key="ecto_consciencia_status" data-val="Alterado" onclick="window.ectoDispatch('ecto_consciencia_status', 'Alterado', this)">Alterado</button>
                </div>

                <div id="consciencia-detalhes" class="conditional-field">
                    <label>Alteração de Consciência</label>
                    <select id="ecto_consciencia_tipo" style="width: 100%; height: 40px; border: 1px solid #ced4da; border-radius: 6px; background: white;">
                        <option value="Sonolento">Sonolento</option>
                        <option value="Torporoso">Torporoso</option>
                        <option value="Comatoso">Comatoso</option>
                        <option value="Confusão Mental">Confusão Mental</option>
                        <option value="Desorientado">Desorientado</option>
                    </select>
                </div>
            </div>

            <div class="exam-section">
                <h3>2. Fácies, Atitude e Biótipo</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label>Fácies</label>
                        <select id="ecto_facies" style="width: 100%; height: 40px; border: 1px solid #ced4da; border-radius: 6px; background: white;">
                            <option value="" disabled selected>Selecione...</option>
                            <option value="Atípica">Atípica (Normal)</option>
                            <option value="Hipocrática">Hipocrática</option>
                            <option value="Renal">Renal</option>
                            <option value="Cushingóide">Cushingóide</option>
                            <option value="Leonina">Leonina</option>
                            <option value="Parkinsoniana">Parkinsoniana</option>
                            <option value="Basedowiana">Basedowiana</option>
                            <option value="Mixedematosa">Mixedematosa</option>
                            <option value="Dolorosa">Dolorosa</option>
                        </select>
                    </div>

                    <div>
                        <label>Atitude</label>
                        <select id="ecto_atitude" style="width: 100%; height: 40px; border: 1px solid #ced4da; border-radius: 6px; background: white;">
                            <option value="" disabled selected>Selecione...</option>
                            <option value="Ativa/Voluntária">Ativa / Voluntária</option>
                            <option value="Passiva">Passiva</option>
                            <option value="Ortopneica">Ortopneica</option>
                            <option value="Genupeitoral">Genupeitoral</option>
                            <option value="Coclus de fuzil">Coclus de fuzil</option>
                            <option value="Parkinsoniana">Parkinsoniana</option>
                        </select>
                    </div>
                </div>

                <div style="margin-top: 15px;">
                    <label>Biótipo</label>
                    <div class="toggle-group">
                        <button class="btn-toggle" data-key="ecto_biotipo" data-val="Normolíneo" onclick="window.ectoDispatch('ecto_biotipo', 'Normolíneo', this)">Normolíneo</button>
                        <button class="btn-toggle" data-key="ecto_biotipo" data-val="Brevilíneo" onclick="window.ectoDispatch('ecto_biotipo', 'Brevilíneo', this)">Brevilíneo</button>
                        <button class="btn-toggle" data-key="ecto_biotipo" data-val="Longilíneo" onclick="window.ectoDispatch('ecto_biotipo', 'Longilíneo', this)">Longilíneo</button>
                    </div>
                </div>
            </div>

            <div class="exam-section">
                <h3>3. Pele, Mucosas e Hidratação</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; row-gap: 30px;">
                    
                    <div style="background: #fdfdfd; padding: 10px; border: 1px solid #f1f3f5; border-radius: 6px;">
                        <label>Hidratação</label>
                        <div style="display: flex; gap: 5px;">
                            <button class="btn-toggle" data-key="ecto_hidra_status" data-val="Hidratado" onclick="window.ectoDispatch('ecto_hidra_status', 'Hidratado', this)">Hidratado</button>
                            <button class="btn-toggle" data-key="ecto_hidra_status" data-val="Desidratado" onclick="window.ectoDispatch('ecto_hidra_status', 'Desidratado', this)">Desidratado</button>
                        </div>
                        <div id="hidra-cruzes" class="cruzes-container" style="display:none; margin-top: 10px;">
                            <span style="font-size: 0.8rem; color: #666; margin-right: 5px;">Intensidade:</span>
                            ${this.renderCruzes('ecto_hidra_grau')}
                        </div>
                    </div>

                    <div style="background: #fdfdfd; padding: 10px; border: 1px solid #f1f3f5; border-radius: 6px;">
                        <label>Coloração</label>
                        <div style="display: flex; gap: 5px;">
                            <button class="btn-toggle" data-key="ecto_cor_status" data-val="Normocorado" onclick="window.ectoDispatch('ecto_cor_status', 'Normocorado', this)">Normocorado</button>
                            <button class="btn-toggle" data-key="ecto_cor_status" data-val="Hipocorado" onclick="window.ectoDispatch('ecto_cor_status', 'Hipocorado', this)">Hipocorado</button>
                        </div>
                        <div id="cor-cruzes" class="cruzes-container" style="display:none; margin-top: 10px;">
                            <span style="font-size: 0.8rem; color: #666; margin-right: 5px;">Intensidade:</span>
                            ${this.renderCruzes('ecto_cor_grau')}
                        </div>
                    </div>

                    <div style="background: #fdfdfd; padding: 10px; border: 1px solid #f1f3f5; border-radius: 6px;">
                        <label>Icterícia</label>
                        <div style="display: flex; gap: 5px;">
                            <button class="btn-toggle" data-key="ecto_ictericia_status" data-val="Anictérico" onclick="window.ectoDispatch('ecto_ictericia_status', 'Anictérico', this)">Anictérico</button>
                            <button class="btn-toggle" data-key="ecto_ictericia_status" data-val="Ictérico" onclick="window.ectoDispatch('ecto_ictericia_status', 'Ictérico', this)">Ictérico</button>
                        </div>
                        <div id="ictericia-cruzes" class="cruzes-container" style="display:none; margin-top: 10px;">
                            <span style="font-size: 0.8rem; color: #666; margin-right: 5px;">Intensidade:</span>
                            ${this.renderCruzes('ecto_ictericia_grau')}
                        </div>
                    </div>

                    <div style="background: #fdfdfd; padding: 10px; border: 1px solid #f1f3f5; border-radius: 6px;">
                        <label>Cianose</label>
                        <div class="toggle-group" style="margin-bottom: 10px;">
                            <button class="btn-toggle" data-key="ecto_cianose_status" data-val="Acianótico" onclick="window.ectoDispatch('ecto_cianose_status', 'Acianótico', this)">Acianótico</button>
                            <button class="btn-toggle" data-key="ecto_cianose_status" data-val="Presente" onclick="window.ectoDispatch('ecto_cianose_status', 'Presente', this)">Presente</button>
                        </div>
                        <div id="cianose-detalhes" class="conditional-field" style="margin-top: 5px;">
                            <select id="ecto_cianose_tipo" style="width: 100%; height: 35px; border: 1px solid #ced4da; border-radius: 4px; font-size: 0.9rem;">
                                <option value="Periférica">Tipo: Periférica</option>
                                <option value="Central">Tipo: Central</option>
                                <option value="Mista">Tipo: Mista</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>

            <div class="exam-section">
                <h3>4. Outros Achados</h3>
                
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; background: #fff; padding: 10px; border: 1px solid #eee; border-radius: 6px;">
                    <label style="margin:0;">Baqueteamento Digital</label>
                    <div class="toggle-group" style="margin:0; width: 150px;">
                        <button class="btn-toggle" data-key="ecto_baqueteamento" data-val="Não" onclick="window.ectoDispatch('ecto_baqueteamento', 'Não', this)">Não</button>
                        <button class="btn-toggle" data-key="ecto_baqueteamento" data-val="Sim" onclick="window.ectoDispatch('ecto_baqueteamento', 'Sim', this)">Sim</button>
                    </div>
                </div>

                <div style="margin-bottom: 15px;">
                    <label>Perfusão Capilar Periférica</label>
                    <div class="toggle-group">
                        <button class="btn-toggle" data-key="ecto_perfusao" data-val="< 3s" onclick="window.ectoDispatch('ecto_perfusao', '< 3s', this)">&lt; 3 seg</button>
                        <button class="btn-toggle" data-key="ecto_perfusao" data-val="> 3s" onclick="window.ectoDispatch('ecto_perfusao', '> 3s', this)">&gt; 3 seg</button>
                    </div>
                </div>
            </div>
        `;
    },

    renderCruzes(keyBase) {
        return `
            <div style="display: inline-flex; gap: 5px; flex-wrap: wrap;">
                <button class="btn-cruz" data-key="${keyBase}" data-val="1+/4+" onclick="window.ectoDispatch('${keyBase}', '1+/4+', this)">+</button>
                <button class="btn-cruz" data-key="${keyBase}" data-val="2+/4+" onclick="window.ectoDispatch('${keyBase}', '2+/4+', this)">2+</button>
                <button class="btn-cruz" data-key="${keyBase}" data-val="3+/4+" onclick="window.ectoDispatch('${keyBase}', '3+/4+', this)">3+</button>
                <button class="btn-cruz" data-key="${keyBase}" data-val="4+/4+" onclick="window.ectoDispatch('${keyBase}', '4+/4+', this)">4+</button>
            </div>
        `;
    },

    init() {
        // --- DISPATCHER PERSONALIZADO PARA ECTOSCOPIA (TOGGLE) ---
        window.ectoDispatch = (key, value, btn) => {
            const current = GlobalState.get(key);
            
            if (current === value) {
                // Se já estava selecionado, limpa (desseleciona)
                GlobalState.set(key, null);
                btn.classList.remove('selected');
            } else {
                // Seleção normal
                GlobalState.set(key, value);
                // Remove dos irmãos
                if (btn.parentElement) {
                    Array.from(btn.parentElement.children).forEach(c => c.classList.remove('selected'));
                }
                btn.classList.add('selected');
            }
            // Gatilho de reatividade para mostrar/ocultar campos
            GlobalState.set('lastUpdatedKey', key);
        };

        const els = {
            conscienciaTipo: document.getElementById('ecto_consciencia_tipo'),
            facies: document.getElementById('ecto_facies'),
            atitude: document.getElementById('ecto_atitude'),
            cianoseTipo: document.getElementById('ecto_cianose_tipo'),
            
            consDetails: document.getElementById('consciencia-detalhes'),
            hidraCruzes: document.getElementById('hidra-cruzes'),
            corCruzes: document.getElementById('cor-cruzes'),
            icteCruzes: document.getElementById('ictericia-cruzes'),
            cianoseDetails: document.getElementById('cianose-detalhes')
        };

        // 1. Restaura o estado visual
        this.restoreState(els);

        // 2. Listeners de Select
        const selects = ['ecto_consciencia_tipo', 'ecto_facies', 'ecto_atitude', 'ecto_cianose_tipo'];
        selects.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.addEventListener('change', (e) => GlobalState.set(id, e.target.value));
        });

        // 3. Reatividade
        GlobalState.subscribe((state) => {
            this.updateVisibility(state.lastUpdatedKey, state, els);
        });
    },

    restoreState(els) {
        const state = GlobalState.getAll();

        // Selects
        if(state.ecto_consciencia_tipo) els.conscienciaTipo.value = state.ecto_consciencia_tipo;
        if(state.ecto_facies) els.facies.value = state.ecto_facies;
        if(state.ecto_atitude) els.atitude.value = state.ecto_atitude;
        if(state.ecto_cianose_tipo) els.cianoseTipo.value = state.ecto_cianose_tipo;

        // Botões (aplica 'selected' se houver valor)
        document.querySelectorAll('button[data-key]').forEach(btn => {
            const key = btn.getAttribute('data-key');
            const val = btn.getAttribute('data-val');
            btn.classList.remove('selected');
            if (state[key] === val) {
                btn.classList.add('selected');
            }
        });

        // Visibilidade
        ['ecto_consciencia_status', 'ecto_hidra_status', 'ecto_cor_status', 'ecto_ictericia_status', 'ecto_cianose_status']
            .forEach(key => this.updateVisibility(key, state, els));
    },

    updateVisibility(key, state, els) {
        if (key === 'ecto_consciencia_status') {
            if (state[key] === 'Alterado') els.consDetails.classList.add('visible');
            else els.consDetails.classList.remove('visible');
        }

        if (key === 'ecto_hidra_status') {
            if (state[key] === 'Desidratado') els.hidraCruzes.style.display = 'block';
            else els.hidraCruzes.style.display = 'none';
        }

        if (key === 'ecto_cor_status') {
            if (state[key] === 'Hipocorado') els.corCruzes.style.display = 'block';
            else els.corCruzes.style.display = 'none';
        }

        if (key === 'ecto_ictericia_status') {
            if (state[key] === 'Ictérico') els.icteCruzes.style.display = 'block';
            else els.icteCruzes.style.display = 'none';
        }

        if (key === 'ecto_cianose_status') {
            if (state[key] === 'Presente') els.cianoseDetails.classList.add('visible');
            else els.cianoseDetails.classList.remove('visible');
        }
    },

    generateText() {
        const s = GlobalState.getAll();
        const parts = [];

        // Verifica existência antes de adicionar
        if (s.ecto_estado) parts.push(s.ecto_estado);

        if (s.ecto_consciencia_status) {
            if (s.ecto_consciencia_status === 'LOTE') parts.push("LOTE");
            else parts.push(s.ecto_consciencia_tipo || "Consciência alterada");
        }

        if (s.ecto_facies) parts.push(`Fácies ${s.ecto_facies}`);
        if (s.ecto_atitude) parts.push(`Atitude ${s.ecto_atitude}`);
        if (s.ecto_biotipo) parts.push(s.ecto_biotipo);

        if (s.ecto_hidra_status) {
            if (s.ecto_hidra_status === 'Hidratado') parts.push("Hidratado");
            else parts.push(`Desidratado (${s.ecto_hidra_grau || 's/ref'})`);
        }

        if (s.ecto_cor_status) {
            if (s.ecto_cor_status === 'Normocorado') parts.push("Normocorado");
            else parts.push(`Hipocorado (${s.ecto_cor_grau || 's/ref'})`);
        }

        if (s.ecto_ictericia_status) {
            if (s.ecto_ictericia_status === 'Anictérico') parts.push("Anictérico");
            else parts.push(`Ictérico (${s.ecto_ictericia_grau || 's/ref'})`);
        }

        if (s.ecto_cianose_status) {
            if (s.ecto_cianose_status === 'Acianótico') parts.push("Acianótico");
            else parts.push(`Cianose ${s.ecto_cianose_tipo || 'presente'}`);
        }
        
        if (s.ecto_perfusao) {
            if (s.ecto_perfusao === '< 3s') parts.push("perfusão capilar < 3s");
            else parts.push("perfusão capilar lentificada (> 3s)");
        }

        if (s.ecto_baqueteamento === 'Sim') parts.push("baqueteamento digital presente");

        // Retorna vazio se nada foi selecionado
        if (parts.length === 0) return '';
        
        return `ECTOSCOPIA: ${parts.join(', ')}.`;
    }
};