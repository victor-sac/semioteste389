/* static/js/utils/dateUtils.js */

export const calculateAge = (dateStr) => {
    const [d, m, y] = dateStr.split('/').map(Number);
    const birthDate = new Date(y, m - 1, d);
    
    // Força o ano exato digitado para evitar que o JS converta '0000' para '1900'
    birthDate.setFullYear(y);

    const today = new Date();

    // Validação extra: Impede datas inexistentes (ex: 30/02 virando 02/03)
    if (birthDate.getDate() !== d || birthDate.getMonth() !== m - 1 || birthDate.getFullYear() !== y) {
        return { isError: true };
    }

    // Validação de limite: Data no futuro ou mais de 150 anos de diferença
    if (birthDate > today || (today.getFullYear() - birthDate.getFullYear() > 150)) {
        return { isError: true };
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    // Calcula o total de meses desde o nascimento (para comparações com intervalos de idade)
    const totalMonths = years * 12 + months;

    return { years, months, days, totalMonths };
};

// Função para verificar se está em faixa etária pediátrica
export const isPediatric = (ageObj) => {
    if (!ageObj || ageObj.isError) return false;
    return ageObj.years < 18;
};
