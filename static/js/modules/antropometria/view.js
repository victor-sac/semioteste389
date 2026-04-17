/* static/js/modules/antropometria/view.js */
import { el, ui } from '../../utils/dom.js';
import { Card } from '../../components/Card.js';
import { MeasureList } from '../../components/MeasureList.js';
import { Feedback } from '../../components/Feedback.js';
import { Pill } from '../../components/Pill.js';

// ========================================
// FACTORY FUNCTIONS Lado (Botões de Toggle)
// ========================================

/**
 * Cria botões de seleção de lado (Direito/Esquerdo)
 * @param {function} onToggle - Callback quando botão é clicado
 * @param {string} initialSide - Lado inicial ('D' ou 'E')
 */
const createSideToggleButtons = (onToggle, initialSide = 'D') => {
    const buttons = [];
    const sides = [
        { label: 'Direito', value: 'D' },
        { label: 'Esquerdo', value: 'E' }
    ];

    sides.forEach(side => {
        const btn = el('button', {
            className: `side-toggle-btn ${initialSide === side.value ? 'active' : ''}`,
            type: 'button',
            text: side.label,
            onclick: () => onToggle(side.value, buttons)
        });
        buttons.push(btn);
    });

    return {
        element: el('div', { className: 'side-buttons-container' }, buttons),
        buttons,
        getActive: () => buttons[0].classList.contains('active') ? 'D' : 'E',
        setActive: (value) => {
            buttons.forEach((btn, idx) => {
                if (idx === 0 && value === 'D') btn.classList.add('active');
                else if (idx === 1 && value === 'E') btn.classList.add('active');
                else btn.classList.remove('active');
            });
        }
    };
};

/**
 * Sincroniza o estado de dois grupos de botões
 */
const syncSideButtons = (activeValue, buttons, otherGroup) => {
    if (activeValue === 'D') {
        buttons[0].classList.add('active');
        buttons[1].classList.remove('active');
    } else {
        buttons[1].classList.add('active');
        buttons[0].classList.remove('active');
    }
    if (otherGroup) {
        otherGroup.setActive(activeValue === 'D' ? 'E' : 'D');
    }
};

export const AntropometriaView = {
    create({ onUpdateBasics, onUpdateMeasures }) {
        const container = el('div');
        const feedback = Feedback.create();
        const content = el('div', { className: 'antro-content' });

// ========================================
        // 1. DADOS BÁSICOS (Peso + Altura)
        // ========================================
        const basicsGrid = el('div', { className: 'antro-basics-grid' });
        
        const pesoPill = Pill.createLabeled({
            labelText: 'Peso',
            iconName: 'fitness_center',
            inputConfig: { placeholder: 'Ex: 75', suffix: 'kg' },
            onInput: (v) => onUpdateBasics('peso', v)
        });
        
        const alturaPill = Pill.createLabeled({
            labelText: 'Altura',
            iconName: 'height',
            // ADICIONADO O ID AQUI PARA REFERÊNCIA GLOBAL
            inputConfig: { id: 'input-altura', placeholder: 'Ex: 175', suffix: 'cm' }, 
            onInput: (v) => onUpdateBasics('altura', v)
        });

        basicsGrid.appendChild(pesoPill.element);
        basicsGrid.appendChild(alturaPill.element);

        content.appendChild(basicsGrid);
        content.appendChild(feedback.element);

        container.appendChild(Card.create({ title: 'Dados Básicos', children: [content] }));

        // ========================================
        // 2. LISTA DE MEDIDAS
        // ========================================
        const handleFullUpdate = () => {
            const medidas = [];
            container.querySelectorAll('.measure-row.single, .measure-side-group').forEach(row => {
                const input = row.querySelector('input');
                const activeSideBtn = row.querySelector('.side-toggle-btn.active');
                const lado = activeSideBtn?.textContent.trim() === 'Direito' ? 'D' : 'E' || null;

                if (input?.value && !row.dataset.contra) {
                    medidas.push({
                        id: row.dataset.tipo,
                        nome: row.dataset.nome,
                        valor: input.value,
                        lado: activeSideBtn ? lado : null
                    });
                }
            });
            onUpdateMeasures(medidas);
        };

        const renderRow = (config, containerEl) => {
            const build = (side = null, isContra = false) => {
                // Criação da Pílula via componente global
                const pillObj = Pill.create({
                    iconName: 'straighten',
                    inputConfig: { placeholder: isContra ? 'Valor Contra.' : 'Valor', suffix: 'cm' },
                    onInput: handleFullUpdate
                });

                // Cria um wrapper sem label para envolver a pílula
                const pillWrapper = el('div', { className: 'pill-wrapper no-label' }, [pillObj.element]);

                // ---- Medidas SEM lado (Abdominal, Cintura, Quadril) ----
                if (!config.hasSide) {
                    const row = el('div', {
                        className: 'measure-row single',
                        dataset: { tipo: config.id, nome: config.label }
                    });
                    row.appendChild(pillWrapper);
                    return { row, isBlock: false };
                }

                // ---- Medidas COM lado (Braço, Panturrilha) ----
                const currentSide = side || 'D';
                let sideButtons = null;

                const handleSideToggle = (value, buttons) => {
                    const otherGroup = containerEl.querySelector(
                        isContra ? '.measure-side-group:not([data-contra])' : '.measure-side-group[data-contra]'
                    );

                    syncSideButtons(value, buttons, otherGroup?.sideButtonsObj);
                    handleFullUpdate();
                };

                sideButtons = createSideToggleButtons(handleSideToggle, currentSide);

                const row = el('div', {
                    className: 'measure-side-group',
                    dataset: {
                        tipo: config.id,
                        nome: config.label,
                        ...(isContra && { contra: 'true' })
                    }
                });

                row.sideButtonsObj = sideButtons;

                row.appendChild(pillWrapper);
                row.appendChild(sideButtons.element);

                return {
                    row,
                    getSide: () => sideButtons.getActive(),
                    setSide: (val) => sideButtons.setActive(val),
                    isBlock: true
                };
            };

            const mainRowObj = build();

            if (mainRowObj.isBlock) {
                const sideContainer = el('div', { className: 'measure-side-container' });
                sideContainer.appendChild(mainRowObj.row);
                containerEl.appendChild(sideContainer);

                const btn = ui.btnIconText('add_circle_outline', 'Medir contralateral', 'btn btn-secondary btn-contralateral', () => {
                    const currentSide = mainRowObj.getSide();
                    const contraRowObj = build(currentSide === 'D' ? 'E' : 'D', true);
                    sideContainer.appendChild(contraRowObj.row);
                    btn.remove();
                    handleFullUpdate();
                });

                const btnWrapper = el('div', { className: 'btn-contralateral-wrapper' });
                btnWrapper.appendChild(btn);
                sideContainer.appendChild(btnWrapper);
            } else {
                containerEl.appendChild(mainRowObj.row);
            }
        };

        const list = MeasureList.create({
            availableItems: [
                { id: 'abdominal', label: 'Circunferência Abdominal' },
                { id: 'cintura', label: 'Circunferência da Cintura' },
                { id: 'quadril', label: 'Circunferência do Quadril' },
                { id: 'braco', label: 'Circunferência do Braço', hasSide: true },
                { id: 'panturrilha', label: 'Circunferência da Panturrilha', hasSide: true }
            ],
            onItemRemove: handleFullUpdate,
            renderItem: renderRow
        });

        container.appendChild(list.element);

        return {
            element: container,
            updateIMC: ({ valor, classificacao, status }) => {
                valor ? feedback.update(`IMC: ${valor} • ${classificacao}`, status) : feedback.clear();
            }
        };
    }
};