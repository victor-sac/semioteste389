import { GlobalState } from '../state.js';

export default {
    id: 'antropometria',
    title: '1. Antropometria',
    
    render() {
        return `
            <div class="exam-section">
                <h3>1. Dados Básicos</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label>Peso (kg)</label>
                        <input type="number" id="peso" placeholder="Ex: 80.5">
                    </div>
                    <div>
                        <label>Altura (cm)</label>
                        <input type="number" id="altura" placeholder="Ex: 175">
                    </div>
                </div>
                
                <div style="margin-top: 15px; padding: 15px; background: #e3f2fd; border-radius: 8px; border: 1px solid #bbdefb;">
                    <strong>IMC: </strong> <span id="imc-display" style="font-size: 1.2rem;">--</span>
                    <span id="imc-class" style="font-size: 0.9rem; color: #555; margin-left: 10px;"></span>
                </div>
            </div>

            <div class="exam-section">
                <h3>2. Circunferências e Risco Metabólico</h3>
                
                <label>Sexo (Obrigatório para cálculo de risco visual)</label>
                <div class="toggle-group">
                    <button class="btn-toggle" id="btn-homem" onclick="window.semioDispatch('antropo_genero', 'Homem', this)">Homem</button>
                    <button class="btn-toggle" id="btn-mulher" onclick="window.semioDispatch('antropo_genero', 'Mulher', this)">Mulher</button>
                </div>

                <div style="margin-bottom: 20px;">
                    <label>Circunferência Abdominal (cm)</label>
                    <input type="number" id="circ_abd" placeholder="Cicatriz umbilical">
                    <div id="abd-feedback" style="margin-top: 5px; font-size: 0.9rem; font-weight: 600; min-height: 20px;"></div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div>
                        <label>Cintura (cm)</label>
                        <input type="number" id="circ_cintura" placeholder="Menor curvatura">
                    </div>
                    <div>
                        <label>Quadril (cm)</label>
                        <input type="number" id="circ_quadril" placeholder="Maior extensão">
                    </div>
                </div>

                <div id="rcq-container" style="display:none; padding: 15px; background: #f8f9fa; border-left: 5px solid #6c757d; margin-bottom: 20px; border-radius: 4px;">
                    <div style="font-size: 1rem; font-weight: bold; margin-bottom: 5px;">
                        RCQ: <span id="rcq-display">--</span>
                    </div>
                    <div id="rcq-class" style="font-size: 0.9rem;"></div>
                </div>
            </div>

            <div class="exam-section">
                <h3>3. Membros (Comparativo)</h3>

                <div style="margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; align-items: end;">
                        <div>
                            <label>Braço</label>
                            <select id="braco_lado_1" style="width: 100%; height: var(--touch-target); border: 1px solid #ced4da; border-radius: 6px; background: white;">
                                <option value="D">Direito (MSD)</option>
                                <option value="E">Esquerdo (MSE)</option>
                            </select>
                        </div>
                        <div>
                            <input type="number" id="braco_val_1" placeholder="cm">
                        </div>
                    </div>

                    <div id="btn-add-braco" style="margin-top: 10px; cursor: pointer; color: var(--primary-blue); font-size: 0.9rem; font-weight: 600; padding: 5px 0;">
                        + Medir contralateral
                    </div>

                    <div id="container-braco-2" class="conditional-field" style="margin-top: 10px; padding: 0; background: none; border: none;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr 40px; gap: 15px; align-items: center;">
                            <div style="font-weight: 600; color: #555; padding-left: 5px;">
                                <span id="lbl-braco-2">Esquerdo (MSE)</span>
                            </div>
                            <input type="number" id="braco_val_2" placeholder="cm">
                            
                            <button id="btn-remove-braco" style="height: 40px; border: 1px solid #ffcdd2; background: #ffebee; color: #c62828; border-radius: 6px; cursor: pointer; font-weight: bold;">✕</button>
                        </div>
                    </div>
                </div>

                <div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; align-items: end;">
                        <div>
                            <label>Panturrilha</label>
                            <select id="pant_lado_1" style="width: 100%; height: var(--touch-target); border: 1px solid #ced4da; border-radius: 6px; background: white;">
                                <option value="D">Direita (MID)</option>
                                <option value="E">Esquerda (MIE)</option>
                            </select>
                        </div>
                        <div>
                            <input type="number" id="pant_val_1" placeholder="cm">
                        </div>
                    </div>

                    <div id="btn-add-pant" style="margin-top: 10px; cursor: pointer; color: var(--primary-blue); font-size: 0.9rem; font-weight: 600; padding: 5px 0;">
                        + Medir contralateral
                    </div>

                    <div id="container-pant-2" class="conditional-field" style="margin-top: 10px; padding: 0; background: none; border: none;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr 40px; gap: 15px; align-items: center;">
                            <div style="font-weight: 600; color: #555; padding-left: 5px;">
                                <span id="lbl-pant-2">Esquerda (MIE)</span>
                            </div>
                            <input type="number" id="pant_val_2" placeholder="cm">
                            
                            <button id="btn-remove-pant" style="height: 40px; border: 1px solid #ffcdd2; background: #ffebee; color: #c62828; border-radius: 6px; cursor: pointer; font-weight: bold;">✕</button>
                        </div>
                    </div>
                </div>

            </div>
        `;
    },

    init() {
        // 1. Mapeamento
        const els = {
            peso: document.getElementById('peso'),
            altura: document.getElementById('altura'),
            imcDisplay: document.getElementById('imc-display'),
            imcClass: document.getElementById('imc-class'),
            
            abd: document.getElementById('circ_abd'),
            abdFeedback: document.getElementById('abd-feedback'),
            cintura: document.getElementById('circ_cintura'),
            quadril: document.getElementById('circ_quadril'),
            rcqContainer: document.getElementById('rcq-container'),
            rcqDisplay: document.getElementById('rcq-display'),
            rcqClass: document.getElementById('rcq-class'),
            
            // Membros - Braço
            bracoLado1: document.getElementById('braco_lado_1'),
            bracoVal1: document.getElementById('braco_val_1'),
            bracoVal2: document.getElementById('braco_val_2'),
            lblBraco2: document.getElementById('lbl-braco-2'),
            btnBraco: document.getElementById('btn-add-braco'),
            btnRemBraco: document.getElementById('btn-remove-braco'), // Novo
            contBraco2: document.getElementById('container-braco-2'),

            // Membros - Panturrilha
            pantLado1: document.getElementById('pant_lado_1'),
            pantVal1: document.getElementById('pant_val_1'),
            pantVal2: document.getElementById('pant_val_2'),
            lblPant2: document.getElementById('lbl-pant-2'),
            btnPant: document.getElementById('btn-add-pant'),
            btnRemPant: document.getElementById('btn-remove-pant'), // Novo
            contPant2: document.getElementById('container-pant-2'),
        };

        // 2. Restauração
        this.restoreValues(els);
        const generoSalvo = GlobalState.get('antropo_genero');
        if (generoSalvo === 'Homem') document.getElementById('btn-homem').classList.add('selected');
        if (generoSalvo === 'Mulher') document.getElementById('btn-mulher').classList.add('selected');

        // 3. Atualização de Estado
        const updateAll = () => {
            GlobalState.set('antropo_peso', els.peso.value);
            GlobalState.set('antropo_altura_cm', els.altura.value);
            GlobalState.set('antropo_abd', els.abd.value);
            GlobalState.set('antropo_cintura', els.cintura.value);
            GlobalState.set('antropo_quadril', els.quadril.value);
            
            // Salva estado dos membros
            GlobalState.set('antropo_braco_l1', els.bracoLado1.value);
            GlobalState.set('antropo_braco_v1', els.bracoVal1.value);
            GlobalState.set('antropo_braco_v2', els.bracoVal2.value);
            
            GlobalState.set('antropo_pant_l1', els.pantLado1.value);
            GlobalState.set('antropo_pant_v1', els.pantVal1.value);
            GlobalState.set('antropo_pant_v2', els.pantVal2.value);

            this.calcIMC(els);
            this.calcRiscoAbdominal(els);
            this.calcRCQ(els);
        };

        // Listeners básicos
        Object.values(els).forEach(el => {
            if(el && (el.tagName === 'INPUT' || el.tagName === 'SELECT')) el.addEventListener('input', updateAll);
        });

        // --- LÓGICA DE UI PARA BRAÇO (ADD/REMOVE) ---
        const updateBracoLabel = () => {
            const lado1 = els.bracoLado1.value;
            els.lblBraco2.textContent = (lado1 === 'D') ? 'Esquerdo (MSE)' : 'Direito (MSD)';
        };
        els.bracoLado1.addEventListener('change', updateBracoLabel);

        // Adicionar Braço
        els.btnBraco.addEventListener('click', () => {
            els.contBraco2.classList.add('visible');
            els.btnBraco.style.display = 'none';
            GlobalState.set('antropo_braco_dual', true);
            updateBracoLabel();
        });

        // Remover Braço (NOVO)
        els.btnRemBraco.addEventListener('click', () => {
            els.contBraco2.classList.remove('visible');
            els.btnBraco.style.display = 'block'; // Mostra botão adicionar
            els.bracoVal2.value = ''; // Limpa valor
            
            // Atualiza Estado
            GlobalState.set('antropo_braco_dual', false);
            GlobalState.set('antropo_braco_v2', '');
        });


        // --- LÓGICA DE UI PARA PANTURRILHA (ADD/REMOVE) ---
        const updatePantLabel = () => {
            const lado1 = els.pantLado1.value;
            els.lblPant2.textContent = (lado1 === 'D') ? 'Esquerda (MIE)' : 'Direita (MID)';
        };
        els.pantLado1.addEventListener('change', updatePantLabel);

        // Adicionar Panturrilha
        els.btnPant.addEventListener('click', () => {
            els.contPant2.classList.add('visible');
            els.btnPant.style.display = 'none';
            GlobalState.set('antropo_pant_dual', true);
            updatePantLabel();
        });

        // Remover Panturrilha (NOVO)
        els.btnRemPant.addEventListener('click', () => {
            els.contPant2.classList.remove('visible');
            els.btnPant.style.display = 'block'; // Mostra botão adicionar
            els.pantVal2.value = ''; // Limpa valor
            
            // Atualiza Estado
            GlobalState.set('antropo_pant_dual', false);
            GlobalState.set('antropo_pant_v2', '');
        });


        // Restaura visibilidade se foi ativado antes
        if (GlobalState.get('antropo_braco_dual')) {
            els.contBraco2.classList.add('visible');
            els.btnBraco.style.display = 'none';
            updateBracoLabel();
        }
        if (GlobalState.get('antropo_pant_dual')) {
            els.contPant2.classList.add('visible');
            els.btnPant.style.display = 'none';
            updatePantLabel();
        }

        GlobalState.subscribe((state) => {
            if (state.lastUpdatedKey === 'antropo_genero') {
                this.calcRiscoAbdominal(els);
                this.calcRCQ(els);
            }
        });

        updateAll();
    },

    restoreValues(els) {
        els.peso.value = GlobalState.get('antropo_peso') || '';
        els.altura.value = GlobalState.get('antropo_altura_cm') || '';
        els.abd.value = GlobalState.get('antropo_abd') || '';
        els.cintura.value = GlobalState.get('antropo_cintura') || '';
        els.quadril.value = GlobalState.get('antropo_quadril') || '';
        
        els.bracoLado1.value = GlobalState.get('antropo_braco_l1') || 'D';
        els.bracoVal1.value = GlobalState.get('antropo_braco_v1') || '';
        els.bracoVal2.value = GlobalState.get('antropo_braco_v2') || '';
        
        els.pantLado1.value = GlobalState.get('antropo_pant_l1') || 'D';
        els.pantVal1.value = GlobalState.get('antropo_pant_v1') || '';
        els.pantVal2.value = GlobalState.get('antropo_pant_v2') || '';
    },

    // --- CÁLCULOS (UI Visual) ---
    calcIMC(els) {
        const p = parseFloat(els.peso.value);
        const a = parseFloat(els.altura.value) / 100;
        if (p && a) {
            const imc = (p / (a * a)).toFixed(1);
            els.imcDisplay.textContent = imc + ' kg/m²';
            let c = '';
            if (imc < 18.5) c = '(Baixo peso)';
            else if (imc < 25) c = '(Eutrófico)';
            else if (imc < 30) c = '(Sobrepeso)';
            else c = '(Obesidade)';
            els.imcClass.textContent = c;
            GlobalState.set('antropo_imc_val', imc);
        } else {
            els.imcDisplay.textContent = '--';
            els.imcClass.textContent = '';
        }
    },

    calcRiscoAbdominal(els) {
        const abd = parseFloat(els.abd.value);
        const genero = GlobalState.get('antropo_genero');
        if (!abd || !genero) {
            els.abdFeedback.textContent = '';
            return;
        }
        const limite = (genero === 'Homem') ? 102 : 88;
        if (abd > limite) {
            els.abdFeedback.textContent = `Aumentado (> ${limite}cm)`;
            els.abdFeedback.style.color = '#dc3545';
        } else {
            els.abdFeedback.textContent = `Adequado (<= ${limite}cm)`;
            els.abdFeedback.style.color = '#28a745';
        }
    },

    calcRCQ(els) {
        const c = parseFloat(els.cintura.value);
        const q = parseFloat(els.quadril.value);
        const genero = GlobalState.get('antropo_genero');

        if (c > 0 && q > 0 && genero) {
            const rcq = (c / q).toFixed(2);
            els.rcqContainer.style.display = 'block';
            els.rcqDisplay.textContent = rcq;

            let risco = '';
            let cor = '#28a745';

            if (genero === 'Homem') {
                if (rcq > 0.95) { risco = 'Alto'; cor = '#dc3545'; }
                else if (rcq >= 0.90) { risco = 'Moderado'; cor = '#ffc107'; }
                else { risco = 'Baixo (Ideal)'; cor = '#28a745'; }
            } else {
                if (rcq > 0.85) { risco = 'Alto'; cor = '#dc3545'; }
                else if (rcq >= 0.80) { risco = 'Moderado'; cor = '#ffc107'; }
                else { risco = 'Baixo (Ideal)'; cor = '#28a745'; }
            }

            els.rcqClass.textContent = `Risco: ${risco}`;
            els.rcqContainer.style.borderLeftColor = cor;
            GlobalState.set('antropo_rcq_val', rcq);
        } else {
            els.rcqContainer.style.display = 'none';
        }
    },

    // --- GERAÇÃO DE TEXTO ---
    generateText() {
        const s = GlobalState.getAll();
        
        const hasData = s.antropo_peso || s.antropo_abd || s.antropo_braco_v1 || s.antropo_cintura;
        if (!hasData) return '';

        let t = `ANTROPOMETRIA:\n`;
        
        if (s.antropo_peso && s.antropo_altura_cm) {
            t += `- Peso: ${s.antropo_peso}kg | Altura: ${s.antropo_altura_cm}cm | IMC: ${s.antropo_imc_val}kg/m².\n`;
        } else if (s.antropo_peso) {
            t += `- Peso: ${s.antropo_peso}kg.\n`;
        }

        let circs = [];
        if (s.antropo_abd) circs.push(`Abdominal: ${s.antropo_abd}cm`);
        if (s.antropo_cintura) circs.push(`Cintura: ${s.antropo_cintura}cm`);
        if (s.antropo_quadril) circs.push(`Quadril: ${s.antropo_quadril}cm`);
        
        // Texto Braço
        if (s.antropo_braco_v1) {
            const l1 = s.antropo_braco_l1;
            const v1 = s.antropo_braco_v1;
            // Verifica dual e se tem valor
            if (s.antropo_braco_dual && s.antropo_braco_v2) {
                const l2 = (l1 === 'D') ? 'E' : 'D';
                const v2 = s.antropo_braco_v2;
                circs.push(`Braço ${l1}: ${v1}cm, Braço ${l2}: ${v2}cm`);
            } else {
                circs.push(`Braço ${l1}: ${v1}cm`);
            }
        }

        // Texto Panturrilha
        if (s.antropo_pant_v1) {
            const l1 = s.antropo_pant_l1;
            const v1 = s.antropo_pant_v1;
            // Verifica dual e se tem valor
            if (s.antropo_pant_dual && s.antropo_pant_v2) {
                const l2 = (l1 === 'D') ? 'E' : 'D';
                const v2 = s.antropo_pant_v2;
                circs.push(`Panturrilha ${l1}: ${v1}cm, Panturrilha ${l2}: ${v2}cm`);
            } else {
                circs.push(`Panturrilha ${l1}: ${v1}cm`);
            }
        }

        if (circs.length > 0) t += `- Circunferências: ${circs.join('; ')}.\n`;
        if (s.antropo_rcq_val) t += `- RCQ: ${s.antropo_rcq_val}.`;

        return t;
    }
};