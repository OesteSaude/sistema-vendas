// ===== CIDADES POR REGIÃO =====
const CIDADES_POR_REGIAO = {
    'Oeste Paulista (SP)': [
        'Adamantina',
        'Dracena',
        'Osvaldo Cruz',
        'Presidente Epitácio',
        'Presidente Prudente',
        'Presidente Venceslau'
    ],
    'Campo Grande (MS)': [
        'Campo Grande',
        'Nova Andradina',
        'Três Lagoas',
        'Bataguassu',
        'Anaurilândia'
    ],
    'Dourados (MS)': [
        'Dourados'
    ],
    'Corpe (SP)': [
        'Adamantina',
        'Dracena',
        'Osvaldo Cruz',
        'Presidente Epitácio',
        'Presidente Prudente',
        'Presidente Venceslau'
    ],
    'Corpe (MS)': [
        'Campo Grande',
        'Nova Andradina',
        'Três Lagoas',
        'Bataguassu',
        'Anaurilândia',
        'Dourados'
    ],
    'Corpe (DRD)': [
        'Campo Grande',
        'Nova Andradina',
        'Três Lagoas',
        'Bataguassu',
        'Anaurilândia',
        'Dourados'
    ],
    'Lancers (SP)': [
        'Adamantina',
        'Dracena',
        'Osvaldo Cruz',
        'Presidente Epitácio',
        'Presidente Prudente',
        'Presidente Venceslau'
    ],
    'Lancers (MS)': [
        'Campo Grande',
        'Nova Andradina',
        'Três Lagoas',
        'Bataguassu',
        'Anaurilândia',
        'Dourados'
    ],
    'Lancers (DRD)': [
        'Campo Grande',
        'Nova Andradina',
        'Três Lagoas',
        'Bataguassu',
        'Anaurilândia',
        'Dourados'
    ],
};

/**
 * Obter cidades de uma região
 * @param {string} regiao - Nome da região
 * @returns {array} Lista de cidades
 */
function obterCidades(regiao) {
    if (!regiao || !CIDADES_POR_REGIAO[regiao]) {
        console.warn(`⚠️ Região não encontrada: ${regiao}`);
        return [];
    }
    return CIDADES_POR_REGIAO[regiao];
}

/**
 * Obter todas as regiões disponíveis
 * @returns {array} Lista de regiões
 */
function obterRegioes() {
    return Object.keys(CIDADES_POR_REGIAO);
}

console.log('✅ CITIES carregado com sucesso');
console.log('📍 Regiões disponíveis:', obterRegioes().length);

