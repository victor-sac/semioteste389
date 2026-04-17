/* static/js/components/Feedback.js */
import { el } from '../utils/dom.js';
import { PopoverManager } from './PopoverManager.js';

let globalPopoverManager = null;

export const Feedback = {
    // Inicializa o PopoverManager global (chamado uma vez no app)
    setPopoverContainer(container) {
        if (!globalPopoverManager) {
            globalPopoverManager = new PopoverManager(container);
        }
    },

    create({ id = '', text = '', referenceRule = null, type = '', onErrorClick = null } = {}) {
        let pill = el('span', { id, className: 'status-pill', text });
        const feedbackContainer = el('div', { className: 'feedback-container' }, pill);
        let currentReferenceRule = referenceRule;
        let currentType = type;
        let currentErrorCallback = onErrorClick;
        let hasClickListener = false;

        const feedbackObj = {
            element: feedbackContainer,
            get pill() { return feedbackContainer.querySelector('span'); },
            referenceRule: referenceRule,
            type: type,
            
            update(message, status = 'normal', refRule = null, updateType = null, errorCallback = null) {
                const currentPill = this.pill;
                
                if (message) {
                    currentPill.textContent = message;
                    currentPill.className = `status-pill active status-${status}`;
                    
                    // Atualizar referências
                    if (updateType) currentType = updateType;
                    if (refRule) {
                        currentReferenceRule = refRule;
                        feedbackObj.referenceRule = refRule;
                        feedbackObj.type = updateType || currentType;
                    }
                    
                    // Atualizar callback de erro (apenas para erros)
                    if (status === 'error') {
                        currentErrorCallback = errorCallback;
                    } else {
                        currentErrorCallback = null;
                    }
                    
                    // Determinar se é clicável
                    const isClickable = (status === 'error' && currentErrorCallback) || 
                                       (status !== 'error' && currentReferenceRule && globalPopoverManager);
                    
                    if (isClickable) {
                        currentPill.classList.add('clickable');
                        currentPill.style.cursor = 'pointer';
                        
                        // Adicionar listener apenas uma vez
                        if (!hasClickListener) {
                            currentPill.addEventListener('click', (e) => {
                                e.stopPropagation();
                                
                                if (status === 'error' && currentErrorCallback) {
                                    currentErrorCallback();
                                } else if (globalPopoverManager && currentReferenceRule) {
                                    feedbackObj._togglePopover(currentPill);
                                }
                            });
                            hasClickListener = true;
                        }
                    } else {
                        currentPill.classList.remove('clickable');
                        currentPill.style.cursor = 'default';
                    }
                } else {
                    currentPill.textContent = '';
                    currentPill.className = 'status-pill';
                    currentPill.classList.remove('clickable');
                    currentPill.style.cursor = 'default';
                    currentReferenceRule = null;
                    currentType = null;
                    currentErrorCallback = null;
                }
            },

            _togglePopover(trigger) {
                globalPopoverManager.toggle(trigger, () => feedbackObj._createReferencePopover());
            },

            _createReferencePopover() {
                const rule = currentReferenceRule;
                if (!rule) return el('div');

                const popover = el('div', { className: 'reference-popover' });
                
                // Cabeçalho com título e botão de fechar
                const header = el('div');
                header.style.display = 'flex';
                header.style.justifyContent = 'space-between';
                header.style.alignItems = 'center';
                header.style.marginBottom = '12px';
                
                const title = el('h5', { className: 'popover-title', text: 'Valores de Referência' });
                title.style.margin = '0';
                header.appendChild(title);
                
                // Botão X para fechar
                const closeBtn = el('button');
                closeBtn.textContent = '×';
                closeBtn.style.background = 'none';
                closeBtn.style.border = 'none';
                closeBtn.style.fontSize = '24px';
                closeBtn.style.cursor = 'pointer';
                closeBtn.style.color = '#999';
                closeBtn.style.padding = '0 4px';
                closeBtn.style.lineHeight = '1';
                closeBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (globalPopoverManager) globalPopoverManager.close();
                };
                header.appendChild(closeBtn);
                
                popover.appendChild(header);

                // Conteúdo
                const content = el('div', { className: 'popover-content' });

                // Se é um percentil pediátrico, mostrar de forma especial
                if (rule.pediatricPercentiles) {
                    const { sistolica, diastolica, ageYears, sexo, altura } = rule.pediatricPercentiles;
                    
                    // Cabeçalho com dados do paciente
                    const patientInfo = el('div', { className: 'reference-item', text: `${sexo === 'Masculino' ? '♂' : '♀'} ${ageYears} anos • ${altura} cm` });
                    patientInfo.style.fontSize = '0.85em';
                    patientInfo.style.color = '#666';
                    patientInfo.style.marginBottom = '8px';
                    patientInfo.style.borderBottom = '1px solid #e0e0e0';
                    patientInfo.style.paddingBottom = '6px';
                    patientInfo.style.gridColumn = '1 / -1';
                    content.appendChild(patientInfo);

                    // Container para PAS (Sistólica) - esquerda
                    const pasColumn = el('div', { className: 'pediatric-column' });
                    
                    const sistTitle = el('div', { className: 'reference-item', text: 'Sistólica (PAS)' });
                    sistTitle.style.fontWeight = 'bold';
                    sistTitle.style.marginTop = '0';
                    sistTitle.style.fontSize = '0.95em';
                    pasColumn.appendChild(sistTitle);

                    pasColumn.appendChild(el('div', { className: 'reference-item', text: `P50: ${sistolica.p50} mmHg` }));
                    pasColumn.appendChild(el('div', { className: 'reference-item', text: `P90: ${sistolica.p90} mmHg` }));
                    pasColumn.appendChild(el('div', { className: 'reference-item', text: `P95: ${sistolica.p95} mmHg` }));
                    pasColumn.appendChild(el('div', { className: 'reference-item', text: `P95+12: ${sistolica.p95_12} mmHg` }));
                    
                    content.appendChild(pasColumn);

                    // Container para PAD (Diastólica) - direita
                    const padColumn = el('div', { className: 'pediatric-column' });
                    
                    const diastTitle = el('div', { className: 'reference-item', text: 'Diastólica (PAD)' });
                    diastTitle.style.fontWeight = 'bold';
                    diastTitle.style.marginTop = '0';
                    diastTitle.style.fontSize = '0.95em';
                    padColumn.appendChild(diastTitle);

                    padColumn.appendChild(el('div', { className: 'reference-item', text: `P50: ${diastolica.p50} mmHg` }));
                    padColumn.appendChild(el('div', { className: 'reference-item', text: `P90: ${diastolica.p90} mmHg` }));
                    padColumn.appendChild(el('div', { className: 'reference-item', text: `P95: ${diastolica.p95} mmHg` }));
                    padColumn.appendChild(el('div', { className: 'reference-item', text: `P95+12: ${diastolica.p95_12} mmHg` }));
                    
                    content.appendChild(padColumn);
                }
                // Se tem regras de idade (FC, FR)
                else if (rule.regras && rule.regras.length > 0) {
                    // Mostra apenas a regra aplicável ao paciente
                    const displayRule = rule.applicableRule || rule.regras[0];
                    
                    const item = el('div', { className: 'reference-item' });
                    item.textContent = `${displayRule.ref}: ${displayRule.min}-${displayRule.max} ${rule.unit || ''}`;
                    item.style.fontSize = '0.9em';
                    item.style.fontWeight = '500';
                    content.appendChild(item);
                }
                // Se é um sinal vital com min/max
                else if (rule.min !== undefined || rule.max !== undefined) {
                    const items = [];
                    if (rule.max !== undefined) items.push(`Máximo: ${rule.max} ${rule.unit || ''}`);
                    if (rule.min !== undefined) items.push(`Mínimo: ${rule.min} ${rule.unit || ''}`);
                    
                    items.forEach(item => {
                        content.appendChild(el('div', { className: 'reference-item', text: item }));
                    });
                }

                // Se é pressão arterial com ranges
                if (rule.isAdultPA && rule.sistolica && rule.diastolica) {
                    // PA adulta com sistolica/diastolica
                    const sistTitle = el('div', { className: 'reference-item', text: 'Sistólica' });
                    sistTitle.style.fontWeight = 'bold';
                    sistTitle.style.marginTop = '8px';
                    sistTitle.style.gridColumn = '1 / -1';
                    content.appendChild(sistTitle);

                    (rule.sistolica || []).forEach(range => {
                        const text = `${range.label}: ${range.min}-${range.max}`;
                        content.appendChild(el('div', { className: 'reference-item', text }));
                    });

                    const diastTitle = el('div', { className: 'reference-item', text: 'Diastólica' });
                    diastTitle.style.fontWeight = 'bold';
                    diastTitle.style.marginTop = '8px';
                    diastTitle.style.gridColumn = '1 / -1';
                    content.appendChild(diastTitle);

                    (rule.diastolica || []).forEach(range => {
                        const text = `${range.label}: ${range.min}-${range.max}`;
                        content.appendChild(el('div', { className: 'reference-item', text }));
                    });
                }
                else if (rule.ranges && !rule.pediatricPercentiles) {
                    rule.ranges.forEach(range => {
                        const text = range.min === 0 && range.max === 59 
                            ? `${range.label}`
                            : `${range.label}: ${range.min}-${range.max} ${rule.unit || ''}`;
                        content.appendChild(el('div', { className: 'reference-item', text }));
                    });
                }

                popover.appendChild(content);
                return popover;
            },

            clear() {
                const currentPill = this.pill;
                currentPill.textContent = '';
                currentPill.className = 'status-pill';
                currentPill.classList.remove('clickable');
                currentPill.style.cursor = 'default';
                currentReferenceRule = null;
                currentType = null;
                if (globalPopoverManager) globalPopoverManager.close();
            }
        };

        return feedbackObj;
    }
};