/* static/js/modules/finalizar/index.js */
import { store } from '../../core/store.js';
import { Report } from '../../core/report.js';
import { FinalizarView } from './view.js';

export const Finalizar = {
    _view: null,

    render() {
        const viewObj = FinalizarView.create({
            initialSiglas: store.getState().config.usarSiglas,
            
            onToggleSiglas: (val) => {
                store.setConfig('usarSiglas', val);
                this.updateText();
            },
            
            onGenerate: () => {
                this.updateText();
            },
            
            onCopy: (txtArea, btnCopy) => {
                txtArea.select(); 
                document.execCommand('copy');
                
                const originalText = btnCopy.textContent;
                btnCopy.textContent = 'Copiado!'; 
                setTimeout(() => btnCopy.textContent = originalText, 2000);
            },

            // Lógica de comunicação com o Backend
            onSendEmail: async (email, text) => {
                try {
                    const response = await fetch('/api/send-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email, report: text })
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        alert('E-mail enviado com sucesso!');
                        return true; // Avisa que deu certo
                    } else {
                        alert('Erro ao enviar e-mail: ' + result.message);
                        return false; // Avisa que deu erro
                    }
                } catch (error) {
                    console.error('Erro na requisição:', error);
                    alert('Erro de conexão ao tentar enviar o e-mail.');
                    return false;
                }
            }
        });

        this._view = viewObj;
        this.updateText();

        return viewObj.element;
    },

    updateText() {
        if (this._view) {
            this._view.setText(Report.generate());
        }
    }
};