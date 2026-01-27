// ===== GERENCIADOR DE CIDADES =====

/**
 * Popular o select de cidades baseado na região selecionada
 */
function popularCidades() {
    const cidadeSelect = document.getElementById('cidade');
    
    // ⭐ VALIDAR SE O SELECT EXISTE
    if (!cidadeSelect) {
        console.error('❌ Select de cidade não encontrado no HTML');
        return;
    }
    
    // ⭐ VALIDAR SE UMA REGIÃO FOI SELECIONADA
    if (!selectedRegion) {
        console.warn('⚠️ Nenhuma região selecionada');
        cidadeSelect.innerHTML = '<option value="">Selecione uma cidade...</option>';
        return;
    }
    
    // ⭐ OBTER AS CIDADES DA REGIÃO SELECIONADA
    const cidades = CIDADES_POR_REGIAO[selectedRegion];
    
    // ⭐ VALIDAR SE A REGIÃO EXISTE
    if (!cidades) {
        console.error(`❌ Região não encontrada: ${selectedRegion}`);
        cidadeSelect.innerHTML = '<option value="">Região inválida</option>';
        return;
    }
    
    // ⭐ LIMPAR O SELECT DE CIDADES
    cidadeSelect.innerHTML = '<option value="">Selecione uma cidade...</option>';
    
    // ⭐ ADICIONAR CADA CIDADE COMO OPÇÃO
    cidades.forEach(cidade => {
        const option = document.createElement('option');
        option.value = cidade;
        option.textContent = cidade;
        cidadeSelect.appendChild(option);
    });
    
    console.log(`✅ Cidades carregadas para ${selectedRegion}:`, cidades);
}

// ⭐ EXECUTAR QUANDO A PÁGINA CARREGAR
document.addEventListener('DOMContentLoaded', function() {
    console.log('📍 CITIES-HANDLER inicializado');
});

console.log('✅ CITIES-HANDLER carregado');
