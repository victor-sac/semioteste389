import { GlobalState } from '../state.js';

export default {
    id: 'cardiovascular',
    title: '6. Cardiovascular',

    render() {
        return `
            <div class="exam-section">
                <h3>1. Pulsos Periféricos</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label>Palpação e Simetria</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="cv_pulsos" data-val="Palpáveis/Simétricos" onclick="window.cvDispatch('cv_pulsos', 'Palpáveis/Simétricos', this)">Palpáveis / Simétricos</button>
                            <button class="btn-toggle" data-key="cv_pulsos" data-val="Alterados" onclick="window.cvDispatch('cv_pulsos', 'Alterados', this)">Alterados</button>
                        </div>
                    </div>
                    <div>
                        <label>Amplitude</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="cv_ampl" data-val="Normais" onclick="window.cvDispatch('cv_ampl', 'Normais', this)">Normais</button>
                            <button class="btn-toggle" data-key="cv_ampl" data-val="Alterada" onclick="window.cvDispatch('cv_ampl', 'Alterada', this)">Alterada</button>
                        </div>
                    </div>
                </div>

                <div id="pulsos-detalhes" class="conditional-field">
                    <div style="margin-bottom: 15px;">
                        <label style="font-size: 0.85rem; color: #666;">Alterações Específicas:</label>
                        <select id="cv_pulsos_tipo" style="margin-top: 5px;">
                            <option value="">Selecione...</option>
                            <option value="Filiforme (Fraco)">Filiforme</option>
                            <option value="Martelo D'água (Corrigan)">Martelo D'água (Corrigan)</option>
                            <option value="Bisferiens">Bisferiens</option>
                            <option value="Alternante">Alternante</option>
                            <option value="Paradoxal">Paradoxal</option>
                            <option value="Assimétricos">Assimétricos (Déficit de Pulso)</option>
                            <option value="Duros/Arterioscleróticos">Paredes endurecidas</option>
                        </select>
                    </div>
                    
                    <label style="font-size: 0.85rem; color: #666;">Pulsos Ausentes/Diminuídos:</label>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; mt-2">
                        <label class="checkbox-label"><input type="checkbox" class="cv-pulso-check" value="Radiais"> Radiais</label>
                        <label class="checkbox-label"><input type="checkbox" class="cv-pulso-check" value="Pediosos"> Pediosos</label>
                        <label class="checkbox-label"><input type="checkbox" class="cv-pulso-check" value="Tibiais Post."> Tibiais Post.</label>
                        <label class="checkbox-label"><input type="checkbox" class="cv-pulso-check" value="Poplíteos"> Poplíteos</label>
                    </div>
                </div>
            </div>

            <div class="exam-section">
                <h3>2. Veias Jugulares (45º)</h3>
                
                <div class="toggle-group">
                    <button class="btn-toggle" data-key="cv_jugular" data-val="Plana/Normal" onclick="window.cvDispatch('cv_jugular', 'Plana/Normal', this)">Planas / Normais</button>
                    <button class="btn-toggle" data-key="cv_jugular" data-val="Turgência" onclick="window.cvDispatch('cv_jugular', 'Turgência', this)">Turgência Jugular</button>
                </div>

                <div id="jugular-detalhes" class="conditional-field">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label>Refluxo Hepatojugular</label>
                            <div class="toggle-group">
                                <button class="btn-toggle" data-key="cv_refluxo" data-val="Ausente" onclick="window.cvDispatch('cv_refluxo', 'Ausente', this)">Ausente</button>
                                <button class="btn-toggle" data-key="cv_refluxo" data-val="Presente" onclick="window.cvDispatch('cv_refluxo', 'Presente', this)">Presente</button>
                            </div>
                        </div>
                        <div>
                            <label>Altura da Coluna (cm)</label>
                            <input type="number" id="cv_jugular_cm" placeholder="Ex: > 4.5 cm" style="margin-top: 0;">
                        </div>
                    </div>
                </div>
            </div>

            <div class="exam-section">
                <h3>3. Pré-córdio (Ictus Cordis)</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label>Visibilidade/Palpação</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="cv_ictus" data-val="Palpável/Normal" onclick="window.cvDispatch('cv_ictus', 'Palpável/Normal', this)">Palpável (4º/5º EIC)</button>
                            <button class="btn-toggle" data-key="cv_ictus" data-val="Alterado" onclick="window.cvDispatch('cv_ictus', 'Alterado', this)">Alterado / Invisível</button>
                        </div>
                    </div>
                    <div>
                        <label>Frêmitos (Sopro Palpável)</label>
                        <div class="toggle-group">
                            <button class="btn-toggle" data-key="cv_fremito" data-val="Ausente" onclick="window.cvDispatch('cv_fremito', 'Ausente', this)">Ausente</button>
                            <button class="btn-toggle" data-key="cv_fremito" data-val="Presente" onclick="window.cvDispatch('cv_fremito', 'Presente', this)">Presente</button>
                        </div>
                    </div>
                </div>

                <div id="ictus-detalhes" class="conditional-field">
                    <label>Características do Ictus</label>
                    <select id="cv_ictus_tipo">
                        <option value="Invisível e Impalpável">Invisível e Impalpável</option>
                        <option value="Desviado à Esquerda/Baixo">Desviado à Esquerda/Baixo</option>
                        <option value="Difuso (> 3cm)">Difuso (> 2 polpas digitais)</option>
                        <option value="Propulsivo (Heave)">Propulsivo (Heave)</option>
                        <option value="Impulsão Paraesternal">Impulsão Paraesternal (HVD)</option>
                    </select>
                </div>
            </div>

            <div class="exam-section">
                <h3>4. Ausculta Cardíaca</h3>

                <div style="margin-bottom: 20px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label>Ritmo</label>
                            <div class="toggle-group">
                                <button class="btn-toggle" data-key="cv_ritmo" data-val="Regular 2T" onclick="window.cvDispatch('cv_ritmo', 'Regular 2T', this)">Regular 2T</button>
                                <button class="btn-toggle" data-key="cv_ritmo" data-val="Irregular" onclick="window.cvDispatch('cv_ritmo', 'Irregular', this)">Irregular</button>
                            </div>
                        </div>
                        <div>
                            <label>Bulhas (Intensidade)</label>
                            <div class="toggle-group">
                                <button class="btn-toggle" data-key="cv_bulhas" data-val="Normofonéticas" onclick="window.cvDispatch('cv_bulhas', 'Normofonéticas', this)">Normofonéticas</button>
                                <button class="btn-toggle" data-key="cv_bulhas" data-val="Alteradas" onclick="window.cvDispatch('cv_bulhas', 'Alteradas', this)">Alteradas</button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="ausculta-detalhes" class="conditional-field">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <label style="font-size: 0.85rem;">Sons Extras (Galope)</label>
                                <select id="cv_ritmo_extra">
                                    <option value="">Nenhum</option>
                                    <option value="B3 (Galope Ventricular)">B3 (Galope Ventricular)</option>
                                    <option value="B4 (Galope Atrial)">B4 (Galope Atrial)</option>
                                    <option value="Ritmo de Galope (B3+B4)">Ritmo de Galope (B3+B4)</option>
                                </select>
                            </div>
                            <div>
                                <label style="font-size: 0.85rem;">Alteração Fonética</label>
                                <select id="cv_bulhas_tipo">
                                    <option value="Hipofonéticas">Hipofonéticas (Abafadas)</option>
                                    <option value="Hiperfonéticas">Hiperfonéticas</option>
                                    <option value="Desdobramento Fixo B2">Desdobramento Fixo B2</option>
                                    <option value="Desdobramento Paradoxal">Desdobramento Paradoxal</option>
                                </select>
                            </div>
                        </div>
                        
                        <div style="margin-top: 10px;">
                            <label style="font-size: 0.85rem;">Outros Ruídos</label>
                            <div style="display: flex; gap: 10px;">
                                <label class="checkbox-label"><input type="checkbox" class="cv-ruido-check" value="Clique Sistólico"> Clique</label>
                                <label class="checkbox-label"><input type="checkbox" class="cv-ruido-check" value="Estalido de Abertura"> Estalido</label>
                                <label class="checkbox-label"><input type="checkbox" class="cv-ruido-check" value="Atrito Pericárdico"> Atrito Pericárdico</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #e9ecef;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <h4 style="margin: 0; font-size: 1rem;">Sopros</h4>
                        <div class="toggle-group" style="margin: 0; width: 200px;">
                            <button class="btn-toggle" id="btn-sopro-nao" onclick="window.cvDispatchSopro(false)">Não</button>
                            <button class="btn-toggle" id="btn-sopro-sim" onclick="window.cvDispatchSopro(true)">Sim</button>
                        </div>
                    </div>

                    <div id="sopro-detalhes" class="conditional-field">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                            <div>
                                <label style="font-size: 0.8rem;">Fase do Ciclo</label>
                                <select id="cv_sopro_fase">
                                    <option value="Sistólico">Sistólico</option>
                                    <option value="Diastólico">Diastólico</option>
                                    <option value="Contínuo">Contínuo</option>
                                </select>
                            </div>
                            <div>
                                <label style="font-size: 0.8rem;">Foco Principal</label>
                                <select id="cv_sopro_foco">
                                    <option value="Mitral">Mitral</option>
                                    <option value="Aórtico">Aórtico</option>
                                    <option value="Tricúspide">Tricúspide</option>
                                    <option value="Pulmonar">Pulmonar</option>
                                    <option value="Mesocárdio">Mesocárdio</option>
                                </select>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <label style="font-size: 0.8rem;">Intensidade (Levine)</label>
                                <select id="cv_sopro_grau">
                                    <option value="1+/6+">Grau I (Suave, s/ frêmito)</option>
                                    <option value="2+/6+">Grau II (Audível, s/ frêmito)</option>
                                    <option value="3+/6+">Grau III (Alto, s/ frêmito)</option>
                                    <option value="4+/6+">Grau IV (Com frêmito)</option>
                                    <option value="5+/6+">Grau V (Com frêmito)</option>
                                    <option value="6+/6+">Grau VI (Audível s/ esteto)</option>
                                </select>
                            </div>
                            <div>
                                <label style="font-size: 0.8rem;">Irradiação</label>
                                <input type="text" id="cv_sopro_irrad" placeholder="Ex: Axila, Pescoço..." style="height: 38px;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // --- DISPATCHERS ---
        window.cvDispatch = (key, value, btn) => {
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

        window.cvDispatchSopro = (isPresent) => {
            const current = GlobalState.get('cv_sopro_presente');
            if (current === isPresent) {
                GlobalState.set('cv_sopro_presente', null);
            } else {
                GlobalState.set('cv_sopro_presente', isPresent);
            }
            GlobalState.set('lastUpdatedKey', 'cv_sopro_presente');
        };

        const els = {
            // Selects
            pulsosTipo: document.getElementById('cv_pulsos_tipo'),
            ictusTipo: document.getElementById('cv_ictus_tipo'),
            ritmoExtra: document.getElementById('cv_ritmo_extra'),
            bulhasTipo: document.getElementById('cv_bulhas_tipo'),
            
            soproFase: document.getElementById('cv_sopro_fase'),
            soproFoco: document.getElementById('cv_sopro_foco'),
            soproGrau: document.getElementById('cv_sopro_grau'),
            
            // Inputs
            jugularCm: document.getElementById('cv_jugular_cm'),
            soproIrrad: document.getElementById('cv_sopro_irrad'),

            // Checks
            pulsoChecks: document.querySelectorAll('.cv-pulso-check'),
            ruidoChecks: document.querySelectorAll('.cv-ruido-check'),

            // Containers
            pulsosDet: document.getElementById('pulsos-detalhes'),
            jugularDet: document.getElementById('jugular-detalhes'),
            ictusDet: document.getElementById('ictus-detalhes'),
            auscultaDet: document.getElementById('ausculta-detalhes'),
            soproDet: document.getElementById('sopro-detalhes'),

            // Sopro Buttons
            btnSoproNao: document.getElementById('btn-sopro-nao'),
            btnSoproSim: document.getElementById('btn-sopro-sim')
        };

        this.restoreState(els);

        // Listeners Inputs
        const inputs = [
            ['cv_pulsos_tipo', els.pulsosTipo], ['cv_ictus_tipo', els.ictusTipo],
            ['cv_ritmo_extra', els.ritmoExtra], ['cv_bulhas_tipo', els.bulhasTipo],
            ['cv_sopro_fase', els.soproFase], ['cv_sopro_foco', els.soproFoco],
            ['cv_sopro_grau', els.soproGrau], ['cv_jugular_cm', els.jugularCm],
            ['cv_sopro_irrad', els.soproIrrad]
        ];
        inputs.forEach(([k, el]) => el.addEventListener('change', (e) => GlobalState.set(k, e.target.value)));
        if(els.jugularCm) els.jugularCm.addEventListener('input', (e) => GlobalState.set('cv_jugular_cm', e.target.value));
        if(els.soproIrrad) els.soproIrrad.addEventListener('input', (e) => GlobalState.set('cv_sopro_irrad', e.target.value));

        // Listeners Checkboxes
        els.pulsoChecks.forEach(chk => {
            chk.addEventListener('change', () => {
                const checked = Array.from(els.pulsoChecks).filter(c => c.checked).map(c => c.value);
                GlobalState.set('cv_pulsos_missing', checked);
            });
        });
        els.ruidoChecks.forEach(chk => {
            chk.addEventListener('change', () => {
                const checked = Array.from(els.ruidoChecks).filter(c => c.checked).map(c => c.value);
                GlobalState.set('cv_ruidos_list', checked);
            });
        });

        GlobalState.subscribe((state) => this.updateVisibility(state.lastUpdatedKey, state, els));
    },

    restoreState(els) {
        const s = GlobalState.getAll();
        
        // Restore Inputs
        if(s.cv_pulsos_tipo) els.pulsosTipo.value = s.cv_pulsos_tipo;
        if(s.cv_ictus_tipo) els.ictusTipo.value = s.cv_ictus_tipo;
        if(s.cv_ritmo_extra) els.ritmoExtra.value = s.cv_ritmo_extra;
        if(s.cv_bulhas_tipo) els.bulhasTipo.value = s.cv_bulhas_tipo;
        if(s.cv_sopro_fase) els.soproFase.value = s.cv_sopro_fase;
        if(s.cv_sopro_foco) els.soproFoco.value = s.cv_sopro_foco;
        if(s.cv_sopro_grau) els.soproGrau.value = s.cv_sopro_grau;
        if(s.cv_jugular_cm) els.jugularCm.value = s.cv_jugular_cm;
        if(s.cv_sopro_irrad) els.soproIrrad.value = s.cv_sopro_irrad;

        // Restore Checks
        const pList = s.cv_pulsos_missing || [];
        els.pulsoChecks.forEach(c => c.checked = pList.includes(c.value));
        const rList = s.cv_ruidos_list || [];
        els.ruidoChecks.forEach(c => c.checked = rList.includes(c.value));

        // Restore Toggles
        document.querySelectorAll('button[data-key]').forEach(btn => {
            const key = btn.getAttribute('data-key');
            const val = btn.getAttribute('data-val');
            btn.classList.remove('selected');
            if (s[key] === val) btn.classList.add('selected');
        });

        // Restore Sopro Buttons
        els.btnSoproSim.classList.remove('selected');
        els.btnSoproNao.classList.remove('selected');
        if(s.cv_sopro_presente === true) els.btnSoproSim.classList.add('selected');
        else if(s.cv_sopro_presente === false) els.btnSoproNao.classList.add('selected');

        // Visibility
        ['cv_pulsos', 'cv_ampl', 'cv_jugular', 'cv_ictus', 'cv_ritmo', 'cv_bulhas', 'cv_sopro_presente'].forEach(k => {
            this.updateVisibility(k, s, els);
        });
    },

    updateVisibility(key, s, els) {
        if(key === 'cv_pulsos' || key === 'cv_ampl') {
            const show = s.cv_pulsos === 'Alterados' || s.cv_ampl === 'Alterada';
            els.pulsosDet.classList.toggle('visible', show);
        }
        if(key === 'cv_jugular') els.jugularDet.classList.toggle('visible', s.cv_jugular === 'Turgência');
        if(key === 'cv_ictus') els.ictusDet.classList.toggle('visible', s.cv_ictus === 'Alterado');
        
        if(key === 'cv_ritmo' || key === 'cv_bulhas') {
            const show = s.cv_ritmo === 'Irregular' || s.cv_bulhas === 'Alteradas';
            els.auscultaDet.classList.toggle('visible', show);
        }

        if(key === 'cv_sopro_presente') {
            if(s.cv_sopro_presente === true) {
                els.soproDet.classList.add('visible');
                els.btnSoproSim.classList.add('selected');
                els.btnSoproNao.classList.remove('selected');
            } else if(s.cv_sopro_presente === false) {
                els.soproDet.classList.remove('visible');
                els.btnSoproNao.classList.add('selected');
                els.btnSoproSim.classList.remove('selected');
            } else {
                els.soproDet.classList.remove('visible');
                els.btnSoproNao.classList.remove('selected');
                els.btnSoproSim.classList.remove('selected');
            }
        }
    },

    generateText() {
        const s = GlobalState.getAll();
        const parts = [];

        // 1. Pulsos
        if(s.cv_pulsos) {
            if(s.cv_pulsos === 'Palpáveis/Simétricos' && s.cv_ampl !== 'Alterada') {
                parts.push("Pulsos periféricos palpáveis, simétricos e com amplitude preservada");
            } else {
                let p = "Pulsos periféricos alterados";
                if(s.cv_pulsos_tipo) p += ` (${s.cv_pulsos_tipo})`;
                const missing = s.cv_pulsos_missing || [];
                if(missing.length > 0) p += `, diminuídos/ausentes em: ${missing.join(', ')}`;
                parts.push(p);
            }
        }

        // 2. Jugular
        if(s.cv_jugular) {
            if(s.cv_jugular === 'Plana/Normal') parts.push("sem turgência jugular a 45º");
            else {
                let j = "turgência jugular patológica";
                if(s.cv_jugular_cm) j += ` (${s.cv_jugular_cm} cm)`;
                if(s.cv_refluxo === 'Presente') j += ", com refluxo hepatojugular";
                parts.push(j);
            }
        }

        // 3. Ictus
        if(s.cv_ictus) {
            if(s.cv_ictus === 'Palpável/Normal') parts.push("ictus cordis palpável no 4º/5º EIC na LHE");
            else parts.push(`ictus cordis: ${s.cv_ictus_tipo || 'alterado'}`);
        }
        if(s.cv_fremito === 'Presente') parts.push("frêmito palpável");

        // 4. Ausculta
        let ausc = [];
        if(s.cv_ritmo === 'Regular 2T') ausc.push("RCR em 2T");
        else if(s.cv_ritmo === 'Irregular') ausc.push("Ritmo irregular");

        if(s.cv_bulhas === 'Normofonéticas') ausc.push("BNF");
        else {
            if(s.cv_bulhas_tipo) ausc.push(s.cv_bulhas_tipo);
            else ausc.push("bulhas alteradas");
        }
        
        if(s.cv_ritmo_extra) ausc.push(s.cv_ritmo_extra);
        
        const ruidos = s.cv_ruidos_list || [];
        if(ruidos.length > 0) ausc.push(ruidos.join(', '));

        // Sopros
        if(s.cv_sopro_presente === false) {
            ausc.push("sem sopros");
        } else if (s.cv_sopro_presente === true) {
            let sop = "sopro";
            if(s.cv_sopro_fase) sop += ` ${s.cv_sopro_fase.toLowerCase()}`;
            if(s.cv_sopro_foco) sop += ` em foco ${s.cv_sopro_foco.toLowerCase()}`;
            if(s.cv_sopro_grau) sop += ` (${s.cv_sopro_grau})`;
            if(s.cv_sopro_irrad) sop += ` irradiado para ${s.cv_sopro_irrad}`;
            ausc.push(sop);
        }

        if(ausc.length > 0) parts.push(ausc.join(', '));

        if(parts.length === 0) return '';
        return `CARDIOVASCULAR: ${parts.join('. ')}.`;
    }
};