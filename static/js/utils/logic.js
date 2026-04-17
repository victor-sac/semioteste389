/* static/js/utils/logic.js */
import { calculateAge } from './dateUtils.js';
import { ReferenceDataService } from '../services/referenceDataService.js';

export const Format = {
    list: (items, separator = ', ') => items.filter(i => i && i.trim().length > 0).join(separator),
    term: (full, short, useSiglas) => useSiglas ? short : full
};

// Função para calcular idade em anos (importada de dateUtils.js)
export { calculateAge } from './dateUtils.js';

// Limites de segurança (Valores fisiologicamente impossíveis)
const LIMITS = {
    peso: { min: 1, max: 600 },
    altura: { min: 30, max: 280 },
    fc: { min: 10, max: 300 },
    fr: { min: 5, max: 100 },
    o2: { min: 30, max: 100 },
    temp: { min: 25, max: 45 },
    pas: { min: 40, max: 300 },
    pad: { min: 20, max: 200 }
};

// Obtém a regra aplicável para dados age-based (FC, FR)
const getApplicableAgeRule = (referenceData, ageMonths) => {
    if (!referenceData.regras || referenceData.regras.length === 0) return null;
    return referenceData.regras.find(r => 
        ageMonths >= r.idadeMinMeses && 
        (r.idadeMaxMeses === null || ageMonths <= r.idadeMaxMeses)
    );
};

// Função enxuta apenas para matemática e classificação pediátrica
const validatePAePediatrica = async (pas, pad, sexo, altura, dataNascimento) => {
    const pediatricData = await ReferenceDataService.getPediatricPAReference();
    if (!pediatricData) return null;

    const s = parseFloat(pas);
    const d = parseFloat(pad);
    const h = parseFloat(altura);

    const ageObj = calculateAge(dataNascimento);
    const ageYears = ageObj.years || 1; // Mínimo 1 ano

    const sexoKey = sexo === 'Masculino' ? 'masculino' : 'feminino';
    const sexoData = pediatricData[sexoKey];
    if (!sexoData) return null;

    const ageKey = ageYears.toString();
    const ageData = sexoData[ageKey];
    if (!ageData) return null;

    const { estatura, sistolica, diastolica } = ageData;
    if (!estatura || !sistolica || !diastolica) return null;

    let heightIndex = 0;
    let minDiff = Math.abs(h - estatura[0]);
    for (let i = 0; i < estatura.length; i++) {
        const diff = Math.abs(h - estatura[i]);
        if (diff < minDiff) {
            minDiff = diff;
            heightIndex = i;
        }
    }

    const p50_s = sistolica.P50[heightIndex];
    const p90_s = sistolica.P90[heightIndex];
    const p95_s = sistolica['P95'][heightIndex];
    const p95_12_s = sistolica['P95 + 12 mmHg'][heightIndex];

    const p50_d = diastolica.P50[heightIndex];
    const p90_d = diastolica.P90[heightIndex];
    const p95_d = diastolica['P95'][heightIndex];
    const p95_12_d = diastolica['P95 + 12 mmHg'][heightIndex];

    const pediatricReferenceRule = {
        pedagogic: true,
        pediatricPercentiles: {
            sistolica: { p50: p50_s, p90: p90_s, p95: p95_s, p95_12: p95_12_s },
            diastolica: { p50: p50_d, p90: p90_d, p95: p95_d, p95_12: p95_12_d },
            ageYears, sexo, altura: estatura[heightIndex]
        },
        ranges: [
            { min: 0, max: 59, label: 'Pressão Normal (< P50)' },
            { min: p50_s, max: p90_s - 1, label: `P50-P90 Sistólica: ${p50_s}-${p90_s}` },
            { min: p90_s, max: p95_s - 1, label: `Pré-hipertensão (P90-P95): ${p90_s}-${p95_s}` },
            { min: p95_s, max: p95_12_s - 1, label: `Hipertensão Estágio 1 (P95): ${p95_s}-${p95_12_s}` },
            { min: p95_12_s, max: 999, label: `Hipertensão Estágio 2 (≥ P95+12): ≥ ${p95_12_s}` }
        ],
        unit: 'mmHg'
    };

    let label = '';
    let status = 'normal';

    if ((s >= p95_12_s || d >= p95_12_d) || (s >= 140 || d >= 90)) {
        label = 'Hipertensão Estágio 2';
        status = 'alert';
    } else if (s >= p95_s || d >= p95_d) {
        label = 'Hipertensão Estágio 1';
        status = 'alert';
    } else if ((s >= p90_s || d >= p90_d) && s < p95_s && d < p95_d) {
        label = 'Pré-hipertensão';
        status = 'warning';
    } else {
        label = 'Pressão Normal';
        status = 'normal';
    }

    return { status, label, referenceRule: pediatricReferenceRule, isPediatric: true };
};

// Obtém referência formatada para feedback
const getFormattedReference = async (tipo, ageMonths = null) => {
    const reference = await ReferenceDataService.getLinearReference(tipo);
    if (!reference) return null;

    // Para dados com regras de idade (FC, FR)
    if (reference.regras && reference.regras.length > 0) {
        return {
            regras: reference.regras,
            labels: reference.labels,
            unit: reference.unidade
        };
    }

    // Para dados simples (TEMP, O2)
    return {
        min: reference.min,
        max: reference.max,
        labels: reference.labels,
        unit: reference.unidade
    };
};

// Obtém regras de pressão arterial adulta
const getAdultPARules = async () => {
    const paData = await ReferenceDataService.getAdultPAReference();
    if (!paData) return null;
    return {
        sistolica: paData.sistolica,
        diastolica: paData.diastolica,
        unit: paData.unidade,
        isAdultPA: true
    };
};

export const Validators = {
    imc: (peso, altura) => {
        if (!peso || !altura) return null;
        if (peso < LIMITS.peso.min || peso > LIMITS.peso.max || altura < LIMITS.altura.min || altura > LIMITS.altura.max) {
            return { valor: 'Erro', classificacao: 'Valores Impossíveis', status: 'error' };
        }
        const m = altura / 100;
        const valor = (peso / (m * m)).toFixed(2);
        
        let classificacao = 'Obesidade';
        let status = 'alert';
        if (valor < 18.5) { classificacao = 'Baixo peso'; status = 'alert'; }
        else if (valor < 24.9) { classificacao = 'Eutrófico'; status = 'normal'; }
        else if (valor < 29.9) { classificacao = 'Sobrepeso'; status = 'warning'; }

        return { valor, classificacao, status };
    },

    sinaisVitais: async (tipo, valor, options = {}) => {
        const v = parseFloat(valor);
        if (isNaN(v)) return null;

        if (LIMITS[tipo] && (v < LIMITS[tipo].min || v > LIMITS[tipo].max)) {
            return { 
                status: 'error', 
                label: tipo === 'o2' && v > 100 ? 'Máx 100%' : 'Valor Impossível', 
                referenceRule: await getFormattedReference(tipo) 
            };
        }

        const r = await getFormattedReference(tipo);
        if (!r) return { status: 'normal', label: '', referenceRule: r };

        // Trata dados com regras de idade (FC, FR)
        if (r.regras && r.regras.length > 0) {
            // Padrão: última regra (adulto). Se dataNascimento fornecido, encontra a regra correta
            let applicableRule = r.regras[r.regras.length - 1]; // Assume adulto como padrão
            
            // Se dataNascimento foi fornecido, encontra a regra correta para a idade
            if (options.dataNascimento) {
                const ageObj = calculateAge(options.dataNascimento);
                if (!ageObj.isError && ageObj.totalMonths !== undefined) {
                    const matchedRule = r.regras.find(rule => 
                        ageObj.totalMonths >= rule.idadeMinMeses && 
                        (rule.idadeMaxMeses === null || ageObj.totalMonths <= rule.idadeMaxMeses)
                    );
                    if (matchedRule) applicableRule = matchedRule;
                }
            }

            if (r.labels) {
                if (applicableRule.max && v > applicableRule.max) {
                    return { 
                        status: 'alert', 
                        label: r.labels.alta, 
                        referenceRule: {
                            ...r,
                            applicableRule: applicableRule  // Apenas a regra do paciente
                        }
                    };
                }
                if (applicableRule.min && v < applicableRule.min) {
                    return { 
                        status: 'alert', 
                        label: r.labels.baixa, 
                        referenceRule: {
                            ...r,
                            applicableRule: applicableRule  // Apenas a regra do paciente
                        }
                    };
                }
                return { 
                    status: 'normal', 
                    label: r.labels.normal, 
                    referenceRule: {
                        ...r,
                        applicableRule: applicableRule  // Apenas a regra do paciente
                    }
                };
            }
        }

        // Trata dados simples (TEMP, O2)
        if (r.max && v > r.max) {
            return { status: 'alert', label: r.labels?.alta, referenceRule: r };
        }
        if (r.min && v < r.min) {
            return { status: 'alert', label: r.labels?.baixa, referenceRule: r };
        }
        return { status: 'normal', label: r.labels?.normal, referenceRule: r };
    },

    pressaoArterial: async (pas, pad, options = {}) => {
        if (!pas || !pad) return null;
        const s = parseFloat(pas), d = parseFloat(pad);

        const adultRules = await getAdultPARules();

        // Validação de inputs
        if (s < LIMITS.pas.min || s > LIMITS.pas.max || d < LIMITS.pad.min || d > LIMITS.pad.max) {
            return { status: 'error', label: 'Erro de Digitação', referenceRule: adultRules };
        }
        if (s <= d) {
            return { status: 'error', label: 'PAS deve ser > PAD', referenceRule: adultRules };
        }

        // 1. Descobrir se é pediatria a partir da data de nascimento
        let isPediatric = false;
        if (options.dataNascimento) {
            const ageObj = calculateAge(options.dataNascimento);
            if (!ageObj.isError && typeof ageObj.years === 'number' && ageObj.years < 18) {
                isPediatric = true;
            }
        }

        // 2. Se for pediátrico, exige sexo e altura
        if (isPediatric) {
            if (!options.sexo) {
                return { status: 'error', label: 'Sexo não informado', missingData: 'sexo', referenceRule: adultRules };
            }
            if (!options.altura) {
                return { status: 'error', label: 'Altura não informada', missingData: 'altura', referenceRule: adultRules };
            }

            const paPedResult = await validatePAePediatrica(pas, pad, options.sexo, options.altura, options.dataNascimento);
            if (paPedResult) return paPedResult;
        }

        // 3. Classificação Diretriz 2025 (Adulto)
        if (s < 90 || d < 60) {
            return { status: 'alert', label: 'Hipotensão', referenceRule: adultRules };
        }
        if (s >= 180 || d >= 110) {
            return { status: 'alert', label: 'Hipertensão Estágio 3', referenceRule: adultRules };
        }
        if (s >= 160 || d >= 100) {
            return { status: 'alert', label: 'Hipertensão Estágio 2', referenceRule: adultRules };
        }
        if (s >= 140 || d >= 90) {
            return { status: 'alert', label: 'Hipertensão Estágio 1', referenceRule: adultRules };
        }
        if (s >= 120 || d >= 80) {
            return { status: 'warning', label: 'Pré-hipertensão', referenceRule: adultRules };
        }
        
        return { status: 'normal', label: 'Pressão Normal', referenceRule: adultRules };
    }
};
