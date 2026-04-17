/* static/js/components/Pill.js */
import { el, icon } from '../utils/dom.js';

export const Pill = {
    // Pílula básica (só o input)
    create: ({ iconName, inputConfig, onInput, containerClass = '', inputClass = '' }) => {
        const input = el('input', {
            type: 'number',
            className: `pill-input ${inputClass}`.trim(),
            inputmode: 'decimal',
            enterkeyhint: 'done',
            ...inputConfig,
            oninput: (e) => onInput?.(e.target.value),
            onkeydown: (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    input.blur();
                }
            }
        });

        const children = [];
        if (iconName) {
            const iconEl = icon(iconName);
            iconEl.classList.add('pill-icon');
            children.push(iconEl);
        }
        
        children.push(input);
        
        if (inputConfig?.suffix) {
            children.push(el('span', { className: 'pill-separator', text: inputConfig.suffix }));
        }

        const container = el('div', { className: `pill-container ${containerClass}`.trim() }, children);
        return { element: container, input };
    },

    // Pílula com Label em cima
    createLabeled: ({ labelText, labelHtml, iconName, inputConfig, onInput, containerClass = '', wrapperClass = '' }) => {
        const wrapper = el('div', { className: `pill-wrapper ${wrapperClass}`.trim() });
        
        const labelProps = { className: 'pill-label' };
        if (labelHtml) labelProps.html = labelHtml; // Suporte para o span da unidade do Sinais Vitais
        else labelProps.text = labelText;
        
        const label = el('label', labelProps);
        const pill = Pill.create({ iconName, inputConfig, onInput, containerClass });

        wrapper.appendChild(label);
        wrapper.appendChild(pill.element);

        // Retorna o input para fácil acesso do value posteriormente
        return { element: wrapper, input: pill.input };
    }
};