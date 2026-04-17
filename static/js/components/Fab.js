/* static/js/components/Fab.js */
import { el, icon } from '../utils/dom.js';

export const Fab = {
    create({ options, onSelect }) {
        const container = el('div', { className: 'fab-container' });
        const menu = el('div', { className: 'fab-menu hidden' });
        
        // Reconstrói o menu (útil para atualizar o status "disabled")
        const refreshMenu = () => {
            menu.innerHTML = '';
            options.forEach(opt => {
                menu.appendChild(el('button', {
                    className: 'fab-menu-item',
                    disabled: opt.disabled,
                    text: opt.disabled ? `${opt.label} (Adicionado)` : opt.label,
                    onclick: (e) => {
                        e.stopPropagation();
                        if (!opt.disabled) {
                            onSelect(opt.value);
                            menu.classList.add('hidden');
                        }
                    }
                }));
            });
        };

        const fabBtn = el('button', {
            className: 'btn-fab',
            onclick: (e) => {
                e.stopPropagation();
                refreshMenu();
                menu.classList.toggle('hidden');
            }
        }, icon('add'));

        // Fecha ao clicar fora
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) menu.classList.add('hidden');
        });

        container.appendChild(menu);
        container.appendChild(fabBtn);

        // Retornamos a interface de controle + o elemento
        return {
            element: container,
            // Método para mostrar/ocultar o botão inteiro
            toggle(visible) {
                if (visible) container.classList.remove('hidden');
                else container.classList.add('hidden');
            }
        };
    }
};