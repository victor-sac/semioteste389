/* static/js/modules/dados-gerais/view.js */
import { el, icon, ui } from '../../utils/dom.js';
import { Card } from '../../components/Card.js';
import { Forms } from '../../components/Forms.js';
import { calculateAge, isPediatric } from '../../utils/dateUtils.js';

const getAgeText = (ageObj) => {
    if (!ageObj) return 'Data inválida';
    if (ageObj.isError) return 'Erro de Digitação';

    const { years, months, days } = ageObj;

    if (years >= 18) return `${years} ano${years !== 1 ? 's' : ''}`;
    
    if (years >= 1) {
        let txt = `${years} ano${years > 1 ? 's' : ''}`;
        if (months > 0) txt += ` e ${months} ${months === 1 ? 'mês' : 'meses'}`;
        return txt;
    }
    
    if (months === 0) return `${days} dia${days !== 1 ? 's' : ''}`;
    
    let txt = `${months} ${months === 1 ? 'mês' : 'meses'}`;
    if (days > 0) txt += ` e ${days} dia${days !== 1 ? 's' : ''}`;
    return txt;
};

// --- HELPER WRAPPER ---
// Reutiliza Forms._wrapField para manter consistência sem alterar a classe raiz e aparência
const wrapDadosGerais = (label, element) => Forms._wrapField(
    el('label', { text: label, className: 'dados-gerais-label' }), 
    element, 
    'dados-gerais-wrapper'
);

// --- COMPONENTE: Data de Nascimento ---
const createDateInput = (onChange, onPediatricDetected) => {
    const createField = (placeholder, maxLength, widthClass) => el('input', {
        type: 'text', placeholder, maxLength,
        className: `date-pill-input ${widthClass}`,
        inputmode: 'numeric', pattern: '[0-9]*'
    });

    const inputDia = createField('DD', 2, 'input-dd');
    const inputMes = createField('MM', 2, 'input-mm');
    const inputAno = createField('AAAA', 4, 'input-yyyy');

    const separator = () => el('span', { className: 'date-pill-separator', text: '/' });

    // CORREÇÃO: Cria o ícone isoladamente e depois adiciona a classe, 
    // para não sobrescrever a classe 'material-icons-round'
    const calendarIcon = icon('calendar_month');
    calendarIcon.classList.add('date-pill-icon');

    const pillContainer = el('div', { className: 'date-pill-container' }, [
        calendarIcon, inputDia, separator(), inputMes, separator(), inputAno
    ]);

    const ageBadge = el('div', { className: 'age-badge hidden' });

    const validateAndNotify = () => {
        const format = (val, max) => {
            let v = val.replace(/\D/g, '');
            if (v && parseInt(v) > max) return max.toString();
            if (v === '00') return '01';
            return v;
        };

        const d = format(inputDia.value, 31);
        const m = format(inputMes.value, 12);
        const a = inputAno.value.replace(/\D/g, '');

        if (inputDia.value !== d) inputDia.value = d;
        if (inputMes.value !== m) inputMes.value = m;
        if (inputAno.value !== a) inputAno.value = a;

        if (d.length === 2 && m.length === 2 && a.length === 4) {
            const dateStr = `${d}/${m}/${a}`;
            const ageObj = calculateAge(dateStr);
            
            if (ageObj) {
                const hasError = ageObj.isError;
                ageBadge.textContent = getAgeText(ageObj);
                
                // Reaproveita o sistema de feedback global já existente (feedback.css)
                if (hasError) {
                    // Adiciona as classes globais de erro
                    ageBadge.className = 'age-badge status-pill status-error active';
                    onChange(null);
                    onPediatricDetected?.(false);
                } else {
                    // Retorna para o visual primário da pílula de idade
                    ageBadge.className = 'age-badge';
                    onChange(dateStr);
                    
                    // Detectar e notificar se é pediátrico
                    const isPed = isPediatric(ageObj);
                    onPediatricDetected?.(isPed);
                }
                
                ageBadge.classList.remove('hidden');
            } else {
                ageBadge.classList.add('hidden');
                onChange(null);
                onPediatricDetected?.(false);
            }
        } else {
            onChange(null);
            ageBadge.classList.add('hidden');
            onPediatricDetected?.(false);
        }
    };

const setupEvents = (input, nextInput, prevInput, targetLen) => {
        input.addEventListener('input', () => {
            validateAndNotify();
            
            // Se o campo atingiu o tamanho máximo esperado (ex: 4 no ano)
            if (input.value.length === targetLen) {
                if (nextInput) {
                    nextInput.focus(); // Pula pro próximo campo (Dia -> Mês -> Ano)
                } else {
                    input.blur(); // Se não tem próximo campo (Ano), recolhe o teclado
                }
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value === '' && prevInput) prevInput.focus();
            if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
        });
    };

    setupEvents(inputDia, inputMes, null, 2);
    setupEvents(inputMes, inputAno, inputDia, 2);
    setupEvents(inputAno, null, inputMes, 4);

    return {
        element: wrapDadosGerais('Data de Nascimento', pillContainer),
        ageBadge
    };
};

// --- COMPONENTE GENÉRICO: Seleção Segmentada ---
const createSegmentedControl = (labelText, options, onChange) => {
    const buttons = options.map(opt => {
        // Reutiliza utilitário ui._iconTextChildren que faz append condicional do ícone e label
        const content = opt.icon ? ui._iconTextChildren(opt.icon, opt.label) : [el('span', { text: opt.label })];
        
        return el('button', { 
            className: 'toggle-pill-btn', 
            type: 'button',
            dataset: { value: opt.value },
            onclick: function() {
                const isActive = this.classList.contains('active');
                buttons.forEach(b => b.classList.remove('active'));
                
                if (isActive) {
                    onChange(null);
                } else {
                    this.classList.add('active');
                    onChange(this.dataset.value);
                }
            }
        }, content);
    });

    return wrapDadosGerais(labelText, el('div', { className: 'toggle-pill-container' }, buttons));
};

// --- MONTAGEM DA VIEW PRINCIPAL ---
export const DadosGeraisView = {
    create({ onUpdateData, onPediatricDetected }) {
        const dateFieldObj = createDateInput(
            (val) => onUpdateData('dataNascimento', val),
            (isPediatric) => onPediatricDetected?.(isPediatric)
        );
        
        const sexField = createSegmentedControl('Sexo', [
            { label: 'Masculino', value: 'Masculino', icon: 'male' },
            { label: 'Feminino', value: 'Feminino', icon: 'female' }
        ], (val) => onUpdateData('sexo', val));

        const content = el('div', { className: 'dados-gerais-content' }, [
            dateFieldObj.element,
            dateFieldObj.ageBadge,
            sexField,
            el('div', { className: 'form-note mt-20', text: '* Dados para calculadoras e valores de referência' })
        ]);

        return { 
            element: el('div', {}, Card.create({ title: 'Dados Gerais', children: [content] })) 
        };
    }
};