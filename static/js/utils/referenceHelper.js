/* Helper para transformar dados de referência em formatos utilizáveis */
import { ReferenceDataService } from '../services/referenceDataService.js';

export const ReferenceHelper = {
    // Converte limites simples (min/max) para formato de feedback
    simpleToFeedbackRule(reference) {
        if (!reference) return null;
        return {
            min: reference.min,
            max: reference.max,
            labels: reference.labels,
            unit: reference.unidade
        };
    },

    // Converte referência de pressão arterial adulta
    adultPAToFeedbackRule(paAdulta) {
        if (!paAdulta) return null;
        return {
            ranges: paAdulta.sistolica.concat(paAdulta.diastolica || []),
            unit: 'mmHg'
        };
    },

    // Cria regra de feedback para dados com age-based regras (FC, FR)
    ageBasedToFeedbackRule(reference, ageMonths) {
        if (!reference || !reference.regras) return null;

        // Encontra a regra aplicável para a idade
        const applicableRule = reference.regras.find(r => 
            ageMonths >= r.idadeMinMeses && 
            (r.idadeMaxMeses === null || ageMonths <= r.idadeMaxMeses)
        );

        if (!applicableRule) return null;

        return {
            min: applicableRule.min,
            max: applicableRule.max,
            ref: applicableRule.ref,
            labels: reference.labels,
            unit: reference.unidade,
            regras: reference.regras // Inclui todas as regras para referência completa
        };
    }
};

export default ReferenceHelper;
