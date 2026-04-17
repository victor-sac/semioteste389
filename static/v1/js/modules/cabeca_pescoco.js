import { GlobalState } from '../state.js';

export default {
    id: 'cabeca_pescoco',
    title: '4. Cabeça e Pescoço',

    render() {
        return `
            <div class="exam-section">
                <h3>1. Cabeça e Crânio</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label>Crânio</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="cp_cranio" data-val="Normocéfalo" onclick="window.cpDispatch('cp_cranio', 'Normocéfalo', this)">Normocéfalo</button>
                            <button class="btn-toggle" data-key="cp_cranio" data-val="Alterado" onclick="window.cpDispatch('cp_cranio', 'Alterado', this)">Alterado</button>
                        </div>
                        <div id="cranio-detalhes" class="conditional-field" style="margin-top: 5px;">
                            <select id="cp_cranio_tipo" style="width: 100%; height: 35px; border: 1px solid #ced4da; border-radius: 4px;">
                                <option value="Microcefalia">Microcefalia</option>
                                <option value="Macrocefalia">Macrocefalia</option>
                                <option value="Turricefalia">Turricefalia</option>
                                <option value="Dolicocefalia">Dolicocefalia</option>
                                <option value="Assimetria">Assimetria</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>Couro Cabeludo</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="cp_couro" data-val="Íntegro" onclick="window.cpDispatch('cp_couro', 'Íntegro', this)">Íntegro</button>
                            <button class="btn-toggle" data-key="cp_couro" data-val="Alterado" onclick="window.cpDispatch('cp_couro', 'Alterado', this)">Alterado</button>
                        </div>
                        <div id="couro-detalhes" class="conditional-field" style="margin-top: 5px;">
                            <select id="cp_couro_tipo" style="width: 100%; height: 35px; border: 1px solid #ced4da; border-radius: 4px;">
                                <option value="Alopecia Androgenética">Alopecia Androgenética</option>
                                <option value="Alopecia Areata">Alopecia Areata</option>
                                <option value="Seborreia">Seborreia</option>
                                <option value="Pediculose">Pediculose</option>
                                <option value="Lesões cutâneas">Lesões cutâneas</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="exam-section">
                <h3>2. Olhos</h3>
                
                <div style="margin-bottom: 15px;">
                    <label>Pupilas</label>
                    <div class="toggle-group">
                        <button class="btn-toggle" data-key="cp_pupilas" data-val="Isocóricas" onclick="window.cpDispatch('cp_pupilas', 'Isocóricas', this)">Isocóricas</button>
                        <button class="btn-toggle" data-key="cp_pupilas" data-val="Anisocoria" onclick="window.cpDispatch('cp_pupilas', 'Anisocoria', this)">Anisocoria</button>
                        <button class="btn-toggle" data-key="cp_pupilas" data-val="Midríase" onclick="window.cpDispatch('cp_pupilas', 'Midríase', this)">Midríase</button>
                        <button class="btn-toggle" data-key="cp_pupilas" data-val="Miose" onclick="window.cpDispatch('cp_pupilas', 'Miose', this)">Miose</button>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px;">
                    <div>
                        <label>Reflexo Fotomotor</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="cp_fotomotor" data-val="Presente" onclick="window.cpDispatch('cp_fotomotor', 'Presente', this)">Presente</button>
                            <button class="btn-toggle" data-key="cp_fotomotor" data-val="Ausente" onclick="window.cpDispatch('cp_fotomotor', 'Ausente', this)">Ausente</button>
                        </div>
                    </div>
                    <div>
                        <label>Escleras</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="cp_escleras" data-val="Anictéricas" onclick="window.cpDispatch('cp_escleras', 'Anictéricas', this)">Anictéricas</button>
                            <button class="btn-toggle" data-key="cp_escleras" data-val="Ictéricas" onclick="window.cpDispatch('cp_escleras', 'Ictéricas', this)">Ictéricas</button>
                        </div>
                    </div>
                </div>

                <div style="background: #f8f9fa; padding: 10px; border-radius: 6px; border: 1px solid #e9ecef;">
                    <label style="font-size: 0.85rem; color: #666;">Achados Adicionais (Selecione se houver)</label>
                    <select id="cp_olhos_extra" style="width: 100%; height: 35px; border: 1px solid #ced4da; border-radius: 4px; margin-top: 5px;">
                        <option value="">Sem alterações adicionais</option>
                        <option value="Hiperemia conjuntival">Hiperemia conjuntival</option>
                        <option value="Ptose palpebral">Ptose palpebral</option>
                        <option value="Exoftalmia">Exoftalmia</option>
                        <option value="Estrabismo">Estrabismo</option>
                        <option value="Nistagmo">Nistagmo</option>
                    </select>
                </div>
            </div>

            <div class="exam-section">
                <h3>3. Ouvidos e Nariz</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label>Otoscopia</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="cp_otoscopia" data-val="Normal" onclick="window.cpDispatch('cp_otoscopia', 'Normal', this)">Normal</button>
                            <button class="btn-toggle" data-key="cp_otoscopia" data-val="Alterada" onclick="window.cpDispatch('cp_otoscopia', 'Alterada', this)">Alterada</button>
                        </div>
                        <div id="oto-detalhes" class="conditional-field" style="margin-top: 5px;">
                            <select id="cp_oto_tipo" style="width: 100%; height: 35px; border: 1px solid #ced4da; border-radius: 4px;">
                                <option value="Rolha de cerume">Rolha de cerume</option>
                                <option value="Hiperemia (Otite)">Hiperemia (Otite)</option>
                                <option value="Otorreia">Otorreia</option>
                                <option value="Perfuração timpânica">Perfuração timpânica</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label>Cavidade Nasal</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="cp_nariz" data-val="Normal" onclick="window.cpDispatch('cp_nariz', 'Normal', this)">Normal</button>
                            <button class="btn-toggle" data-key="cp_nariz" data-val="Alterada" onclick="window.cpDispatch('cp_nariz', 'Alterada', this)">Alterada</button>
                        </div>
                        <div id="nariz-detalhes" class="conditional-field" style="margin-top: 5px;">
                            <select id="cp_nariz_tipo" style="width: 100%; height: 35px; border: 1px solid #ced4da; border-radius: 4px;">
                                <option value="Desvio de septo">Desvio de septo</option>
                                <option value="Rinorreia">Rinorreia</option>
                                <option value="Epistaxe">Epistaxe</option>
                                <option value="Hiperemia mucosa">Hiperemia mucosa</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="exam-section">
                <h3>4. Boca e Garganta</h3>
                
                <div style="margin-bottom: 15px;">
                    <label>Mucosa Oral e Dentes</label>
                    <div class="toggle-group">
                        <button class="btn-toggle" data-key="cp_boca" data-val="Úmida/Conservada" onclick="window.cpDispatch('cp_boca', 'Úmida/Conservada', this)">Úmida/Conservada</button>
                        <button class="btn-toggle" data-key="cp_boca" data-val="Alterada" onclick="window.cpDispatch('cp_boca', 'Alterada', this)">Alterada</button>
                    </div>
                     <div id="boca-detalhes" class="conditional-field" style="margin-top: 5px;">
                        <input type="text" id="cp_boca_obs" placeholder="Descreva (ex: Cândidiase, Deformidade...)" style="width: 100%; height: 35px; border: 1px solid #ced4da; border-radius: 4px; padding-left: 10px;">
                    </div>
                </div>

                <div>
                    <label>Orofaringe e Tonsilas</label>
                    <div class="toggle-group">
                        <button class="btn-toggle" data-key="cp_orofaringe" data-val="Normal" onclick="window.cpDispatch('cp_orofaringe', 'Normal', this)">Normal</button>
                        <button class="btn-toggle" data-key="cp_orofaringe" data-val="Hiperemia" onclick="window.cpDispatch('cp_orofaringe', 'Hiperemia', this)">Hiperemia</button>
                        <button class="btn-toggle" data-key="cp_orofaringe" data-val="Exsudato" onclick="window.cpDispatch('cp_orofaringe', 'Exsudato', this)">Exsudato</button>
                        <button class="btn-toggle" data-key="cp_orofaringe" data-val="Hipertrofia" onclick="window.cpDispatch('cp_orofaringe', 'Hipertrofia', this)">Hipertrofia</button>
                    </div>
                </div>
            </div>

            <div class="exam-section">
                <h3>5. Tireoide e Linfonodos</h3>
                
                <div style="margin-bottom: 20px;">
                    <label>Tireoide</label>
                    <select id="cp_tireoide" style="width: 100%; height: 40px; border: 1px solid #ced4da; border-radius: 6px; background: white;">
                        <option value="" disabled selected>Selecione...</option>
                        <option value="Impalpável/Normal">Impalpável / Normal</option>
                        <option value="Bócio Difuso">Bócio Difuso</option>
                        <option value="Nódulo Palpável">Nódulo Palpável</option>
                        <option value="Dolorosa">Dolorosa à palpação</option>
                    </select>
                </div>
                
                <div style="border-top: 1px solid #eee; margin-bottom: 15px;"></div>

                <label>Linfonodos Cervicais</label>
                <div style="margin-bottom: 10px;">
                    <div class="toggle-group">
                        <button class="btn-toggle" id="btn-linfo-ausente" onclick="window.cpDispatchLinfo(false)">Ausência de Linfonodomegalias</button>
                        <button class="btn-toggle" id="btn-linfo-presente" onclick="window.cpDispatchLinfo(true)">Linfonodomegalias Presentes</button>
                    </div>
                </div>

                <div id="linfo-detalhes" class="conditional-field" style="background: #f8f9fa; padding: 10px; border: 1px solid #e9ecef; border-radius: 6px;">
                    <p style="font-size: 0.8rem; color: #666; margin: 0 0 10px 0;">Selecione as cadeias acometidas:</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <label class="checkbox-label"><input type="checkbox" class="linfo-check" value="Occipitais"> Occipitais</label>
                        <label class="checkbox-label"><input type="checkbox" class="linfo-check" value="Pré-auriculares"> Pré-auriculares</label>
                        <label class="checkbox-label"><input type="checkbox" class="linfo-check" value="Submandibulares"> Submandibulares</label>
                        <label class="checkbox-label"><input type="checkbox" class="linfo-check" value="Submentonianos"> Submentonianos</label>
                        <label class="checkbox-label"><input type="checkbox" class="linfo-check" value="Cervicais Anteriores"> Cervicais Ant.</label>
                        <label class="checkbox-label"><input type="checkbox" class="linfo-check" value="Cervicais Posteriores"> Cervicais Post.</label>
                        <label class="checkbox-label"><input type="checkbox" class="linfo-check" value="Supraclaviculares"> Supraclaviculares</label>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // --- DISPATCHER PERSONALIZADO (PERMITE DESELEÇÃO) ---
        window.cpDispatch = (key, value, btn) => {
            const current = GlobalState.get(key);
            
            if (current === value) {
                // Se clicou no que já estava selecionado -> Desseleciona
                GlobalState.set(key, null); // Limpa estado
                btn.classList.remove('selected');
            } else {
                // Seleção Normal
                GlobalState.set(key, value);
                // Remove dos irmãos
                if (btn.parentElement) {
                    Array.from(btn.parentElement.children).forEach(c => c.classList.remove('selected'));
                }
                btn.classList.add('selected');
            }
            // Gatilho de reatividade
            GlobalState.set('lastUpdatedKey', key);
        };

        // --- HELPER PARA LINFONODOS (Lógica Booleana/Toggle) ---
        window.cpDispatchLinfo = (targetState) => {
            const current = GlobalState.get('cp_linfo_presente');
            
            // Lógica de Toggle também para os linfonodos
            if (current === targetState) {
                GlobalState.set('cp_linfo_presente', null);
            } else {
                GlobalState.set('cp_linfo_presente', targetState);
            }
            GlobalState.set('lastUpdatedKey', 'cp_linfo_presente');
        };

        const els = {
            cranioTipo: document.getElementById('cp_cranio_tipo'),
            couroTipo: document.getElementById('cp_couro_tipo'),
            olhosExtra: document.getElementById('cp_olhos_extra'),
            otoTipo: document.getElementById('cp_oto_tipo'),
            narizTipo: document.getElementById('cp_nariz_tipo'),
            bocaObs: document.getElementById('cp_boca_obs'),
            tireoide: document.getElementById('cp_tireoide'),

            cranioDet: document.getElementById('cranio-detalhes'),
            couroDet: document.getElementById('couro-detalhes'),
            otoDet: document.getElementById('oto-detalhes'),
            narizDet: document.getElementById('nariz-detalhes'),
            bocaDet: document.getElementById('boca-detalhes'),
            linfoDet: document.getElementById('linfo-detalhes'),

            btnLinfoAus: document.getElementById('btn-linfo-ausente'),
            btnLinfoPres: document.getElementById('btn-linfo-presente'),
            linfoChecks: document.querySelectorAll('.linfo-check')
        };

        // NOTA: Não chamamos setDefaults() aqui para que tudo comece "em branco".

        // 2. Restore State
        this.restoreState(els);

        // 3. Listeners Selects e Inputs
        els.cranioTipo.addEventListener('change', (e) => GlobalState.set('cp_cranio_tipo', e.target.value));
        els.couroTipo.addEventListener('change', (e) => GlobalState.set('cp_couro_tipo', e.target.value));
        els.olhosExtra.addEventListener('change', (e) => GlobalState.set('cp_olhos_extra', e.target.value));
        els.otoTipo.addEventListener('change', (e) => GlobalState.set('cp_oto_tipo', e.target.value));
        els.narizTipo.addEventListener('change', (e) => GlobalState.set('cp_nariz_tipo', e.target.value));
        els.bocaObs.addEventListener('input', (e) => GlobalState.set('cp_boca_obs', e.target.value));
        els.tireoide.addEventListener('change', (e) => GlobalState.set('cp_tireoide', e.target.value));

        els.linfoChecks.forEach(chk => {
            chk.addEventListener('change', () => {
                const checked = Array.from(els.linfoChecks).filter(c => c.checked).map(c => c.value);
                GlobalState.set('cp_linfo_chains', checked);
            });
        });

        // 4. Reactive Visibility
        GlobalState.subscribe((state) => {
            this.updateVisibility(state.lastUpdatedKey, state, els);
        });
    },

    restoreState(els) {
        const s = GlobalState.getAll();

        if(s.cp_cranio_tipo) els.cranioTipo.value = s.cp_cranio_tipo;
        if(s.cp_couro_tipo) els.couroTipo.value = s.cp_couro_tipo;
        if(s.cp_olhos_extra) els.olhosExtra.value = s.cp_olhos_extra;
        if(s.cp_oto_tipo) els.otoTipo.value = s.cp_oto_tipo;
        if(s.cp_nariz_tipo) els.narizTipo.value = s.cp_nariz_tipo;
        if(s.cp_boca_obs) els.bocaObs.value = s.cp_boca_obs;
        if(s.cp_tireoide) els.tireoide.value = s.cp_tireoide;

        const chains = s.cp_linfo_chains || [];
        els.linfoChecks.forEach(chk => {
            chk.checked = chains.includes(chk.value);
        });

        document.querySelectorAll('button[data-key]').forEach(btn => {
            const key = btn.getAttribute('data-key');
            const val = btn.getAttribute('data-val');
            btn.classList.remove('selected');
            if (s[key] === val) btn.classList.add('selected');
        });

        // Linfo Toggle Restore
        els.btnLinfoPres.classList.remove('selected');
        els.btnLinfoAus.classList.remove('selected');
        if(s.cp_linfo_presente === true) {
            els.btnLinfoPres.classList.add('selected');
        } else if(s.cp_linfo_presente === false) {
            els.btnLinfoAus.classList.add('selected');
        }

        ['cp_cranio', 'cp_couro', 'cp_otoscopia', 'cp_nariz', 'cp_boca', 'cp_linfo_presente'].forEach(k => {
            this.updateVisibility(k, s, els);
        });
    },

    updateVisibility(key, s, els) {
        if(key === 'cp_cranio') {
            if(s.cp_cranio === 'Alterado') els.cranioDet.classList.add('visible');
            else els.cranioDet.classList.remove('visible');
        }
        if(key === 'cp_couro') {
            if(s.cp_couro === 'Alterado') els.couroDet.classList.add('visible');
            else els.couroDet.classList.remove('visible');
        }
        if(key === 'cp_otoscopia') {
            if(s.cp_otoscopia === 'Alterada') els.otoDet.classList.add('visible');
            else els.otoDet.classList.remove('visible');
        }
        if(key === 'cp_nariz') {
            if(s.cp_nariz === 'Alterada') els.narizDet.classList.add('visible');
            else els.narizDet.classList.remove('visible');
        }
        if(key === 'cp_boca') {
            if(s.cp_boca === 'Alterada') els.bocaDet.classList.add('visible');
            else els.bocaDet.classList.remove('visible');
        }
        if(key === 'cp_linfo_presente') {
            if(s.cp_linfo_presente === true) {
                els.linfoDet.classList.add('visible');
                els.btnLinfoPres.classList.add('selected');
                els.btnLinfoAus.classList.remove('selected');
            } else if (s.cp_linfo_presente === false) {
                els.linfoDet.classList.remove('visible');
                els.btnLinfoAus.classList.add('selected');
                els.btnLinfoPres.classList.remove('selected');
            } else {
                // Caso Null (Desselecionado)
                els.linfoDet.classList.remove('visible');
                els.btnLinfoAus.classList.remove('selected');
                els.btnLinfoPres.classList.remove('selected');
            }
        }
    },

    generateText() {
        const s = GlobalState.getAll();
        const parts = [];

        // Verifica existência antes de adicionar (para permitir campos em branco)

        // Cabeça
        if (s.cp_cranio) {
            if(s.cp_cranio === 'Normocéfalo') parts.push("Normocéfalo");
            else parts.push(`Crânio: ${s.cp_cranio_tipo || 'Alterado'}`);
        }
        
        if (s.cp_couro) {
            if(s.cp_couro === 'Íntegro') parts.push("Couro cabeludo íntegro");
            else parts.push(`Couro cabeludo: ${s.cp_couro_tipo}`);
        }

        // Olhos
        const olhos = [];
        if(s.cp_pupilas) olhos.push(s.cp_pupilas);
        if(s.cp_fotomotor) {
            if(s.cp_fotomotor === 'Presente') olhos.push("fotorreagentes"); else olhos.push("reflexo fotomotor ausente");
        }
        if(s.cp_escleras) olhos.push(s.cp_escleras);
        if(s.cp_olhos_extra) olhos.push(s.cp_olhos_extra);
        if(olhos.length) parts.push(`Olhos: ${olhos.join(', ')}`);

        // ORL
        if (s.cp_otoscopia) {
            if(s.cp_otoscopia === 'Normal') parts.push("Otoscopia normal");
            else parts.push(`Otoscopia: ${s.cp_oto_tipo || 'Alterada'}`);
        }

        if (s.cp_nariz) {
            if(s.cp_nariz === 'Normal') parts.push("Nariz: sem alterações");
            else parts.push(`Nariz: ${s.cp_nariz_tipo}`);
        }
        
        if (s.cp_boca) {
            if(s.cp_boca === 'Úmida/Conservada') parts.push("Cavidade oral úmida e conservada");
            else parts.push(`Cavidade oral: ${s.cp_boca_obs || 'Alterada'}`);
        }
        
        if (s.cp_orofaringe) {
            if(s.cp_orofaringe === 'Normal') parts.push("Orofaringe normal");
            else parts.push(`Orofaringe: ${s.cp_orofaringe}`);
        }

        // Pescoço
        const pescoco = [];
        if(s.cp_tireoide && s.cp_tireoide !== 'Impalpável/Normal') pescoco.push(`Tireoide: ${s.cp_tireoide}`);
        else if (s.cp_tireoide === 'Impalpável/Normal') pescoco.push("Tireoide impalpável");
        
        if(pescoco.length) parts.push(pescoco.join(', '));

        // Linfonodos
        if(s.cp_linfo_presente === false) {
            parts.push("Ausência de linfonodomegalias cervicais");
        } else if (s.cp_linfo_presente === true) {
            const chains = s.cp_linfo_chains || [];
            if(chains.length > 0) parts.push(`Linfonodomegalia: ${chains.join(', ')}`);
            else parts.push("Linfonodomegalia presente");
        }

        if(parts.length === 0) return '';
        return `CABEÇA E PESCOÇO: ${parts.join('. ')}.`;
    }
};