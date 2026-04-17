/* static/js/modules/cardiovascular/pulsos/logic.js */

// --- 1. CONFIGURAÇÕES VISUAIS E DADOS ESTÁTICOS ---

export const SCALE_MAP = {
    '0': { valueText: '0', desc: 'Ausente', short: 'Ausente', colorVar: 'var(--pulse-0)' },
    '1': { valueText: '1+', desc: 'Diminuído', short: 'Diminuído', colorVar: 'var(--pulse-1)' },
    '2': { valueText: '2+', desc: 'Normal', short: 'Normal', colorVar: 'var(--pulse-2)' },
    '3': { valueText: '3+', desc: 'Aumentado', short: 'Aumentado', colorVar: 'var(--pulse-3)' },
    '4': { valueText: '4+', desc: 'Célere', short: 'Célere', colorVar: 'var(--pulse-4)' }
};

const CONTOUR_MAP = {
    'normal': { full: 'Ondas com contorno normal', short: 'Contorno normal' },
    'parvus': { full: 'Ondas tipo Parvus et Tardus', short: 'Parvus et Tardus' },
    'corrigan': { full: "Ondas em Martelo D'água (Corrigan)", short: 'Pulso Martelo D\'água' },
    'dicrotico': { full: 'Ondas dicróticas', short: 'Pulso Dicrótico' },
    'bisferiens': { full: 'Ondas bisferiens', short: 'Pulso Bisferiens' },
    'paradoxal': { full: 'Pulso paradoxal', short: 'Pulso Paradoxal' },
    'alternante': { full: 'Pulso alternante', short: 'Pulso Alternante' }
};

const POSITIONS_MAP = {
    'carotideo_d': { top: 11, left: 43.5 }, 'carotideo_e': { top: 11, left: 57 },
    'axilar_d': { top: 22, left: 33 }, 'axilar_e': { top: 22, left: 67 },
    'braquial_d': { top: 30, left: 27 }, 'braquial_e': { top: 30, left: 73 },
    'radial_d': { top: 45, left: 12 }, 'radial_e': { top: 45, left: 88 },
    'femoral_d': { top: 48, left: 41 }, 'femoral_e': { top: 48, left: 59 },
    'popliteo_d': { top: 65, left: 40 }, 'popliteo_e': { top: 65, left: 60 },
    'tibial_d': { top: 88.5, left: 42 }, 'tibial_e': { top: 88.5, left: 58 },
    'pedis_d': { top: 94, left: 37 }, 'pedis_e': { top: 94, left: 63 }
};

const AMPLITUDE_TEMPLATES = {
    '0': { 
        short: 'Pulsos ausentes', 
        full: 'Pulsos periféricos ausentes' 
    },
    'default': { 
        short: 'Pulsos palpáveis', 
        full: 'Pulsos periféricos palpáveis' 
    }
};

const REGION_PATTERNS = {
    'MMII': { short: 'MMII', full: 'membros inferiores' },
    'MMSS': { short: 'MMSS', full: 'membros superiores' },
    'MID': { short: 'MID', full: 'membro inferior direito' },
    'MIE': { short: 'MIE', full: 'membro inferior esquerdo' },
    'MSD': { short: 'MSD', full: 'membro superior direito' },
    'MSE': { short: 'MSE', full: 'membro superior esquerdo' }
};

export const PulsePointsConfig = [
    // Cabeça/Pescoço
    { id: 'carotideo_d', label: 'Carotídeo D', group: 'Carotídeo', side: 'D', region: 'pescoco', ...POSITIONS_MAP['carotideo_d'] },
    { id: 'carotideo_e', label: 'Carotídeo E', group: 'Carotídeo', side: 'E', region: 'pescoco', ...POSITIONS_MAP['carotideo_e'] },
    // MMSS
    { id: 'axilar_d', label: 'Axilar D', group: 'Axilar', side: 'D', region: 'mmss', ...POSITIONS_MAP['axilar_d'] },
    { id: 'axilar_e', label: 'Axilar E', group: 'Axilar', side: 'E', region: 'mmss', ...POSITIONS_MAP['axilar_e'] },
    { id: 'braquial_d', label: 'Braquial D', group: 'Braquial', side: 'D', region: 'mmss', ...POSITIONS_MAP['braquial_d'] },
    { id: 'braquial_e', label: 'Braquial E', group: 'Braquial', side: 'E', region: 'mmss', ...POSITIONS_MAP['braquial_e'] },
    { id: 'radial_d', label: 'Radial D', group: 'Radial', side: 'D', region: 'mmss', ...POSITIONS_MAP['radial_d'] },
    { id: 'radial_e', label: 'Radial E', group: 'Radial', side: 'E', region: 'mmss', ...POSITIONS_MAP['radial_e'] },
    // MMII (Proximal)
    { id: 'femoral_d', label: 'Femoral D', group: 'Femoral', side: 'D', region: 'mmii', ...POSITIONS_MAP['femoral_d'] },
    { id: 'femoral_e', label: 'Femoral E', group: 'Femoral', side: 'E', region: 'mmii', ...POSITIONS_MAP['femoral_e'] },
    // MMII (Distal)
    { id: 'popliteo_d', label: 'Poplíteo D', group: 'Poplíteo', side: 'D', region: 'mmii', ...POSITIONS_MAP['popliteo_d'] },
    { id: 'popliteo_e', label: 'Poplíteo E', group: 'Poplíteo', side: 'E', region: 'mmii', ...POSITIONS_MAP['popliteo_e'] },
    { id: 'tibial_d', label: 'Tibial Post. D', group: 'Tibial Posterior', side: 'D', region: 'mmii', ...POSITIONS_MAP['tibial_d'] },
    { id: 'tibial_e', label: 'Tibial Post. E', group: 'Tibial Posterior', side: 'E', region: 'mmii', ...POSITIONS_MAP['tibial_e'] },
    { id: 'pedis_d', label: 'Pedioso D', group: 'Pedioso', side: 'D', region: 'mmii', ...POSITIONS_MAP['pedis_d'] },
    { id: 'pedis_e', label: 'Pedioso E', group: 'Pedioso', side: 'E', region: 'mmii', ...POSITIONS_MAP['pedis_e'] }
];

export const calculatePopoverPosition = (config) => {
    const style = { transform: 'none' };
    
    style.top = config.top > 60 ? 'auto' : `calc(${config.top}% + 25px)`;
    style.bottom = config.top > 60 ? `calc(${100 - config.top}% + 25px)` : 'auto';
    
    if (config.left < 30) {
        style.left = `calc(${config.left}% - 10px)`;
        style.right = 'auto';
    } else if (config.left > 70) {
        style.left = 'auto';
        style.right = `calc(${100 - config.left}% - 10px)`;
    } else {
        style.left = `calc(${config.left}% - 110px)`;
        style.right = 'auto';
    }

    return style;
};

const getFullPulseState = (globalVal, individualMap) => 
    Object.fromEntries(PulsePointsConfig.map(p => 
        [p.id, individualMap?.[p.id] ?? globalVal]
    ));

const calculateMode = (state) => {
    const counts = Object.values(state).reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});
    return Object.entries(counts).reduce((max, [val, count]) => 
        count > max.count ? { val, count } : max, { val: '2', count: 0 }
    ).val;
};

const getBaseDescription = (mode, simplified) => {
    const template = mode === '0' ? AMPLITUDE_TEMPLATES['0'] : AMPLITUDE_TEMPLATES['default'];
    return simplified ? template.short : template.full;
};

const getSideLabel = (side, simplified) => 
    side === 'D' ? (simplified ? 'D' : 'à direita') : (simplified ? 'E' : 'à esquerda');

const getAnatomicalNames = (ids, simplified) => {
    const groups = {};
    
    ids.forEach(id => {
        const config = PulsePointsConfig.find(p => p.id === id);
        if (!config) return;
        if (!groups[config.group]) groups[config.group] = [];
        groups[config.group].push(config.side);
    });

    return Object.entries(groups)
        .map(([name, sides]) => {
            if (sides.length === 2) return name;
            const sideLabel = getSideLabel(sides[0], simplified);
            return `${name} ${sideLabel}`;
        })
        .join(', ');
};

const detectRegionPattern = (ids, simplified) => {
    const allIds = new Set(ids);
    
    const sets = {
        'MMII': PulsePointsConfig.filter(p => p.region === 'mmii').map(p => p.id),
        'MMSS': PulsePointsConfig.filter(p => p.region === 'mmss').map(p => p.id),
        'MID': PulsePointsConfig.filter(p => p.region === 'mmii' && p.side === 'D').map(p => p.id),
        'MIE': PulsePointsConfig.filter(p => p.region === 'mmii' && p.side === 'E').map(p => p.id),
        'MSD': PulsePointsConfig.filter(p => p.region === 'mmss' && p.side === 'D').map(p => p.id),
        'MSE': PulsePointsConfig.filter(p => p.region === 'mmss' && p.side === 'E').map(p => p.id),
    };

    const pattern = Object.entries(sets).find(([_, setIds]) => 
        setIds.length === ids.length && setIds.every(id => allIds.has(id))
    );

    if (!pattern) return null;

    const patternKey = pattern[0];
    return simplified ? REGION_PATTERNS[patternKey].short : REGION_PATTERNS[patternKey].full;
};

const generateAmplitudeSection = (fullState, mode, simplified) => {
    const groupsByValue = {};
    Object.entries(fullState).forEach(([id, val]) => {
        if (!groupsByValue[val]) groupsByValue[val] = [];
        groupsByValue[val].push(id);
    });

    const modeValInfo = SCALE_MAP[mode];
    const modeIds = groupsByValue[mode] || [];
    const baseDesc = getBaseDescription(mode, simplified);
    const baseAmp = mode === '0' ? '' : `, amplitude ${modeValInfo.valueText}/4+`;
    const baseList = getAnatomicalNames(modeIds, simplified);
    
    const phrases = [`${baseDesc}${baseAmp}${baseList ? ` (${baseList})` : ''}`];

    // Exceções
    Object.entries(groupsByValue).forEach(([val, ids]) => {
        if (val === mode) return;
        
        const info = SCALE_MAP[val];
        const regionName = detectRegionPattern(ids, simplified);
        const labelStatus = simplified ? info.short : info.desc;
        
        if (regionName) {
            const text = simplified
                ? `${labelStatus} (${val}/4+) em ${regionName}`
                : `Pulsos ${labelStatus.toLowerCase()} (${val}/4+) em ${regionName}`;
            phrases.push(text);
        } else {
            const nameList = getAnatomicalNames(ids, simplified);
            phrases.push(`Pulsos ${nameList}, ${labelStatus.toLowerCase()} (${val}/4+)`);
        }
    });

    return phrases.join('. ');
};

const generateRitmicidadeSection = (data, simplified) => {
    const ritmoText = simplified 
        ? (data.ritmo === 'Regular' ? 'Regular' : 'Irregular') 
        : `Ritmo ${data.ritmo.toLowerCase()}`;
    
    const deficitText = data.ritmo === 'Irregular' && data.deficit
        ? (simplified ? `, déficit de pulso de ${data.deficit}bpm` : `, déficit de pulso de ${data.deficit} bpm`)
        : (simplified ? ', s/ déficit de pulso' : ', sem déficit de pulso');
    
    return `${ritmoText}${deficitText}`;
};

// --- 4. ALGORITMO PRINCIPAL ---

export const PulsosLogic = {
    generateReport(data, simplified = false) {
        if (!data) return null;

        const fullState = getFullPulseState(data.amplitude, data.detalhado);
        const mode = calculateMode(fullState);
        const parts = [];

        // --- 1. AMPLITUDE ---
        if (data.showAmplitude) {
            parts.push(generateAmplitudeSection(fullState, mode, simplified));
        }

        // --- 2. RITMICIDADE ---
        if (data.showRitmo && data.ritmo) {
            parts.push(generateRitmicidadeSection(data, simplified));
        }

        // --- 3. CONTORNO ---
        if (data.showContorno && data.contorno && CONTOUR_MAP[data.contorno]) {
            const map = CONTOUR_MAP[data.contorno];
            parts.push(simplified ? map.short : map.full);
        }

        if (parts.length === 0) return null;

        const final = parts.join('. ');
        return `CARDIOVASCULAR: ${final}`;
    }
};