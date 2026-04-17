/* static/js/modules/finalizar/view.js */
import { el, icon } from '../../utils/dom.js';
import { Forms } from '../../components/Forms.js';
import { Card } from '../../components/Card.js';

export const FinalizarView = {
    // Agora recebe a função onSendEmail
    create({ onGenerate, onCopy, onToggleSiglas, initialSiglas, onSendEmail }) {
        const container = el('div');
        const card = Card.create({ title: 'Relatório Final' });

        const optionsBox = el('div', { className: 'options-subbox' });
        const optionsHeader = el('div', { className: 'options-header' });
        
        const switchSiglas = Forms.switch({
            id: 'toggle-simplificar', 
            label: 'Simplificar',
            checked: initialSiglas,
            onChange: onToggleSiglas
        });

        const iconExpand = icon('expand_more');
        const btnMoreOptions = el('button', {
            className: 'btn-more-options',
            onclick: () => {
                const isHidden = optionsBody.classList.contains('hidden');
                optionsBody.classList.toggle('hidden');
                iconExpand.textContent = isHidden ? 'expand_less' : 'expand_more';
            }
        }, [el('span', { text: 'Mais Opções' }), iconExpand]);

        optionsHeader.appendChild(switchSiglas);
        optionsHeader.appendChild(btnMoreOptions);

        const optionsBody = el('div', { className: 'options-body hidden' });
        
        const emailInput = el('input', {
            type: 'email',
            placeholder: 'email@exemplo.com',
            className: 'input-email'
        });
        
        // Vamos referenciar a textarea mais abaixo usando uma variável let ou instanciando ela antes.
        // Para melhor estrutura, definimos o txtArea antes do botão de email:
        const txtArea = el('textarea', { 
            id: 'relatorio-final', 
            readOnly: true,
            placeholder: 'Clique em "Atualizar texto" para gerar relatório...',
            className: 'relatorio-textarea'
        });

        // --- ATUALIZAÇÃO: Botão de Enviar E-mail ---
        const btnSendEmail = el('button', {
            className: 'btn btn-primary',
            onclick: () => {
                const email = emailInput.value.trim();
                const text = txtArea.value.trim();
                
                if (!email) return alert('Por favor, informe um endereço de e-mail.');
                if (!text) return alert('O relatório está vazio.');

                // Feedback visual de carregamento
                const originalContent = btnSendEmail.innerHTML;
                btnSendEmail.innerHTML = '<span class="material-icons-round">hourglass_empty</span><span>Enviando...</span>';
                btnSendEmail.disabled = true;

// Executa a função do index, verifica o sucesso e aguarda finalizar
                onSendEmail(email, text).then((sucesso) => {
                    if (sucesso) {
                        emailInput.value = ''; // Limpa o campo de e-mail se deu certo
                    }
                }).finally(() => {
                    btnSendEmail.innerHTML = originalContent;
                    btnSendEmail.disabled = false;
                });
            }
        }, [
            icon('send'), 
            el('span', { text: 'Enviar' })
        ]);

        const emailWrapper = el('div', { className: 'email-input-wrapper' }, [
            emailInput,
            btnSendEmail
        ]);
        
        const emailNote = el('div', {
            className: 'form-note mt-10',
            text: 'Ao enviar para e-mail, será encaminhado o relatório formatado abaixo.'
        });

        optionsBody.appendChild(emailWrapper);
        optionsBody.appendChild(emailNote);
        optionsBox.appendChild(optionsHeader);
        optionsBox.appendChild(optionsBody);

        const btnUpdate = el('button', { className: 'btn btn-primary', text: 'Atualizar Texto', onclick: onGenerate });
        
        const btnCopy = el('button', { 
            className: 'btn btn-secondary', text: 'Copiar', 
            onclick: () => onCopy(txtArea, btnCopy) 
        });

        const btnContainer = el('div', { style: 'margin-top:15px;display:flex;gap:10px' }, [btnUpdate, btnCopy]);

        card.appendChild(optionsBox);
        card.appendChild(txtArea);
        card.appendChild(btnContainer);
        
        container.appendChild(card);

        return {
            element: container,
            setText: (text) => txtArea.value = text
        };
    }
};