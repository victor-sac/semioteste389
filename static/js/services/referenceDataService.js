/* Static data service - Carrega e cache centralizado de referências de sinais vitais */

let sinalVitalData = null;

const loadReferenceData = async () => {
    if (sinalVitalData) return sinalVitalData;
    try {
        const response = await fetch('/static/data/sinais-vitais.json');
        sinalVitalData = await response.json();
        return sinalVitalData;
    } catch (error) {
        console.error('Erro ao carregar sinais-vitais.json:', error);
        return null;
    }
};

export const ReferenceDataService = {
    // Inicializa o carregamento de dados
    async initialize() {
        return await loadReferenceData();
    },

    // Obtém referências lineares (FC, FR, TEMP, O2)
    async getLinearReference(type) {
        const data = await loadReferenceData();
        if (!data || !data.lineares || !data.lineares[type]) return null;
        return data.lineares[type];
    },

    // Obtém referência de pressão arterial adulta com flag
    async getAdultPAReference() {
        const data = await loadReferenceData();
        if (!data || !data.pressao_arterial || !data.pressao_arterial.adulto) return null;
        return {
            ...data.pressao_arterial.adulto,
            isAdultPA: true
        };
    },

    // Obtém referência de pressão arterial pediátrica
    async getPediatricPAReference() {
        const data = await loadReferenceData();
        if (!data || !data.pressao_arterial || !data.pressao_arterial.pediatrico) return null;
        return data.pressao_arterial.pediatrico;
    },

    // Obtém todo o arquivo de dados
    async getAllData() {
        return await loadReferenceData();
    }
};

export default ReferenceDataService;
