export default {
    id: 'finalizar',
    title: '8. Finalizar',

    render() {
        return `
            <div class="exam-section">
                <h3>Prontuário Gerado</h3>
                <p style="color:#666; font-size:0.9rem;">Copie o texto abaixo para o prontuário eletrônico.</p>
                <textarea id="texto-final" style="width: 100%; height: 350px; padding: 15px; font-family: monospace; border: 1px solid #ccc;"></textarea>
                
                <div style="margin-top: 15px; display: flex; gap: 10px;">
                    <button id="btn-copy" class="btn-primary-large" style="padding: 10px;">Copiar Texto</button>
                </div>
            </div>
        `;
    },

    init() {
        const textArea = document.getElementById('texto-final');
        const btnCopy = document.getElementById('btn-copy');
        
        // Solicita texto a todos os módulos
        const event = new CustomEvent('request-generate-text', { 
            detail: { callback: (fullText) => { textArea.value = fullText; } }
        });
        window.dispatchEvent(event);

        btnCopy.addEventListener('click', () => {
            textArea.select();
            document.execCommand('copy'); // Fallback antigo mas funcional
            // API Clipboard moderna: navigator.clipboard.writeText(textArea.value);
            
            const originalText = btnCopy.textContent;
            btnCopy.textContent = "Copiado com Sucesso!";
            btnCopy.style.background = "#28a745";
            
            setTimeout(() => {
                btnCopy.textContent = originalText;
                btnCopy.style.background = "";
            }, 2000);
        });
    },

    generateText() { return ''; }
};