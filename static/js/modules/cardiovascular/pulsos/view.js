/* static/js/modules/cardiovascular/pulsos/view.js */
import { el, icon, ui } from '../../../utils/dom.js';
import { Card } from '../../../components/Card.js';
import { Forms } from '../../../components/Forms.js';
import { PopoverManager } from '../../../components/PopoverManager.js';
import { PulsePointsConfig, SCALE_MAP, calculatePopoverPosition } from './logic.js'; 

const WAVE_TYPES = [
    { id: 'normal', label: 'Normal', fileBase: 'normal', fileDark: 'dark-normal.png' },
    { id: 'parvus', label: 'Parvus et Tardus', fileBase: 'parvus-et-tardus' },
    { id: 'corrigan', label: "Martelo D'água / Corrigan", fileBase: 'corrigan' },
    { id: 'dicrotico', label: 'Dicrótico', fileBase: 'dicrotico' },
    { id: 'bisferiens', label: 'Bisferiens', fileBase: 'bisferiens' },
    { id: 'paradoxal', label: 'Paradoxal', fileBase: 'paradoxal' },
    { id: 'alternante', label: 'Alternante', fileBase: 'alternante' }
];

// --- HELPER DE ACORDEÃO (Atualizado para reportar estado) ---
const createAccordion = (title, contentElement, isOpen = false, onToggle = null) => {
    const btnToggle = el('button', { className: 'accordion-toggle-btn' }, icon('add'));
    
    const header = el('div', { className: 'accordion-header' }, [
        el('h5', { className: 'accordion-title', text: title }),
        btnToggle
    ]);

    const contentContainer = el('div', { className: 'accordion-content' }, [contentElement]);
    const container = el('div', { className: `accordion ${isOpen ? 'open' : ''}` }, [header, contentContainer]);

    header.onclick = () => {
        container.classList.toggle('open');
        const isNowOpen = container.classList.contains('open');
        // Chama o callback passando o novo estado (true/false)
        if (onToggle) onToggle(isNowOpen);
    };
    return container;
};

export const PulsosView = {
    create({ onUpdate }) {
        // ESTADO INICIAL: Agora inclui flags de visibilidade
        // Amplitude começa aberta (true), outros fechados (false)
        const state = { 
            global: '2', individual: {}, 
            ritmo: 'Regular', deficit: null, 
            contorno: 'normal',
            showAmplitude: true, 
            showContorno: false, 
            showRitmo: false 
        };

        const dom = {
            displayValue: el('div', { className: 'pulse-value-display', text: '2+' }),
            displayDesc: el('div', { className: 'pulse-desc-display', text: 'Normal' }),
            mapWrapper: el('div', { className: 'pulse-map-wrapper' }, [
                el('img', { src: '../static/img/modules/cardiovascular/map/pulsos-arteriais-light.png', className: 'pulse-map-img img-light' }),
                el('img', { src: '../static/img/modules/cardiovascular/map/pulsos-arteriais-dark.png', className: 'pulse-map-img img-dark' })
            ]),
            slider: null, btnReset: null
        };

        const getPointValue = (id) => state.individual[id] !== undefined ? String(state.individual[id]) : state.global;
        
        // Notifica o store com todos os dados, incluindo os flags de visibilidade
        const notifyUpdate = () => onUpdate({ 
            ...state, 
            amplitude: state.global, 
            detalhado: state.individual 
        });

        const updateVisuals = () => {
            Array.from(dom.mapWrapper.querySelectorAll('.pulse-hotspot')).forEach(child => {
                const id = child.dataset.id;
                const val = getPointValue(id);
                const info = SCALE_MAP[val];
                child.textContent = info.valueText;
                child.style.backgroundColor = info.colorVar;
                child.style.color = 'white';
                child.classList.toggle('modified', state.individual[id] !== undefined);
            });

            const hasExceptions = Object.keys(state.individual).length > 0;
            const currentInfo = SCALE_MAP[state.global];

            if (hasExceptions) {
                dom.displayValue.textContent = "Variável";
                dom.displayValue.classList.add('is-variable');
                dom.displayDesc.textContent = "Múltiplas amplitudes";
                dom.displayValue.style.color = '';
                dom.slider.element.classList.add('hidden');
                dom.btnReset.classList.remove('hidden');
            } else {
                dom.displayValue.textContent = currentInfo.valueText;
                dom.displayValue.classList.remove('is-variable');
                dom.displayDesc.textContent = currentInfo.desc;
                dom.displayValue.style.color = currentInfo.colorVar;
                dom.slider.element.classList.remove('hidden');
                dom.btnReset.classList.add('hidden');
                dom.slider.input.style.setProperty('--thumb-current-color', currentInfo.colorVar);
            }
        };

        dom.slider = Forms.slider({
            id: 'pulsos-amplitude', min: 0, max: 4, step: 1, value: 2,
            onChange: (val) => { state.global = String(val); state.individual = {}; updateVisuals(); notifyUpdate(); }
        });

        dom.btnReset = el('button', { 
            className: 'btn-reset-pulse hidden',
            onclick: () => { state.individual = {}; state.global = '2'; dom.slider.input.value = '2'; updateVisuals(); notifyUpdate(); },
            title: 'Reiniciar para Normal (2+)'
        }, [icon('restart_alt'), el('span', { text: 'Reiniciar' })]);

        // Popover Manager
        const popoverManager = new PopoverManager(dom.mapWrapper);
        const handleHotspotClick = (config, btn) => {
            popoverManager.toggle(btn, () => {
                const popover = el('div', { className: 'popover' });
                popover.appendChild(el('h5', { className: 'popover-title', text: config.label }));

                const grid = el('div', { className: 'popover-grid' });
                const currentVal = getPointValue(config.id);
                
                Object.keys(SCALE_MAP).forEach(val => {
                    const btn = el('button', { 
                        className: 'btn-option-circle',
                        text: val === '0' ? '0' : val + '+',
                        dataset: { val },
                        onclick: (e) => {
                            e.stopPropagation();
                            if (val === state.global) delete state.individual[config.id];
                            else state.individual[config.id] = val;
                            updateVisuals(); notifyUpdate(); popoverManager.close();
                        }
                    });
                    if (val === currentVal) btn.classList.add('selected');
                    grid.appendChild(btn);
                });

                popover.appendChild(grid);
                const pos = calculatePopoverPosition(config);
                Object.assign(popover.style, pos);
                return popover;
            });
        };

        PulsePointsConfig.forEach(p => {
            const btn = el('div', { 
                className: 'pulse-hotspot', style: `top: ${p.top}%; left: ${p.left}%;`, 
                title: p.label, dataset: { id: p.id }, 
                onclick: (e) => { e.stopPropagation(); handleHotspotClick(p, btn); } 
            });
            dom.mapWrapper.appendChild(btn);
        });

        const btnCloseModal = el('button', { className: 'btn-close-modal' }, icon('close'));
        const modalOverlay = el('div', { 
            className: 'modal-overlay',
            onclick: (e) => { 
                if (e.target === modalOverlay) { popoverManager.close(); modalOverlay.classList.remove('open'); document.body.style.overflow = ''; }
            }
        }, el('div', { className: 'modal-content', onclick: () => popoverManager.close() }, [btnCloseModal, dom.mapWrapper]));

        btnCloseModal.onclick = () => { modalOverlay.classList.remove('open'); document.body.style.overflow = ''; popoverManager.close(); };
        document.body.appendChild(modalOverlay);

        const btnOpenMap = ui.btnTextIcon('Mapa de Pulsos', 'navigate_next', 'btn-pulse-map', () => { 
            updateVisuals(); modalOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; 
        });
        
        updateVisuals();

        // 1. CONTEÚDO AMPLITUDE
        const amplitudeContent = el('div', {}, [
            el('div', { className: 'pulse-feedback-container' }, [dom.displayValue, dom.displayDesc]),
            dom.slider.element,
            el('div', { className: 'pulse-buttons-row' }, [ dom.btnReset, btnOpenMap ])
        ]);

        // 2. CONTEÚDO RITMICIDADE
        const btnRegular = el('button', { text: 'Regular', className: 'btn-selectable selected', onclick: () => setRitmo('Regular') });
        const btnIrregular = el('button', { text: 'Irregular', className: 'btn-selectable', onclick: () => setRitmo('Irregular') });

        const setRitmo = (val) => {
            state.ritmo = val;
            const isIrregular = val === 'Irregular';
            btnRegular.classList.toggle('selected', !isIrregular);
            btnIrregular.classList.toggle('selected', isIrregular);
            btnAddDeficit.classList.toggle('hidden', !isIrregular);
            // Limpar déficit se voltar para Regular
            if (!isIrregular) {
                containerDeficitInput.classList.add('hidden');
                inputDeficit.input.value = '';
                state.deficit = null;
            }
            notifyUpdate();
        };

        const inputDeficit = Forms.input({ 
            label: 'Déficit de Pulso', type: 'number', placeholder: 'Ex: 10', suffix: 'bpm', 
            onChange: (v) => { state.deficit = v; notifyUpdate(); } 
        });
        const containerDeficitInput = el('div', { className: 'deficit-input-wrapper hidden' }, [ inputDeficit.element ]);
        const btnAddDeficit = el('div', { className: 'hidden' });
        
        const toggleDeficitInput = (showInput) => {
            if (showInput) { btnAddDeficit.classList.add('hidden'); containerDeficitInput.classList.remove('hidden'); inputDeficit.input.focus(); } 
            else { containerDeficitInput.classList.add('hidden'); btnAddDeficit.classList.remove('hidden'); inputDeficit.input.value = ''; state.deficit = null; notifyUpdate(); }
        };
        
        btnAddDeficit.innerHTML = '';
        btnAddDeficit.appendChild(ui.btnLink('+ Adicionar déficit de pulso', () => toggleDeficitInput(true)));

        const ritmicidadeContent = el('div', {}, [
            el('div', { className: 'ritmo-options-row' }, [ btnRegular, btnIrregular ]),
            el('div', { className: 'deficit-section' }, [ btnAddDeficit, containerDeficitInput ])
        ]);

        // 3. CONTEÚDO CONTORNO (Carrossel)
        let currentWaveIndex = 0;
        const waveLabel = el('div', { className: 'wave-label', text: WAVE_TYPES[0].label });
        const imgLight = el('img', { className: 'wave-img img-light', src: '' });
        const imgDark = el('img', { className: 'wave-img img-dark', src: '' });
        
        const updateCarousel = () => {
            const wave = WAVE_TYPES[currentWaveIndex];
            state.contorno = wave.id;
            waveLabel.textContent = wave.label;
            const fileLight = `${wave.fileBase}-light.png`;
            const fileDark = wave.fileDark ? wave.fileDark : `${wave.fileBase}-dark.png`;
            imgLight.src = `../static/img/modules/cardiovascular/waves/light/${fileLight}`;
            imgDark.src = `../static/img/modules/cardiovascular/waves/dark/${fileDark}`;
            notifyUpdate();
        };

        const btnPrev = el('button', { className: 'btn-carousel', onclick: () => { 
            currentWaveIndex = (currentWaveIndex - 1 + WAVE_TYPES.length) % WAVE_TYPES.length; updateCarousel();
        }}, icon('chevron_left'));

        const btnNext = el('button', { className: 'btn-carousel', onclick: () => { 
            currentWaveIndex = (currentWaveIndex + 1) % WAVE_TYPES.length; updateCarousel();
        }}, icon('chevron_right'));

        updateCarousel();
        const contornoContent = el('div', { className: 'wave-carousel' }, [
            btnPrev,
            el('div', { className: 'wave-display' }, [
                el('div', { className: 'wave-image-wrapper' }, [imgLight, imgDark]),
                waveLabel
            ]),
            btnNext
        ]);

        // MONTAGEM FINAL COM CALLBACKS DE VISIBILIDADE
        const mainContainer = el('div', { className: 'accordion-container' });
        
        // Amplitude (Inicia Aberto: true)
        mainContainer.appendChild(createAccordion('Amplitude', amplitudeContent, true, (isOpen) => {
            state.showAmplitude = isOpen;
            notifyUpdate();
        }));
        
        // Contorno (Inicia Fechado: false)
        mainContainer.appendChild(createAccordion('Contorno da Onda', contornoContent, false, (isOpen) => {
            state.showContorno = isOpen;
            notifyUpdate();
        }));
        
        // Ritmicidade (Inicia Fechado: false)
        mainContainer.appendChild(createAccordion('Ritmicidade', ritmicidadeContent, false, (isOpen) => {
            state.showRitmo = isOpen;
            if (isOpen) {
                // Ao abrir: sincroniza visibilidade com o estado de ritmo
                btnAddDeficit.classList.toggle('hidden', state.ritmo !== 'Irregular');
            } else {
                // Ao fechar: reseta déficit e sincroniza visibilidade
                toggleDeficitInput(false);
                btnAddDeficit.classList.toggle('hidden', state.ritmo !== 'Irregular');
            }
            notifyUpdate();
        }));

        return Card.create({ title: 'Pulsos Periféricos', children: [mainContainer] });
    }
};