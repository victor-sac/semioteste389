import { el, icon } from '../utils/dom.js';

const createPlaceholder = () => ({
    render() {
        return el('div', {}, el('div', { className: 'empty-state' }, [
            icon(this.icon, { style: 'font-size: 64px; margin-bottom: 20px; opacity: 0.3;' }),
            el('h3', { text: this.label }),
            el('p', { text: 'Módulo em desenvolvimento.' })
        ]))
    }
});

export const Ectoscopia = createPlaceholder();
export const CabecaPescoco = createPlaceholder();
export const Respiratorio = createPlaceholder();
export const Digestorio = createPlaceholder();