/* static/js/components/Forms.js */
import { el } from '../utils/dom.js';

export const Forms = {
    /**
     * Helper para envolver campo com label
     * @param {string|HTMLElement} label - Texto ou elemento do label (opcional)
     * @param {HTMLElement} element - Elemento do formulário
     * @param {string} className - Classes adicionais do wrapper (padrão: 'input-group')
     */
    _wrapField(label, element, className = 'input-group') {
        const wrapper = el('div', { className });
        if (label) {
            if (typeof label === 'string') {
                wrapper.appendChild(el('label', { text: label }));
            } else if (label instanceof HTMLElement) {
                wrapper.appendChild(label);
            }
        }
        wrapper.appendChild(element);
        return wrapper;
    },

    input({ id, label, value, placeholder, type = 'text', suffix, onChange, className = '' }) {
        const inputContainer = el('div', { className: suffix ? 'input-wrapper' : '' });
        const input = el('input', {
            id, type, value: value || '', placeholder: placeholder || '',
            className, enterkeyhint: 'done',
            onkeydown: (e) => { if (e.key === 'Enter') { e.preventDefault(); input.blur(); } },
            oninput: (e) => onChange?.(e.target.value)
        });

        inputContainer.appendChild(input);
        if (suffix) inputContainer.appendChild(el('span', { className: 'input-suffix', text: suffix }));
        
        return { 
            element: this._wrapField(label, inputContainer),
            input 
        };
    },
    
    select({ id, label, value, options, onChange }) {
        const select = el('select', {
            id, value,
            onchange: (e) => onChange?.(e.target.value)
        }, options.map(opt => el('option', { value: opt.value, text: opt.text, selected: opt.value === value })));
        
        return { 
            element: this._wrapField(label, select),
            select 
        };
    },

    switch({ id, label, checked = false, onChange }) {
        const checkbox = el('input', { type: 'checkbox', id, checked, onchange: (e) => onChange?.(e.target.checked) });
        
        return this._wrapField(
            el('span', { style: 'font-weight: 500;', text: label }),
            el('label', { className: 'switch' }, [checkbox, el('span', { className: 'slider round' })]),
            'input-group' + ' flex-row' // Adicionado classe flex
        );
    },

    slider({ id, label, min = 0, max = 100, step = 1, value, onChange }) {
        const input = el('input', {
            id, 
            type: 'range', 
            className: 'range-slider',
            min, max, step, 
            value: value || min,
            oninput: (e) => onChange?.(e.target.value)
        });

        return { 
            element: this._wrapField(label, input),
            input 
        };
    }
};