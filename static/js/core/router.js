/* static/js/core/router.js */
import { el, icon, ui } from '../utils/dom.js';

export const Router = {
    modules: [],
    _contentArea: null,
    
    register(module) { this.modules.push(module); },

    _ensureModuleViewContainer(mod) {
        if (!mod._viewElement) {
            mod._viewElement = el('div');
            mod._viewElement.id = `view-${mod.id}`;
            mod._viewElement.classList.add('hidden');
            this._contentArea.appendChild(mod._viewElement);
        }
        return mod._viewElement;
    },

    async _renderModuleContent(mod) {
        // Previne re-renderização ou cliques duplos enquanto já está a carregar
        if (mod._isRendered || mod._isLoading) return;

        mod._isLoading = true; // Trava de carregamento
        
        // --- 1. LIGA A ANIMAÇÃO NO BOTÃO DO MENU ---
        if (mod._btnElement) {
            mod._btnElement.classList.add('is-loading');
        }
        
        // Guarda se estávamos num ecrã de erro antes desta tentativa
        const wasInErrorState = mod._hasFailed;

        if (mod.loader) {
            try {
                const loadedModule = await mod.loader(mod._hasFailed);
                Object.assign(mod, loadedModule.default || loadedModule);
                
                // Sucesso! Limpamos o estado de erro
                mod._hasFailed = false; 
            } catch (error) {
                mod._hasFailed = true; 
                mod._isLoading = false; // Liberta a trava para o utilizador tentar de novo
                
                // --- 2. DESLIGA A ANIMAÇÃO EM CASO DE ERRO ---
                if (mod._btnElement) {
                    mod._btnElement.classList.remove('is-loading');
                }

                console.error(`Erro ao carregar o módulo ${mod.id}:`, error);
                
                const view = this._ensureModuleViewContainer(mod);
                view.innerHTML = `
                    <div class="empty-state" style="color: var(--danger-color);">
                        <span class="material-icons-round" style="font-size: 48px;">error_outline</span>
                        <h3>Erro de Ligação</h3>
                        <p>Não foi possível carregar este módulo. Verifique a sua ligação e tente novamente.</p>
                        <button class="btn btn-primary mt-10" id="retry-btn-${mod.id}">Tentar Novamente</button>
                    </div>
                `;

                const retryBtn = view.querySelector(`#retry-btn-${mod.id}`);
                if (retryBtn) {
                    retryBtn.addEventListener('click', () => {
                        view.innerHTML = ''; 
                        this.activate(mod.id);
                    });
                }
                
                return; // Pára a execução
            }
        }

        const view = this._ensureModuleViewContainer(mod);
        
        // Se recuperámos de um erro, removemos a mensagem de erro antiga do ecrã à força
        if (wasInErrorState) {
            view.innerHTML = '';
        }

        // Agora a renderização ocorrerá perfeitamente
        if (mod.render && view.children.length === 0) {
            const content = mod.render?.() ?? el('div');
            view.appendChild(content);
        }

        mod._isRendered = true;
        mod._isLoading = false; // Fim do carregamento
        
        // --- 3. DESLIGA A ANIMAÇÃO EM CASO DE SUCESSO ---
        if (mod._btnElement) {
            mod._btnElement.classList.remove('is-loading');
        }
    },

    _createModuleButton(mod, index) {
        const isFooter = mod.location === 'footer';
        const btn = el('button', {
            className: isFooter ? 'btn btn-primary full-width' : 'nav-btn',
            onclick: () => this.activate(mod.id)
        }, ui._iconTextChildren(mod.icon, mod.label));

        if (index === 0 && !isFooter) btn.classList.add('active');
        mod._btnElement = btn;
        return { btn, isFooter };
    },

    init() {
        const nav = document.getElementById('sidebar-nav');
        const footer = document.getElementById('sidebar-action-container');
        this._contentArea = document.getElementById('app-content');
        const title = document.getElementById('page-title');

        [nav, footer, this._contentArea].forEach(section => section.innerHTML = '');

        // Cria os botões de navegação (SEM renderizar as views)
        this.modules.forEach((mod, index) => {
            const { btn, isFooter } = this._createModuleButton(mod, index);
            (isFooter ? footer : nav).appendChild(btn);
        });

        // Renderiza apenas o primeiro módulo
        title.textContent = this.modules[0]?.label || '';
        this.activate(this.modules[0]?.id);
    },

    async activate(id) {
        const title = document.getElementById('page-title');
        const mod = this.modules.find(m => m.id === id);
        
        if (!mod) return;

        // Renderiza o módulo se necessário (lazy loading)
        await this._renderModuleContent(mod);

        // Mostra/esconde views
        this.modules.forEach(m => {
            const isActive = m.id === id;
            
            if (isActive) {
                m._viewElement.classList.remove('hidden');
                title.textContent = m.label;
                m.onActivate?.();
            } else {
                m._viewElement?.classList.add('hidden');
            }

            if (m.location !== 'footer') {
                m._btnElement?.classList.toggle('active', isActive);
            }
        });

        window.scrollTo(0, 0);
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth <= 768) sidebar.classList.remove('open');
    }
};