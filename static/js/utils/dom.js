/* static/js/utils/dom.js */

/**
 * Cria um elemento DOM com atributos e filhos.
 * @param {string} tag - Tag HTML (div, span, etc).
 * @param {Object} attrs - Atributos (className, onclick, etc).
 * @param {Array|HTMLElement|string} children - Filhos.
 */
export const el = (tag, attrs = {}, children = []) => {
    const element = document.createElement(tag);

    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'className') element.className = value;
        else if (key === 'text') element.textContent = value;
        else if (key === 'html') element.innerHTML = value;
        else if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.substring(2).toLowerCase(), value);
        }
        else if (['disabled', 'checked', 'selected', 'readOnly'].includes(key)) {
            element[key] = !!value;
        }
        else if (key === 'dataset' && typeof value === 'object') {
            Object.assign(element.dataset, value);
        }
        else if (value !== null && value !== undefined) {
            element.setAttribute(key, value);
        }
    });

    if (!Array.isArray(children)) children = [children];
    children.forEach(child => {
        if (!child) return;
        if (child instanceof Node) element.appendChild(child);
        else element.appendChild(document.createTextNode(String(child)));
    });

    return element;
};

// Helper para ícones Material Icons
export const icon = (name, style = {}) => {
    return el('span', { className: 'material-icons-round', ...style }, name);
};

// --- Utilitários de UI ---

export const ui = {
    /**
     * Helper interno: cria children para botão (ícone + texto)
     */
    _iconTextChildren: (iconName, text) => [icon(iconName), el('span', { text })],

    /**
     * Botão com apenas ícone
     * @param {string} iconName - Nome do ícone Material Icons
     * @param {string} title - Texto do título (hover)
     * @param {Function} onClick - Callback ao clicar
     */
    btnIcon: (iconName, title, onClick) => 
        el('button', { className: 'btn-icon', title, onclick: onClick }, icon(iconName)),

    /**
     * Botão com ícone + texto lado a lado
     * @param {string} iconName - Nome do ícone
     * @param {string} text - Texto do botão
     * @param {string} className - Classes CSS (padrão: 'btn')
     * @param {Function} onClick - Callback ao clicar
     */
    btnIconText: (iconName, text, className = 'btn', onClick) =>
        el('button', { className, onclick: onClick }, ui._iconTextChildren(iconName, text)),

    /**
     * Botão com texto + ícone lado a lado
     * @param {string} text - Texto do botão
     * @param {string} iconName - Nome do ícone
     * @param {string} className - Classes CSS (padrão: 'btn')
     * @param {Function} onClick - Callback ao clicar
     */
    btnTextIcon: (text, iconName, className = 'btn', onClick) =>
        el('button', { className, onclick: onClick }, [el('span', { text }), icon(iconName)]),

    /**
     * Botão com estilo de ação vertical (ícone + label)
     * @param {string} iconName - Nome do ícone
     * @param {string} label - Texto do label
     * @param {string} className - Classes CSS (padrão: 'btn-action-vertical')
     * @param {Function} onClick - Callback ao clicar
     */
    btnActionVertical: (iconName, label, className = 'btn-action-vertical', onClick) =>
        el('button', { className, onclick: onClick }, [
            el('div', { className: 'circle-btn-lg' }, icon(iconName, { style: 'font-size:32px' })),
            el('span', { className: 'label', text: label })
        ]),

    btnLink: (text, onClick) => 
        el('button', { className: 'btn-link-toggle', text, onclick: onClick }),

    header: (title, onClose = null) => {
        const h = el('div', { className: 'details-header' }, el('h4', { text: title, style: 'margin:0;' }));
        if (onClose) h.appendChild(ui.btnIcon('close', 'Fechar', onClose));
        return h;
    }
};