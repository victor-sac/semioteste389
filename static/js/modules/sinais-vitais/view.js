/* static/js/modules/sinais-vitais/view.js */
import { el, icon, ui } from '../../utils/dom.js';
import { Forms } from '../../components/Forms.js';
import { Card } from '../../components/Card.js';
import { MeasureList } from '../../components/MeasureList.js';
import { Feedback } from '../../components/Feedback.js';
import { Pill } from '../../components/Pill.js';

export const SinaisView = {
    create({ onUpdatePA, onSavePA, onRemoveHistory, onClearHistory, onUpdateSignal, onUpdateDetails }) {
        const container = el('div');
        
        // Inicializa o popover manager para feedback
        Feedback.setPopoverContainer(container);
        
        const feedbackPA = Feedback.create({ id: 'feedback-pa-pill' });

        // --- Seção PA (Usando as Pílulas) ---
        const pasPill = Pill.createLabeled({
            labelHtml: 'Sistólica <span class="pa-unit">(mmHg)</span>',
            inputConfig: { id: 'sinais-pas', placeholder: 'PAS' },
            onInput: onUpdatePA,
            containerClass: 'pa-pill' // Classe que deixa grossa e curta
        });

        const padPill = Pill.createLabeled({
            labelHtml: 'Diastólica <span class="pa-unit">(mmHg)</span>',
            inputConfig: { id: 'sinais-pad', placeholder: 'PAD' },
            onInput: onUpdatePA,
            containerClass: 'pa-pill'
        });
        
        const gridPA = el('div', { className: 'pa-pills-row' }, [
            pasPill.element,
            padPill.element
        ]);

        // --- Detalhes (Membro/Posição) ---
        const selMembro = Forms.select({ 
            id: 'pa-membro', label: 'Membro', 
            options: [ 
                {value:'MSE', text:'Braço Esquerdo'}, 
                {value:'MSD', text:'Braço Direito'},
                {value:'MIE', text:'Coxa Esquerda'}, 
                {value:'MID', text:'Coxa Direita'}
            ],
            onChange: () => onUpdateDetails(getDetails())
        });

        const selPosicao = Forms.select({ 
            id: 'pa-posicao', label: 'Posição', 
            options: [ 
                {value:'Sentado', text:'Sentado'}, 
                {value:'Deitado', text:'Deitado'},
                {value:'Em pé', text:'Em pé'}
            ],
            onChange: () => onUpdateDetails(getDetails())
        });
        
        const getDetails = () => ({ 
            membro: selMembro.select.options[selMembro.select.selectedIndex].text, 
            membroSigla: selMembro.select.value, 
            posicao: selPosicao.select.value 
        });

        const inputTempo = Forms.input({ placeholder: 'Tempo (min)', type: 'number' });
        const btnConfirmarTempo = el('button', { className: 'btn btn-primary full-width', text: 'Salvar' });
        
        const wrapperTempo = el('div', { className: 'tempo-wrapper' }, [
            inputTempo.element,
            btnConfirmarTempo
        ]);

        const btnNovaAfericao = ui.btnActionVertical('restart_alt', 'Nova aferição', 'btn-action-vertical', () => onSavePA({ ...getDetails(), pas: pasPill.input.value, pad: padPill.input.value, tempo: inputTempo.input.value }));

        btnConfirmarTempo.onclick = () => onSavePA({ 
            ...getDetails(), pas: pasPill.input.value, pad: padPill.input.value, tempo: inputTempo.input.value, isConfirming: true 
        });

        const boxDetails = el('div', { className: 'details-box hidden' }, [
            ui.header('Dados Adicionais'),
            el('div', { className: 'details-split' }, [
                el('div', { className: 'details-col-left' }, [ selMembro.element, selPosicao.element ]),
                el('div', { className: 'details-col-right' }, [ btnNovaAfericao, wrapperTempo ])
            ])
        ]);

        const btnToggleDetails = ui.btnLink('+ Mais opções', () => {
            boxDetails.classList.toggle('hidden');
            btnToggleDetails.textContent = boxDetails.classList.contains('hidden') ? '+ Mais opções' : '- Ocultar opções';
            onUpdateDetails(getDetails());
        });

        // Histórico
        const tbody = el('tbody');
        const historyContainer = el('div', { className: 'card hidden', style: 'margin-top:20px' }, [
            el('div', { className: 'card-header' }, [ el('h4', { text: 'Histórico' }), ui.btnIcon('close', 'Limpar', onClearHistory) ]),
            el('div', { style: 'overflow-x:auto' }, el('table', { className: 'history-table' }, [
                el('thead', {}, el('tr', {}, [ el('th', { text: 'Valor' }), el('th', { text: 'Detalhes' }), el('th', { style: 'width:40px' }) ])),
                tbody
            ]))
        ]);

        // Utilização da nova classe .pa-actions-row (código limpo)
        container.appendChild(Card.create({ 
            title: 'Pressão Arterial', 
            children: [ 
                gridPA, 
                el('div', { className: 'pa-actions-row' }, [feedbackPA.element, btnToggleDetails]), 
                boxDetails, 
                historyContainer 
            ] 
        }));

        // --- Lista Sinais ---
        const feedbacks = {};
        const list = MeasureList.create({
            availableItems: [
                { id: 'fc', label: 'Frequência Cardíaca', icon: 'favorite', suffix: 'bpm' },
                { id: 'fr', label: 'Frequência Respiratória', icon: 'air', suffix: 'irpm' },
                { id: 'temp', label: 'Temperatura', icon: 'thermostat', suffix: '°C' },
                { id: 'o2', label: 'Saturação O2', icon: 'bloodtype', suffix: '%' }
            ],
            onItemRemove: (id) => onUpdateSignal(id, null),
            renderItem: (config, cardContent) => {
                const fb = Feedback.create({ id: `fb-${config.id}` });
                feedbacks[config.id] = fb;
                
                // Pílula genérica sem label aproveitando os ícones
                const pillObj = Pill.create({
                    iconName: config.icon, 
                    inputConfig: { placeholder: 'Valor', suffix: config.suffix },
                    onInput: (v) => onUpdateSignal(config.id, v)
                });
                
                const wrapper = el('div', { className: 'pill-wrapper no-label' }, [pillObj.element]);
                
                cardContent.appendChild(wrapper);
                cardContent.appendChild(fb.element);
            }
        });

        container.appendChild(list.element);

        return {
            element: container,
            setPAFeedback: (txt, sts, refRule, type, errorCallback) => feedbackPA.update(txt, sts, refRule, type, errorCallback),
            setSignalFeedback: (id, txt, sts, refRule, type) => feedbacks[id]?.update(txt, sts, refRule, type),
            
            showTimeInput: () => {
                wrapperTempo.classList.add('active');
                btnNovaAfericao.classList.add('hidden');
                inputTempo.input.focus();
            },
            resetTimeInput: () => {
                inputTempo.input.value = '';
                wrapperTempo.classList.remove('active');
                btnNovaAfericao.classList.remove('hidden');
            },

            clearPAInputs: () => { pasPill.input.value = ''; padPill.input.value = ''; feedbackPA.clear(); },
            renderHistory: (hist) => {
                tbody.innerHTML = '';
                historyContainer.classList.toggle('hidden', hist.length === 0);
                [...hist].sort((a,b) => b.id - a.id).forEach(item => {
                    let det = `${item.membroSigla}, ${item.posicao}`;
                    if (item.tempo) det += ` (${item.tempo} min)`; 
                    
                    const row = el('tr', {}, [
                        el('td', { text: `${item.pas}x${item.pad}` }),
                        el('td', { text: det, style: 'color:var(--text-muted);font-size:0.85rem' }),
                        el('td', { style: 'text-align:right' }, ui.btnIcon('delete', 'Apagar', () => onRemoveHistory(item.id)))
                    ]);
                    tbody.appendChild(row);
                });
            }
        };
    }
};